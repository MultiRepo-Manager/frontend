<template>
  <v-row justify="end">
    <v-icon v-on:click="git_add" large>mdi-plus</v-icon>
    <v-icon v-on:click="sync_all" large>mdi-cached</v-icon>
  </v-row>
</template>

<script>
  export default {
    name: 'spaceActions',
    methods: {
      sync_all: function () {
                  this.$socket.sendObj({ "topic": "git-sync-all", "payload": {}})
                },
      git_add: function () {
                  this.$socket.sendObj({ "topic": "git-add", "payload": {}})
                }
    }
  }
</script>
