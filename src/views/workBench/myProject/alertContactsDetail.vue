<template>
  <div id="alertContactsDetail" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================人脉详情弹窗=============================================-->
    <el-dialog :visible="dialogConVisible" custom-class="dialogCon" :before-close="handleClose" close-on-press-escape close-on-click-modal>
      <div class="contain-grid contain-center1 fl">
        <div class="main-box clearfix">
          <div class="item-lists clearfix">
            <div class="item-list item-lists-top clearfix">
              <div class="item">
                <div class="name fl">{{contacts.user_real_name}}</div>
                <div class="career fl">{{contacts.user_company_career}}</div>
              </div>
              <div class="item" style="margin-bottom: 55px;">
                <div class="title">{{contacts.card_nickname}}</div>
              </div>
              <div class="header fr" v-if="contacts.user_avatar_url!=''">
                <img :src="contacts.user_avatar_url">
              </div>
              <div class="header fr" v-else>
                <span class="change">{{contacts.user_avatar_txt}}</span>
              </div>
              <div class="item com"><img src="../../../assets/images/company.png">{{contacts.user_company_name}} | {{contacts.user_brand}}</div>
              <div class="item com"><img src="../../../assets/images/phone.png">{{contacts.user_mobile}}</div>
              <div class="item com" style="width: 780px;">
                <img src="../../../assets/images/email.png">{{contacts.user_email}}
                <div class="fr" v-if="contacts.import_user_name!=''" style="color: #8492A6">
                  来源: {{contacts.import_user_name}}
                </div>
              </div>
            </div>
            <div class="item-list item-list-main">
              <!--个人标签-->
              <div class="item" v-if="contacts.user_invest_tag.length!=0">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../../assets/images/tag.png">个人标签</span>
                </div>
                <div class="block">
                  <div class="tag" v-for="tag in contacts.user_invest_tag">{{tag.tag_name}}</div>
                </div>
              </div>
              <!--项目库-->
              <div class="item" v-if="projectLists.length!=0">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../../assets/images/projectColl.png">项目库</span>
                </div>
                <div class="ul_lists clearfix" v-loading.body="loading1" element-loading-text="拼命加载中">
                  <div class="list" v-for="projectList in projectLists" >
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
              <div class="item" v-if="contacts.project_case.length!=0">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../../assets/images/anli.png">投资案例</span>
                </div>
                <div class="block lh" v-for="cased in contacts.project_case">
                  <span class="radio"><img src="../../../assets/images/radioTag.png"></span>
                  <span class="time">{{cased.case_deal_time}}</span>
                  <span class="tag_To">{{cased.case_stage_name}}</span>
                  <span class="title1">{{cased.case_name}}</span>
                  <span class="title2">{{cased.case_money}}万元</span>
                  <span class="tags_To">{{cased.has_many_industry}}</span>
                  <span class="address">{{cased.has_one_city}}</span>
                </div>
              </div>
              <!--个人描述-->
              <div class="item" v-if="contacts.user_intro!=''">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../../assets/images/miaoshu.png">个人描述</span>
                </div>
                <div class="block">
                  <div class="main">
                    {{contacts.user_intro}}
                  </div>
                </div>
              </div>
              <!--投资需求-->
              <div class="item" v-if="user_invest">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../../assets/images/money2.png">投资需求</span>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_invest_industry!=''">
                  <div class="tit_left fl">投资领域 ： </div>
                  <div class="tit_right fl">{{contacts.user_invest_industry}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_invest_stage!=''">
                  <div class="tit_left fl">投资轮次 ： </div>
                  <div class="tit_right fl">{{contacts.user_invest_stage}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_invest_scale!=''">
                  <div class="tit_left fl">投资金额 ： </div>
                  <div class="tit_right fl">{{contacts.user_invest_scale}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_invest_desc!=''">
                  <div class="tit_left fl">具体描述 ： </div>
                </div>
                <div class="block" v-if="contacts.user_invest_desc!=''">
                  <div class="tit_mian">{{contacts.user_invest_desc}}</div>
                </div>
              </div>
              <!--资源需求-->
              <div class="item" v-if="user_resource">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../../assets/images/ziyuan.png">资源需求</span>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_resource_give!=''">
                  <div class="tit_left fl">拥有的资源 ： </div>
                  <div class="tit_right fl">{{contacts.user_resource_give}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_resource_find!=''">
                  <div class="tit_left fl">寻求的资源 ： </div>
                  <div class="tit_right fl">{{contacts.user_resource_find}}</div>
                </div>
                <div class="block tit clearfix" v-if="contacts.user_resource_desc!=''">
                  <div class="tit_left fl">具体描述 ： </div>
                </div>
                <div class="block" v-if="contacts.user_resource_desc!=''">
                  <div class="tit_mian">{{contacts.user_resource_desc}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ["dialogConVisible","cardid","userid"],
    data () {
      return {
        loading:false,//加载动画
        loading1:false,//加载动画2

        listShow:true,//项目库
        currentPage:1,//当前第几页
        totalData:0,//总数
        tags:{
          changecont:[],//项目标签新增
          index:'',//取数据保存的位置
          card_id:''//人脉id
        },
        contacts:{
          card_id:'',//id
          user_id:'',//user_id
          user_real_name:'张三',//姓名
          user_nickname:'昵称',//昵称
          user_mobile:'18758307033',//名片手机号
          user_email:'zhangsan@weitianshi.cn',//邮箱
          user_company_name:'杭州投着乐网络科技有限公司 ',//公司名称
          import_user_name:'',//来源
          user_brand:'投着乐',//品牌
          user_company_career:'投资经理',//职位
          user_invest_tag:[],//人脉标签
          user_avatar_url:'',//头像URL
          user_invest_industry: [],//领域标签
          user_invest_stage: [],//轮次
          user_invest_scale: [],//投资金额
          user_invest_area: {
            area_id: '',
            area_title: "",//市级
            pid: ''//省级
          },//所属地区1省级单位
          user_intro:'',//个人描述
          user_resource_give:[],//提供的资源
          user_resource_find:[],//寻求对接的资源
          user_invest_desc:'',//投资需求描述
          user_resource_desc:'',//资源需求描述
          project_case:[
            {
              case_deal_time:1503936000,//时间
              case_stage_name:"pre-A轮",//轮次
              case_name:"第三个项目",//名称
              case_money:'15800000',//钱
              has_many_industry:'金融',//金融,人工智能
              has_one_city:'北京',//地区
            }
          ],//投资案例
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
        getPra:{},//获取项目的请求参数
        in:true,//进入时
        user_invest:true,//投资需求
        user_resource:true,//资源需求

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
      setProjectList(data){
        let arr = new Array;
        for(let i=0; i<data.length; i++){
          let obj = new Object;
          obj.pro_intro=data[i].pro_intro || "暂无信息";//项目介绍
          obj.is_exclusive=data[i].is_exclusive;//独家/非独家
          obj.pro_industry=this.setIndustry(data[i].pro_industry) || [];//项目标签
          obj.pro_scale =data[i].scale_money || '-';//项目估值
          obj.pro_area =data[i].pro_area.area_title || '-';//地区
          obj.pro_stage =data[i].pro_stage.stage_name || '-';//投资轮次
          obj.pro_finance_stock_after =data[i].pro_finance_stock_after || '-';//股权
          arr.push(obj);
        }
        return arr;
      },//设置项目库函数
      setIndustry(data){
        let arr = new Array;
        for(let i=0; i<data.length; i++){
          arr.push(data[i].industry_name)
        }
        return arr;
      },//设置项目库项目的标签

      /*请求函数*/

      getProjectList(page){
        this.loading1=true;
        this.getPra.user_id=this.contacts.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPage=page;
        this.getPra.page=page;
        if(this.contacts.user_id==0) {
          this.projectLists=[];
        }else{
          this.$http.post(this.URL.getProjectList, this.getPra)
            .then(res => {
              let data = res.data.data;
              this.projectListsAll = this.setProjectList(data);
              this.projectListsSmall = this.setProjectList(data).slice(0, 2);
              if (this.listShow) this.projectLists = this.projectListsAll.slice(0);
              else this.projectLists = this.projectListsSmall.slice(0)

              this.totalData = res.data.count;
            })
            .catch(err => {
              this.$tool.console(err, 2);
              this.$tool.error("加载超时");
            })
          this.loading1 = false;
        }
      },//获取项目列表
      /*以下都是辅助函数*/
      set_industry(arr){
        let str=""
        if(arr.length===0) {
          str=""
        } else {
          arr.forEach((x)=> {
            str += x.industry_name + '、'
          })
        }
        return str
      },//列表领域处理
      set_stage(arr){
        let str="";
        if(arr.length===0) {
          str=""
        } else {
          arr.forEach((x)=> {
            str += x.stage_name + '、'
          })
        }
        return str
      },//列表轮次处理
      set_scale(arr){
        let str="";
        if(arr.length===0) {
          str=""
        } else {
          arr.forEach((x)=> {
            str+=x.scale_money+'、'
          })
        }
        return str
      },//列表期望金额处理
      set_GiveFind(arr){
        let str="";
        if(arr.length===0) {
          str=""
        } else {
          arr.forEach((x)=> {
            str+=x.resource_name+'、'
          })
        }
        return str
      },//资源提供或者寻求处理
      setTag(arr){
        let newArr = new Array;
        arr.forEach((x)=> {
          newArr.push(x.tag_id);
        });
        return newArr;
      },//设置标签的函数
      setProjectCase(arr){
        let newArr = new Array;
        arr.forEach((x)=> {
          let obj = new Object;
          obj.case_deal_time=this.$tool.formatDateTime(x.case_deal_time);
          obj.case_stage_name=x.case_stage_name;
          obj.case_name=x.case_name;
          obj.case_money=x.case_money;
          obj.has_many_industry=this.set_industry(x.has_many_industry);
          obj.has_one_city=x.has_one_city.area_title;
          newArr.push(obj);

        });
        return newArr;
      },//设置投资案例
      getOneUserInfo(){
        this.loading=true;
        this.$http.post(this.URL.getOneUserInfo,{user_id:localStorage.user_id,card_id: this.contacts.card_id,investor_user_id:this.contacts.user_id})
          .then(res => {
            let data = res.data.data;
            this.$tool.console(this.$tool.getToObject(data));
            data.user_invest_industry = this.set_industry(data.user_invest_industry);
            data.user_invest_stage = this.set_stage(data.user_invest_stage);
            data.user_invest_scale = this.set_scale(data.user_invest_scale);
            data.user_resource_find = this.set_GiveFind(data.user_resource_find);
            data.user_resource_give = this.set_GiveFind(data.user_resource_give);
            data.project_case = this.setProjectCase(data.project_case);
            data.user_avatar_txt=this.$tool.setUrlChange(data.user_avatar_url,data.user_real_name);
            if(data.user_invest_industry=='' && data.user_invest_stage=='' && data.user_invest_scale=='' && data.user_invest_desc==''){
              this.user_invest=false;//投资需求
            }else{
              this.user_invest=true;//投资需求
            }
            if(data.user_resource_give=='' && data.user_resource_find=='' && data.user_resource_desc==''){
              this.user_resource=false;//资源需求
            }else{
              this.user_resource=true;//投资需求
            }
            this.tagsValue = this.setTag(data.user_invest_tag);
            this.tags.changecont = this.setTag(data.user_invest_tag);
            this.contacts = data;
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.$tool.error("加载超时");
          })
        this.loading = false;
      },//获取个人详情

    },
    created(){

//      this.getProjectList(1);
//      this.getOneUserInfo();
    },
    watch : {
      cardid : function(e){
        this.pro_id=e;
      },//获取项目id
      dialogConVisible : function (e){
        for(let key in this.contacts){
          if(this.$tool.isArray(this.contacts[key])){
            this.contacts[key]=[];
          }else{
            this.contacts[key]='';
          }
        }
        if(this.in){
          this.contacts.card_id=this.cardid || 0;
          this.contacts.user_id=this.userid || '' ;
          setTimeout(()=>{
            this.getOneUserInfo();
            this.getProjectList(1);
          },200)
        }
        this.in=!this.in;
      }
    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/alertContactsDetail';
</style>

