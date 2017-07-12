<template>
  <div id="research" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================一键尽调弹窗=============================================-->
    <el-dialog :visible="dialogVisible" custom-class="dialog" :before-close="handleClose" close-on-press-escape close-on-click-modal>
      <div class="contain-grid" style="width: 893px;">
        <div class="contain-position">
          <p>您要尽调的公司：<span>{{compname}}</span><button class="fr button" @click="goToEdit">修改公司</button></p>
        </div>
        <div class="contain-inner">
          <div class="item-lists1">
            <!--项目信息-->
            <div class="item2">
              <div class="title">项目信息</div>
              <div v-for="project1 in project" class="clearfix" style="margin-bottom: 20px;">
                <div class="portrait fl">
                  <img src="../../../assets/images/logo.png" v-if="project1.project_logo==''">
                  <img :src="project1.project_logo" v-else>
                </div>
                <div class="portrait-right fl ">
                  <div class="block clearfix">
                    <span class="block-title fl">{{project1.project_name}}</span>
                    <span class="line1 fl"> | </span>
                    <span class="block-company fl">{{project1.company_name}}</span>
                    <span class="block-tag fl" v-if="project1.project_state!=null"><el-tag type="primary" v-if="project1.project_state!=''" >{{project1.project_state}}</el-tag><!--<el-tag type="success">{{project1.project_industry}}</el-tag>--></span>
                  </div>
                  <div class="block clearfix" style="margin-bottom: 20px;">
                    <div class="doc fl">{{project1.project_introduce}}</div>
                  </div>
<!--                  <div class="block">
                    <span class="doc fl">{{project1.project_industry}}</span>
                  </div>-->
                  <div class="block clearfix" style="height: 24px">
                    <span class="mid-tag" v-for="pro in project1.project_industry" v-if="project1.project_industry!=''">{{pro}}</span>
<!--                    <span class="big-tag" style="margin-left: 191px;">-&#45;&#45;</span><span class="split">｜</span>
                    <span class="big-tag">&#45;&#45;</span><span class="split">｜</span>
                    <span class="big-tag">&#45;&#45;</span>-->
                  </div>
                </div>
                <div class="tag" style="padding-top: 100px;">
                  <span class="tag-bottom" style="margin-right: 11px;" v-if="project1.project_label!=''"><img src="../../../assets/images/tag2.png"></span>
                  <span class="tag-bottom" v-if="project1.project_label!=''">{{project1.project_label}}</span>
<!--                  <span class="tag-bottom">创业</span>
                  <span class="tag-bottom">大数据</span>
                  <span class="tag-bottom">人工智能</span>-->
                  <span class="url fr" v-if="project1.project_website!=''"><img src="../../../assets/images/tag3.png" >{{project1.project_website}}</span>
                </div>
<!--                <div class="file">
                  {{project1.project_introduce}}
                </div>-->
              </div>
             <!-- <div class="picture">
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item v-for="image in images" :key="image">
                    <img :src="image.url">
                  </el-carousel-item>
                </el-carousel>
              </div>-->

            </div>
            <!--公司信息-->
            <div class="item">
              <company-message :comp-name="compname"></company-message>
            </div>
            <!--工商信息-->
            <div class="item">
              <business style="position: relative" :comid="com_id"></business>
            </div>
            <!--核心成员-->
            <div class="item clearfix" v-if="team.length!=0">
              <div class="clearfix">
                <div class="title">核心成员</div>
                <div class="border clearfix" v-for="teamin in team">
                  <div class="portrait fl clearfix">
                    <img :src="teamin.team_member_photo" v-if="teamin.team_member_photo!=''">
                    <img src="../../../assets/images/logo.png" v-else>
                  </div>
                  <div class="portrait-right fl ">
                    <div class="block clearfix">
                      <span class="block-title fl clearfix">{{teamin.team_member_name}}</span>
                      <span class="block-company fl">{{teamin.team_member_position}}</span>
                      <!--<span class="block-tag fl"><el-tag type="primary">{{teamin.team_member_position}}</el-tag></span>-->
