<template>
  <div id="index">
    <div class="banner">
      <el-button type="primary">体验小程序</el-button>
      <el-button type="primary">创建项目</el-button>
    </div>
    <h1>如果你是</h1>
    <div class="identityPic flex tc">
      <div v-for="item in identityPic">
        <img src=""/>
        <div>买方FA</div>
        <div>投资需求对接/项目协作管理</div>
      </div>
    </div>
    <h1>我们能提供</h1>
    <div class="content">
      <div class="fullPageText">
        <div>投资业务工作场景--团队/个人工作</div>
        <div>尽职调查是我们产品非常核心的功能,通过我们大数据运算能够在短时间之内就能一键做出调查</div>
      </div>
      <div class="fullPagePic">
        <img src=''/>
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
