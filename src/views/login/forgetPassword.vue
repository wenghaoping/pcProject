<template>
    <div id="forgetPassword">
      <div class="title tc">微天使,帮您成交的项目管理工具</div>
      <div class="loginBox">
        <div class="backLogin">
          <img class="arrowLeft" src=""/>
          返回登录
        </div>
        <input class="telephone" placeholder="请输入常用手机号码">
        <div class="codeFrame">
          <input class="code" placeholder="请输入验证码">
          <el-button type="text" @click="getCode">获取验证码</el-button>
        </div>
        <input class="resetCode" placeholder="重置密码">
        <el-button class="loginBtn tc">确定</el-button>
      </div>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
        data () {
            return {}
        },
        methods: {}
    }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
