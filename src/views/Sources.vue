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
    <v-card-text>
      <v-data-table
        :loading="loading"
        :items="sources"
        :headers="headers"
        :options.sync="tableOptions"
        :server-items-length="total"
      >
        <template v-slot:top>
          <!-- TODO: make its own component -->
          <v-form @submit.prevent="applySearch()">
            <v-row align="center">
              <v-col>
                <v-text-field v-model="searchString" label="Search" />
              </v-col>
              <v-col cols="auto">
                <v-btn type="submit" icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-form>
        </template>

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
    total: 0,
    loading: false,
    searchString: "",
    headers: [
      { text: "Name", value: "name" },
      { text: "Topic", value: "topic" },
      { text: "Tags", value: "tags" },
    ],
  }),

  mounted() {
    this.get_sources()
  },

  watch: {
    query: {
      handler() {
        this.get_sources()
      },
      deep: true,
    },
  },

  methods: {
    get_sources() {
      this.loading = true
      const url = `/sources`
      const params = this.query
      this.axios
        .get(url, { params })
        .then(({ data }) => {
          this.sources = data.items
          this.total = data.total
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    applySearch() {
      this.updateUrlQuery({ search: this.searchString })
    },
    // TODO: have those in a mixin
    shallowEqual(object1, object2) {
      const keys1 = Object.keys(object1)
      const keys2 = Object.keys(object2)

      if (keys1.length !== keys2.length) return false

      for (let key of keys1) {
        if (object1[key] !== object2[key]) {
          return false
        }
      }

      return true
    },
    updateUrlQuery(newParameters) {
      const query = {
        ...this.query,
        ...newParameters,
      }
      if (!this.shallowEqual(query, this.query)) this.$router.push({ query })
    },
  },
  computed: {
    query() {
      return this.$route.query
    },
    tableOptions: {
      get() {
        const {
          limit = 10,
          sort = "_name",
          order = 1,
          skip = 0,
        } = this.$route.query

        return {
          itemsPerPage: Number(limit),
          sortBy: [sort],
          sortDesc: [order === "-1"],
          page: skip / limit + 1,
        }
      },
      set(newVal) {
        const { itemsPerPage, page, sortBy, sortDesc } = newVal
        const params = {
          limit: String(itemsPerPage),
          skip: String((page - 1) * itemsPerPage),
          order: String(sortDesc[0] ? -1 : 1),
          sort: sortBy[0],
        }
        const query = { ...this.$route.query, ...params }

        this.updateUrlQuery(query)
      },
    },
  },
}
</script>
