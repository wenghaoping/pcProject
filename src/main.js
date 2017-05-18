// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router_config from './router/router_config.js'


Vue.config.productionTip = false
//设置路由
Vue.use(VueRouter);
//定义路由
const router = new VueRouter({
  routes: router_config
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
