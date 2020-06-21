<template>
<div>
  <v-card
    class="mx-auto"
    v-for="repo in repos" :key="repo.repo_key"
  >
      <v-row fluid>
        <v-col cols="12">
          <v-card>
            <v-card-title class="headline">{{ repo.repo_key }}</v-card-title>
            <v-card-subtitle>{{ repo.href }}</v-card-subtitle>
            <v-card-actions>
              <v-btn text>Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  </v-card>
  </div>
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
              var parsed = GitUrlParse(value.git)
              parsed["repo_key"] = key
              rps.push(parsed)
            }
        }
        return rps
      },
    }
  }
</script>
