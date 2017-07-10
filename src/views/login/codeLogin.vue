<template>
  <div id="codeLogin">
    <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
    <input class="code" v-model="password" placeholder="请输入密码">
    <div class="clearfix">
      <el-button class="fr" type="text" @click="forgetPassword">忘记密码?</el-button>
    </div>
    <el-button class="loginBtn tc" @click="login">登录</el-button>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        telephone: '',
        password: '',
      }
    },
    methods: {
      // 忘记密码
      forgetPassword(){
        this.$router.push('/forgetPassword')
      },
      // 登录
      login(){
        if (!this.telephone) {
          this.$notify.error({
            title: '错误',
            message: '请填写手机号码',
            offset: 400,
            duration: 1000
          });
        } else if (!this.password) {
          this.$notify.error({
            title: '错误',
            message: '请填写手机号码',
            offset: 400,
            duration: 1000
          });
        } else {

        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
