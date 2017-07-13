<template>
  <div id="index">
    <div class="banner">
      <el-button class="showQr" type="primary">体验小程序</el-button>
      <el-button type="primary" @click="createProject">创建项目</el-button>
      <div class="qrShow">
        <img src="../../assets/images/index-qr.png"/>
      </div>
    </div>
    <h1>如果你是</h1>
    <div class="content flex tc" style="width: 1088px;height:565px;margin: 0 auto;">
      <div class="indentityPic" v-for="item in identityPic">
        <img :src='item.url' />
        <div v-if="item.text1">{{item.text1}}</div>
        <div v-if="item.text2">{{item.text2}}</div>
        <div v-if="item.text3">{{item.text3}}</div>
        <div v-if="item.text4">{{item.text4}}</div>
        <div v-if="item.text5">{{item.text5}}</div>
      </div>
    </div>
    <h1>我们能提供</h1>
    <div class="content flex content1">
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
    <!--<div class="content flex content4">
      <div class="fullPagePic fullPagePic4">
        <img src='../../assets/images/index2.png'/>
      </div>
      <div class="fullPageText fullPageText4">
        <div>竞品分析、融资监测场景&#45;&#45;融资雷达</div>
        <div>这里最好有几句方案的介绍,这里最好有几句方案的介绍,这里最好有几句方案的介绍,这里最好有几句方案的介绍</div>
      </div>
    </div>-->
    <div class="qrCode">
      <img src='../../assets/images/indexQr.png'/>
    </div>>
    <div class="qrCode-large">
      <img src="../../assets/images/index-qr.png">
      添加FA哥微信了解更多
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    name: 'hello',
    data () {
      return {
        msg: '',
        identityPic: [
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
        ],
      }
    },
    methods: {
      // 创建项目
      createProject(){
        sessionStorage.entrance='creatproject'
        console.log(sessionStorage.user_id)
        if(sessionStorage.user_id){
          this.$router.push({name:'creatproject'})
        }else{
          this.$router.push({name:'telephoneLogin'})
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/css/index.less';
</style>
