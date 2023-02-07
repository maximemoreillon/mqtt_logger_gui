<template>
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
    <v-card-text v-if="tags.length">
      <v-row dense v-for="(tag, index) in tags" :key="index">
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
</template>

<script>
export default {
  name: "SourceTags",
  props: {
    value: Array,
  },
  computed: {
    tags: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit("update", newVal)
      },
    },
  },
  methods: {
    add_tag() {
      if (!this.tags) this.$set(this.source, "tags", [])
      this.tags.push({ key: "", value: "" })
    },
    delete_tag(index) {
      this.tags.splice(index, 1)
    },
  },
}
</script>
