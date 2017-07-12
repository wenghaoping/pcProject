<template>
    <div id="bindTelephone">
      <div id="forgetPassword">
        <div class="title tc">微天使,帮您成交的项目管理工具</div>
        <div class="loginBox">
          <div class="loginBox-title">
            绑定手机
          </div>
          <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
          <div class="codeFrame">
            <input class="code" v-model="captcha" placeholder="请输入验证码">
            <el-button type="text" @click="getCode" v-show="is_getCode==0">获取验证码</el-button>
            <el-button type="text" v-show="is_getCode!=0" :disabled="true">{{captchaNum}}后重新获取</el-button>
          </div>
          <el-button class="loginBtn tc" @click="certain">确定</el-button>
        </div>
      </div>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
        data () {
            return {
              telephone:'',
              captcha:'',
              // 是否点击过获取验证码标识
              is_getCode: 0,
              // 获取验证码的倒计时
              captchaNum: 60
            }
        },
        methods: {
          // 获取验证码
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
          // 设定手机号码
          certain(){
            if (this.telephone && this.captcha) {
              this.$http.post(this.URL.bindTelephone, {
                user_mobile: this.telephone,
                captcha: this.captcha
              }).then(res => {
                console.log(res)
                if(res.data.status_code===2000000){
                    this.$router.push({name:sessionStorage.entrance})
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
</style>
