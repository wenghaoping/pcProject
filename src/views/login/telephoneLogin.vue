<template>
  <div id="telephoneLogin">
    <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
    <div class="codeFrame">
      <input class="code" v-model="captcha" placeholder="请输入验证码">
      <el-button type="text" @click="getCode">获取验证码</el-button>
    </div>
    <el-button class="loginBtn tc" @click="login">登录/注册</el-button>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        telephone: '',
        captcha: '',
        is_exist:NaN,
      }
    },
    methods: {
//    获取验证码
      getCode(){
        var myreg = /^(1+\d{10})|(159+\d{8})|(153+\d{8})$/;
        if (!myreg.test(this.telephone)) {
          this.$notify.error({
            title: '错误',
            message: '请输入有效的手机号码',
            offset:400,
            duration:1000
          });
        } else {
          this.$http.post(this.URL.authCaptcha, {
            user_mobile: this.telephone
          }).then(res => {
            console.log('验证码发送成功')
          })
        }
      },
//    注册或者登录
      login(){
//         is_exist: 0:新用户;1:老用户;NaN:没有请求过验证码
          if(this.is_exist==0){
//            this.$http.post(this.URL.)
          }else if(this.is_exist==1){

          }else{

          }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
