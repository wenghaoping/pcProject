<template>
  <div id="research">
    <!--===========================================一键尽调弹窗=============================================-->
    <el-dialog :visible="dialogVisible" custom-class="dialog" :before-close="handleClose" close-on-press-escape close-on-click-modal >
      <div class="contain-grid">
        <div class="contain-position">
          <p>您要尽调的公司：<span>杭州投着乐网络科技有限公司</span><el-button type="primary" class="fr button" @click="goToEdit">修改公司</el-button></p>
        </div>
        <div class="contain-inner">
          <div class="item-lists">
            <!--项目信息-->
            <div class="item2">
              <div class="title">项目信息</div>
              <div class="portrait fl"><img src="../../../assets/images/researchheader.png"></div>
              <div class="portrait-right fl ">
                <div class="block">
                  <span class="block-title fl">微天使乐投平台</span>
                  <span class="line fl"> | </span>
                  <span class="block-company fl">杭州投着乐网络科技有限公司</span>
                  <span class="block-tag fl"><el-tag type="primary">以上线</el-tag><el-tag type="success">初创</el-tag></span>
                </div>
                <div class="block">
                  <span class="doc fl">这里是这个项目的一句话介绍，字数在40字以内，要全部显示这里是这个项目的一句话介。</span>
                </div>
                <div class="block">
                  <span class="mid-tag">教育培训</span>
                  <span class="mid-tag">社交通讯</span>
                  <span class="mid-tag">大数据</span>
                  <span class="mid-tag">sass</span>
                  <span class="big-tag" style="margin-left: 191px;">100-300万</span><span class="split">｜</span>
                  <span class="big-tag">杭州</span><span class="split">｜</span>
                  <span class="big-tag">天使轮</span>
                </div>
              </div>
              <div class="tag clearfix">
                <span class="tag-bottom" style="margin-right: 11px;"><img src="../../../assets/images/tag2.png"></span>
                <span class="tag-bottom">融资</span>
                <span class="tag-bottom">创业</span>
                <span class="tag-bottom">大数据</span>
                <span class="tag-bottom">人工智能</span>
                <span class="url"><img src="../../../assets/images/tag3.png">www.weitianshi.cn</span>
              </div>
              <div class="linewidth"></div>
              <div class="file">
                这里是项目的详情，重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。
              </div>
              <div class="picture">
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item v-for="image in images" :key="image">
                    <img :src="image.url">
                  </el-carousel-item>
                </el-carousel>
              </div>

            </div>
            <!--公司信息-->
            <div class="item">
              <company-message></company-message>
            </div>
            <!--工商信息-->
            <div class="item">
              <business style="position: relative"></business>
            </div>
            <!--核心成员-->
            <div class="item clearfix">
              <div class="clearfix">
                <div class="title">核心成员</div>
                <div class="border">
                  <div class="portrait fl clearfix"><img src="../../../assets/images/header3.png"></div>
                  <div class="portrait-right fl ">
                    <div class="block">
                      <span class="block-title fl clearfix">顾嘉</span>
                      <span class="block-company fl">CEO</span>
                      <span class="block-tag fl"><el-tag type="primary">创业者</el-tag></span>
                      <span class="bloack-right fr">股权占比：12%</span>
                    </div>
                    <div class="block">
                      <span class="doc fl">13年开发经验，这里是一段话，这里是一段他的个人绍，字数可能会有点多，多到一样显示不下13年开发经验，这里是一段话，这里是一段他的个人绍，字数可能会有点多，多到一样显示不下</span>
                    </div>
                  </div>
                  <div class="clearfix" style="margin-top:16px;">
                    <div style="margin-top:6px;" class="clearfix">
                      <div class="v-progress" style="height: 182px;">
                        <span class="circle circle-s">&nbsp;</span>

                        <span class="v-line v-line-1">&nbsp;</span>
                        <span class="circle circle-c">&nbsp;</span>
                        <span class="v-line v-line-2">&nbsp;</span>

                        <span class="circle circle-e">&nbsp;</span>
                      </div>
                      <div class="v-progress-table" style="height: 182px;position: relative">
                        <div class="v-progress-txt">
                          <span class="pro-txt-1">2011.05-至今</span>
                          <span class="pro-txt-2"  style="color:#5e6d82;">杭州城市大学</span>
                          <span class="pro-txt-3"  style="color:#5e6d82;">工商管理</span>
                        </div>
                        <div class="line"></div>
                        <div class="v-progress-txt">
                          <span class="pro-txt-1">2011.05-2015.05</span>
                          <span class="pro-txt-2"  style="color:#5e6d82;">杭州投着乐网络科技有限公司</span>
                          <span class="pro-txt-3"  style="color:#5e6d82;">工商管理</span>
                        </div>
                        <div class="line"></div>
                        <div class="v-progress-txt">
                          <span class="pro-txt-1">2011.05-2015.05</span>
                          <span class="pro-txt-2"  style="color:#5e6d82;">微天使乐投平台</span>
                          <span class="pro-txt-3"  style="color:#5e6d82;">工商管理</span>
                        </div>
                        <div class="line"></div>
                        <div class="v-progress-txt">
                          <span class="pro-txt-1">2011.05-2015.05</span>
                          <span class="pro-txt-2"  style="color:#5e6d82;">百度</span>
                          <span class="pro-txt-3"  style="color:#5e6d82;">工商管理</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div class="border clearfix">
                <div class="portrait fl clearfix"><img src="../../../assets/images/header3.png"></div>
                <div class="portrait-right fl ">
                  <div class="block">
                    <span class="block-title fl clearfix">顾嘉</span>
                    <span class="block-company fl">CEO</span>
                    <span class="block-tag fl"><el-tag type="primary">创业者</el-tag></span>
                    <span class="bloack-right fr">股权占比：12%</span>
                  </div>
                  <div class="block">
                    <span class="doc fl">13年开发经验，这里是一段话，这里是一段他的个人绍，字数可能会有点多，多到一样显示不下13年开发经验，这里是一段话，这里是一段他的个人绍，字数可能会有点多，多到一样显示不下</span>
                  </div>
                </div>
              </div>

            </div>
            <!--图表-->
            <div class="item">
              <downloadechart></downloadechart>
            </div>
            <!--历史融资-->
            <div class="item">
              <div class="title">历史融资</div>
              <div class="lists">
                  <div class="list">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                    <span class="date">2017.05.04</span>
                    <span class="blood">100-500万</span>
                    <span class="blood">A轮</span>
                    <span class="main">天使投资</span>
                  </div>
                <div class="list">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                  <span class="date">2017.05.04</span>
                  <span class="blood">100-500万</span>
                  <span class="blood">A轮</span>
                  <span class="main">天使投资</span>
                </div>
              </div>
            </div>
            <!--里程碑-->
            <div class="item">
              <div class="title">里程碑</div>
              <div class="lists">
                <div class="list">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                  <span class="date">2017.05.04</span>
                  <span class="blood blood2">获汉鼎宇佑集团和盛大亿元投资 P2P行业再掀波澜，获得1.5亿B轮融资，获得1.5亿B轮
