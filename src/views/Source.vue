<template>
  <v-card :loading="loading" max-width="40rem" class="mx-auto">
    <v-toolbar flat>
      <v-row align="center">
        <v-col cols="auto">
          <v-btn @click="$router.back()" icon exact>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-toolbar-title>Source</v-toolbar-title>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn
            icon
            color="#c00000"
            :loading="deleting"
            @click="delete_source()"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn icon :loading="updating" @click="update_source()">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider />
    <template v-if="source">
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field :value="source._id" label="ID" filled />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="source.name" label="Name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="source.topic" label="Topic" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <SourceTags v-model="source.tags" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <SourceKeys v-model="source.keys" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <MeasurementCharts :keys="source.keys" />
      </v-card-text>
    </template>

    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn text dark v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import MeasurementCharts from "@/components/MeasurementCharts.vue"
import SourceKeys from "../components/SourceKeys.vue"
import SourceTags from "../components/SourceTags.vue"

export default {
  name: "Source",
  components: {
    MeasurementCharts,
    SourceKeys,
    SourceTags,
  },
  data: () => ({
    source: null,
    loading: false,
    updating: false,
    deleting: false,
    snackbar: {
      show: false,
      text: null,
      color: "green",
    },
  }),

  mounted() {
    this.get_source()
    document.addEventListener("keydown", this.handle_keydown)
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handle_keydown)
  },

  methods: {
    handle_keydown(e) {
      // Keyboard events

      // CTRL S
      if (e.key === "s" && e.ctrlKey) {
        e.preventDefault()
        this.update_source()
      }
    },

    get_source() {
      this.loading = true
      const url = `/sources/${this.source_id}`
      this.axios
        .get(url)
        .then(({ data }) => {
          this.source = data
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    delete_source() {
      if (!confirm("Really?")) return
      this.deleting = true
      const url = `/sources/${this.source_id}`
      this.axios
        .delete(url)
        .then(() => {
          this.$router.push({ name: "sources" })
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.deleting = false
        })
    },
    update_source() {
      this.updating = true

      const url = `/sources/${this.source_id}`
      this.axios
        .patch(url, this.source)
        .then(() => {
          this.snackbar.text = "Source updated"
          this.snackbar.show = true
          this.snackbar.color = "green"
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.updating = false
        })
    },
  },
  computed: {
    source_id() {
      return this.$route.params._id
    },
  },
}
</script>
