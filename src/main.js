import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import store from './store/index'
import VModal from 'vue-js-modal'

// import "./assets/style/index.css";

import 'material-design-icons-iconfont'
import './assets/style/reset.css'
// Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VModal)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
