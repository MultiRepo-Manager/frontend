<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="amber"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title><span class="headline">New GIT</span></v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="add_url" label="Url*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="add_name" label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="add_branch" label="Branch*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog_cancel">Close</v-btn>
          <v-btn text @click="git_add">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="amber"><v-icon v-on:click="sync_all" large>mdi-cached</v-icon></v-btn>
  </v-row>
</template>

<script>
  export default {
    name: 'spaceActions',
    data: () => ({
      dialog: false,
      add_url: "",
      add_branch: "",
      add_name: ""
    }),
    methods: {
      sync_all: function () {
            this.$socket.sendObj({ "topic": "git-sync-all", "payload": {}})
          },
      git_add: function () {
           this.dialog = false
           this.$socket.sendObj({ "topic": "git-add", "payload": {"name": this.add_name, "git": this.add_url, "branch": this.add_branch}})
           this.add_name = ""
           this.add_url = ""
           this.add_branch = ""
         },
      dialog_cancel: function () {
           this.dialog = false
           this.add_name = ""
           this.add_url = ""
           this.add_branch = ""
         }
    }
  }
</script>
