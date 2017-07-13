<template>
  <div id="codeLogin">
    <input class="telephone" v-model="telephone" placeholder="请输入常用手机号码">
    <input class="code" type="password" v-model="password" placeholder="请输入密码">
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
        if (!this.$tool.checkPhoneNubmer(this.telephone)) {
          this.$tool.error('请正确填写手机号码')
        } else if (this.$tool.getNull(this.password)) {
          this.$tool.error('请正确填写密码')
        } else {
          this.$http.post(this.URL.loginForPassword,{
            user_mobile:this.telephone,
            user_passwd:this.password,
          }).then(res=>{
              this.$tool.console(res)
            if(res.data.status_code===2000000){
              //将user_id存入sessionStorge并跳转
              sessionStorage.user_id=res.data.user_id;
              this.$router.push({name:'index'})
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
</style>
