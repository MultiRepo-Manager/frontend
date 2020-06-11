<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon 
        v-bind="attrs"
        v-on="on"
      >
        {{ staticon }}
      </v-icon>
    </template>
    <span>{{ wsstat }}</span>
  </v-tooltip>
</template>

<script>
  export default {
    name: 'wsStatus',
    computed: {
      staticon: function() {
        return this.$store.state.socket.isConnected ? "mdi-lan-connect" : "mdi-lan-disconnect" 
      },
      wsstat: function() {
        return this.$store.state.socket.isConnected ? "WS ON" : "WS OFF" 
      }
    }
  }
</script>
