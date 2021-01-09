import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context("@/assets/icon", true, /\.svg$/)
requireAll(req)

Set.prototype.difference = function (setB) {
  var difference = new Set(this);
  for (var elem of setB) {
    difference.delete(elem);
  }
  return difference;
}


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
