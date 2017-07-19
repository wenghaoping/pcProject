<template>
  <div id="index">
    <div class="banner">
      <el-button style="z-index:99;" class="showQr" type="primary" @click="showS">体验小程序</el-button>
      <el-button style="z-index:99;" type="primary" @click="createProject">创建项目</el-button>
      <div class="qrShow" v-show="showQr">
        <img src="../../assets/images/weixin.jpg"/>
      </div>
    </div>
    <h1 style="background: white">如果你是</h1>
    <div style="background: white;">
      <div class="content flex content0 tc" >
        <div class="indentityPic">
          <img src='../../assets/images/maifangFA.png'/>
          <div>卖方FA</div>
          <div>项目精准推荐</div>
          <div>微天使一手案源</div>
          <div>大数据一键尽调</div>
        </div>
        <div class="indentityPic">
          <img src='../../assets/images/maifangFA.png'/>
          <div>买方FA</div>
          <div>推荐精准匹配投资人</div>
          <div>项目一键推送</div>
          <div>微天使一手案源</div>
          <div>大数据一键尽调</div>
        </div>
        <div class="indentityPic">
          <img src='../../assets/images/touzifang.png'/>
          <div>投资方</div>
          <div>FA精选项目</div>
          <div>项目管理</div>
          <div>大数据一键尽调</div>
        </div>
        <div class="indentityPic">
          <img src='../../assets/images/chuangyezhe.png'/>
          <div>创业者</div>
          <div>融资加速</div>
          <div>优质FA组团服务</div>
        </div>
      </div>
    </div>
    <h1>我们能提供</h1>
    <div class="content flex content1" style="height: 481px;">
      <div class="fullPageText fullPageText1">
        <div>投资业务工作场景--团队/个人工作</div>
        <div>项目、人脉数据永久留存,人员流动带不走</div>
        <div>新签署的项目有哪些机构可能感兴趣</div>
        <div>哪些项目最近签署了FA协议?哪些投资机构进入了DD阶段?</div>
        <div>进入工作站,一目了然</div>
      </div>
      <div class="fullPagePic fullPagePic1">
        <img src='../../assets/images/index1.png'/>
      </div>
    </div>
    <div class="content flex content2">
      <div class="fullPagePic fullPagePic2">
        <img src='../../assets/images/index2.png'/>
      </div>
      <div class="fullPageText fullPageText2">
        <div>精准匹配投资场景--买家图谱</div>
        <div>新签约的FA项目,有哪些投资机构在关注</div>
        <div>全网2000+投资人根据投资领域、阶段、地域自动地计算匹配度</div>
        <div>交易机会一目了然,一键触达</div>
      </div>
    </div>
    <div class="content flex content3">
      <div class="fullPageText fullPageText3">
        <div>尽职调查、项目跟踪场景--一键尽调</div>
        <div>从VC投资角度,整合全网数据</div>
        <div>工商、产品、团队、舆情、融资历史</div>
        <div>等多维度一键即得，辅助项目判断</div>
      </div>
      <div class="fullPagePic fullPagePic3">
        <img src='../../assets/images/index3.png'/>
      </div>
    </div>
    <div style="height: 300px;background:#f9fafc"></div>
    <div class="qrCode">
      <img src='../../assets/images/indexQr.png'/>
    </div>
    <div class="qrCode-large tc">
      <img src="../../assets/images/index-qr.png">
      <div class="add2">添加FA哥微信了解更多</div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    name: 'hello',
    data () {
      return {
        msg: '',
        // 控制二维码显示
        showQr:false,
        /*identityPic: [
          {
            url: '/static/images/maifangFA.png',
            text1: "卖方FA",
            text2: "项目精准推荐",
            text3:"微天使一手案源",
            text4:"大数据一键尽调",
          },
          {
            url:"/static/images/maifangFA.png",
            text1:"买方FA",
            text2:"推荐精准匹配投资人",
            text3:"项目一键推送",
            text4:"微天使一手案源",
            text5:"大数据一键尽调",
          },
          {
            url:"/static/images/touzifang.png",
            text1:"投资方",
            text2:"FA精选项目",
            text3:"项目管理",
            text4:"大数据一键尽调",
          },
          {
            url:"/static/images/chuangyezhe.png",
            text1:"创业者",
            text2:"融资加速",
            text3:"优质FA组团服务",
          }
        ],*/
      }
    },
    methods: {
      // 创建项目
      createProject(){
        localStorage.entrance='creatproject'
        console.log(localStorage.user_id)
        if(localStorage.user_id){
          this.$router.push({name:'creatproject'})
        }else{
          this.$router.push({name:'telephoneLogin'})
        }
      },
      // 清除浏览器内存
      clearSomething(){
        console.log('清除localStorage部分key值完毕')
        localStorage.removeItem('user_id');
        localStorage.removeItem('id');
        localStorage.removeItem('user_real_name');
        localStorage.removeItem('entrance');
      },
      // 鼠标到体验小程序上悬浮触发二维码显示
      showS(){
        this.showQr = !this.showQr
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/css/index.less';
</style>
