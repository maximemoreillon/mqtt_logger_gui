import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import axios from "axios"
import VueAxios from "vue-axios"
import VueApexCharts from "vue-apexcharts"

axios.defaults.baseURL = process.env.VUE_APP_MQTT_LOGGER_API_URL
Vue.use(VueAxios, axios)
Vue.use(VueApexCharts)

Vue.component("apexchart", VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
