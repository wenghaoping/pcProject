<template>
  <div id="contactsDetails" class="clearfix"  v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="contain-grid contain-center fl">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
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
            <div class="header fr">
              <img :src="contacts.user_avatar_url">
            </div>
            <div class="item com"><img src="../../../assets/images/company.png">{{contacts.user_company_name}} | {{contacts.user_brand}}</div>
            <div class="item com"><img src="../../../assets/images/phone.png">{{contacts.user_mobile}}</div>
            <div class="item com" style="width: 780px;">
              <img src="../../../assets/images/email.png">{{contacts.user_email}}
              <div class="fr" v-if="contacts.import_user_name!=''">
                来源: {{contacts.import_user_name}}
              </div>
            </div>
          </div>
          <div class="item-list item-list-main">
            <!--个人标签-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/tag.png">个人标签</span>
                <span class="edit fr" @click="dialogVisibleTag = true"><img class="img" src="../../../assets/images/editTo.png">修改</span>
              </div>
              <div class="block">
                <div class="tag" v-for="tag in contacts.user_invest_tag">{{tag.tag_name}}</div>
              </div>
            </div>
            <!--项目库-->
            <div class="item" v-if="projectLists.length!=0">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/projectColl.png">项目库</span>
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
            <div class="item" v-if="contacts.user_intro!=''">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/miaoshu.png">个人描述</span>
              </div>
              <div class="block">
                <div class="main">
                  {{contacts.user_intro}}
                </div>
              </div>
            </div>
            <!--投资需求-->
            <div class="item" v-if="contacts.user_invest_industry!='' && contacts.user_invest_stage!='' && contacts.user_invest_scale!='' && contacts.user_invest_desc!=''">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/money2.png">投资需求</span>
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
            <div class="item" v-if="contacts.user_resource_desc!='' && contacts.user_resource_give!='' && contacts.user_resource_find!=''">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/ziyuan.png">资源需求</span>
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

            <div class="button_list">
              <div class="lis">
                <button class="button" @click="goEdit">编辑</button>
                <button class="button" @click="handlePush" style="margin-left: 16px;">项目推送</button>
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
            <el-collapse-transition>
              <div v-show="tabs">
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
                        <div @click="toDetail" class="click">
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
                    @current-change="filterChangeCurrent1"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :page-size="10"
                    :total="totalData">
                  </el-pagination>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">匹配推荐项目
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">根据微天使匹配算法从您的项目库算出该投资人感兴<br/>趣的项目</div>
                <div class="img"><img src="../../../assets/images/why.png"></div>
    </el-tooltip>
            </span>
            <el-collapse-transition>
              <div v-show="!tabs">
                <div class="main_right main_left">
                  <div class="item_lists">
                    <div class="item_list">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">100%</span>
                        <span class="pro fr">我的项目</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail" class="click">
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
                        </div>
                        <div class="li clearfix" style="margin-top: 12px;">
                          <button class="button fl">
                            <div class="img1"><img src="../../../assets/images/tuisong.png"></div>推送</button>
                          <button class="button fl">
                            <div class="img1"><img src="../../../assets/images/yichu.png"></div>移除</button>
                        </div>

                        <div class="img"><img src="../../../assets/images/dujia.png"></div>
                        <!--<div class="img"><img src="../../../assets/images/feidujia.png"></div>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
        </el-tabs>
      <button class="btn">添加意向项目</button>
      </div>
    </div>

    <!--标签设置弹框-->
    <el-dialog
      title="标签设置"
      :visible.sync="dialogVisibleTag"
      :show-close="close"
      size="tiny">
      <el-select
        v-model="tagsValue"
        multiple
        :multiple-limit="multiplelimit"
        filterable
        allow-create
        style="width:100%"
        @change="addChangeTag"
        default-first-option
        placeholder="请输入标签">
        <el-option
          v-for="item in addTags"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="tagTitle">准确设置项目标签便于查找，并参与项目匹配度计算</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTag = false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </span>
    </el-dialog>

    <!--项目详情弹窗-->
    <alertprojectdetail :dialog-pro-visible="dialogVisiblePro" v-on:changeall="dialogVisiblechangeIn" :proid="pro_id"></alertprojectdetail>

    <!--项目推送弹窗-->
    <projectpush :dialog-push="dialogPushVisible" :user-message="userMessage" :user-email="userEmail" @changeall="dialogVisiblechange"></projectpush>
  </div>
</template>

