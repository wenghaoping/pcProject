// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router_config from './config/router_config.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import { Notification } from 'element-ui';

//引入自己的CSS,格式化样式
import './assets/css/base.css'
import './assets/css/animate.css'
import $ from 'jquery'
import tool from './assets/js/tool.js';

import axios from './config/api.js'
Vue.prototype.$http = axios

import URL_ from './assets/js/url.js'//URL请求地址汇总
Vue.prototype.URL = URL_

/*import LOADING_ from './assets/js/loading.js'//加载
Vue.prototype.LOAD = LOADING_*/

Vue.use(Element)//UI库
Vue.use(tool);//自己的库


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