<!--                      <span class="bloack-right fr">股权占比：12%</span>-->
                    </div>
                    <div class="block">
                      <span class="doc fl">{{teamin.team_member_introduce}}</span>
                    </div>
                  </div>
<!--                  <div class="clearfix" style="margin-top:16px;">
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
                        <div class="v-progress-txt">
                          <span class="pro-txt-1">2011.05-2015.05</span>
                          <span class="pro-txt-2"  style="color:#5e6d82;">杭州投着乐网络科技有限公司</span>
                          <span class="pro-txt-3"  style="color:#5e6d82;">工商管理</span>
                        </div>
                        <div class="v-progress-txt">
                          <span class="pro-txt-1">2011.05-2015.05</span>
                          <span class="pro-txt-2"  style="color:#5e6d82;">微天使乐投平台</span>
                          <span class="pro-txt-3"  style="color:#5e6d82;">工商管理</span>
                        </div>
                        <div class="v-progress-txt">
                          <span class="pro-txt-1">2011.05-2015.05</span>
                          <span class="pro-txt-2"  style="color:#5e6d82;">百度</span>
                          <span class="pro-txt-3"  style="color:#5e6d82;">工商管理</span>
                        </div>
                      </div>
                    </div>
                  </div>-->
                </div>
              </div>
<!--
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
              </div>-->
            </div>
            <!--图表-->
            <div class="item">
              <downloadechart :comid="com_id" :comp-name="compname"></downloadechart>
            </div>
            <!--历史融资-->
            <div class="item" v-if="history_finance.length!=0">
              <div class="title">历史融资</div>
              <div class="lists">
                  <div class="list" v-for="history in history_finance">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                    <span class="date">{{history.history_financing_time}}</span>
                    <span class="blood">{{history.history_financing_money}}</span>
                    <span class="blood1">{{history.history_financing_rounds}}</span>
                    <span class="main">{{history.history_financing_who}}</span>
                  </div>
              </div>
            </div>
            <!--里程碑-->
            <div class="item"  v-if="milestone_list.length!=0">
              <div class="title">里程碑</div>
              <div class="lists">
                <div class="list" v-for="milestone in milestone_list">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                  <span class="date">{{milestone.milestone_time}}</span>
                  <span class="blood blood2">{{milestone.milestone_event}}</span>
                </div>
              </div>
            </div>
            <!--新闻-->
            <div class="item" v-if="news.length!=0">
              <div class="title">新闻</div>
              <div class="lists">
                <div class="list" v-for="new1 in news">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                  <span class="date">{{new1.project_news_time}}<el-tag type="primary" style="margin-left: 5px;" v-if="new1.project_news_label">{{new1.project_news_label}}</el-tag></span>
                  <span class="blood blood3">{{new1.project_news_title}}</span>
                  <span class="mian2">{{new1.source}}</span>
                </div>
              </div>
            </div>
            <!--竞品-->
            <div class="item" v-if="competing.length!=0">
              <div class="title">竞品</div>
              <ul class="ulfl h-table">
                <li class="table1">项目</li>
                <li class="table2">领域</li>
                <!--<li class="table3">投资方</li>-->
                <li class="table4">融资时间</li>
                <li class="table5">融资轮次</li>
                <li class="table6">融资金额</li>
              </ul>
              <div v-for="compet in competing">
                <ul  class="ulfl m-table">
                  <!--<li class="table1">
                    <div class="img fl">
                      <img :src="compet.competing_goods_logo">
                    </div>
                    <div class="title2 fl">
                      {{compet.competing_goods_name}}
                    </div>
                    <div class="bo fl">{{compet.competing_goods_region}}<span style="margin-left: 20px;">{{compet.competing_goods_Set_up}}</span></div>
                  </li>-->
                  <li class="table1">
                    <div class="img fl">
                      <img :src="compet.competing_goods_logo" v-if="compet.competing_goods_logo!=''">
                      <img src="../../../assets/images/logo.png" v-else>
                    </div>
                    <div class="clearfix" style="margin-left: 70px;">
                      <div class="title2">
                        {{compet.competing_goods_name}}
                      </div>
                      <div class="bo">
                        <span style="margin-left: 5px;">
                          {{compet.competing_goods_region}}
                        </span>
                        <span style="margin-left: 5px;">
                          {{compet.competing_goods_Set_up}}
                        </span>
                      </div>
                    </div>
                  </li>

                  <li class="table2" style="height: 101px;">{{compet.competing_goods_industry}}</li>
