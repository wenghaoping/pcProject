import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import pushProject from './pushProject.js'
import login from './login.js'
Vue.use(Vuex);

const state = {
  //初始化状态设定

}

export default  new Vuex.Store({
/*  state,
  getters,
  actions,
  mutations,*/
  modules: {
    pushProject: pushProject,
    logining:login
  }

})
