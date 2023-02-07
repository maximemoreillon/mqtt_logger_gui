<template>
  <v-card>
    <v-toolbar flat>
      <v-row align="center">
        <v-col>
          <v-toolbar-title>Sources</v-toolbar-title>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <NewSourceDialog />
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-data-table :loading="loading" :items="sources" :headers="headers">
        <template v-slot:item.name="{ item }">
          <router-link :to="{ name: 'source', params: { _id: item._id } }">
            {{ item.name }}
          </router-link>
        </template>

        <template v-slot:item.tags="{ item }">
          <v-row>
            <v-col cols="auto" v-for="tag in item.tags" :key="tag._id">
              <v-chip> {{ tag.key }}: {{ tag.value }} </v-chip>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import NewSourceDialog from "@/components/NewSourceDialog.vue"
export default {
  name: "Sources",

  components: {
    NewSourceDialog,
  },

  data: () => ({
    sources: [],
    loading: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Topic", value: "topic" },
      { text: "Tags", value: "tags" },
    ],
  }),

  mounted() {
    this.get_sources()
  },

  methods: {
    get_sources() {
      this.loading = true
      const url = `/sources`
      this.axios
        .get(url)
        .then(({ data }) => {
          this.sources = data
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
