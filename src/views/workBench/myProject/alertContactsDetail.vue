<template>
  <div id="alertContactsDetail" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================人脉详情弹窗=============================================-->
    <el-dialog :visible="dialogConVisible" custom-class="dialogCon" :before-close="handleClose" close-on-press-escape close-on-click-modal>
      <div class="contain-grid contain-center1 fl">
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
              <!--项目库-->
              <div class="item" >
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img" src="../../../assets/images/projectColl.png">项目库</span>
                </div>
                <div class="ul_lists clearfix" v-loading.body="loading1" element-loading-text="拼命加载中">
                  <div class="list" v-for="projectList in projectLists">
                    <div class="li title">{{projectList.pro_intro}}</div>
                    <div class="img" v-show="projectList.is_exclusive=='独家'"><img src="../../../assets/images/dujia.png"></div>
                    <div class="img" v-show="projectList.is_exclusive=='非独家'"><img src="../../../assets/images/feidujia.png"></div>
                    <div class="li">
                      <span class="tags" v-for="industry in projectList.pro_industry">{{industry}}</span>
                    </div>
                    <div class="li" style="margin-top: 16px;">
                      <span class="big-tag" v-show="projectList.pro_scale!='-'">{{projectList.pro_scale}}</span><span class="split"  v-show="projectList.pro_scale!='-'">｜</span>
                      <span class="big-tag" v-show="projectList.pro_finance_stock_after!='-'">{{projectList.pro_finance_stock_after}}%</span><span class="split" v-show="projectList.pro_finance_stock_after!='-'">｜</span>
                      <span class="big-tag" v-show="projectList.pro_stage!='-'">{{projectList.pro_stage}}</span><span class="split" v-show="projectList.pro_stage!='-'">｜</span>
                      <span class="big-tag" v-show="projectList.pro_area!='-'">{{projectList.pro_area}}</span>
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
                  :total="totalData"
                  v-show="listShow">
                </el-pagination>
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
  export default {
    props: ["dialogConVisible","proid"],
    data () {
      return {
        loading:false,//加载动画
        loading1:false,//加载动画2
        pro_id:'',
        listShow:true,//项目库
        currentPage:1,//当前第几页
        totalData:50,//总数
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
        },//人脉参数
        projectLists:[
          {
            pro_intro:"暂无数据",
            is_exclusive:"",
            pro_industry:[],
            pro_scale:"暂无数据",
            pro_area:"暂无数据",
            pro_stage:"暂无数据",
            pro_finance_stock_after:"暂无数据"
          }
        ],//项目列表
        projectListsSmall:[],//默认2个的表
        projectListsAll:[],//默认全部的表
      }
    },
    methods: {
      handleClose(){
        this.$emit('changeCon', false)
      },
      dialogVisibleTo(){
        this.$emit('changeCon', false)
      },
      openDiv(v){
        this[v] = true;
        this.projectLists=this.projectListsAll.slice(0);
      },
      closeDiv(v){
        this[v] = false;
        this.projectLists=this.projectListsSmall.slice(0);
      },
      filterChangeCurrent(page){
        this.getProjectList(page);
      },//控制项目页码1
      getProjectList(page){
        this.loading1=true;
        this.getPra.user_id=this.contacts.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPage=page;
        this.getPra.page=page;
        this.$http.post(this.URL.getProjectList,this.getPra)
          .then(res=>{
            let data = res.data.data;
            this.projectListsAll=this.setProjectList(data);
            this.projectListsSmall=this.setProjectList(data).slice(0,2);
            if(this.listShow) this.projectLists=this.projectListsAll.slice(0);
            else this.projectLists=this.projectListsSmall.slice(0);
            this.loading1=false;
            this.totalData=res.data.count;
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.loading1=false;
            this.$tool.error("加载超时")
          })
      },//项目列表
    },
    created(){
      this.getWxProjectCategory();
    },
    watch : {
      proid : function(e){
        this.pro_id=e;

      },//获取项目id
    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/alertContactsDetail';
</style>

