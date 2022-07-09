<template>
  <v-card max-width="40rem" class="mx-auto">
    <v-card-title>
      MQTT Logger
    </v-card-title>
    <v-card-text>
      Developed and maintained by Maxime Moreillon
    </v-card-text>
    <v-card-text>
      Version {{ version }}
    </v-card-text>
    <v-card-text>
      API URL: {{ api_url }}
    </v-card-text>
  </v-card>
</template>
<script>

const {
  VUE_APP_MQTT_LOGGER_API_URL
} = process.env

import {version} from '@/../package.json'

export default {
  name: 'About',
  data(){
    return {
      api_url: VUE_APP_MQTT_LOGGER_API_URL,
      version
    }
  }
}

</script>
