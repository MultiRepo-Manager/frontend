<template>
  <div>
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-item
            :key="item.key"
            button
            @click="run(item.key)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" persistent max-width="600px">
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
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn text @click="git_add">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'navBar',
    data: () => ({
      add_url: "",
      add_branch: "",
      add_name: "",
      dialog: false,
      items: [
        { icon: 'mdi-plus', text: 'Add', key: 'add' },
        { icon: 'mdi-recycle', text: 'Sync', key: 'sync' },
      ],
    }),
    methods: {
      git_add: function () {
           this.$socket.sendObj({ "topic": "git-add", "payload": {"name": this.add_name, "git": this.add_url, "branch": this.add_branch}})
           this.dialog = false
           this.add_name = ""
           this.add_url = ""
           this.add_branch = ""
         },
      run: function (action) {
            switch (action) {
              case "sync":
                this.$socket.sendObj({ "topic": "git-sync-all", "payload": {}});
                break;
              case "add":
                this.dialog = true;
                break;
          }
      }
    }
}
</script>
