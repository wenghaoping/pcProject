<template>
  <div id="codeLogin">
    <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
    <input class="code" @keyup.enter="login" type="password" v-model="password" placeholder="请输入密码">
    <div class="clearfix">
      <el-button class="fr" type="text" @click="forgetPassword" style="color: #40587a">忘记密码?</el-button>
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
        if (!this.$tool.checkPhoneNubmer(this.telephone)) {
          this.$tool.error('请正确填写手机号码')
        } else if (this.$tool.getNull(this.password)) {
          this.$tool.error('请正确填写密码')
        } else {
          this.$http.post(this.URL.loginForPassword,{
            user_mobile:this.telephone,
            user_passwd:this.password,
          }).then(res=>{
            if(res.data.status_code===2000000){
              //将user_id存入sessionStorge并跳转
              localStorage.user_id=res.data.user_id;
              localStorage.user_real_name=res.data.user_real_name;
              this.$store.state.logining.user_id=res.data.user_id;
              this.$store.state.logining.user_real_name=res.data.user_real_name;
              localStorage.token=res.data.token;
              //重新获取个人标签(因为获取个人标签必须要有user_id)
              this.$global.func.getWxProjectCategory();
              this.$router.push({name:localStorage.entrance})
            }else{
                this.$tool.error(res.data.error_msg)
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/login.less";
  ::-moz-placeholder { color: #99a9bf; }
  ::-webkit-input-placeholder { color:#99a9bf; }
  :-ms-input-placeholder { color:#99a9bf;}
</style>
