<template>
  <div id="index">
    <div class="banner">
      <el-button type="primary">体验小程序</el-button>
      <el-button type="primary">创建项目</el-button>
    </div>
    <h1>如果你是</h1>
    <div class="content flex tc" style="width: 1088px;height:565px;margin: 0 auto;">
      <div class="indentityPic" v-for="item in identityPic">
        <img src=""/>
        <div>买方FA</div>
        <div>投资需求对接/项目协作管理</div>
      </div>
    </div>
    <h1>我们能提供</h1>
    <div class="content flex content1">
      <div class="fullPageText fullPageText1">
        <div>投资业务工作场景--团队/个人工作</div>
        <div>尽职调查是我们产品非常核心的功能,通过我们大数据运算能够在短时间之内就能一键做出调查</div>
      </div>
      <div class="fullPagePic fullPagePic1">
        <img src=''/>
      </div>
    </div>
    <div class="content flex content2">
      <div class="fullPagePic fullPagePic2">
        <img src=''/>
      </div>
      <div class="fullPageText fullPageText2">
        <div>精准匹配投资场景--买家图谱</div>
        <div>这里最好有几句方案的介绍,这里最好有几句方案的介绍,这里最好有几句方案的介绍,这里最好有几句方案的介绍</div>
      </div>
    </div>
    <div class="content flex content3">
      <div class="fullPageText fullPageText3">
        <div>尽职调查、项目跟踪场景--一键尽调</div>
        <div>尽职调查是我们产品非常核心的功能,通过我们大数据运算能够在短时间之内就能一键做出调查</div>
      </div>
      <div class="fullPagePic fullPagePic3">
        <img src=''/>
      </div>
    </div>
    <div class="content flex content4">
      <div class="fullPagePic fullPagePic4">
        <img src=''/>
      </div>
      <div class="fullPageText fullPageText4">
        <div>竞品分析、融资监测场景--融资雷达</div>
        <div>这里最好有几句方案的介绍,这里最好有几句方案的介绍,这里最好有几句方案的介绍,这里最好有几句方案的介绍</div>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    name: 'hello',
    data () {
      return {
        msg: '',
        identityPic: [{
            url: '',
            text1: "买方FA",
            text2: "投资需求对接/项目协作管理"
          }, {
            url:"",
            text1:"卖方FA",
            text2:"融资需求对接/项目协作管理"
          }, {
            url:"",
            text1:"投资方",
            text2:"FA精选项目/项目进度管理"
          }, {
            url:"",
            text1:"创业者",
            text2:"融资需求加速/云FA服务"
          }
        ]
      }
    },
    methods: {
      fullPage(anchorLink, index){
        if(index==1){

        }else if(index==2){

        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/css/index.less';
</style>
