<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">{{ project }}</span>
      <v-spacer></v-spacer>
      <wsStatus/>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <navBar/>
    </v-navigation-drawer>

    <v-content>
     <v-container fluid>
       <router-view/>
     </v-container>
    </v-content>
    <v-footer
      color="amber"
      app
    >
      <span class="white--text">MULTI-REPO MANAGER</span>
    </v-footer>
  </v-app>
</template>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>

<script>
  import wsStatus from './components/wsStatus';
  import navBar from './components/navBar';

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    components: {
      wsStatus,
      navBar
    },
    computed: {
      project: function() {
        return this.$store.state.workspace.config.name
      },
    }
  }
</script>
