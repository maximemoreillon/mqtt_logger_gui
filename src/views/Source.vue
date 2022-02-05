<template>
  <v-card
    :loading="loading">
    <v-toolbar flat>
      <v-row>
        <v-col>
          <v-toolbar-title>Source</v-toolbar-title>
        </v-col>
        <v-spacer/>
        <v-col cols="auto">
          <v-btn
            :loading="deleting"
            @click="delete_source()">Delete</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            :loading="updating"
            @click="update_source()">Save</v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider/>
    <v-card-text v-if="source">
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="source.name"
            label="Name"/>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="source.topic"
            label="Topic"/>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="source.json_key"
            label="JSON key"/>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <PointsChart />
    </v-card-text>
  </v-card>
</template>

<script>
import PointsChart from '@/components/PointsChart.vue'

export default {
  name: 'Source',
  components: {
    PointsChart
  },
  data: () => ({
    source: null,
    loading: false,
    updating: false,
    deleting: false,
    headers: [
      {text: 'ID', value: '_id'}
    ]
  }),

  mounted(){
    this.get_source()
    document.addEventListener("keydown", this.handle_keydown)
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handle_keydown)
  },


  methods: {
    handle_keydown(e){
      // Keyboard events

      // CTRL S
      if (e.key === 's' && e.ctrlKey) {
        e.preventDefault()
        this.update_source()
      }
    },

    get_source(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/sources/${this.source_id}`
      this.axios.get(url)
        .then(({data}) => {
          this.source = data
        })
        .catch( error => {console.error(error)})
        .finally( () => {this.loading = false})
    },
    delete_source(){
      this.deleting = true
      const url = `${process.env.VUE_APP_API_URL}/sources/${this.source_id}`
      this.axios.delete(url)
        .then(() => {
          this.$router.push({name: 'sources'})
        })
        .catch( error => {console.error(error)})
        .finally( () => {this.deleting = false})
    },
    update_source(){
      this.updating = true

      const url = `${process.env.VUE_APP_API_URL}/sources/${this.source_id}`
      this.axios.patch(url, this.source)
        .then(() => {
          alert('OK')
        })
        .catch( error => {console.error(error)})
        .finally( () => {this.updating = false})

    },
    row_clicked({_id}){
      this.$router.push({name: 'source', params: {_id}})
    }
  },
  computed: {
    source_id(){
      return this.$route.params._id
    }
  }
};
</script>
