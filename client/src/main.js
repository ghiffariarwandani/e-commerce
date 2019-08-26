import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BoostrapVue from 'bootstrap-vue'
import axios from 'axios'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'

Vue.use(axios)
Vue.use(BoostrapVue)
Vue.use(DropdownPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')