<template>
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
    <v-card-text v-if="keys.length">
      <v-row dense v-for="(key, index) in keys" :key="index">
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
</template>

<script>
export default {
  name: "SourceKeys",
  props: {
    value: Array,
  },
  computed: {
    keys: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit("update", newVal)
      },
    },
  },
  methods: {
    add_key() {
      this.keys.push("")
    },

    update_key(index, val) {
      this.$set(this.keys, index, val)
    },
    delete_key(index) {
      this.keys.splice(index, 1)
    },
  },
}
</script>
