<template>
  <AppTemplate
    :options="options">

    <template v-slot:nav>
      <v-list
        dense
        nav >
        <v-list-item
          v-for="(item, index) in nav"
          :key="`nav_item_${index}`"
          :to="item.to"
          exact>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

  </AppTemplate>
</template>

<script>
import AppTemplate from '@moreillon/vue_application_template_vuetify'
export default {
  name: 'App',

  components: {
    AppTemplate
  },

  data: () => ({
    options: {
      title: 'MQTT Logger',
      login_url: process.env.VUE_APP_LOGIN_URL,
      identification_url: process.env.VUE_APP_IDENTIFICATION_URL,
    },
    nav: [
      {title: 'Sources', to: {name: 'sources'}, icon: 'mdi-format-list-bulleted'},
      {title: 'About', to: {name: 'About'}, icon: 'mdi-information-outline'},
    ]
  }),

  methods: {

  }
};
</script>
