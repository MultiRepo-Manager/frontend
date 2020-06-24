<template>
  <v-app>
    <navBar/>
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <span class="title ml-3 mr-5">{{ project }}</span>
      <v-spacer></v-spacer>
      <wsStatus/>
    </v-app-bar>
    <v-main>
     <v-container fluid>
       <router-view/>
     </v-container>
    </v-main>
    <v-footer
      color="amber"
      app
    >
      <span class="white--text">MULTI-REPO MANAGER</span>
    </v-footer>
  </v-app>
</template>

<script>
  import wsStatus from './components/wsStatus';
  import navBar from './components/navBar';

  export default {
    components: {
      wsStatus,
      navBar,
    },
    computed: {
      project: function() {
        return this.$store.state.workspace.config.name
      },
    }
  }
</script>
