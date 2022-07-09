<template>
  <apexchart
    :options="options"
    :series="series"/>
</template>

<script>
  export default {
    name: 'PointsChart',

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
        const url = `${process.env.VUE_APP_API_URL}/sources/${this.source_id}/points`
        this.axios.get(url)
          .then(({data}) => {

            this.series = [{
              name: data[0] ? data[0]._field : 'No field',
              data: data.map(p => ([new Date(p._time).getTime(),p._value]))
            }]


          })
          .catch( error => {console.error(error)})
          .finally( () => {this.loading = false})
      },
    },
  }
</script>
