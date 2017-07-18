<template>
  <div id="projectDetails" class="clearfix"  v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="contain-grid contain-center1">
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
                  <span  class="txt state">{{status_name}}</span>
                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="txt end">佣金收讫</div>
                <!--<div class="img"><img src="../../../assets/images/editTo.png"></div>
                 <div class="selectIn fr">-->
                    <!--<el-select v-model="value1" placeholder="请选择" @change="selectChange">-->
                      <!--<el-option-->
                        <!--v-for="item in options"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                  <!--</div>-->
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
          <!--===========================================一键尽调弹窗=============================================-->
          <research :dialog-visible="dialogVisible" :company-id="companyid" :comp-name="companyname" v-on:changeall="dialogVisiblechange" v-on:changeallin="dialogVisiblechangeIn" lock-scroll>

          </research>

        </div>
        <div style="background-color: #eff2f7;height: 17px;width: 850px;"></div>
        <div class="item-lists clearfix" style="padding-top: 10px;">
          <el-tabs v-model="show" @tab-click="handleClick">
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
                    <img class="img" style="padding-right: 16px;" src="../../../assets/images/paper.png">
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
                  <span class="person-tag" v-for="tag in project.tag" v-if="tag.type==1">{{tag.tag_name}}</span>
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

<!--            <el-tab-pane label="跟进记录" name="flow">
              <folowup :proid="project.project_id">

              </folowup>
            </el-tab-pane>

            <el-tab-pane label="文件管理" name="files">
              <filemanagement :proid="project.project_id">

              </filemanagement>
            </el-tab-pane>-->
          </el-tabs>
          <div class="ul-lists list tc" >
            <div class="toButton" style="padding-left: 0">
              <button  @click="toEdit" class="btn1">编辑</button>
<!--              <button  @click="toEdit" class="btn1">写跟近</button>
              <button  @click="toEdit" class="btn1">项目推送</button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <div class="contain-grid contain-right-1 fl">
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
                    <el-select v-model="value2" placeholder="请选择">
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
                        <span class="pro fr">我跟进关联的用户</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail" class="click">
                          <div class="block">
                            <span class="name">张鑫</span>
                            <span class="zhiwei">投资总监</span>
                            <span class="imgs"><img src="../../../assets/images/renzhen.png"/></span>
                            <span class="ren">买方FA</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company">杭州投着乐网络科技有限公司</span>
                          </div>
                          <div class="block" style="margin-top: 42px;">
                            <span class="company ft13">投资领域：智能服务、电商</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company ft13">投资轮次：种子轮、天使轮、A轮、B轮</span>
                          </div>
                        </div>
                        <div class="li change_li">
                      <span class="all fl">
                        <span class="all_inner" :style="{width:widthInner + 'px' }"></span>
                      </span>
                          <div class="selectIn fl" style="margin-left: 13px;margin-top: -17px;">
                            <el-select v-model="value3" placeholder="请选择" @change="selectChange2">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </div>
                        </div>

                        <div class="img"><img src="../../../assets/images/header3.png"></div>
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
                    <div class="item_list">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">100%</span>
                        <span class="pro fr">我的/团队人脉</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail" class="click">
                          <div class="block">
                            <span class="name">张鑫</span>
                            <span class="zhiwei">投资总监</span>
                            <span class="imgs"><img src="../../../assets/images/renzhen.png"/></span>
                            <span class="ren">买方FA</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company">杭州投着乐网络科技有限公司</span>
                          </div>
                          <div class="block" style="margin-top: 42px;">
                            <span class="company ft13">投资领域：智能服务、电商</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company ft13">投资轮次：种子轮、天使轮、A轮、B轮</span>
                          </div>
                        </div>
                        <div class="li clearfix" style="margin-top: 12px;">
                          <button class="button fl">
                            <div class="img1"><img src="../../../assets/images/tuisong.png"></div>推送</button>
                          <button class="button fl">
                            <div class="img1"><img src="../../../assets/images/yichu.png"></div>移除</button>
                        </div>

                        <div class="img"><img src="../../../assets/images/header3.png"></div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
        </el-tabs>
        <button class="btn">添加意向投资人</button>
      </div>
    </div>-->

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
    <!--<alertcontactsdetail :dialog-con-visible="dialogConVisible" :proid="project.project_id" v-on:changeCon="dialogConchange"></alertcontactsdetail>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import research from './onekeyresearch.vue'
  import folowup from './followUpDetail.vue'
  import filemanagement from './fileManagement.vue'
  import alertcontactsdetail from './alertContactsDetail.vue'
  export default {
    data(){
      return {
        companyname:"",//公司名称给一键尽调用的
        companyid:"",//公司id给一键尽调用的
        show: "detail",
        dialogVisible: false,
        dialogSearchVisible:false,
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
        options: [{
          value: '项目推进中',
          label: '项目推进中'
        }, {
          value: '前期调研',
          label: '前期调研'
        }, {
          value: '投决',
          label: '投决'
        }, {
          value: '签署TS',
          label: '签署TS'
        }, {
          value: '尽调',
          label: '尽调'
        }, {
          value: '签署投资协议',
          label: '签署投资协议'
        }, {
          value: '交割',
          label: '交割'
        }, {
          value: 'Hold',
          label: 'Hold'
        }, {
          value: 'Reject',
          label: 'Reject'
        }],
        value: 1,
        status_name:'',//一键尽调边上那个按钮线里的字
        activeName:'1',
        value2: 1,//右边筛选的下拉框
        value3:'全部',//最下面的框
        widthInner:10,//进度条的长度
        tabs:true,//标签切换
        currentPage:1,//当前第几页
        totalData:50,//总数
        dialogConVisible:true,
      }
    },
    computed:{
    },
    components: {
      research,
      folowup,
      filemanagement,
      alertcontactsdetail
    },
    //Echart组件
    mounted(){
//      this.eChart();
    },
    methods:{
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
      },
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
      },//人脉详情弹窗
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
            if(data.pro_schedule=="") {data.pro_schedule={};data.pro_schedule.schedule_name="-"}
            if(data.pro_stage=="") {data.pro_stage={};data.pro_stage.stage_name="-"}
            if(data.pro_status=="") this.styleObject={color:"#20a0ff"};
            this.getLocalTime(data.pro_develop);
            this.getLocalTime2(data.pro_history_finance);


            this.project=data;
            this.project.pro_source=this.getProjectTag(data.tag);
            this.project.pro_BP.file_title=data.pro_BP.file_title+'.'+data.pro_BP.file_ext;

          })
          .catch(err=>{
            this.loading=false;
            this.$tool.console(err,2)
          })
      },//获取项目详情数据
      toEdit(){
        this.$router.push({ name: 'editproject',query: { project_id:this.project.project_id}},)
      },
      getprojectId(){
        this.project.project_id=this.$route.query.project_id;
      },
      selectChange(e){
        this.status_name=e;

      },
/*      eChart(){
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
      },*/
      toDetail(){
        this.dialogConVisible=true;
      },//项目详情弹窗
      selectChange2(e){
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
      filterChangeCurrent(page){
        /*      delete this.getPra.page;
         this.loading=true;
         this.getPra.user_id=localStorage.user_id;
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
      handleClick2(tab, event) {

        if(tab.name=="1") this.tabs=true;
        else this.tabs=false
      },//点击标签
    },
    created () {
      // 组件创建完后获取数据，
      this.loading=true
      this.getprojectId();
      this.getProjectDetail();
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