<!--                  <li class="table3">华兴资本</li>-->
                  <li class="table4" style="height: 101px;">{{compet.competing_goods_Financing_time}}</li>
                  <li class="table5" style="height: 101px;">{{compet.competing_goods_Financing_rounds}}</li>
                  <li class="table6" style="height: 101px;">{{compet.competing_goods_Financing_amount}}</li>
                </ul>
                <div class="line2"></div>
              </div>

<!--              <ul  class="ulfl m-table">
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
              <div class="line2"></div>
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
              </ul>-->
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
import companyMessage from './onkeyresearch/companyMessage.vue'
import business from './onkeyresearch/business.vue'
import downloadechart from './onkeyresearch/downloadEchart.vue'
export default {
  props: ["dialogVisible","companyId","compName"],
  data () {
    return {
      compname: "",//一键尽调公司的名称
      com_id: 0,//公司Id
      conmanyName: '3',
      productMessage: '产品信息',
      recruitMessage: '招聘信息',
      recruitData: [{
        position: 'JAVA',
        money: '20-30K',
        experience: '1-2年',
        address: "北京",
        date: '2016-05-04'
      }, {
        position: 'IOS',
        money: '1-2K',
        experience: '1年',
        address: "北京",
        date: '2016-05-04'
      }],

      /*项目信息*/
      project: [
        {
          project_id: 1,
          com_id: 4,
          company_name: "",
          project_name: "",
          project_industry: "",
          project_introduce: "",
          project_label: [],
          project_website: "",
          project_logo: "",
          project_score: ""
        }
      ],
      /*产品新闻*/
      news: [{
        project_id: "",//产品ID
        project_news_time: "",//新闻时间
        project_news_label: "",//新闻标签
        project_news_title: "",//新闻标题
        source: ""//资源链接
      }],
      /*竞品表*/
      competing: [
        {
          com_id: "",//
          project_id: "",//竞品ID
          competing_goods_name: "微天使平台",//竞品名字
          competing_goods_logo: "",//竞品LOGO
          competing_goods_industry: "医疗健康,医疗器械及硬件",//竞品行业
          competing_goods_Set_up: "2014-07",//竞品成立日期
          competing_goods_Financing_rounds: "战略投资",//竞品获投轮次
          competing_goods_region: "杭州",//竞品区域
          competing_goods_Financing_amount: "亿元及以上人民币",//竞品获投总额
          competing_goods_Financing_time: "2017-07",//竞品获投时间
          competing_goods_label: "",//竞品标签
          ranking_day: "",//行业内排名
          competing_founder: "",//竞品相似度
        }
      ],
      /*历史融资表*/
      history_finance: [
        {
          com_id: "",//公司id
          History_financing_time: "2017.05.04",//融资时间
          History_financing_rounds: "A轮",//融资轮次
          History_financing_money: "100-500万",//融资金额
          History_financing_who: "天使投资",//融资方
        }
      ],
      /*里程碑信息表*/
      milestone_list: [
        {
          project_id: "",//产品ID
          milestone_event: "获汉鼎宇佑集团和盛大亿元投资 P2P行业再掀波澜，获得1.5亿B轮融资，获得1.5亿B轮融资佑集团",//里程碑事件
          milestone_time: "2017.05.04",//里程碑时间
        }
      ],
      /*团队成员*/
      team: [
        {
          project_id: "",//产品ID
          team_member_introduce: "",//成员介绍
          team_member_photo: "",//成员头像
          team_member_name: "",//成员名字
          team_member_position: "",//成员职位
        }
      ],
      loading:false

    }
  },
  methods: {
    dialogVisibleTo() {
      this.$emit('changeall', false)
    },
    handleClose(done) {
      done();
      this.dialogVisibleTo()
    },
    goToEdit(){
//      this.$router.push({name: 'editproject', query: {}})
      this.$emit('changeall', false)
      this.$emit('changeallin', true)
    },
    loadMore(){
      this.recruitData.push({
        position: 'IOS',
        money: '1-2K',
        experience: '1年',
        address: "北京",
        date: '2016-05-04'
      }, {
        position: 'IOS',
        money: '1-2K',
        experience: '1年',
        address: "北京",
        date: '2016-05-04'
      })
    },
    getTimeMilestone(data){
    for(let i=0; i<data.length; i++){
      var newDate = new Date();
      newDate.setTime(data[i].milestone_time * 1000);
      data[i].milestone_time=newDate.toLocaleDateString();
    }
  },//里程碑时间
    getTimeFinancing(data){
      for(let i=0; i<data.length; i++){
        var newDate = new Date();
        newDate.setTime(data[i].history_financing_time * 1000);
        data[i].history_financing_time=newDate.toLocaleDateString();
      }
    },//里程碑时间
    getCrawlerTeam(){
      this.$http.post(this.URL.getCrawlerTeam, {
        user_id: sessionStorage.user_id,
        com_id: this.com_id
      })
        .then(res => {
          this.team = res.data.data;
        })
        .catch(err => {
          this.$tool.console(err);
        })
    },//获取核心成员
    getCrawlerHistoryFinance(){
      this.$http.post(this.URL.getCrawlerHistoryFinance, {
        user_id: sessionStorage.user_id,
        com_id: this.com_id
      })
        .then(res => {
          this.history_finance = res.data.data;
          this.getTimeFinancing(this.history_finance);
        })
        .catch(err => {
          this.$tool.console(err);
        })
    },//获取历史融资
    getCrawlerMilestone(){
      this.$http.post(this.URL.getCrawlerMilestone, {
        user_id: sessionStorage.user_id,
        com_id: this.com_id
      })
        .then(res => {
          this.milestone_list = res.data.data;
          this.getTimeMilestone(this.milestone_list);
        })
        .catch(err => {
          this.$tool.console(err);
        })
    },//获取里程碑
    getCrawlerNews(){
      this.$http.post(this.URL.getCrawlerNews, {
        user_id: sessionStorage.user_id,
        com_id: this.com_id
      })
        .then(res => {
          this.news = res.data.data;
        })
        .catch(err => {
          this.$tool.console(err);
        })
    },//获取新闻
    getCrawlerCompeting(){
      this.$http.post(this.URL.getCrawlerCompeting, {
        user_id: sessionStorage.user_id,
        com_id: this.com_id
      })
        .then(res => {
          this.competing = res.data.data;
        })
        .catch(err => {
          this.$tool.console(err);
        })
    },//获取竞品
    getCrawlerProject(){
      this.$http.post(this.URL.getCrawlerProject, {
        user_id: sessionStorage.user_id,
        com_id: this.com_id
      })
        .then(res => {
          this.getProjectIndustry(res.data.data);
          this.project = res.data.data;
          this.loading=false;
        })
        .catch(err => {
          this.$tool.console(err);
        })
    },//获取项目
    getProjectIndustry(data){
      for(let i=0; i<data.length; i++){
        data[i].project_industry=data[i].project_industry.split(",");
      }
    },//设置数据
  },
  computed: {},
  components: {
    companyMessage,
    business,
    downloadechart
  },
  created(){

  },

  watch : {
    companyId : function(e){
      this.loading=true;
      this.com_id=e;
      this.compname=this.compName;
      this.getCrawlerTeam();
      this.getCrawlerHistoryFinance();
      this.getCrawlerMilestone();
      this.getCrawlerNews();
      this.getCrawlerCompeting();
      this.getCrawlerProject();

    },//获取公司id
    dialogVisible:function(e){

    }

  }
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
      display: none;
    }
  }
</style>
