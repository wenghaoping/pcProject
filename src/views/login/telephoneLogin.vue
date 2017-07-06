<template>
    <div id="telephoneLogin">
        <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
      <div class="codeFrame">
        <input class="code" v-model="captcha" placeholder="请输入验证码">
        <el-button type="text" @click="getCode">获取验证码</el-button>
      </div>
      <el-button class="loginBtn tc">登录/注册</el-button>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
        data () {
            return {
              telephone:'',
              captcha:''
            }
        },
        methods: {
            getCode(){
              this.$http.post(this.URL.authCaptcha,{
                user_mobile:this.telephone
              }).then(res=>{
                  console.log(res)
              })
            },
        }
    }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
</style>
