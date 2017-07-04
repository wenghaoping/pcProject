<template>
    <div id="codeLogin">
        <input class="telephone" placeholder="请输入常用手机号码">
        <input class="code" placeholder="请输入密码">
        <div class="clearfix">
          <el-button class="fr" type="text" @click="forgetPassword">忘记密码?</el-button>
        </div>
        <el-button class="loginBtn tc">登录</el-button>
      </div>
</template>


<script type="text/ecmascript-6">
    export default {
        data () {
            return {}
        },
        methods: {
            forgetPassword(){
              this.$router.push('/forgetPassword')
            },
        }
    }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
