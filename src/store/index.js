import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    },
    workspace: {
      config: ""
    }
  },
  mutations:{
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      Vue.prototype.$socket.sendObj({ "topic": "config-get", "payload": {}})
    },
    SOCKET_ONCLOSE (state, event)  {
      state.socket.isConnected = false
      console.log(state, event)
    },
    SOCKET_ONERROR (state, event)  {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      state.socket.message = message
      switch(message.topic) {
        case "config-set":
          state.workspace.config = message.payload
          Vue.toasted.show('Config loaded');
          break;
        case "git-added":
          Vue.toasted.show('Repository added');
          break;
        case "git-deleted":
          Vue.toasted.show('Repository deleted');
          break;
        default:
          Vue.toasted.show('Done!');
      }
      console.log(state, message.topic, message.payload)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  actions: {
    sendMessage: function(context, message) {
      Vue.prototype.$socket.sendObj(message)
    }
  }
})