融资佑集团</span>
                </div>
                <div class="list">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                  <span class="date">2017.05.04</span>
                  <span class="blood blood2">App的下载量冲破1000万</span>
                </div>
              </div>
            </div>
            <!--新闻-->
            <div class="item">
              <div class="title">新闻</div>
              <div class="lists">
                <div class="list">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                  <span class="date">2017.05.04<el-tag type="primary" style="margin-left: 5px;">产品</el-tag></span>
                  <span class="blood blood3">滴滴首推五星级出行服务 「豪华车」 入口在京开放预约</span>
                  <span class="main mian2">view.inews.qq.com</span>
                </div>
                <div class="list">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                  <span class="date">2017.05.04</span>
                  <span class="blood blood3">滴滴出行资深副总裁陶然因个人原因离职</span>
                  <span class="main mian2">view.inews.qq.com</span>
                </div>
              </div>
            </div>
            <!--竞品-->
            <div class="item">
              <div class="title">竞品</div>
              <ul class="ulfl h-table">
                <li class="table1">项目</li>
                <li class="table2">领域</li>
                <li class="table3">投资方</li>
                <li class="table4">融资事件</li>
                <li class="table5">融资轮次</li>
                <li class="table6">融资金额</li>
              </ul>
              <ul  class="ulfl m-table">
                <li class="table1">
                  <div class="img fl">
                    <img src="../../../assets/images/message.png">
                  </div>
                  <div class="title2 fl">
                    微天使乐投平台
                  </div>
                  <div class="bo fl">杭州<span style="margin-left: 20px;">2014-07</span></div>
                </li>
                <li class="table2">医疗健康,医疗器械及硬件</li>
                <li class="table3">华兴资本</li>
                <li class="table4">2017-07</li>
                <li class="table5">战略投资</li>
                <li class="table6">亿元及以上人民币</li>
              </ul>
              <ul  class="ulfl m-table">
                <li class="table1">
                  <div class="img fl">
                    <img src="../../../assets/images/message.png">
                  </div>
                  <div class="title2 fl">
                    微天使乐投平台
                  </div>
                  <div class="bo fl">杭州<span style="margin-left: 20px;">2014-07</span></div>
                </li>
                <li class="table2">医疗健康,医疗器械及硬件</li>
                <li class="table3">华兴资本</li>
                <li class="table4">2017-07</li>
                <li class="table5">战略投资</li>
                <li class="table6">亿元及以上人民币</li>
              </ul>
              <ul  class="ulfl m-table">
                <li class="table1">
                  <div class="img fl">
                    <img src="../../../assets/images/message.png">
                  </div>
                  <div class="title2 fl">
                    微天使乐投平台
                  </div>
                  <div class="bo fl">杭州<span style="margin-left: 20px;">2014-07</span></div>
                </li>
                <li class="table2">医疗健康,医疗器械及硬件</li>
                <li class="table3">华兴资本</li>
                <li class="table4">2017-07</li>
                <li class="table5">战略投资</li>
                <li class="table6">亿元及以上人民币</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <!--<div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTo">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleTo">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import companyMessage from './companyMessage.vue'
