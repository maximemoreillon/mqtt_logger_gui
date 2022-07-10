<template>
  <v-card outlined :loading="loading">
    <v-toolbar flat>
      <v-row align="baseline">
        <v-col>
          <v-toolbar-title>
            Data
          </v-toolbar-title>
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
          <apexchart :options="{ ...options, title: { text: serie.name } }" :series="[serie]" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      No data available
    </v-card-text>

  </v-card>


</template>

<script>
  export default {
  name: 'MeasurementCharts',
    props: {
      keys: Array
    },

    data: () => ({
      loading: false,
      auto_refresh: true,
      interval: null,
      series: [],
      options: {
        type:"line",
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          type: 'datetime'
        }
      },

    }),
    computed: {
      source_id(){
        return this.$route.params._id
      }
    },
    mounted(){
      this.get_points()
      if (this.auto_refresh) this.interval = setInterval(this.get_points, 10000)
    },
    watch:{
      auto_refresh(enabled){
        if (enabled) this.interval = setInterval(this.get_points, 10000)
        else clearInterval(this.interval)
      }
    },
    beforeDestroy(){
      if (this.interval) clearInterval(this.interval)
    },
    methods: {
      get_points(){
        this.loading = true
        const url = `${process.env.VUE_APP_MQTT_LOGGER_API_URL}/sources/${this.source_id}/points`
        this.axios.get(url)
          .then(({data}) => {

            const fields = this.keys.length ? this.keys : this.get_unique_fields(data)
            this.series = fields.map(field => {
              return {
                name: field,
                data: data.filter(({ _field }) => _field === field).map(p => ([new Date(p._time).getTime(),p._value]))
              }
            })

          })
          .catch( error => {console.error(error)})
          .finally( () => {this.loading = false})
      },
      get_unique_fields(data){
        return data.reduce((acc, { _field }) => {
          if (!acc.includes(_field)) acc.push(_field)
          return acc
        }, [])
      }
    },
  }
</script>
