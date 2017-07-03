<template>
  <div id="login">
    <div class="title">微天使,帮您成交的项目管理工具</div>
    <div class="loginBox">
      <div class="loginBox-left">
        <div @click="toggle(index)" v-for="(tab,index) in tabs">
          <router-link :to=" tab.jump " :class="{border:active===index}">
            {{tab.type}}
          </router-link>
        </div>
        <router-vier></router-vier>
      </div>
      <div class="loginBox-right"></div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        tabs: [{
          type: "验证码登录", jump: "telephoneLogin"
        }, {
          type: "密码登录", jump: "codeLogin"
        }]
        ,
        active:1
      }
    },
    methods: {
      toggle(i){
        this.active = i
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
