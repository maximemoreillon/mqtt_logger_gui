<template>
  <v-card :loading="loading" max-width="40rem" class="mx-auto">
    <v-toolbar flat>
      <v-row align="center">
        <v-col cols="auto">
          <v-btn :to="{ name: 'sources' }" icon exact>
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
            <!-- TODO: make a component -->
            <v-card outlined>
              <v-toolbar flat>
                <v-row align="center">
                  <v-col> Tags </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn @click="add_tag()">Add tag</v-btn>
                  </v-col>
                </v-row>
              </v-toolbar>
              <v-card-text v-if="source.tags.length">
                <v-row dense v-for="(tag, index) in source.tags" :key="index">
                  <v-col>
                    <v-text-field dense v-model="tag.key" label="Key" />
                  </v-col>
                  <v-col>
                    <v-text-field dense v-model="tag.value" label="Value" />
                  </v-col>
                  <v-col cols="auto">
                    <v-btn icon @click="delete_tag(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text v-else> No Tag </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- TODO: make a component -->
            <v-card outlined>
              <v-toolbar flat>
                <v-row align="center">
                  <v-col> JSON keys </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn @click="add_key()">Add key</v-btn>
                  </v-col>
                </v-row>
              </v-toolbar>
              <v-card-text v-if="source.keys.length">
                <v-row dense v-for="(key, index) in source.keys" :key="index">
                  <v-col>
                    <v-text-field
                      dense
                      :value="key"
                      @input="update_key(index, $event)"
                      label="JSON key"
                    />
                  </v-col>
                  <v-col cols="auto">
                    <v-btn icon @click="delete_key(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text v-else>
                No field selected, using all fields of payload
              </v-card-text>
            </v-card>
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

export default {
  name: "Source",
  components: {
    MeasurementCharts,
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
    add_key() {
      this.source.keys.push("")
    },

    update_key(index, val) {
      this.$set(this.source.keys, index, val)
    },
    delete_key(index) {
      this.source.keys.splice(index, 1)
    },
    add_tag() {
      if (!this.source.tags) this.$set(this.source, "tags", [])
      this.source.tags.push({ key: "", value: "" })
    },
    delete_tag(index) {
      this.source.tags.splice(index, 1)
    },
  },
  computed: {
    source_id() {
      return this.$route.params._id
    },
  },
}
</script>
