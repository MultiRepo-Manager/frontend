<template>
  <v-list dense>
    <v-list-item link v-for="repo in repos" :key="repo.name">
      <v-list-item-content>
        <v-list-item-title>{{ repo.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
  const GitUrlParse = require("git-url-parse");

  export default {
    name: 'navBar',
    computed: {
      repos: function() {
        var rps = []
        if (this.$store.state.workspace.config.repos) {
          this.$store.state.workspace.config.repos.forEach(element => rps.push(GitUrlParse(element)));
        }
        return rps
      },
    }
  }
</script>
