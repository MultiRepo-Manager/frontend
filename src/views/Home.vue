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
              <v-dialog v-model="dialog" persistent max-width="240px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" @click="dialog = true" text>Delete</v-btn>
                </template>
                <v-card>
                  <v-card-title><span>Delete repo</span></v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialog = false">Cancel</v-btn>
                    <v-btn text @click="del_repo(repo.repo_key)">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
    data: () => ({
      dialog: false
        }),
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
      del_repo: function (name) {
            this.$socket.sendObj({ "topic": "git-del", "payload": {"name": name}})
            console.log("DEl repo " + name)
          },
    }
  }
</script>
