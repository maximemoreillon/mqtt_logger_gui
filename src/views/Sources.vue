<template>
  <v-card>
    <v-toolbar flat>
      <v-row align="center">
        <v-col>
          <v-toolbar-title>Sources</v-toolbar-title>
        </v-col>
        <v-spacer/>
        <v-col cols="auto">
          <NewSourceDialog />
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider/>
    <v-card-text>
      <v-data-table
        :loading="loading"
        :items="sources"
        :headers="headers"
        @click:row="row_clicked($event)">
      </v-data-table>
    </v-card-text>
  </v-card>
</template>


<script>
import NewSourceDialog from '@/components/NewSourceDialog.vue'
export default {
  name: 'Sources',

  components: {
    NewSourceDialog
  },

  data: () => ({
    sources: [],
    loading: false,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Topic', value: 'topic' }
    ]
  }),

  mounted(){
    this.get_sources()
  },

  methods: {
    get_sources(){
      this.loading = true
      const url = `${process.env.VUE_APP_MQTT_LOGGER_API_URL}/sources`
      this.axios.get(url)
        .then(({data}) => {
          this.sources=data
        })
        .catch( error => {console.error(error)})
        .finally( () => {this.loading = false})
    },
    row_clicked({_id}){
      this.$router.push({name: 'source', params: {_id}})
    }
  }
};
</script>
