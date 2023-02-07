<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus</v-icon>
        <span> New source</span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title> New source </v-card-title>

      <v-form @submit.prevent="submit()">
        <v-card-text>
          <v-row align="center">
            <v-col>
              <v-text-field v-model="name" label="Name" />
            </v-col>
            <v-col cols="auto">
              <v-btn :loading="loading" type="submit"> Create </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewSourceDialog",

  data: () => ({
    dialog: false,
    loading: false,
    name: null,
  }),

  methods: {
    submit() {
      this.loading = true
      const url = `${process.env.VUE_APP_MQTT_LOGGER_API_URL}/sources`
      const body = { name: this.name }
      this.axios
        .post(url, body)
        .then(({ data: { _id } }) => {
          this.$router.push({ name: "source", params: { _id } })
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
