<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="repo in repos" :key="repo.name">
      <v-expansion-panel-header>{{ repo.name }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  const GitUrlParse = require("git-url-parse");

  export default {
    name: 'Home',
    computed: {
      repos: function() {
        var rps = []
        if (this.$store.state.workspace.config.repos) {
            for (var [key, value] of Object.entries(this.$store.state.workspace.config.repos)) {
              console.log(key)
              rps.push(GitUrlParse(value.git))
            }
        }
        return rps
      },
    }
  }
</script>
