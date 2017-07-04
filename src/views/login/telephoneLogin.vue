<template>
    <div id="telephoneLogin">
        <input class="telephone" placeholder="请输入常用手机号码">
      <div class="codeFrame">
        <input class="code" placeholder="请输入验证码">
        <el-button type="text" @click="getCode">获取验证码</el-button>
      </div>
      <el-button class="loginBtn tc">登录/注册</el-button>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
        data () {
            return {}
        },
        methods: {
            getCode(){

            },
        }
    }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
