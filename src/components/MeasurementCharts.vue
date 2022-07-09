<template>
  <!-- TODO: Have multiple graphs if multiple fields -->
  <v-container fluid>
    <v-row v-for="(serie, index) in series" :key="index">
      <v-col>
        <apexchart :options="{ ...options, title: { text: serie.name}}" :series="[serie]" />
      </v-col>
    </v-row>
  </v-container>


</template>

<script>
  export default {
  name: 'MeasurementCharts',
    props: {
      keys: Array
    },

    data: () => ({
      options: {
        type:"line",
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          type: 'datetime'
        }


      },
      series: []
    }),
    computed: {
      source_id(){
        return this.$route.params._id
      }
    },
    mounted(){
      this.get_points()
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