<script type="text/ecmascript-6">
import alertprojectdetail from './alertProjectDetail.vue'
import projectpush from './projectPush.vue'
export default {
  data () {
    return {
      close:false,

      /*设置标签*/
      dialogVisibleTag:false,//标签弹框设置
      tagsValue:[],//标签弹框数据绑定
      addTags:[{
        value: '',
        label: ''
      }],//人脉标签展示数据
      tags:{
        changecont:[],//项目标签新增
        index:'',//取数据保存的位置
        card_id:''//人脉id
      },
      multiplelimit:5,//标签控制5个
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
      },//人脉参数
      userMessage:{
        user_real_name:'翁浩平',//姓名
        user_company_career:'投资总监',//职位
        user_company_name:'杭州投着乐网络科技有限公司',//公司名称
      },//传递给推送的数据
      dialogPushVisible:false,//项目推送弹框设置
      userEmail:'',
      dialogVisiblePro:false,//控制项目详情弹窗
      loading:false,//加载动画
      loading1:false,//加载动画2
      listShow:false,//项目库
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
      tabs:true,//标签切换
      pro_id:'123',//项目详情
      getPra:{},//筛选的请求参数
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

    goBack(){
      this.$router.push({name: 'myContacts'})//路由传参
    },//返回上一层
    goEdit(){
      this.$router.push({name: 'createContacts', query: {card_id: this.contacts.card_id}})//路由传参
    },//跳转到编辑页
    openDiv(v){
      this[v] = true;
      this.projectLists=this.projectListsAll.slice(0);
    },
    closeDiv(v){
      this[v] = false;
      this.projectLists=this.projectListsSmall.slice(0);
    },
    getUserId(){
      this.contacts.user_id=this.$route.query.user_id;
      this.contacts.card_id=this.$route.query.card_id;
      this.tags.card_id=this.$route.query.card_id;
    },//获取userid/card_id
    handlePush(){
      this.userMessage.user_real_name=this.contacts.user_real_name;
      this.userMessage.user_company_career=this.contacts.user_company_career;
      this.userMessage.user_company_name=this.contacts.user_company_name;
      this.userEmail=this.contacts.user_email;
      this.dialogPushVisible=true;
    },//点击推送,并且传送数据给推送弹框
    dialogVisiblechange(msg){
      this.dialogPushVisible=msg;
    },//关闭项目推送弹框
    filterChangeCurrent(page){
      this.getProjectList(page);
    },//控制项目页码1
    filterChangeCurrent1(page){

    },//控制右边页码
    handleClick(tab, event) {
      if(tab.name=="1") this.tabs=true;
      else this.tabs=false
    },//点击切换标签

    toDetail(){
      this.dialogVisiblePro=true;
    },//项目详情弹窗
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
          x: 'right',

          top:'30%',
          data:['推进中','Hold','Rejcet'],
          textStyle:{
            fontSize:"16",
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: ['70%','90%'],
            center: ['35%', '55%'],
            label: {
              normal: {
                show: true,
                position: 'center',
                textStyle:{
                    fontSize:"16",
                }
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
    dialogVisiblechangeIn(msg){
      this.dialogVisiblePro=msg;
    },//项目详情弹窗关闭函数

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
    getOneUserInfo(){
      this.loading=true;
      this.$http.post(this.URL.getOneUserInfo,{user_id:localStorage.user_id,card_id: this.contacts.card_id})
        .then(res => {
          let data = res.data.data;
          this.$tool.console(this.$tool.getToObject(data));
          data.user_invest_industry=this.set_industry(data.user_invest_industry);
          data.user_invest_stage=this.set_stage(data.user_invest_stage);
          data.user_invest_scale=this.set_scale(data.user_invest_scale);
          data.user_resource_find=this.set_GiveFind(data.user_resource_find);
          data.user_resource_give=this.set_GiveFind(data.user_resource_give);

          this.tagsValue=this.setTag(data.user_invest_tag);
          this.tags.changecont=this.setTag(data.user_invest_tag);
          this.contacts=data;
          this.loading=false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading=false;
          this.$tool.error("加载超时");
        })
    },//获取个人详情

    getWxProjectCategory(){
      this.addTags = this.$global.data.tags_user;//设置人脉标签
      this.tags.changecont = this.$global.data.tags_user;//设置人脉标签2另外的
    },//获取所有下拉框的数据
    addChangeTag(e){
      let tagName = this.$tool.checkArr(e, this.addTags);
      if (tagName != undefined) {
        this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 3, tag_name: tagName})
          .then(res => {
            let newState = {};
            newState.label = tagName;
            newState.value = res.data.tag_id;
            this.tags.changecont.push(newState);
          })
          .catch(err => {
            this.$tool.error("添加失败");
            this.$tool.console(err);
          })
      }
    },//添加项目标签
    addTag(){
      this.loading=true;
      this.$tool.setTag(this.tagsValue,this.tags.changecont);
      this.$http.post(this.URL.setConnectTag, {user_id:localStorage.user_id,card_id: this.tags.card_id,tag: this.tagsValue})
        .then(res => {
          this.loading=false;
          this.$tool.success("设置成功");
          this.dialogVisibleTag = false;
          this.getOneUserInfo();
        })
        .catch(err => {
          this.loading=false;
          this.$tool.error("添加失败");
          this.$tool.console(err);
          this.dialogVisibleTag = false;

        })
    },//保存标签选择
  },
  created(){
      this.getUserId();
      this.getProjectList(1);
      this.getOneUserInfo();
      this.getWxProjectCategory();
  },
  //Echart组件
  mounted(){
    this.eChart();
  },
  components: {
    alertprojectdetail,
    projectpush
  },
}
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/contactsDetails';
</style>
