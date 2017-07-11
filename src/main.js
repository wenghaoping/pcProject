// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router_config from './config/router_config.js'
import store from './store/'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


//引入自己的CSS,格式化样式
import './assets/css/base.css'
import './assets/css/animate.css'
import $ from 'jquery'
import './global/jquery.fullPage'
import tool from './global/tool.js';


import axios from './config/api.js'//axios请求配置
Vue.prototype.$http = axios;

import URL_ from './global/url.js'//URL请求地址汇总
Vue.prototype.URL = URL_;

import echarts from 'echarts'//echart封装
Vue.prototype.$echart = echarts;

import Vuex from 'vuex'
import global from './global/global.js'
Vue.prototype.$global= global

Vue.use(Element);//UI库
Vue.use(tool);//自己的库
Vue.use(Vuex);



Vue.config.productionTip = false;
//设置路由
Vue.use(VueRouter);
//定义路由
const router = new VueRouter({
  routes: router_config
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
