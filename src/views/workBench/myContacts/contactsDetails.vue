<template>
  <div id="contactsDetails" class="clearfix"  v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="contain-grid contain-center fl">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box clearfix">
        <div class="item-lists clearfix">
          <div class="item-list item-lists-top clearfix">
            <div class="item">
              <div class="name fl">{{contacts.card_name}}</div>
              <div class="career fl">{{contacts.card_company_career}}</div>
            </div>
            <div class="item" style="margin-bottom: 55px;">
              <div class="title">{{contacts.card_nickname}}</div>
            </div>
            <div class="header fr">
              <img src="../../../assets/images/header.png">
            </div>
            <div class="item com"><img src="../../../assets/images/company.png">{{contacts.card_company_name}} | {{contacts.card_brand}}</div>
            <div class="item com"><img src="../../../assets/images/phone.png">{{contacts.card_mobile}}</div>
            <div class="item com" style="width: 780px;">
              <img src="../../../assets/images/email.png">{{contacts.card_email}}
              <div class="fr">
                来源: 灰狼
              </div>
            </div>

          </div>
          <div class="item-list item-list-main">
            <!--个人标签-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/tag.png">个人标签</span>
                <span class="edit fr"><img class="img" src="../../../assets/images/editTo.png">修改</span>
              </div>
              <div class="block">
                <div class="tag ">90后创业者</div>
                <div class="tag ">90后创业者</div>
              </div>
            </div>
            <!--项目库-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/projectColl.png">项目库</span>
              </div>
              <el-collapse-transition>
                <div v-show="listShow">
                  <div class="ul_lists clearfix" >
                    <div class="list">
                      <div class="li title">微天使乐投平台</div>
                      <div class="img"><img src="../../../assets/images/dujia.png"></div>
                      <!--<div class="img"><img src="../../../assets/images/feidujia.png"></div>-->
                      <div class="li">
                        <span class="tags">教育培训</span>
                        <span class="tags">教育培训</span>
                        <span class="tags">教育培训</span>
                        <span class="tags">教育培训</span>
                      </div>
                      <div class="li" style="margin-top: 16px;">
                        <span class="big-tag">100-300万</span><span class="split">｜</span>
                        <span class="big-tag">10%</span><span class="split">｜</span>
                        <span class="big-tag">天使轮</span><span class="split">｜</span>
                        <span class="big-tag">杭州</span>
                      </div>
                    </div>
                    <div class="list">
                      <div class="li title">微天使乐投平台</div>
                      <div class="img"><img src="../../../assets/images/feidujia.png"></div>
                      <div class="li">
                        <span class="tags">教育培训</span>
                        <span class="tags">教育培训</span>
                        <span class="tags">教育培训</span>
                        <span class="tags">教育培训</span>
                      </div>
                      <div class="li" style="margin-top: 16px;">
                        <span class="big-tag">100-300万</span><span class="split">｜</span>
                        <span class="big-tag">10%</span><span class="split">｜</span>
                        <span class="big-tag">天使轮</span><span class="split">｜</span>
                        <span class="big-tag">杭州</span>
                      </div>
                    </div>
                  </div>
                  <el-pagination
                    class="pagination fr"
                    small
                    @current-change="filterChangeCurrent"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :page-size="10"
                    :total="totalData">
                  </el-pagination>
                </div>

              </el-collapse-transition>
                <span class="b-hander" @click="closeDiv('listShow')" v-show="listShow">收起</span>
                <span class="b-hander" @click="openDiv('listShow')" v-show="!listShow">展开</span>
              </div>
            <!--投资案例-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/anli.png">投资案例</span>
              </div>
              <div class="block lh">
                <span class="radio"><img src="../../../assets/images/radioTag.png"></span>
                <span class="time">2017.5</span>
                <span class="tag_To">IOP上市</span>
                <span class="title1">微天使乐投平台</span>
                <span class="title2">100-500万</span>
                <span class="tags_To">人工智能、金融理财、在线教育、大大大大</span>
                <span class="address">杭州市</span>
              </div>
            </div>
            <!--个人描述-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/miaoshu.png">个人描述</span>
              </div>
              <div class="block">
                <div class="main">
                  我们重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。 2.行中：管家确保出现在用户出行过程中每一个重要和紧急的环节。 我们的管家分为线上的总部管家和线下的目的地管家。目前，我们在全球7个国家建立了分公司、办事处。飞机落地之后，对接当地管家。此外，用户在任何时候都可以通过微信公众号或者 24 小时待机的国内电话联系到总部管家，并得到总部管家的帮助。
                </div>
              </div>
            </div>
            <!--投资需求-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/money2.png">投资需求</span>
              </div>
              <div class="block tit clearfix">
                <div class="tit_left fl">投资领域 ： </div>
                <div class="tit_right fl">金融、saas、企业服务、智能、大数据</div>
              </div>
              <div class="block tit clearfix">
                <div class="tit_left fl">投资轮次 ： </div>
                <div class="tit_right fl">种子及天使轮、Pre-A轮、A轮、B轮、少数股权转让</div>
              </div>
              <div class="block tit clearfix">
                <div class="tit_left fl">投资金额 ： </div>
                <div class="tit_right fl">1000-3000万</div>
              </div>
              <div class="block tit clearfix">
                <div class="tit_left fl">具体描述 ： </div>

              </div>
              <div class="block">
                <div class="tit_mian">我们重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。</div>
              </div>
            </div>
            <!--资源需求-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/ziyuan.png">资源需求</span>
              </div>
              <div class="block tit clearfix">
                <div class="tit_left fl">拥有的资源 ： </div>
                <div class="tit_right fl">金融、saas、企业服务、智能、大数据</div>
              </div>
              <div class="block tit clearfix">
                <div class="tit_left fl">寻求的资源 ： </div>
                <div class="tit_right fl">种子及天使轮、Pre-A轮、A轮、B轮、少数股权转让</div>
              </div>
              <div class="block tit clearfix">
                <div class="tit_left fl">具体描述 ： </div>

              </div>
              <div class="block">
                <div class="tit_mian">我们重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。</div>
              </div>
            </div>

            <div class="button_list">
              <div class="lis">
                <button class="button">编辑</button>
                <button class="button" style="margin-left: 16px;">项目推送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contain-grid contain-right-1 fl">
      <div class="main-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="1">
            <span slot="label">意向项目
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">用户可以主动推送项目／添加跟进关联项目，维护意<br/>向投资人对项目跟进状态</div>
                <div class="img"><img src="../../../assets/images/why.png"></div>
    </el-tooltip>
            </span>
            <div class="main_left">
              <div class="echart" id="echart"></div>
              <div class="selectIn fr">
                <el-select v-model="value1" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="item_lists">
                <div class="item_list">
                  <div class="list_header">
                    <span class="pipei">匹配度 : </span>
                    <span class="bili">100%</span>
                    <span class="pro fr">我的项目</span>
                  </div>
                  <div class="list_main">
                    <div class="main">
                      项目一句话介绍，这里字数会有点，可能要换行显示，两行肯定能显示的下
                    </div>
                    <div class="li" style="margin-top: 18px;">
                      <span class="big-tag">人工智能、大数据、理财、企业服务台</span>
                    </div>
                    <div class="li" style="margin-top: 12px;">
                      <span class="big-tag">100-300万</span><span class="split">｜</span>
                      <span class="big-tag">10%</span><span class="split">｜</span>
                      <span class="big-tag">天使轮</span><span class="split">｜</span>
                      <span class="big-tag">杭州</span>
                    </div>
                    <div class="li change_li">
                      <span class="all fl">
                        <span class="all_inner" :style="{width:widthInner + 'px' }"></span>
                      </span>
                      <div class="selectIn fl" style="margin-left: 13px;margin-top: -17px;">
                        <el-select v-model="value" placeholder="请选择" @change="selectChange">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>

                    <div class="img"><img src="../../../assets/images/dujia.png"></div>
                    <!--<div class="img"><img src="../../../assets/images/feidujia.png"></div>-->
                  </div>
                </div>
              </div>
              <el-pagination
                class="pagination fr"
                small
                @current-change="filterChangeCurrent"
                :current-page.sync="currentPage"
                layout="prev, pager, next"
                :page-size="10"
                :total="totalData">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">匹配推荐项目
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">根据微天使匹配算法从您的项目库算出该投资人感兴<br/>趣的项目</div>
                <div class="img"><img src="../../../assets/images/why.png"></div>
    </el-tooltip>
            </span>
            <div class="main_right">

            </div>
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      contacts:{
        user_id:'',//id
        card_name:'张三',//姓名
        card_nickname:'昵称',//昵称
        card_mobile:'18758307033',//名片手机号
        card_email:'zhangsan@weitianshi.cn',//邮箱
        card_company_name:'杭州投着乐网络科技有限公司 ',//公司名称
        card_brand:'投着乐',//品牌
        card_company_career:'投资经理',//职位
        contacts_tag:[],//人脉标签

        pro_industry: [],//领域标签
        pro_stage: {
          "stage_id": '',
          "stage_name": "",
          "sort": 2,
          "created_at": null,
          "updated_at": null
        },//轮次
        pro_finance_scale: '',//投资金额
        pro_area: {
          area_id: '',
          area_title: "",//市级
          pid: ''//省级
        },//所属地区1省级单位
        main:'',//资源需求描述
        give:[],//提供的资源
        push:[],//寻求对接的资源
        describe:'',//描述

      },        //人脉参数


      loading:false,//加载动画
      listShow:true,//项目库
      currentPage:1,//当前第几页
      totalData:50,//总数
      activeName:'1',

      options: [{
        value: 1,
        label: '项目推进中'
      }, {
        value: 2,
        label: '前期调研'
      }, {
        value: 3,
        label: '投决'
      }, {
        value: 4,
        label: '签署TS'
      }, {
        value: 5,
        label: '尽调'
      }, {
        value: 6,
        label: '签署投资协议'
      }, {
        value: 7,
        label: '交割'
      }, {
        value: 8,
        label: 'Hold'
      }, {
        value: 9,
        label: 'Reject'
      }],
      value: 1,
      value1:'全部',
      widthInner:10,//进度条的长度
    }
  },
  methods: {

    goBack(){
      this.$router.go(-1);
    },//返回上一层
    openDiv(v){
      this[v] = true;
    },
    closeDiv(v){
      this[v] = false;
    },
    getUserId(){
      this.contacts.user_id=this.$route.query.user_id;
    },
    filterChangeCurrent(page){
/*      delete this.getPra.page;
      this.loading=true;
      this.getPra.user_id=sessionStorage.user_id;
      this.getPra.page=page;//控制当前页码
      this.$http.post(this.getProjectListURL,this.getPra)
        .then(res=>{
          this.loading=false;
          let data = res.data.data;
          this.$tool.console(res)
          this.tableData=this.getProjectList(data);
        })
        .catch(err=>{
          this.loading=false
          this.$tool.console(err,2)
        })*/
    },//控制页码
    handleClick(tab, event) {
      console.log(tab);
    },//点击标签
    selectChange(e){
      let width = 0;
      switch (e){
        case 1:
          width=10;
          break;
        case 2:
          width=20;
          break;
        case 3:
          width=30;
          break;
        case 4:
          width=40;
          break;
        case 5:
          width=50;
          break;
        case 6:
          width=60;
          break;
        case 7:
          width=70;
          break;
        case 8:
          width=0;
          break;
        case 9:
          width=0;
          break;
        default:
          alert("错误")
          break;
      }
      this.widthInner=width;
      return width;
    },//hold切换后
    eChart(){
      let myChart = this.$echart.init(document.getElementById('echart'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data:['推进中','Hold','Rejcet']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: ['100%', '70%'],
            label: {
              normal: {
                show: true,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            data: [
              {value: 4, name: '推进中'},
              {value: 16, name: 'Hold'},
              {value: 10, name: 'Rejcet'},
            ],
            itemStyle:{
              normal:{
                label:{
                  show: true,
                  formatter: '{b} : {c}'
                },
                labelLine :{show:true}
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
  },
  created(){
      this.getUserId();
  },
  //Echart组件
  mounted(){
    this.eChart();
  },
}
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/contactsDetails';
</style>
