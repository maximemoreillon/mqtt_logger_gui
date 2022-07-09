<template>
  <v-dialog
    v-model="dialog"
    width="500">

    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="red lighten-2"
        dark
        v-bind="attrs"
        v-on="on">
        New source
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        New source
      </v-card-title>

      <v-form @submit.prevent="submit()">
        <v-card-text>
          <v-row align="center">
            <v-col>
              <v-text-field
                v-model="name"
                label="Name"/>
            </v-col>
            <v-col cols="auto">
              <v-btn
                :loading="loading"
                type="submit">
                Create
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>




      <!-- <v-card-actions>
        <v-row align="center">
          <v-spacer/>
          <v-col cols="auto">
            <v-btn
              color="primary"
              text
              @click="dialog = false">
              Close
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              color="primary"
              text
              type="submit">
              Create
            </v-btn>
          </v-col>
        </v-row>

      </v-card-actions> -->
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    name: 'NewSourceDialog',

    data: () => ({
      dialog: false,
      loading: false,
      name: null,
    }),

    methods: {
      submit(){
        this.loading = true
        const url = `${process.env.VUE_APP_API_URL}/sources`
        const body = {name: this.name}
        this.axios.post(url,body)
          .then(({data: {_id}}) => {
            this.$router.push({ name: 'source', params: {_id}})
          })
          .catch( error => {console.error(error)})
          .finally( () => {this.loading = false})
      }
    }
  }
</script>
