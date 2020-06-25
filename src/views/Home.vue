<template>
  <div>
    <v-card
      class="mx-auto"
      v-for="repo in repos"
      :key="repo.repo_key"
      >
      <v-card-title class="headline">{{ repo.repo_key }}</v-card-title>
      <v-card-subtitle>{{ repo.href }}</v-card-subtitle>
      <v-card-actions>
        <v-btn @click="build(repo.repo_key)" icon >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                >
                mdi-excavator
              </v-icon>
            </template>
            <span>Build</span>
          </v-tooltip>
        </v-btn>
        <v-btn @click="delrepo(repo.repo_key)" icon >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                >
                mdi-delete
              </v-icon>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-btn>
      </v-card-actions>
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
    },
    methods: {
      delrepo: function (name) {
            const sck = this.$socket;
            const options = {
              html: true,
              okText: 'Delete',
              cancelText: 'Cancel',
            };
            this.$dialog
              .confirm('Delete: <b>' + name + '</b>', options)
              .then(function() {
                  sck.sendObj({ "topic": "git-del", "payload": {"name": name}})
                })
              .catch(function() {
                  console.log('Clicked on cancel');
                });
          },
      build: function (name) {
            const sck = this.$socket;
            const options = {
              html: true,
              okText: 'Build',
              cancelText: 'Cancel',
            };
            this.$dialog
              .confirm('Build: <b>' + name + '</b>', options)
              .then(function() {
                  sck.sendObj({ "topic": "git-build", "payload": {"name": name}})
                })
              .catch(function() {
                  console.log('Clicked on cancel');
                });
          },
    }
  }
</script>
