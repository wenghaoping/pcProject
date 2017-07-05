<template>
  <div id="login">
    <div class="title tc">微天使,帮您成交的项目管理工具</div>
    <div class="loginBox flex">
      <div class="loginBox-left">
        <div class="flex">
          <div class="tab" @click="toggle(index)" v-for="(tab,index) in tabs">
            <router-link :to="tab.jump "  class="tabIndex" :class="{border:active===index}" tag="div">
              {{tab.type}}
            </router-link>
          </div>
        </div>
        <router-view></router-view>
      </div>
      <div class="loginBox-right">
        <div class="wx-title tc">
          <img src=""/>
          微信扫码登录
        </div>
        <img class="qrCode" src="">
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        tabs: [{
          type: "验证码登录", jump: "/login"
        }, {
          type: "密码登录", jump: "/login/codeLogin"
        }]
        ,
        active:0
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
