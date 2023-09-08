<template>
  <v-card outlined :loading="loading">
    <v-toolbar flat>
      <v-row align="baseline">
        <v-col>
          <v-toolbar-title> Data </v-toolbar-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-switch label="Auto-refresh" v-model="auto_refresh"></v-switch>
        </v-col>
        <v-col cols="auto">
          <v-btn icon @click="get_points()" :loading="loading">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text v-if="series.length">
      <v-row v-for="(serie, index) in series" :key="index">
        <v-col>
          <!-- Options Not very clean -->
          <MeasurementChart
            :series="[serie]"
            :title="serie.name"
            v-if="!serieHasNan(serie)"
          />

          <!-- Table in case data is not graphable -->
          <v-data-table v-else :headers="headers" :items="serie.data">
            <template v-slot:top>
              <v-card-subtitle>
                {{ serie.name }}
              </v-card-subtitle>
            </template>

            <template v-slot:item.x="{ item }">
              {{ new Date(item.x) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else> No data available </v-card-text>
  </v-card>
</template>

<script>
import MeasurementChart from "./MeasurementChart.vue"
export default {
  name: "MeasurementCharts",
  components: {
    MeasurementChart,
  },
  props: {
    keys: Array,
  },

  data: () => ({
    loading: false,
    auto_refresh: true,
    interval: null,
    series: [],
    headers: [
      { text: "Time", value: "x" },
      { text: "Value", value: "y" },
    ],
  }),
  computed: {
    source_id() {
      return this.$route.params._id
    },
    dark() {
      return this.$vuetify.theme.dark
    },
  },
  mounted() {
    this.get_points()
    if (this.auto_refresh) this.interval = setInterval(this.get_points, 10000)
  },
  watch: {
    auto_refresh(enabled) {
      if (enabled) this.interval = setInterval(this.get_points, 10000)
      else clearInterval(this.interval)
    },
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
  },
  methods: {
    get_points() {
      this.loading = true
      const url = `/sources/${this.source_id}/points`
      const params = { limit: 100 }
      this.axios
        .get(url, { params })
        .then(({ data }) => {
          const { points } = data

          const fields = this.keys.length
            ? this.keys
            : this.get_unique_fields(points)

          this.series = fields.map((field) => ({
            name: field,
            data: points
              .filter(({ _field }) => _field === field)
              .map((p) => ({ x: new Date(p._time).getTime(), y: p._value })),
          }))
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    get_unique_fields(data) {
      return data.reduce((acc, { _field }) => {
        if (!acc.includes(_field)) acc.push(_field)
        return acc
      }, [])
    },
    serieHasNan(serie) {
      return serie.data.some(({ y }) => isNaN(parseFloat(y)))
    },
  },
}
</script>
