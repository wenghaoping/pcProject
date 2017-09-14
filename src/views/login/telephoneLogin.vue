<template>
  <div id="telephoneLogin" v-loading="loading"
       element-loading-text="正在登陆中">
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
        captchaNum: 60,
        loading:false
        //
      }
    },
    methods: {
//    获取验证码
      getCode(){
        if (!this.$tool.checkPhoneNumber(this.telephone)) {
          this.$tool.error('请正确输入手机号码')
        } else {
          this.loading=true;
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
            this.loading=false;
          })
        }
      },
//    注册或者登录
      login(){
        if (this.telephone && this.captcha) {
          this.loading=true;
          this.$http.post(this.URL.loginForCaptcha, {
            user_mobile: this.telephone,
            captcha: this.captcha
          }).then(res => {
            if(res.data.status_code===2000000){
              localStorage.user_id=res.data.user_id;
              localStorage.user_real_name=res.data.user_real_name;
              localStorage.user_brand=res.data.user_brand;
              localStorage.user_company_career=res.data.user_company_career;
              localStorage.user_company_name=res.data.user_company_name;
              this.$store.state.logining.user_id=res.data.user_id;
              this.$store.state.logining.user_real_name=res.data.user_real_name;
              this.$store.state.logining.user_brand=res.data.user_brand;
              this.$store.state.logining.user_company_career=res.data.user_company_career;
              this.$store.state.logining.user_company_name=res.data.user_company_name;
              localStorage.token=res.data.token;
              //重新获取个人标签(因为获取个人标签必须要有user_id)
              this.$global.func.getWxProjectCategory();
              //is_exist: 0:新用户;1:老用户;NaN:没有请求过验证码
              this.loading=false;
              if (res.data.is_exist === 0) {
                this.$router.push({name:'identityChoose'})
              }else if (res.data.is_exist === 1) {
                if(localStorage.entrance==undefined){
                  this.$router.push({name:'myProject'});
                }else{
                  this.$router.push({name:localStorage.entrance})
                }
              }
              // 邮件加入项目库登陆判断
              if(localStorage.projectId && (localStorage.flog=='mail')){
                this.$http.post(this.URL.importProject,{user_id: localStorage.userId, project_id:localStorage.projectId})
                  .then(res=>{
                    if(res.data.status_code==2000000) {
                      this.$tool.success("项目导入成功");
                      setTimeout(()=>{ this.$router.push('/workBench/'); window.location.reload();},50)
                    }
                  })
                  .catch(err=>{
                    this.$tool.error("项目导入失败");
                    setTimeout(()=>{  this.$router.push('/workBench/');window.location.reload();},50)

                  })
              }else{
                this.$router.push({name:'myProject'});
              }
            }else{
              this.$tool.error(res.data.error_msg);
              this.loading=false;
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
