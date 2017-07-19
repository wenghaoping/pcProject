<template>
  <div id="telephoneLogin">
    <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
    <div class="codeFrame">
      <input class="code" v-model="captcha" placeholder="请输入验证码">
      <el-button type="text" @click="getCode" v-show="is_getCode==0">获取验证码</el-button>
      <el-button type="text" v-show="is_getCode!=0" :disabled="true">{{captchaNum}}s</el-button>
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
        // 是否点击过获取验证码标识
        is_getCode: 0,
        // 获取验证码的倒计时
        captchaNum: 60
        //
      }
    },
    methods: {
//    获取验证码
      getCode(){
        if (!this.$tool.checkPhoneNubmer(this.telephone)) {
          this.$tool.error('请正确输入手机号码')
        } else {
          this.$http.post(this.URL.authCaptcha, {
            user_mobile: this.telephone
          }).then(res => {

            if (res.data.status_code === 2000000) {
              this.is_getCode = 1;
              var timer = setInterval(() => {
                this.captchaNum--
              }, 1000)
              setTimeout(() => {
                clearInterval(timer);
                this.captchaNum = 60;
                this.is_getCode = 0;
              }, 60000)
              this.$tool.console('验证码发送成功')
            } else {
              this.$tool.error(res.data.error_msg)
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
            if(res.data.status_code===2000000){
              localStorage.user_id=res.data.user_id;
              localStorage.user_real_name=res.data.user_real_name;
              //is_exist: 0:新用户;1:老用户;NaN:没有请求过验证码
              if (res.data.is_exist === 0) {
                this.$router.push({name:'identityChoose'})
              }else if (res.data.is_exist === 1) {
                this.$router.push({name:localStorage.entrance})
              }
            }else{
              this.$tool.error(res.data.error_msg)
            }
          })
        } else {
          this.$tool.error('请正确填写手机号码和验证码')
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
  ::-moz-placeholder { color: #99a9bf; }
  ::-webkit-input-placeholder { color:#99a9bf; }
  :-ms-input-placeholder { color:#99a9bf;}
</style>
