<template>
  <div id="contactsDetails" class="clearfix"  v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="contain-grid contain-center fl">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box clearfix">
        <div class="item-lists2 clearfix">
          <div class="item-list item-lists-top clearfix">
            <div class="item">
              <div class="name fl">{{contacts.user_real_name}}</div>
              <div class="career fl">{{contacts.user_company_career}}</div>
            </div>
            <div class="item" style="margin-bottom: 55px;">
              <div class="title">{{contacts.user_nickname}}</div>
            </div>
            <div class="header fr" v-if="contacts.user_avatar_url!=''">
              <img :src="contacts.user_avatar_url">
            </div>
            <div class="header fr" v-else>
              <img src="../../../assets/images/logo.png">
            </div>
            <div class="item com"><img src="../../../assets/images/company.png">{{contacts.user_company_name}}<span v-if="contacts.user_company_name!=''"> | </span>{{contacts.user_brand}}</div>
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
                <span class="title fl"><img class="img1" src="../../../assets/images/tag.png">个人标签</span>
                <span class="edit fr" @click="dialogVisibleTag = true"><img class="img" src="../../../assets/images/editTo.png">修改</span>
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

            <div class="button_list">
              <div class="lis">
                <button class="button" @click="goEdit" v-if="contacts.is_bind==0">编辑</button>
                <button class="button" @click="handlePushComplete" style="margin-left: 16px;">项目推送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contain-grid contain-right-1 fl">
      <div class="main-box">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="position: relative">

          <el-tab-pane name="1">
            <button class="btn" @click="addFollow">添加意向项目</button>
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
                    <el-select v-model="searchSchedule" placeholder="请选择" @change="selectSearch">
                      <el-option
                        v-for="item in follow_scheduleAll"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="item_lists">
                    <div class="item_list" v-for="(enjoyProject,index) in enjoyProjects" v-if="enjoyProjects.length!=0">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">{{enjoyProject.match}}%</span>
                        <span class="pro fr">我的项目</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail(enjoyProject)" class="click">
                          <div class="main">
                            {{enjoyProject.pro_intro}}
                          </div>
                          <div class="li" style="margin-top: 18px;">
                            <span class="big-tag"><i v-for="industry in enjoyProject.industry" :class="{ newColor: industry.is_match==1 }">{{industry.industry_name}}、</i></span>
                          </div>
                          <div class="li" style="margin-top: 12px;">
                            <span class="big-tag">{{enjoyProject.scale}}</span><span class="split">｜</span>
                            <span class="big-tag">{{enjoyProject.pro_finance_stock_after}}%</span><span class="split">｜</span>
                            <span class="big-tag">{{enjoyProject.stage}}</span><span class="split">｜</span>
                            <span class="big-tag">{{enjoyProject.area}}</span>
                          </div>
                        </div>
                        <div class="li change_li">
                      <span class="all fl">
                        <span class="all_inner" :style="{width:enjoyProject.width + 'px' }"></span>
                      </span>
                          <div class="selectIn fl" style="margin-left: 13px;margin-top: -17px;" @click="getIndex(index)">
                            <el-select v-model="enjoyProject.schedule_id" placeholder="请选择" @change="selectChange" >
                              <el-option
                                v-for="item in follow_schedule"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </div>
                        </div>

                        <div class="img"><img src="../../../assets/images/dujia.png" v-if="enjoyProject.is_exclusive==1"></div>
                        <div class="img"><img src="../../../assets/images/feidujia.png" v-if="enjoyProject.is_exclusive==0"></div>
                      </div>
                    </div>
                    <div class="emptyImg" v-if="enjoyProjects.length==0">
                      <img src="../../../assets/images/zanwushuju.png">
                    </div>
                  </div>
                  <el-pagination
                    class="pagination fr"
                    small
                    v-if="totalData2!=0"
                    @current-change="filterChangeCurrent1"
                    :current-page.sync="currentPage2"
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="totalData2">
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
                    <div class="item_list" v-for="(matchProject,index) in matchProjects" v-if="matchProjects.length!=0">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">{{matchProject.match}}%</span>
                        <span class="pro fr">我的项目</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail(matchProject)" class="click">
                          <div class="main">
                            {{matchProject.pro_intro}}
                          </div>
                          <div class="li" style="margin-top: 18px;">
                            <span class="big-tag"><i v-for="industry in matchProject.industry" :class="{ newColor: industry.is_match==1 }">{{industry.industry_name}}、</i></span>
                          </div>
                          <div class="li" style="margin-top: 12px;">
                            <span class="big-tag">{{matchProject.scale}}</span><span class="split">｜</span>
                            <span class="big-tag">{{matchProject.pro_finance_stock_after}}%</span><span class="split">｜</span>
                            <span class="big-tag">{{matchProject.stage}}</span><span class="split">｜</span>
                            <span class="big-tag">{{matchProject.area}}</span>
                          </div>
                        </div>
                        <div class="li clearfix" style="margin-top: 12px;">
                          <button v-if="matchProject.push_statues==3" class="button fl" @click="handlePush(0)">
                            <div class="img1"><img src="../../../assets/images/tuisong.png"></div>已推送
                          </button>
                          <button  class="button fl" v-else @click="handlePush(matchProject)">
                            <div class="img1"><img src="../../../assets/images/tuisong.png"></div>推送</button>

                          <button class="button fl" @click="delMatchAction(matchProject)">
                            <div class="img1"><img src="../../../assets/images/yichu.png"></div>移除</button>
                        </div>

                        <div class="img"><img src="../../../assets/images/dujia.png" v-if="matchProject.is_exclusive==1"></div>
                        <div class="img"><img src="../../../assets/images/feidujia.png" v-if="matchProject.is_exclusive==0"></div>
                      </div>
                    </div>
                    <div class="emptyImg" v-if="matchProjects.length==0">
                      <img src="../../../assets/images/zanwushuju.png">
                    </div>
                  </div>
                  <el-pagination
                    class="pagination fr"
                    small
                    v-if="totalData3!=0"
                    @current-change="filterChangeCurrent2"
                    :current-page.sync="currentPage3"
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="totalData3">
                  </el-pagination>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
        </el-tabs>
        <button class="btn" @click="addFollow">添加意向项目</button>
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
    <alertprojectdetail :dialog-visible-pro="dialogVisiblePro" :proid="pro_id" v-on:changeCon2="dialogVisiblechangeIn"></alertprojectdetail>

    <!--写跟进弹框-->
    <addfollow :dialog-follow="dialogFollow" @changeClose="closeFollow" :cardid="contacts.card_id" :cardname="contacts.user_real_name"></addfollow>

    <!--项目推送弹窗,人脉入口精简版-->
    <el-dialog :visible="dialogPushVisible" :before-close="handleClose" size="tiny" :show-close="close">

     <span slot="title" class="dialog-title clearfix">
        <div class="title fl">项目推送</div>
        <div class="lost fl">今日剩余推送<i>{{pushCount}}</i>次</div>
        <div class="img fl"><img src="../../../assets/images/why.png"></div>
      </span>
      <el-form :model="pushData" label-position="right" label-width="60px"
               ref="pushData">
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]">
          <el-input v-model="pushData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="一句话" prop="body"
        :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
          <el-input v-model="pushData.body" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPushVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('pushData')">确 定</el-button>
      </div>
    </el-dialog>

    <!--项目推送弹窗,人脉入口完整版-->
    <projectpush :dialog-push="dialogPushVisibleComplete" :user-message="userMessage" :user-email="userEmail" @changeall="dialogVisiblechange" @changeCloseProjectpush="dialogVisiblechangeCloase"></projectpush>

    <!--项目预览弹窗-->
    <projectpreview :dialog-preview-visible="dialogPreviewVisible" @changeCon="dialogPrechange" @closePreview="closePreview"></projectpreview>
  </div>
