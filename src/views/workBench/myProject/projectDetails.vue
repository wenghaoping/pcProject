<template>
  <div id="projectDetails" class="clearfix"  v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="contain-grid contain-center1 fl">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box clearfix">
        <div class="item-lists item-lists-top clearfix">
          <div class="item-lists-inner-left fl">
            <div class="item height">
              <el-tag type="success" v-if="project.open_status==1">公开</el-tag>
              <el-tag type="primary" v-else>私密</el-tag>
              <el-tooltip class="item height" effect="dark" placement="top-start">
                <div slot="content">1. 私密项目仅自己/团队成员可见,项目数据安全不泄露　<br/>2. 公开项目投资人可申请查看,并参与市场融资对接</div>
              <span class="icon"><img src="../../../assets/images/why.png"/></span>
              </el-tooltip>
              <span class="title">{{project.pro_name}}</span>
              <span class="company">{{project.pro_company_name}}</span>
            </div>
            <div class="item height" style="margin-top: 14px;">
              <div class="doc">{{project.pro_intro}}</div>
            </div>
            <div class="item height" style="margin-top:18px;">
              <span class="mid-tag" v-for="industry in project.pro_industry">{{industry.industry_name}}</span>
            </div>
            <div class="item height" style="margin-top:18px;">
              <span class="big-tag">{{project.pro_scale.scale_money}}</span><span class="split">｜</span>
              <span class="big-tag">{{project.pro_area.area_title}}</span><span class="split">｜</span>
              <span class="big-tag">{{project.pro_finance_stock_after}}%</span><span class="split">｜</span>
              <span class="big-tag">{{project.pro_stage.stage_name}}</span>
              <span class="flower" v-if="project.follow_up!=''">跟进人 : {{project.follow_up}}</span>

            </div>
            <div class="item height" style="margin-top:18px;" v-if="project.pro_source!=''">
              <span class="flower2">来源 : {{project.pro_source}}</span>
            </div>
            <div class="item height">
            <span class="project" >
              <span class="title">项目完整度:</span>
              <span class="number" v-if="project.pro_total_score!=''">{{project.pro_total_score}}%</span>
              <span class="number" v-else>去完善</span>
              <span class="more">超过60%的项目更易被投资人关注</span>
            </span>
              <span class="project" style="width: 292px;">
              <div class="item progress height">
                <div class="txt begin" :style="styleObject">项目线索</div>
                <div class="progress-bar">
                  <span class="circle circle-s"></span>
                  <span class="bar-bg1">&nbsp;</span>
                  <span  class="txt state">{{project.pro_schedule.schedule_name}}</span>
                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="txt end">佣金收讫</div>
                <div class="img"><img src="../../../assets/images/editTo.png"></div>
                 <div class="selectIn fr">
                    <el-select v-model="project.pro_schedule.schedule_id" placeholder="请选择" @change="selectChange2">
                      <el-option
                        v-for="item in schedule"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
              </div>
            </span>
            </div>
            <div class="onlyone">
              <img v-if="project.is_exclusive==1" src="../../../assets/images/onlyonedark.png"/>
              <img v-else-if="project.is_exclusive==2" src="../../../assets/images/onlyonelight.png"/>
            </div>
          </div>
          <div class="item-lists-inner-right fl">
            <div class="text">
              <img src="../../../assets/images/text.png"/>
            </div>
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">根据项目公司名称检索微天使数据库,快速了解企业的<br/>工商、核心团队、产品数据、历史融资、新闻谬论等全方面信息</div>
              <span class="icon icon2" style="cursor: pointer"><img src="../../../assets/images/why.png"/></span>
            </el-tooltip>
            <div class="button-float" @click="goOnkey" style="cursor:pointer" >
            一键尽调
          </div>
          </div>
        </div>
        <div style="background-color: #eff2f7;height: 17px;width: 850px;"></div>
        <div class="item-lists clearfix" style="padding-top: 10px;">
          <el-tabs v-model="show" @tab-click="handleClick" style="position: relative">
            <el-tab-pane label="项目详情" name="detail">
              <div class="ul-lists">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/projectIntroduce.png">项目介绍</span>
                  <div class="person-info" v-if="project.contact.user_name!=''">
                    <span>项目联系人 : </span>
                    <span>{{project.contact.user_name}}</span>
                    <span>{{project.contact.user_mobile}}</span>
                  </div>
                </div>
                <div class="item" style="margin-top:33px;">
                  <span class="person-tag" v-for="tag in project.tag" v-if="tag.type==0">{{tag.tag_name}}</span>
                </div>
                <div class="item" style="margin-top:24px;">
                  <div class="paper" v-if="project.pro_BP.length!=0">
                    <img class="img" style="padding-left: 16px;" src="../../../assets/images/paper.png">
                    <span class="pt">{{project.pro_BP.file_title}}</span>
                    <!--<el-button type="text" size="mini">查看</el-button>-->
                    <el-button type="text" size="mini" @click="download(project.pro_BP.file_id)">下载</el-button>
                  </div>
                </div>
                <div class="item" style="margin-top:24px;height: 49px;">
                  <div class="bot-det" v-if="project.pro_status!=''">
                    <span class="det-title">运营状态：</span>
                    <span class="del-info">{{project.pro_status.status_name}}</span>
                  </div>
                  <div class="bot-det" style="margin-left:170px;" v-if="project.pro_website!=''">
                    <span class="det-title">产品链接：</span>
                    <span class="del-info"><a :href="project.pro_website"  target=_blank>{{project.pro_website}}</a></span>
                  </div>
                  <div class="bot-det" style="float:right;" v-if="project.pro_company_scale!=''">
                    <span class="det-title">公司规模：</span>
                    <span class="del-info">{{project.pro_company_scale.comp_scale_value}} 人</span>
                  </div>
                </div>
                <div class="line"></div>
                <div class="ul-lists" style="margin-top:16px;padding: 0">
                  <div class="item">
                    <span class="title" style="font-size: 16px;">项目亮点</span>
                    <div class="prod-doc" style="font-size: 13px;">{{project.pro_goodness}}</div>
                  </div>
                </div>
              </div>
              <!--核心团队-->
              <div class="ul-lists" style="margin-top:16px;" v-if="project.core_users!=''">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/team.png">核心团队</span>
                </div>
                <div class="item" style="margin-top:33px;">
                  <span class="person-tag" v-for="tag in project.team_tag" v-if="tag.type==1">{{tag.tag_name}}</span>
                </div>
                <div style="margin-top:32px;"></div>
                <div class="item" v-for="user in project.core_users" style="margin-top:10px;">
                  <span class="p-name">{{user.ct_member_name}}</span>
                  <span class="p-mg">{{user.ct_member_career}}</span>
                  <div class="p-gf">股权占比 : <span>{{user.stock_scale}}%</span></div>
                  <div class="p-doc">{{user.ct_member_intro}}</div>
                  <div class="line"></div>
                </div>

              </div>
              <!--融资信息-->
              <div class="ul-lists" style="margin-top:16px;">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/money.png">融资信息</span>
                  <div class="rz-details">
                    <div class="rz-detail">
                      <p class="det-title">期望融资</p>
                      <p class="det-info">{{project.pro_scale.scale_money}}</p>
                    </div>
                    <div class="rz-detail">
                      <p class="det-title">投后股份</p>
                      <p class="det-info">{{project.pro_finance_stock_after}}%</p>
                    </div>
                    <div class="rz-detail">
                      <p class="det-title">估值</p>
                      <p class="det-info">{{project.pro_finance_value}}万</p>
                    </div>
                  </div>
                </div>
                <div class="item" style="margin-top:35px;" >
                  <span class="sec-title" v-if="project.pro_finance_use!=''">资金用途</span>
                  <div class="yt-doc">
                    {{project.pro_finance_use}}
                  </div>
                </div>
                <div class="item" style="margin-top:6px;" v-if="project.pro_history_finance.length!=0">
                  <div>

                    <!--                <div class="v-progress" style="height: 121px;">
                                      <span class="circle circle-s">&nbsp;</span>
                                      <span class="v-line v-line-1">&nbsp;</span>
                                      <span class="circle circle-e">&nbsp;</span>
                                    </div>-->
                    <div class="v-progress-table">
                      <div class="v-progress-txt" v-for="finance in project.pro_history_finance">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                        <span class="pro-txt-1">{{finance.finance_time}}</span>
                        <span class="pro-txt-2">{{finance.pro_finance_scale}}</span>
                        <span class="pro-txt-3">{{finance.belongs_to_stage.stage_name}}</span>
                        <span class="pro-txt-4">{{finance.pro_finance_investor}}</span>
                        <div class="line"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--里程碑-->
              <div class="ul-lists" style="margin-top:16px;" v-if="project.pro_develop!=''">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/Milepost.png">里程碑</span>
                </div>
                <div class="item" style="margin-top:6px;">
                  <div>
                    <!--                <div class="v-progress" style="height: 182px;">
                                      <span class="circle circle-s">&nbsp;</span>

                                      <span class="v-line v-line-1">&nbsp;</span>
                                      <span class="circle circle-c">&nbsp;</span>
                                      <span class="v-line v-line-2">&nbsp;</span>

                                      <span class="circle circle-e">&nbsp;</span>
                                    </div>-->
                    <div class="v-progress-table">
                      <div class="v-progress-txt" v-for="develop in project.pro_develop">
                    <span class="radio_line">
                      <span class="radio"></span>
                      <!--<span class="l-line"></span>-->
                    </span>
                        <span class="pro-txt-1">
                      {{develop.dh_start_time}}
                    </span>
                        <span class="pro-txt-2"  style="color:#5e6d82;">
                      {{develop.dh_event}}
                    </span>
                        <div class="line"></div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              <!--FA签约协议-->
              <div class="ul-lists" style="margin-top:16px;margin-bottom: 100px;" v-if="project.pro_FA!=''">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/money.png">FA签约协议</span>
                  <div class="rz-details" >
                    <div class="rz-detail" style="width: 25%">
                      <p class="det-title">签约佣金</p>
                      <p class="det-info">{{project.pro_FA.commission}}%</p>
                    </div>
                    <div class="rz-detail" style="width: 25%">
                      <p class="det-title">股权赠与</p>
                      <p class="det-info">{{project.pro_FA.stock_right}}%</p>
                    </div>
                    <div class="rz-detail" style="width: 25%">
                      <p class="det-title">其他权益</p>
                      <p class="det-info">{{project.pro_FA.stock_other}}%</p>
                    </div>
                    <div class="rz-detail" style="width: 25%">
                      <p class="det-title">跟投权</p>
                      <p class="det-info">{{project.pro_FA.stock_follow}}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="跟进记录" name="flow">
              <folowup :proid="project.project_id">

              </folowup>
            </el-tab-pane>

            <el-tab-pane label="文件管理" name="files">
              <filemanagement :proid="project.project_id">

              </filemanagement>
            </el-tab-pane>
          </el-tabs>
          <div class="ul-lists list tc" >
            <div class="toButton" style="padding-left: 0">
              <button  @click="toEdit" class="btn1">编辑</button>
              <button  @click="addFollow" class="btn1">写跟进</button>
              <button  @click="projectPush" class="btn1">项目推送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contain-grid contain-right-1 fl">
      <div class="main-box">
        <el-tabs v-model="activeName" @tab-click="handleClick2">
          <el-tab-pane name="1">
            <span slot="label">意向投资人
                <el-tooltip class="item" effect="dark" placement="top-start">
                  <div slot="content">用户可以主动推送项目／添加跟进意向投资人，维护<br/>意向投资人不同阶段对应的跟进状态</div>
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
                    <div class="item_list" v-for="(enjoyInvestor,index) in enjoyInvestors">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">{{enjoyInvestor.match}}%</span>
                        <span class="pro fr" v-if="enjoyInvestor.source=='follow'">我跟进关联的用户</span>
                        <span class="pro fr" v-if="enjoyInvestor.source=='push'">我推送的用户</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail(enjoyInvestor)" class="click">
                          <div class="block">
                            <span class="name">{{enjoyInvestor.user_real_name}}</span>
                            <span class="zhiwei">{{enjoyInvestor.user_company_career}}</span>
                            <span class="imgs" v-if="enjoyInvestor.user_group!=''"><img src="../../../assets/images/renzhen.png"/></span>
                            <span class="ren">{{enjoyInvestor.user_group}}</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company">{{enjoyInvestor.user_company_name}}</span>
                          </div>
                          <div class="block" style="margin-top: 42px;">
                            <span class="company ft13">投资领域：{{enjoyInvestor.user_invest_industry}}</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company ft13">投资轮次：{{enjoyInvestor.user_invest_stage}}</span>
                          </div>
                        </div>
                        <div class="li change_li">
                      <span class="all fl">
                        <span class="all_inner" :style="{width:enjoyInvestor.width + 'px' }"></span>
                      </span>
                          <div class="selectIn fl" style="margin-left: 13px;margin-top: -17px;" @click="getIndex(index)">
                            <el-select v-model="enjoyInvestor.schedule_id" placeholder="请选择" @change="selectChange">
                              <el-option
                                v-for="item in follow_schedule"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </div>
                        </div>

                        <div class="img" v-if="enjoyInvestor.user_avatar_url!=''"><img :src="enjoyInvestor.user_avatar_url"></div>
                        <div class="img" v-else><img src="../../../assets/images/logo.png"></div>
                      </div>
                    </div>
                  </div>
                  <el-pagination
                    class="pagination fr"
                    small
                    v-if="totalData!=0"
                    @current-change="filterChangeCurrent"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="totalData">
                  </el-pagination>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">买家图谱
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">根据微天使匹配算法从您的人脉库，全网人脉库算出<br/>该项目的意向投资人</div>
                <div class="img"><img src="../../../assets/images/why.png"></div>
    </el-tooltip>
            </span>
            <el-collapse-transition>
              <div v-show="!tabs">
                <div class="main_right main_left">
                  <div class="item_lists">
                    <div class="item_list" v-for="projectMatchInvestor in ProjectMatchInvestors">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">{{projectMatchInvestor.match}}%</span>
                        <span class="pro fr">我的/团队人脉</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail(projectMatchInvestor)" class="click">
                          <div class="block">
                            <span class="name">{{projectMatchInvestor.investor_name}}</span>
                            <span class="zhiwei">{{projectMatchInvestor.investor_career}}</span>
                            <span class="imgs"><img src="../../../assets/images/renzhen.png"/></span>
                            <span class="ren">买方FA</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company">{{projectMatchInvestor.investor_company}}</span>
                          </div>
                          <div class="block" style="margin-top: 42px;">
                            <span class="company ft13">投资领域：{{projectMatchInvestor.industry_tag}}</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company ft13">投资轮次：{{projectMatchInvestor.stage_tag}}</span>
                          </div>
                        </div>
                        <div class="li clearfix" style="margin-top: 12px;">
                          <button class="button fl">
                            <div class="img1" @click="industryPush(projectMatchInvestor)"><img src="../../../assets/images/tuisong.png"></div>推送</button>
                          <button class="button fl">
                            <div class="img1" @click="industryDelete(projectMatchInvestor)"><img src="../../../assets/images/yichu.png"></div>移除</button>
                        </div>

                        <div class="img" v-if="projectMatchInvestor.investor_logo_url!=''"><img :src="projectMatchInvestor.user_avatar_url"></div>
                        <div class="imgText" v-else>{{projectMatchInvestor.investor_logo_text}}</div>

                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
        </el-tabs>
        <button class="btn" @click="addFollow">添加意向投资人</button>
      </div>
    </div>
    <!--一键尽调弹窗-->
    <research :dialog-visible="dialogVisible" :company-id="companyid" :comp-name="companyname" v-on:changeall="dialogVisiblechange" v-on:changeallin="dialogVisiblechangeIn" lock-scroll>

    </research>

    <!--尽调搜索弹窗-->
    <el-dialog title="一键尽调" :visible.sync="dialogSearchVisible">
      <el-form label-position="top" label-width="140px">
        <el-form-item label="请输入你要尽调的公司">
          <el-input v-model="searchName" icon="search" :on-icon-click="handleIconClick" @keyup.native.enter="handleIconClick" ></el-input><!--@change="searchChange"-->
        </el-form-item>
      </el-form>
      <ul class="onsearch">
        <li v-for="seachCompany in seachCompanys" @click="search(seachCompany)">{{seachCompany.company_name}}</li>
      </ul>
    </el-dialog>

    <!--人脉详情弹窗-->
    <alertcontactsdetail :dialog-con-visible="dialogConVisible" :cardid="cardid" :userid="userid" v-on:changeCon="dialogConchange"></alertcontactsdetail>

    <!--项目详情弹窗-->
    <alertprojectdetail :dialog-con-visible2="dialogConVisible2" :proid="project.project_id" v-on:changeCon2="dialogConchange2"></alertprojectdetail>

    <!--写跟进弹框-->
    <addfollow :dialog-follow="dialogFollow" :projectid="projecmessage.project_id" :projectname="projecmessage.project_name" @changeClose="closeFollow"></addfollow>

    <!--项目推送项目入口弹窗-->
    <projectpush2 :dialog-push="dialogPushVisible" :proid="project.project_id" :proname="project.pro_name"  @changeClose="dialogVisiblechangeCloase"></projectpush2>

    <!--自定义添加-->
    <customer-add-contacts :dialog-form-visible="dialogFormVisible"></customer-add-contacts>

  </div>
