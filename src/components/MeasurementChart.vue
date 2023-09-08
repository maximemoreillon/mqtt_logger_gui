<template>
  <apexchart :options="options" :series="series" />
</template>

<script>
export default {
  name: "MeasurementChart",
  props: {
    title: String,
    series: Array,
  },

  data: () => ({}),
  computed: {
    dark() {
      return this.$vuetify.theme.dark
    },
    options() {
      return {
        title: { text: this.title },
        theme: {
          mode: this.dark ? "dark" : "light",
        },
        background: "#c00",
        type: "line",
        colors: ["#c00000"],
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          type: "datetime",
        },
      }
    },
  },
  mounted() {},
  watch: {},
  beforeDestroy() {},
  methods: {},
}
</script>

<style>
.apexcharts-svg {
  background: none !important;
}
.apexcharts-zoom-icon.apexcharts-selected svg {
  fill: #c00000 !important;
}

.apexcharts-pan-icon.apexcharts-selected svg {
  stroke: #c00000 !important;
}
</style>