</template>

<script type="text/ecmascript-6">
  import alertprojectdetail from '../../../components/alertProjectDetail.vue'
  import addfollow from './../followUp/addFollow.vue'

  import projectpush from './projectPush.vue'
  import projectpreview from './projectPreview.vue'
  export default {
    data () {
      return {
        close:false,
        /*设置标签*/
        dialogVisibleTag:false,//标签弹框设置
        dialogFollow:false,//添加更近弹框
        dialogPreviewVisible:false,//项目预览弹窗
        dialogPushVisible:false,//项目推送弹框设置,简易版
        dialogPushVisibleComplete:false,//项目推送弹框,完整版
        dialogVisiblePro:false,//控制项目详情弹窗
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
          card_id:'',//id那个人的card_id
          user_id:'',//user_id那个人的userid
          investor_id:'',//investor_id
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
        userMessage:{
          user_real_name:'翁浩平',//姓名
          user_company_career:'投资总监',//职位
          user_company_name:'杭州投着乐网络科技有限公司',//公司名称
        },//传递给推送的数据
        userEmail:'',
        loading:false,//加载动画
        loading1:false,//加载动画2
        listShow:false,//项目库
        currentPage:1,//项目列表当前第几页
        totalData:0,//项目列表总数
        currentPage2:1,//意向项目当前第几页
        totalData2:0,//意向项目总数
        currentPage3:1,//匹配项目当前第几页
        totalData3:0,//匹配项目总数
        activeName:'1',

        follow_schedule: [/*{
         value: 1,
         label: '项目推进中'
         }*/],//项目跟进进度
        follow_scheduleAll: [/*{
         value: 1,
         label: '项目推进中'
         }*/],//项目跟进进度搜索用,多一个全部
        searchSchedule:0,//意向项目的筛选进度
        tabs:true,//标签切换
        pro_id:'',//项目详情
        getPra:{},//获取项目的请求参数
        getConpro:{},//获取意向项目的请求参数
        getMatchPro:{},//获取匹配项目
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
        ],//展开收起项目列表
        projectListsSmall:[],//默认2个的表
        projectListsAll:[],//默认全部的表
        chartData:{
          going:'',
          hold:'',
          reject:''
        },//图表的数据
        enjoyProjects:[
          /*{
           area: "杭州",
           follow_id: 87,
           industry: "人工智能、大数据、理财、企业服务台",
           is_exclusive: 1,
           match: 0,
           pro_finance_stock_after: "0.00",
           pro_intro: "这是一个很好的项目，能来看看吗",
           project_id: "RpAj48rx",
           scale: "2000W-5000W",
           schedule_id: 2,
           stage:"IPO上市后"
           }*/
        ],
        scheduleIndex:-1,//设置跟进状态的位置(单独需要)
        chart:"",
        chartCheck:true,//chart用的
        user_invest:true,//投资需求
        user_resource:true,//资源需求
        matchProjects:[
          /*          {

           }*/
        ],
        pushCount:0,//剩余推送次数
        pushData:{
          email:"",
          body:"",
          project_id:'',
        },//推送数据
      }
    },
    methods: {
      goBack(){
        this.$router.push({name: 'myContacts',query: {activeTo: 1}})//路由传参
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
      handlePush(data){
        if(data==0){
            this.$tool.warning("已推送过");
        }else{
          this.userMessage.user_real_name=this.contacts.user_real_name;
          this.userMessage.user_company_career=this.contacts.user_company_career;
          this.userMessage.user_company_name=this.contacts.user_company_name;
          this.userMessage.card_id=this.contacts.card_id;
          this.userEmail=this.contacts.user_email;
          this.$store.state.pushProject.projectMessgae={pro_id:data.project_id || '',pro_intro:data.pro_intro || ''};
          this.dialogPushVisible=true;
          this.pushData.email=this.contacts.user_email;
          this.pushData.project_id=data.project_id;
        }
      },//点击推送精简版.
      handlePushComplete(){
        this.userMessage.user_real_name=this.contacts.user_real_name;
        this.userMessage.user_company_career=this.contacts.user_company_career;
        this.userMessage.user_company_name=this.contacts.user_company_name;
        this.userMessage.card_id=this.contacts.card_id;
        this.userEmail=this.contacts.user_email;
        this.dialogPushVisibleComplete=true;
      },//点击推送完整版,并且传送数据给推送弹框
      handleClose(){
        this.dialogPushVisible=false;
      },//关闭项目推送
      dialogVisiblechange(msg){
//      this.dialogPushVisible=msg;
        this.dialogPreviewVisible=true;
      },//关闭推送弹框,打开预览弹框
      closePreview(msg){
        this.dialogPreviewVisible=msg;
      },//关闭项目预览
      dialogVisiblechangeCloase(msg){
        this.dialogPushVisibleComplete=msg;
        this.getpushCount();
      },//关闭项目推送弹窗
      filterChangeCurrent(page){
        this.getProjectList(page);
      },//控制项目页码1
      filterChangeCurrent1(page){
        this.loading=true;
        this.getConpro.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPage2=page;
        this.getConpro.card_id=this.contacts.card_id;
        this.getConpro.page=page;
        this.getConpro.schedule_id='';
        this.$http.post(this.URL.getEnjoyProjects,this.getConpro)
        .then(res=>{
          if(res.data.status_code==2000000) {
            let data = res.data.data;
            this.enjoyProjects=this.setEnjoyProject(data);
          }
          this.loading = false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading=false;
          this.$tool.error("加载超时");
        })
      },//控制意向项目页码
      handleClick(tab, event) {
        if(tab.name=="1") this.tabs=true;
        else this.tabs=false
      },//点击切换标签

      toDetail(data){
          console.log(data);
          this.pro_id=data.project_id;
        this.dialogVisiblePro=true;
      },//项目详情弹窗
      addFollow(){
        this.dialogFollow=true;
      },//点击添加意向项目按钮
      closeFollow(msg){
        this.dialogFollow=msg;
        this.getEnjoyProjects();
        this.getEchartData();
      },//关闭添加意向项目
      dialogVisiblechangeIn(msg){
        this.dialogVisiblePro=msg;
//      this.dialogPreviewVisible=true;
      },//项目详情弹窗关闭函数
      dialogPrechange(msg){
        this.dialogPushVisible=msg;
        this.dialogPushVisibleComplete=msg;
        this.dialogPreviewVisible=msg;
      },//关闭项目预览
      setProjectList(data){
        let arr = new Array;
        for(let i=0; i<data.length; i++){
          let obj = new Object;
          obj.pro_intro=data[i].pro_intro || "暂无信息";//项目介绍
          obj.is_exclusive=data[i].is_exclusive;//独家/非独家
          obj.pro_industry=this.setIndustry(data[i].pro_industry) || [];//项目标签
          obj.pro_scale =data[i].pro_scale.scale_money || '-';//项目估值

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
          if(res.data.status_code==2000000) {
            let data = res.data.data;
            this.projectListsAll = this.setProjectList(data);
            this.projectListsSmall = this.setProjectList(data).slice(0, 2);
            if (this.listShow) this.projectLists = this.projectListsAll.slice(0);
            else this.projectLists = this.projectListsSmall.slice(0);
            this.totalData = res.data.count;
          }
          this.loading1 = false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading1=false;
          this.$tool.error("加载超时");
        })
      },//获取项目列表
      /*以下都是辅助函数*/
      set_industry(arr){
        let str="";
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
      setTime(string){
        let newDate = new Date();
        newDate.setTime(string * 1000);
        string=newDate.toLocaleDateString();
        return string
      },//设置时间
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
          obj.case_deal_time=this.setTime(x.case_deal_time);
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
        this.$http.post(this.URL.getOneUserInfo,{card_id: this.contacts.card_id})
        .then(res => {
          let data = res.data.data;
//          this.$tool.console(this.$tool.getToObject(data));
          data.user_invest_industry = this.set_industry(data.user_invest_industry);
          data.user_invest_stage = this.set_stage(data.user_invest_stage);
          data.user_invest_scale = this.set_scale(data.user_invest_scale);
          data.user_resource_find = this.set_GiveFind(data.user_resource_find);
          data.user_resource_give = this.set_GiveFind(data.user_resource_give);
          data.project_case = this.setProjectCase(data.project_case);
          data.user_email=data.user_email || '暂无填写';
          data.user_company_name=data.user_company_name || '暂无填写';
          data.user_brand=data.user_brand || '暂无填写';
          data.user_company_career=data.user_company_career || '暂无填写';
          data.user_mobile=data.user_mobile || '暂无填写';
          data.user_intro=data.user_intro || '';
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
          console.log(data);
          this.loading = false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading=false;
          this.$tool.error("加载超时");
        })
      },//获取个人详情

      getWxProjectCategory(){
        this.addTags = this.$global.data.tags_user;//设置人脉标签()
//      this.tags.changecont = this.$global.data.tags_user;//设置人脉标签2另外的
        this.follow_schedule = this.$global.data.follow_schedule.slice(0);//设置项目状态
        this.follow_scheduleAll = this.$global.data.follow_schedule.slice(0);
        this.follow_scheduleAll.unshift({label:'全部', value:0});//设置项目状态

      },//获取所有下拉框的数据
      addChangeTag(e){
        let tagName = this.$tool.checkArr(e, this.addTags);
        if (tagName != undefined) {
          if(tagName.length>40){
            this.$tool.error("最多输入40个字");
            this.contacts.user_invest_tag.pop();
          }else {
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
          this.gettags_user();
          setTimeout(()=>{this.getOneUserInfo();},100);
        })
        .catch(err => {
          this.loading=false;
          this.$tool.error("添加失败");
          this.$tool.console(err);
          this.dialogVisibleTag = false;

        })
      },//保存标签选择
      gettags_user(){
        this.$http.post(this.URL.getWxProjectCategory, {user_id: localStorage.user_id})
        .then(res => {
          let data = res.data.data;
          this.addTags = this.$tool.getTags_pro(data.tags_user);//设置人脉标签
          this.$global.func.getWxProjectCategory();
          this.getWxProjectCategory();
        })
      },//设置人脉标签
      /*设置意向项目右边*/
      getEchartData(){
        this.loading1 = true;
        this.$http.post(this.URL.getEnjoyProjectsGroup,{user_id:localStorage.user_id,card_id:this.contacts.card_id})
        .then(res=>{
          if(res.data.status_code==2000000) {
            let data = res.data.data;
            this.chartData=data;
            this.eChart(data.going,data.hold,data.reject);
          }
          this.loading1 = false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading1=false;
          this.$tool.error("加载超时");
        })
      },//获取意向项目数据(图表)
      getEnjoyProjects(){
        this.loading=true;
        this.getConpro.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPage2=1;
        this.getConpro.card_id=this.contacts.card_id;
        this.getConpro.page=1;
        this.getConpro.schedule_id='';
        this.$http.post(this.URL.getEnjoyProjects,this.getConpro)
        .then(res=>{
          if(res.data.status_code==2000000) {
            let data = res.data.data;
            this.enjoyProjects=this.setEnjoyProject(data);
            this.totalData2 = res.data.count;
            if(this.enjoyProjects.length==0) this.activeName='2';
          }
          this.loading = false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading=false;
          this.$tool.error("加载超时");
        })
      },//获取意向项目列表
      setEnjoyProject(arr){
        let newArr = new Array;
        arr.forEach((x)=> {
          let obj = new Object;
          obj.follow_id=x.follow_id;
          obj.area=x.area.area_title;
          obj.industry=x.industry;
          obj.is_exclusive=x.is_exclusive;
          obj.match=x.match;
          obj.pro_finance_stock_after=x.pro_finance_stock_after;
          obj.pro_intro=x.pro_intro;
          obj.project_id=x.project_id;
          obj.scale=x.scale.scale_money;
          obj.schedule_id=x.schedule_id;
          obj.stage=x.stage.stage_name;
          obj.width=this.selectChange(x.schedule_id);
          newArr.push(obj);
        });
        return newArr;
      },//设置意向项目列表
      getIndex(index){
        this.scheduleIndex=index;
      },
      eChart(going,hold,reject){
        if(this.chartCheck) this.chart = this.$echart.init(document.getElementById('echart'));
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'right',

            top:'30%',
            data:["推进中","Hold","Rejcet"],
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
                {value: going, name: '推进中'},
                {value: hold, name: 'Hold'},
                {value: reject, name: 'Rejcet'},
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
        this.chart.setOption(option);
        this.chartCheck=false;
      },//图表
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
        let index = this.scheduleIndex;
        if(index!=-1) {
          this.enjoyProjects[index].width = width
          let follow_id = this.enjoyProjects[index].follow_id;
          let schedule_id = this.enjoyProjects[index].schedule_id;
          this.$http.post(this.URL.setEnjoyProjectSchedule, {
            user_id: localStorage.user_id,
            follow_id: follow_id,
            schedule_id: schedule_id
          })
          .then(res => {
            this.$tool.success("设置成功");
            this.scheduleIndex=-1;
            this.loading = false;
            this.getEchartData();
          })
          .catch(err => {
            this.$tool.console(err, 2);
            this.loading = false;
            this.$tool.error("加载超时");
          })
        }
        return width;
      },//设置项目跟进进度
      selectSearch(e){
        this.loading=true;
        this.getConpro.schedule_id=e;
        this.getConpro.user_id=localStorage.user_id;
        this.currentPage2=1;
        this.getConpro.card_id=this.contacts.card_id;
        this.getConpro.page=1;
        this.$http.post(this.URL.getEnjoyProjects,this.getConpro)
        .then(res=>{
          if(res.data.data.length!=0){
            if(res.data.status_code==2000000) {
              let data = res.data.data;
              this.enjoyProjects=this.setEnjoyProject(data);
              this.totalData2 = res.data.count;
            }
          }else{
            this.enjoyProjects=[];
            this.totalData2 = 0;
          }
          this.loading = false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading=false;
          this.$tool.error("加载超时");
        })
      },//筛选意向项目
      /*设置匹配项目(右边)*/
      getInvestorsMatchProjects(){
        this.loading=true;
        this.getMatchPro.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPage3=1;
        this.getMatchPro.investor_id=this.contacts.investor_id;
        this.getMatchPro.card_id=this.contacts.card_id;
        this.getMatchPro.page=1;
        this.$http.post(this.URL.getInvestorsMatchProjects,this.getMatchPro)
        .then(res=>{
          if(res.data.status_code==2000000) {
            if(res.data.data){
              let data = res.data.data;
              this.matchProjects=this.setMatchProject(data);
              this.totalData3 = res.data.count;

            }
          }
          this.loading = false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading=false;
          this.$tool.error("加载超时");
        })
      },//获取匹配项目列表
      setMatchProject(arr){
        let newArr = new Array;
        arr.forEach((x)=> {
          let obj = new Object;
          obj.area=x.pro_area.area_title;
          obj.industry=x.pro_industry;
          obj.is_exclusive=x.is_exclusive;
          obj.match=x.match;
          obj.pro_finance_stock_after=x.pro_finance_stock_after;
          obj.pro_intro=x.pro_intro;
          obj.project_id=x.project_id;
          obj.scale=x.pro_scale.scale_money;
          obj.stage=x.pro_stage.stage_name;
          obj.is_follow=x.is_follow;
          newArr.push(obj);
        });
        return newArr;
      },//设置意向项目列表
      filterChangeCurrent2(page){
        this.loading=true;
        this.getMatchPro.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPage3=page;
        this.getMatchPro.investor_id=this.contacts.investor_id;
        this.getMatchPro.card_id=this.contacts.card_id;
        this.getMatchPro.page=page;
        this.$http.post(this.URL.getInvestorsMatchProjects,this.getMatchPro)
        .then(res=>{
          if(res.data.status_code==2000000) {
            if(res.data.data){
              let data = res.data.data;
              this.matchProjects=this.setMatchProject(data);
              this.totalData3 = res.data.count;
            }
          }
          this.loading = false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading=false;
          this.$tool.error("加载超时");
        })
      },//控制匹配项目页码
      delMatchAction(data){
        let delData=new Object;
        delData.user_id=localStorage.user_id;
        delData.investor_id=this.contacts.investor_id;
        delData.project_id=data.project_id;
        this.$confirm('此操作将移除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading=true;
          this.$http.post(this.URL.exceptMatchAction,delData)
          .then(res=>{
            if(res.data.status_code==2000000) {
              this.$tool.success("移除成功")
              this.getInvestorsMatchProjects();
            }
            this.loading = false;
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.loading=false;
            this.$tool.error("加载超时");
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },//移除匹配
      /*项目推送*/
      getpushCount(){
        this.$http.post(this.URL.pushCount,{
          user_id: localStorage.user_id})
          .then(res=>{
            let data = res.data.data;
            this.pushCount=data.push_count.remain_times;
//          this.$tool.console(data.push_count);
          })
          .catch(err =>{
            this.$tool.console(err,2);
            this.loading=false;
          })
      },//获取剩余推送次数
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.push();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },//弹框确定推送
      push(){
        if(this.pushCount!=0){
            let pushData=new Object;
            pushData.user_id= localStorage.user_id;
            pushData.card_id=this.contacts.card_id;
            pushData.email=this.pushData.email;
            pushData.title="";
            pushData.body=this.pushData.body;
            pushData.project_ids=new Array;
            pushData.project_ids.push(this.pushData.project_id);
            this.$http.post(this.URL.pushUser, pushData)
              .then(res => {
                let data=res.data.data;
                this.$tool.success("推送成功");
                this.getpushCount();
                this.getInvestorsMatchProjects();
                this.dialogPushVisible = false;
              })
              .catch(err => {
                this.$tool.console(err);
                this.$tool.success("推送失败");
                this.dialogPushVisible = false;
              })
          }else{
          this.$tool.warning("您今日的推送次数已用完")
        }
      },//推送


    },
    created(){
      this.loading=true;
      this.getUserId();
      if(this.contacts.user_id!=0) this.getProjectList(1)
      else this.projectLists=[];
      this.getOneUserInfo();
      this.$global.func.getWxProjectCategory();
      setTimeout(()=>{
        this.getEchartData();
        console.log(this.contacts);
        this.getWxProjectCategory();
        this.getInvestorsMatchProjects();
        this.getEnjoyProjects();
        this.loading=false;
      },800)
    },
    //Echart组件
    mounted(){
      this.eChart(this.chartData.going,this.chartData.hold,this.chartData.reject);
    },
    components: {
      alertprojectdetail,
      addfollow,
      projectpush,
      projectpreview
    },
    watch : {
      dialogVisibleTag : function (e) {
        if (e) {
          this.$global.func.getWxProjectCategory();
          setTimeout(()=>{this.getWxProjectCategory();},200)
        }
      }
    }
  }
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/contactsDetails';
</style>
