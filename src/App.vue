<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <wsStatus/>
      <span class="title ml-3 mr-5">{{ project }}</span>
      <v-spacer></v-spacer>
      <spaceActions/>
    </v-app-bar>
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

<script>
  import wsStatus from './components/wsStatus';
  import spaceActions from './components/spaceActions';

  export default {
    props: {
      source: String,
    },
    components: {
      wsStatus,
      spaceActions
    },
    computed: {
      project: function() {
        return this.$store.state.workspace.config.name
      },
    }
  }
</script>
