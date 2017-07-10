<template>
  <div id="telephoneLogin">
    <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
    <div class="codeFrame">
      <input class="code" v-model="captcha" placeholder="请输入验证码">
      <el-button type="text" @click="getCode" v-show="is_getCode==0">获取验证码</el-button>
      <el-button type="text" v-show="is_getCode!=0" :disabled="true">{{captchaNum}}后重新获取</el-button>
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
//      是否点击过获取验证码标识
        is_getCode: 0,
//      获取验证码的倒计时
        captchaNum: 60
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
            offset: 400,
            duration: 1000
          });
        } else {
          this.$http.post(this.URL.authCaptcha, {
            user_mobile: this.telephone
          }).then(res => {
            if (res.data.status_code == 2000000) {
              this.is_getCode = 1;
              var timer = setInterval(() => {
                this.captchaNum--
              }, 1000)
              setTimeout(() => {
                clearInterval(timer);
                this.captchaNum = 60;
                this.is_getCode = 0;
              }, 60000)
              console.log('验证码发送成功')
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.error_msg,
                offset: 400,
                duration: 1000
              });
            }
          })
        }
      },
//    注册或者登录
      login(){
        if (this.telephone && this.captcha) {
          this.$http.post(this.URL.loginForCaptcha, {
            user_mobile: this.telephone,
            captcha: this.captcha
          }).then(res => {
            console.log(res)
            //is_exist: 0:新用户;1:老用户;NaN:没有请求过验证码
            if (this.is_exist == 0) {
              //this.$http.post(this.URL.)
            } else if (this.is_exist == 1) {

            } else {
              this.$notify.error({
                title: '错误',
                message: '',
                offset: 400,
                duration: 1000
              });
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '请填写完整手机号码和验证码',
            offset: 400,
            duration: 1000
          });
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