import business from './business.vue'
import downloadechart from './downloadEchart.vue'
export default {
  props: ["dialogVisible"],
  data () {
    return {
      conmanyName: '3',
      productMessage:'产品信息(3)',
      recruitMessage:'招聘信息(29)',
      recruitData: [{
        position: 'JAVA',
        money: '20-30K',
        experience: '1-2年',
        address:"北京",
        date:'2016-05-04'
      }, {
        position: 'IOS',
        money: '1-2K',
        experience: '1年',
        address:"北京",
        date:'2016-05-04'
      }],
      images:[
          {url:"../../../../static/lanren_01.jpg"},
          {url:"../../../../static/lanren_02.jpg"},
          {url:"../../../../static/lanren_03.jpg"},
          {url:"../../../../static/lanren_04.jpg"},
          {url:"../../../../static/lanren_05.jpg"}
          ]

    }
  },
  methods: {
    dialogVisibleTo() {
      this.$emit('changeall',false)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.dialogVisibleTo()
        })
        .catch(_ => {});
    },
    goToEdit(){
      this.$router.push({ name: 'editproject', query: {}})
    },
    loadMore(){
     this.recruitData.push({
       position: 'IOS',
       money: '1-2K',
       experience: '1年',
       address:"北京",
       date:'2016-05-04'
     },{
       position: 'IOS',
       money: '1-2K',
       experience: '1年',
       address:"北京",
       date:'2016-05-04'
     },{
       position: 'IOS',
       money: '1-2K',
       experience: '1年',
       address:"北京",
       date:'2016-05-04'
     })
    }
  },
  computed: {

  },
  components: {
    companyMessage,
    business,
    downloadechart
  },
}
</script>

<style lang="less">
  @import '../../../assets/css/onekeyresearch';
  .el-carousel__item img {
    width: 100%;
  }
  #research{


    .el-tabs__item{
      font-size:18px;
      color:#8492a6;
      line-height:20px;
    }
    .el-tabs__item.is-active{
      color:#1f2d3d;
    }
    .el-tabs__header{
      border:none;
    }
    .el-tabs__active-bar{
      background-color:#ffffff;
    }
  }
</style>