</template>

<script type="text/ecmascript-6">

  import research from './onekeyresearch.vue'
  import folowup from './followUpDetail.vue'
  import filemanagement from './fileManagement.vue'
  import alertcontactsdetail from './alertContactsDetail.vue'
  import alertprojectdetail from '../../../components/alertProjectDetail.vue'
  import addfollow from './../followUp/addFollow.vue'
  import projectpush2 from './projectPush2.vue'
  import customerAddContacts from '../../../components/customerAddContacts.vue'

  export default {
    data(){
      return {
        dialogFormVisible:true,
        companyname:"",//公司名称给一键尽调用的
        companyid:"",//公司id给一键尽调用的
        cardid:"",//人脉详情弹框用(点击的那个人的cardid)
        userid:"",//人脉详情弹框用(点击的那个人的userid)
        projecmessage:{
          project_id:'',
          project_name:''
        },//项目名称,ID
        dialogFollow:false,//添加意向投资人
        show: "detail",
        dialogVisible: false,//一键尽调弹框
        dialogSearchVisible:false,//公司搜索弹框
        dialogPushVisible:false,//项目推送入口弹框
        dialogConVisible:false ,//人脉详情弹窗
        dialogConVisible2:false,//项目详情弹窗
        searchName:"",
        form: {
          name: '',
          region: ''
        },
        loading: false,
        project: {
          project_id: "",//项目id59W2a0GE
          pro_name: "",//项目名称HoopEASY商业计划PPT+for+pitch
          pro_company_name: "",//HoopEASY
          pro_company_scale: {
            comp_scale_id: 1,
            comp_scale_value: "1-20"
          },//公司规模
          pro_source: "",//项目来源微天使项目
          pro_intro: "",//项目简介一款最酷的篮球社交软件
          pro_total_score: "",//98.00
          pro_finance_value: "",//项目估值10.00
          is_exclusive: 0,//0其他 1独家 2非独家
          open_status: 1,//0私密  1公开
          pro_goodness: "",//项目介绍专注于篮球项目的移动端社交平台。在基于用户所处的地理位置基础上，将用户个人，球队，比赛，场馆等资源有机整合，形成一个以用户为核心的垂直网络社区，带给篮球爱好者全新的社交方式和运动体验。
          pro_website: "",//官方网址www.baidu.com
          contact: {
            user_name: "",//赵工佐
            user_mobile: ""//18551711000
          },//项目联系人

          pro_schedule: {
            "schedule_id": 3,
            "schedule_name": "",//考察
            "created_at": null,
            "updated_at": "2017-06-06 11:00:21",
            "user_id": 0
          },//项目进度

          pro_status: {
            "status_id": 3,
            "status_name": "",//上线
            "created_at": null,
            "updated_at": null
          },//运营状态

          pro_area: {
            "area_id": 2,
            "area_title": "北京市",
            "pid": 1,
            "created_at": null,
            "updated_at": null,
            "pivot": {
              "item_id": 37,
              "area_id": 2,
              "created_at": "2017-06-01 16:27:35",
              "updated_at": "2017-06-01 16:27:35",
              "priority": 1
            }
          },//区域
          pro_stage: {
            "stage_id": 2,
            "stage_name": "天使轮",
            "sort": 2,
            "created_at": null,
            "updated_at": null,
            "pivot": {
              "item_id": 37,
              "stage_id": 2,
              "created_at": "2017-06-01 16:23:04",
              "updated_at": "2017-06-13 18:33:31",
              "priority": 1
            }
          },//轮次

          pro_scale: {
            "scale_id": 1,
            "scale_money": "100W以下",
            "created_at": null,
            "updated_at": null,
            "pivot": {
              "item_id": 37,
              "scale_id": 1,
              "created_at": null,
              "updated_at": null,
              "priority": 1
            }
          },//规模

          pro_industry: [
            {
              "industry_id": 12,
              "industry_name": "社交网络",
              "parent_id": 0,
              "created_at": null,
              "updated_at": null,
              "pivot": {
                "item_id": 37,
                "industry_id": 12,
                "created_at": "2017-06-01 16:21:46",
                "updated_at": "2017-06-01 16:21:46",
                "priority": 1
              }
            }
          ],//领域标签

        /*核心团队人员*/
          core_users: [
            {
              project_ct_id: 30,
              ct_index: "9bd0c8d7d615832340340aab0c0625b7",
              project_id: 37,
              project_index: "275fa4f135eecf08e5660d23e294e6cd",
              ct_member_name: "",//赵工佐
              ct_member_career: "",
              ct_member_intro: "",
              created_at: null,
              updated_at: null,
              stock_scale: null
            }
          ],
        /*//历史融资信息*/
        pro_history_finance: [{
          project_id: 37,
          pro_finance_stage: 1,//轮次
          pro_finance_scale: "100.00",//金额
          pro_finance_investor: "周杰伦",//投资人
          created_time: null,
          updated_time: null,
          belongs_to_stage:{

          }
        }],
        /*自定义标签*/
          tag: [
            {
              tag_id: 1,
              tag_name: "海贼王",
              user_id: 0,
              project_id: 37,
              created_time: null,
              updated_time: null,
              type: 0//项目标签
            }
          ],
        /*文件列表*/
          pro_file: [
            {
              file_id: 1,
              project_id: 37,
              file_title: "项目文件1",
              file_ext: "doc",
              file_url: "/data/url",
              created_at: null,
              updated_at: null,
              deleted_at: null
            }],
        /*里程碑*/
          pro_develop: [
            {
              project_dh_id: 6,
              dh_index: "24c2886c937e9a3eea25c7d0ffe7f713",
              project_id: 37,
              project_index: "275fa4f135eecf08e5660d23e294e6cd",
              dh_start_time: "1436112000",//时间
              dh_end_time: "1443542400",
              dh_event: "组建团队和设立办公室",//事件
              created_at: null,
              updated_at: null
            }],
          /*FA签约*/
          pro_FA: {
            project_id: 37,
            commission: "63.00",//签约佣金
            stock_right: "13.00",//股权赠与
            stock_follow: "12.00",//跟投权
            stock_other: "55.00",//其他权益
            created_at: null,
            updeted_at: null
          },
         /*BP文件*/
          pro_BP: {
            file_id: 34,
            project_id: 37,
            user_id: 181391,
            file_title: "",
            bp_ext: "pptx",
            bp_url: "20161201/e6b499c3e94ed4247147cdbfd50ca319.pptx",
            created_at: "2017-06-01 18:14:38",
            updated_at: "2017-06-01 18:14:38",
            deleted_at: null
          }

        },
        seachCompanys:[],
        styleObject: {
          color: '',
        },
        value1:'',////一键尽调边上绑定是数据
        value: 1,
        status_name:'',//一键尽调边上那个按钮线里的字
        activeName:'2',
        tabs:true,//标签切换
        currentPage:1,//当前第几页(意向投资人)
        totalData:0,//总数(意向投资人)
        currentPageInvestors:1,//当前第几页(买家图谱)
        totalInvestors:0,//总数(买家图谱)

        schedule:[],//项目进度
        follow_schedule: [/*{
         value: 1,
         label: '项目推进中'
         }*/],//项目跟进进度
        follow_scheduleAll: [/*{
         value: 1,
         label: '项目推进中'
         }*/],//项目跟进进度搜索用,多一个全部
        searchSchedule:0,//意向项目的筛选进度
        getConCon:{},//获取意向投资人的请求参数
        chartData:{
          going:'',
          hold:'',
          reject:''
        },//图表的数据
        enjoyInvestors:[
          /*{
            card_id: "1Np889pR",
            import_user_name: "李凯强",
            is_add:false,
            is_bind:0,
            schedule_id:2,
            user_invest_industry:"人工智能、大数据、理财、企业服务台",
            user_invest_stage:"轮次",
            type:"card",
            user_avatar_url:"",//头像地址
            user_company_career:"投资总监",//职位
            user_company_name:"杭州偷着乐",// 公司名称
            match:"12",//匹配度
            user_group:"投资机构",
            width:40
          }*/
        ],//意向投资人数据
        scheduleIndex:-1,//设置跟进状态的位置(单独需要)
        takechange:false,//这个我就是随便用用
        chart:"",
        chartCheck:true,

        getInvestors:{},//获取买家图谱请求参数
        ProjectMatchInvestors:[
          /*{
            follow_status:0,
            industry_tag:"大数据",//领域
            investor_career:"职位",//职位
            investor_company:"西安中永顺投资管理有限公司",//公司
            investor_desc:"",//介绍
            investor_id:"d8W13Jr5",//id
            investor_logo_text:"李",//名片名字
            investor_logo_url:"",
            investor_name:"李凯伦",//名字
            investor_type:2,
            stage_tag:"天使轮",//轮次
            user_id: "kpbmXNmW",
            match:12,//匹配度
          }*/
        ],//买家图谱数据
      }
    },
    computed:{
    },
    components: {
      research,
      folowup,
      filemanagement,
      alertcontactsdetail,
      alertprojectdetail,
      addfollow,
      projectpush2,
      customerAddContacts,
    },
    //Echart组件
    mounted(){
      this.eChart();
    },
    methods:{
      addFollow(){
        this.dialogFollow=true;
        this.projecmessage.project_id=this.project.project_id;
        this.projecmessage.project_name=this.project.pro_intro;
      },//点击写跟近按钮
      closeFollow(msg){
        this.dialogFollow=msg;
        this.getEnjoyedInvestors()
      },//关闭添加跟进
      download(e){
        const url=this.URL.weitianshi+this.URL.download+"?user_id="+localStorage.user_id+"&file_id="+e
        window.location.href=url;
      },//下载文件
      searchChange(queryString){
        this.$tool.console(queryString)
        this.$http.post(this.URL.selectCompany,{user_id:localStorage.user_id,company_name:queryString})
          .then(res=>{
            this.seachCompanys=[];
            let data =res.data.data;
            if(data.length==0) this.seachCompanys=[{company_name:"匹配不到你要搜索的公司,请重新继续输入",com_id:-1}];
            else this.seachCompanys=data;
            this.$tool.console(res);
          })
          .catch(err=>{
            this.$tool.console(err);
          })
      },//搜索公司
      goOnkey(){
        if(this.project.pro_company_name==""){
          this.dialogSearchVisible = true;
        }else{
          this.$http.post(this.URL.getCrawlerCompany, {user_id: localStorage.user_id, company_name: this.project.pro_company_name})
            .then(res => {
              let data = res.data.data;
              if(data.length==0) {//搜索不到信息
                this.dialogSearchVisible = true;
                this.searchName=this.project.pro_company_name;
                this.companyname=this.project.pro_company_name;
                this.seachCompanys=[{company_name:"匹配不到你要搜索的公司,请重新继续输入",com_id:-1}];
              }else{//搜索到了
                this.dialogVisible = true;
                this.companyid=data.company.com_id;
                this.companyname=this.project.pro_company_name;
              }
            })
            .catch(err => {
//          this.alert("加载失败");
              this.$tool.console(err);
            })
        }
      },//一键尽调按钮
      search(data){
        if(data.com_id==-1) this.$tool.error("请输入公司")
        else {
          this.companyid=data.com_id;
          this.companyname=data.company_name;
          this.dialogVisible = true;
        }
      },//点击下拉选择公司后
      handleIconClick(){
        this.searchChange(this.searchName);
      },//输入搜索
      handleClick:function(tab, event){
        this.show = tab.name ;
      },
      goBack(){
        this.$router.go(-1);
      },//返回上一层
      dialogVisiblechange(msg){
        this.dialogVisible=msg;
      },//传递给一键尽调窗口
      dialogVisiblechangeIn(msg){
        this.dialogSearchVisible=msg;
      },//传递给一键尽调搜索窗口
      dialogConchange(msg){
        this.dialogConVisible=msg;
      },//人脉详情弹窗关闭
      dialogConchange2(msg){
        this.dialogConVisible2=msg;
      },//项目详情弹窗关闭
      dialogVisiblechangeCloase(msg){
        this.dialogPushVisible=msg;
      },
      getLocalTime(data) {
        for(let i=0; i<data.length; i++){
          data[i].dh_start_time=new Date(parseInt(data[i].dh_start_time) * 1000).toLocaleString().substr(0, 9)
        }
      },//设置时间1
      getLocalTime2(data) {
        for(let i=0; i<data.length; i++){
          data[i].finance_time=new Date(parseInt(data[i].finance_time) * 1000).toLocaleString().substr(0, 9)
        }
      },//设置时间2
      getProjectTag(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          if(arr[i].type==2){
            str+=arr[i].tag_name+'.'
          }
        }
        return str
      },//项目来源编辑
      getProjectDetail () {
        this.$http.post(this.URL.getProjectDetail,{user_id:localStorage.user_id,project_id:this.project.project_id})
          .then(res=>{
            this.loading=false;
            let data = res.data.data;
            /*            for(let key in data){
              if(data[key]=="") data[key]="-"
            }
            for(let i=0; i<data.core_users.length; i++){
                if(data.core_users[i].stock_scale==null){
                  data.core_users[i].stock_scale="－"
                }
            }*/

            if(data.pro_scale=="") {data.pro_scale={};data.pro_scale.scale_money="-";}
            if(data.pro_area=="") {data.pro_area={};data.pro_area.area_title="-";}
            if(data.pro_schedule=="") {data.pro_schedule={};data.pro_schedule.schedule_name="-";this.styleObject={color:"#20a0ff"}}
            if(data.pro_stage=="") {data.pro_stage={};data.pro_stage.stage_name="-"}
            this.getLocalTime(data.pro_develop);
            this.getLocalTime2(data.pro_history_finance);
            this.project=data;
            this.project.follow_up=data.follow_up.follow_desc;
            this.project.pro_source=this.getProjectTag(data.tag);
            this.project.pro_BP.file_title=data.pro_BP.file_title+'.'+data.pro_BP.file_ext;

          })
          .catch(err=>{
            this.loading=false;
            this.$tool.console(err,2)
          })
      },//获取项目详情数据
      getWxProjectCategory(){
        this.schedule = this.$global.data.schedule;//设置项目跟进状态
        this.follow_schedule = this.$global.data.follow_schedule.slice(0);//设置项目状态
        this.follow_scheduleAll = this.$global.data.follow_schedule.slice(0);
        this.follow_scheduleAll.unshift({label:'全部', value:0});//设置项目状态
      },//获取所有下拉框的数据
      toEdit(){
        this.$router.push({ name: 'editproject',query: { project_id:this.project.project_id}},)
      },
      projectPush(){
        this.dialogPushVisible=true;
      },//项目推送入口
      getprojectId(){
        this.project.project_id=this.$route.query.project_id;
        this.show=this.$route.query.show || "detail";
      },//获取id
      toEdit(){
        this.$router.push({ name: 'editproject',query: { project_id:this.project.project_id}},)
      },//编辑项目
      toDetail(data){
        this.cardid=data.card_id;
        this.userid=data.user_id;
        this.dialogConVisible=true;
      },//打开人脉详情弹窗
      selectChange2(e){
        if(this.takechange){
          let getData={
            user_id: localStorage.user_id,
            project_id: this.project.project_id,
            schedule_id: e
          };
          this.loading = true;
          this.$http.post(this.URL.setProjectSchedule, getData)
            .then(res => {
              let data = res.data.data;
              this.$tool.success("设置成功");
              this.loading = false;
              this.project.pro_schedule.schedule_id=data.schedule_id;
              this.project.pro_schedule.schedule_name=data.schedule_name;

            })
            .catch(err => {
              this.$tool.console(err, 2);
              this.loading = false;
              this.$tool.error("加载超时");
            })
        }
        this.takechange=true;
      },//hold切换后
      filterChangeCurrent(page){
        this.loading=true;
        this.getConCon.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPage=page;
        this.getConCon.project_id=this.project.project_id;
        this.getConCon.page=page;
        this.getConCon.schedule_id='';
        this.$http.post(this.URL.getEnjoyedInvestors,this.getConCon)
          .then(res=>{
            if(res.data.status_code==2000000) {
              let data = res.data.data;
              this.enjoyInvestors=this.setEnjoyInvestor(data);
              this.totalData = res.data.count;
            }
            this.loading = false;
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.loading=false;
            this.$tool.error("加载超时");
          })
      },//控制意向投资人页码
      handleClick2(tab, event) {

        if(tab.name=="1") this.tabs=true;
        else this.tabs=false
      },//点击标签

      /*设置意向投资人右边*/
      getEchartData(){
        this.loading1 = true;
        this.$http.post(this.URL.getEnjoyedInvestorsGroup,{user_id:localStorage.user_id,project_id:this.project.project_id})
          .then(res=>{
            if(res.data.status_code==2000000) {
              let data = res.data.data;
              this.chartData=data;
              this.eChart(data.going,data.hold,data.reject)
            }
            this.loading1 = false;
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.loading1=false;
            this.$tool.error("加载超时");
          })
      },//获取意向项目数据(图表)
      getEnjoyedInvestors(){
        this.loading=true;
        this.getConCon.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPage=1;
        this.getConCon.project_id=this.project.project_id;
        this.getConCon.page=1;
        this.getConCon.schedule_id='';
        this.$http.post(this.URL.getEnjoyedInvestors,this.getConCon)
          .then(res=>{
            if(res.data.status_code==2000000) {
              let data = res.data.data;
              this.enjoyInvestors=this.setEnjoyInvestor(data);
              this.totalData = res.data.count;
            }
            this.loading = false;
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.loading=false;
            this.$tool.error("加载超时");
          })
      },//获取意向投资人列表
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
      set_user_group(arr){
        let str="";
        if(arr.length===0) {
          str="";
        } else {
          arr.forEach((x)=> {
            str += x.group_title + '、';
          })
        }
        return str;
      },//列表轮次处理

      setEnjoyInvestor(arr){
        let newArr = new Array;
        arr.forEach((x)=> {
          let obj = new Object;
          obj.follow_id=x.follow_id;
          obj.user_id=x.card.user_id;
          obj.card_id=x.card.card_id;
          obj.user_real_name=x.card.user_real_name;
          obj.is_add=x.card.is_add;
          obj.is_bind=x.card.is_bind;
          obj.schedule_id=x.schedule.schedule_id;
          obj.user_invest_industry=this.set_industry(x.card.user_invest_industry);
          obj.user_invest_stage=this.set_stage(x.card.user_invest_stage);
          obj.type=x.type;
          obj.user_avatar_url=x.card.user_avatar_url;
          obj.user_company_career=x.card.user_company_career;
          obj.user_company_name=x.card.user_company_name;
          obj.match=x.match;
          obj.user_group=this.set_user_group(x.card.user_group);
          obj.width=this.selectChange(x.schedule.schedule_id);
          obj.source=x.source;
          newArr.push(obj);
        });
        return newArr;
      },//设置意向投资人列表
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
      getIndex(index){
        this.scheduleIndex=index;
      },//获取意向投资人索引
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
          this.enjoyInvestors[index].width = width;
          let follow_id = this.enjoyInvestors[index].follow_id;
          let schedule_id = this.enjoyInvestors[index].schedule_id;
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
        this.getConCon.schedule_id=e;
        this.getConCon.user_id=localStorage.user_id;
        this.currentPage=1;
        this.getConCon.project_id=this.project.project_id;
        this.getConCon.page=1;
        this.$http.post(this.URL.getEnjoyedInvestors,this.getConCon)
          .then(res=>{
            if(res.data.data.length!=0){
              if(res.data.status_code==2000000) {
                let data = res.data.data;
                this.enjoyInvestors=this.setEnjoyInvestor(data);
                this.totalData = res.data.count;

              }
            }else{
              this.enjoyInvestors=[];
              this.totalData = 0;
            }

            this.loading = false;
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.loading=false;
            this.$tool.error("加载超时");
          })

      },//筛选意向项目

      setProjectMatchInvestors(arr){
        let newArr = new Array;
        arr.forEach((x)=> {
          let obj = new Object;
          obj.user_id=x.user_id;
          obj.stage_tag=this.set_stage(x.stage_tag);
          obj.investor_type=x.investor_type;
          obj.investor_name=x.investor_name;
          obj.investor_logo_url=x.investor_logo_url || '';
          obj.investor_logo_text=x.investor_logo_text || '';
          obj.investor_id=x.investor_id;
          obj.investor_desc=x.investor_desc;
          obj.investor_company=x.investor_company;
          obj.investor_career=x.investor_career;
          obj.industry_tag=this.set_industry(x.industry_tag);
          obj.match=x.match;
          newArr.push(obj);
        });return newArr;
      },//设置买家图谱列表
      /*买家图谱*/
      getProjectMatchInvestors(){
        this.loading=true;
        this.getInvestors.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPageInvestors=1;
        this.getInvestors.project_id=this.project.project_id;
        this.getInvestors.page=1;
        this.$http.post(this.URL.getProjectMatchInvestors,this.getInvestors)
          .then(res=>{
            if(res.data.status_code==2000000) {
              let data = res.data.data;
              console.log(data);
              this.ProjectMatchInvestors=this.setProjectMatchInvestors(data);
              this.totalInvestors = res.data.count;
            }
            this.loading = false;
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.loading=false;
            this.$tool.error("加载超时");
          })
      },//买家图谱列表
      filterChangeInvestors(page){
        this.loading=true;
        this.getInvestors.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPageInvestors=page;
        this.getInvestors.project_id=this.project.project_id;
        this.getInvestors.page=page;
        this.$http.post(this.URL.getProjectMatchInvestors,this.getInvestors)
          .then(res=>{
            if(res.data.status_code==2000000) {
              let data = res.data.data;
//              this.ProjectMatchInvestors=this.setProjectMatchInvestors(data);
              this.totalInvestors = res.data.count;
            }
            this.loading = false;
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.loading=false;
            this.$tool.error("加载超时");
          })
      },//控制买家图谱页码
      industryPush(data){

      },//买家图谱推送
      industryDelete(data){},//买家图谱人脉删除

    },
    created () {
      // 组件创建完后获取数据，
      this.loading=true;
      this.getprojectId();
      this.getWxProjectCategory();
      this.getEchartData();
      setTimeout(()=>{
        this.getProjectDetail();
        this.getEnjoyedInvestors();
        this.getProjectMatchInvestors();
      },500)
    }

  }
</script>

<style lang="less">
  @import '../../../assets/css/projectDetail.less';
  #projectDetails{
    .btn1{
      background:#40587a;
      border-radius:2px;
      width:88px;
      height:36px;color:#ffffff;cursor: pointer;margin-left: 16px;
    }
    .el-dialog__header{
      padding-left:21px;
    }
    .onsearch{
      width: 100%;
      max-height: 320px;
      overflow-y: auto;
      li{
      width: 100%;
        height:40px;
        line-height: 40px;
        font-size:13px;
        color:#475669;
        text-align:left;
        cursor: pointer;
        padding-left: 20px;
      }
      li:hover{
        background:#009eff;
        color:#ffffff;
      }
    }
    .el-tabs__content{
     position: static;
    }

    .radio_line{
      width: 13px;
      //height: 49px;
    }
    .radio{
      border:1px solid #e0e6ed;
      border-radius:20px;
      width:12px;
      background: #f9fafc;
      height:12px;
      position: relative;
    }
    .el-dialog--small{
      width: 30%;
    }
  }

</style>
