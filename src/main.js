import Vue from 'vue'
import App from './App.vue'
import movable from 'v-movable';
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify)

Vue.use(movable);

Vue.config.productionTip = false

new Vue({
  vuetify: new Vuetify({}),
  render: h => h(App),
}).$mount('#app')
