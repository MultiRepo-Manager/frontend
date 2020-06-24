import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueNativeSock from 'vue-native-websocket'
import store from './store'
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Vue.config.productionTip = false

Vue.use(VuejsDialog, { animation: 'fade' });

Vue.use(VueNativeSock, 'ws://localhost:8080/ws', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
  store: store,
  format: 'json',
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
