<template>
  <div id="samllRoutine" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="titleTo">

    </div>
      <div class="scan">
        <p class="title">微天使，帮您成交的项目管理工具</p>
        <p class="samll">扫一扫，快速创建融资项目</p>
        <div class="img" v-html="qr" v-if="checkout" v-loading.body="loadIn">
          {{qr}}
        </div>
        <div class="img" v-if="!checkout">
          <br>
          <br>
          <el-button @click="reload" size="large" style="display: block;margin: 0 auto">超时,点击刷新页面</el-button>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      input: '',
      loading:false,
      timeout: null,
      num:0,
      qr:"",
      close:false,
      checkout:false,
      loadIn:false
    }
  },
  methods: {
    reload(){
      window.location.reload();
    },

    change(){
      this.config.value=this.input
    },
    getUserId(){
      this.num++;
      if(parseInt(this.num)>45) {
        clearInterval(this.timeout);
        this.dialogVisible=true;
      }
      this.$http.post(this.URL.ajaxPolling,{credential:localStorage.credential})
        .then(res=>{
//          clearInterval(this.timeout);
          let data=res.data;
          this.$tool.console(res);
          if(data.status_msg=="success"){
            clearInterval(this.timeout);
            if(data.type=="create") this.$router.push({ name: 'creatproject'});
            if(data.type=="update") this.$router.push({ name: 'editproject',query: {project_id: data.project_id}});
            localStorage.user_id=data.user_info.user_id;
            localStorage.user_real_name=data.user_info.user_real_name;
          }else if(data.status_msg=="timeout"){
            clearInterval(this.timeout);
            this.dialogVisible=true;
            this.checkout=false;
          }else if(data.status_msg=="continue") {
            this.$tool.console("等待登陆");
          }
        })
        .catch(err=>{
          this.$tool.console(err);
        })
    }//获取id

  },
  created(){

  },
  mounted(){

    this.checkout=true;
    this.loadIn=true;
    setTimeout(() => {
      this.$http.get(this.URL.returnQrCredential)
        .then(res => {
          this.$tool.console(res);
          let data=res.data;
          this.qr=data.qr;
          localStorage.credential=data.credential;
          this.loadIn=false;
        })
        .catch(err => {
          this.$tool.console(err);
          this.$tool.error("请刷新页面");
        });
      this.timeout = setInterval(() => {
        this.getUserId();
      }, 2000);
    },2000);


  }
}
</script>

<style scoped lang="less">
  svg{width: 200px;height: 200px;}
#samllRoutine{

  background: #f3f4f8;
  font-family:PingFangSC-Regular;
  padding-top: 156px;
  padding-bottom: 312px;
  .scan{
    box-shadow:0 4px 4px 0 rgba(64,88,122,0.10);
    border-radius:4px;
    width:410px;
    height:410px;
    text-align: center;
/*    margin: 156px auto 0;*/
    margin:auto;
    background: #ffffff;
    .title{
      font-size:20px;
      color:#1f2d3d;
      line-height:20px;
      padding-top: 40px;
    }
    .samll{
      font-size:13px;
      color:#5e6d82;
      line-height:13px;
      margin-top: 71px;
    }
    .img{
      width: 195px;
      height: 195px;
      display: block;
      margin: 24px auto 0;
    }
  }
  .titleTo{
    height: 60px;
    width: 90%;
    background: #40587a;
    position: absolute;
    top: 0px;
    left: 0px;
    margin-left: 136px;
  }

}
</style>
