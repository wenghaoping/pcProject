webpackJsonp([18],{752:function(e,t,o){o(913);var n=o(170)(o(844),o(981),"data-v-39a5e32a",null);e.exports=n.exports},844:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{loading:!1}},methods:{},created:function(){this.loading=!0;var e=this,t="";t=localStorage.entrance?localStorage.entrance:"myProject",console.log(this.$route.query),localStorage.user_id=this.$route.query.id,localStorage.user_real_name=this.$route.query.name,this.$store.state.logining.user_id=this.$route.query.id,this.$store.state.logining.user_real_name=this.$route.query.name,this.$global.func.getWxProjectCategory(),setTimeout(function(){e.$router.push({name:t}),e.loading=!1},100)}}},879:function(e,t,o){t=e.exports=o(740)(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"loginReady.vue",sourceRoot:""}])},913:function(e,t,o){var n=o(879);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);o(741)("0c6931e2",n,!0)},981:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{id:"loginReady","element-loading-text":"拼命加载中"}})},staticRenderFns:[]}}});
//# sourceMappingURL=18.js.map