<template>
  <div id="projectDetails" class="clearfix" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="contain-grid contain-center1 fl" ref="left" id="wid">
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

            </div>
            <!--<div class="item height" style="margin-top:18px;display: inline-block;" v-if="project.pro_source!=''">-->
              <!--<span class="flower2">来源 : {{project.pro_source}}</span>-->
            <!--</div>-->
            <div class="item height" style="margin-top:45px;    display: inline-block;">
            <span class="project" >
              <span class="title">项目完整度:</span>
              <span class="number" v-if="project.pro_total_score!=''">{{project.pro_total_score}}%</span>
              <span class="number" v-else>去完善</span>
              <span class="more">超过60%的项目更易被投资人关注</span>
            </span>
              <span class="project" style="width: 292px;">
              <div class="item progress height">
                <div class="txt begin" :class="{ scheduleColor: project.pro_schedule.schedule_name=='项目线索'}">项目线索</div>
                <div class="progress-bar">
                  <span class="circle circle-s"></span>
                  <span class="bar-bg1">&nbsp;</span>
                  <span  class="txt state" v-if="project.pro_schedule.schedule_name=='项目线索'"></span>
                  <span  class="txt state" v-else-if="project.pro_schedule.schedule_name=='佣金收讫'"></span>
                  <span  class="txt state" v-else>{{project.pro_schedule.schedule_name}}</span>
                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="txt end" :class="{ scheduleColor: project.pro_schedule.schedule_name=='佣金收讫'}">佣金收讫</div>
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
            <div class="qrTab fr"><img src="../../../assets/images/qrTab.png"></div>

            <span class="qrposition">
              <img :src="qrImg">
              <span class="sanjiao"><img src="../../../assets/images/sanjiao.png"/></span>
            </span>
            <div class="button-float fr" @click="goOnkey" style="cursor:pointer" >一键尽调</div>

          </div>
        </div>
        <div style="background-color: #eff2f7;height: 17px;width: 850px;"></div>
        <div class="item-lists clearfix" style="">
          <!--===============================================================================================================================tab页面-->
          <el-tabs v-model="show" type="card" @tab-click="handleClick" style="position: relative">
            <el-tab-pane label="项目详情" name="detail">
              <div class="ul-lists">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/projectIntroduce.png">项目介绍</span>
                  <span class="flower" v-if="project.follow_user!=''">跟进人 : {{project.follow_user}}</span>
                  <!--<div class="person-info" v-if="project.contact.user_name!=''">-->
                    <!--<span>项目联系人 : </span>-->
                    <!--<span>{{project.contact.user_name}}</span>-->
                    <!--<span>{{project.contact.user_mobile}}</span>-->
                  <!--</div>-->
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
                <!--<div class="item" style="margin-top:24px;height: 49px;">-->
                  <!--<div class="bot-det" v-if="project.pro_status!=''">-->
                   <!---->
                  <!--</div>-->
                  <!--<div class="bot-det" style="margin-left:170px;" v-if="project.pro_website!=''">-->
                   <!---->
                  <!--</div>-->
                  <!--<div class="bot-det" style="float:right;" v-if="project.pro_company_scale!=''">-->
                  <!---->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="line"></div>-->
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
                  <span class="person-tag" v-for="tag in project.team_tag">{{tag}}</span>
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
              <!--公司运营-->
              <div class="ul-lists" style="margin-top:16px;">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/money.png">公司运营</span>
                  <div class="rz-details">
                    <div class="rz-detail" v-if="project.pro_status!=''">
                      <span class="det-title" style="width: 100%;line-height: 21px">运营状态</span>
                      <span class="del-info" style="font-size:22px;color:#1f2d3d;text-align:center;line-height: 44px">{{project.pro_status.status_name}}</span>
                    </div>
                    <div class="rz-detail" v-if="project.pro_website!=''">
                      <span class="det-title" style="width: 100%;line-height: 21px">产品链接</span>
                      <span class="del-info"  style="font-size:22px;color:#20a0ff;text-align:center;line-height: 44px"><a :href="project.pro_website"  target=_blank>{{project.pro_website}}</a></span>
                    </div>
                    <div class="rz-detail" v-if="project.pro_company_scale!=''">
                      <span class="det-title"style="width: 100%;line-height: 21px">公司规模</span>
                      <span class="del-info"  style="font-size:22px;color:#1f2d3d;text-align:center;line-height: 44px">{{project.pro_company_scale.comp_scale_value}} 人</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--品牌-->
              <div class="ul-lists" style="margin-top:16px;">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/money.png">品牌</span>
                  <div class="brand">
                    <div class="brand1" v-for="brandd in brand">
                      <span style="font-size:16px;
color:#4e4563;">{{brandd.brand1}}</span>
                      <span class="brand1_lei">{{brandd.brand2}}</span>
                      <div class="brand1_introduce">{{brandd.brand3}}</div>
                    </div>
                    <div class="clear"></div>
                  </div>
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
                <div class="item" style="margin-top:18px;" v-if="project.pro_history_finance.length!=0">
                  <div>
                    <span class="sec-title">历史融资</span>

                    <!--                <div class="v-progress" style="height: 121px;">
                                      <span class="circle circle-s">&nbsp;</span>
                                      <span class="v-line v-line-1">&nbsp;</span>
                                      <span class="circle circle-e">&nbsp;</span>
                                    </div>-->
                    <div class="v-progress-table">
                      <div class="v-progress-txt" style="height: 45px;" v-for="finance in project.pro_history_finance">
                      <!--<span class="radio_line">-->
                      <!--<span class="radio"></span>-->
                        <!--&lt;!&ndash;<span class="l-line"></span>&ndash;&gt;-->
                      <!--</span>-->
                        <img :src="cirIcon" alt="" style="width: 12px;height: 12px;">
                        <span class="pro-txt-1">{{finance.finance_time}}</span>
                        <span class="pro-txt-2">{{finance.pro_finance_scale}}</span>
                        <span class="pro-txt-3">{{finance.belongs_to_stage.stage_name}}</span>
                        <span class="pro-txt-4" style=" width: 202px; white-space: normal;overflow: hidden; word-break: break-all;line-height:22px;">{{finance.pro_finance_investor}}</span>
                        <!--<div class="line"></div>-->
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
                      <div class="v-progress-txt" style="height: 45px;" v-for="develop in project.pro_develop">
                    <!--<span class="radio_line">-->
                      <!--<span class="radio"></span>-->
                      <!--&lt;!&ndash;<span class="l-line"></span>&ndash;&gt;-->
                    <!--</span>-->
                        <img :src="cirIcon" alt="" style="width: 12px;height: 12px;">
                        <span class="pro-txt-1">
                      {{develop.dh_start_time}}
                    </span>
                        <span class="pro-txt-2"  style="color:#5e6d82;white-space: normal;word-break: break-all;width: 500px;line-height: 20px">
                      {{develop.dh_event}}
                    </span>
                        <!--<div class="line"></div>-->
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              <!--FA签约协议-->
              <div class="ul-lists" style="margin-top:16px;margin-bottom: 100px;" v-if="project.pro_FA!=''">
                <div class="item">
                  <span class="title"><img class="img" src="../../../assets/images/money.png">FA业务</span>
                  <div class="item" style="margin-top:33px;" v-if="project.tag!=''">
                    <span style="font-size:14px;color:#8492a6;">项目来源:&nbsp;&nbsp;</span>
                    <span class="person-tag" v-for="source in project.tag"> {{source.tag_name}}</span>
                  </div>
                  <div class="rz-details" >
                    <div class="rz-detail" style="width: 50%">
                      <p class="det-title">签约佣金</p>
                      <p class="det-info">{{project.pro_FA.commission}}%</p>
                    </div>
                    <div class="rz-detail" style="width: 50%">
                      <p class="det-title">股权赠与</p>
                      <p class="det-info">{{project.pro_FA.stock_right}}%</p>
                    </div>
                    <!--<div class="rz-detail" style="width: 25%">-->
                      <!--<p class="det-title">其他权益</p>-->
                      <!--<p class="det-info">{{project.pro_FA.stock_other}}%</p>-->
                    <!--</div>-->
                    <!--<div class="rz-detail" style="width: 25%">-->
                      <!--<p class="det-title">跟投权</p>-->
                      <!--<p class="det-info">{{project.pro_FA.stock_follow}}%</p>-->
                    <!--</div>-->
                  </div>
                  <div class="item" style="margin-top:24px;height: 49px;">
                    <div class="bot-det" v-if="project.contact.user_name!=''">
                      <!--<span>项目联系人 : </span>-->
                      <!--<span>{{project.contact.user_name}}</span>-->
                      <!--<span>{{project.contact.user_mobile}}</span>-->
                      <span class="det-title">项目联系人:</span>
                      <span class="del-info">{{project.contact.user_name}}</span>
                    </div>
                    <div class="bot-det" style="margin-left:170px;" v-if="project.contact.user_name!=''">
                      <span class="det-title">项目联系人:</span>
                      <span class="del-info">{{project.contact.user_name}}</span>
                    </div>
                    <div class="bot-det" style="float:right;" v-if="project.contact.user_mobile!=''">
                      <span class="det-title">手机号:</span>
                      <span class="del-info">{{project.contact.user_mobile}}</span>
                    </div>
                  </div>
                  <div class="bot-det" style="float: none" v-if="project.pro_FA.stock_follow!=''">
                    <span class="det-title">跟投权:</span>
                    <span class="del-info">{{project.pro_FA.stock_follow}}%</span>
                  </div>
                  <div class="bot-det" style="float: none;margin-top: 8px" v-if="project.pro_FA.stock_other!=''">
                    <span class="det-title">其他权益:</span>
                    <span class="del-info">{{project.pro_FA.stock_other}}%</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="跟进记录" name="flow">
              <folowup :proid="project.project_id" :pro-name="project.pro_intro" :get-data-true="getFollowData"
                       @getfollowid="getFollowId" @changefollowdata="changefollowdata"></folowup>
            </el-tab-pane>
            <el-tab-pane label="文件管理" name="files">
              <filemanagement :proid="project.project_id">

              </filemanagement>
            </el-tab-pane>
          </el-tabs>
          <div class="ul-lists list tc"  style="padding:0">
            <div class="toButton" style="padding-left: 0;z-index: 111">
              <button  @click="toEdit" class="btn1">编辑</button>
              <button  @click="addFollow" class="btn1">写跟进</button>
              <button  @click="projectPush2" class="btn1">项目推送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contain-grid contain-right-1 fl" ref="right"
         v-loading="loading"
         element-loading-text="拼命加载中">
      <div class="main-box header_none">
        <el-tabs v-model="activeName" @tab-click="handleClick2" style="position: relative">
          <el-tab-pane name="1">
            <button class="btn" @click="addFollow">添加意向投资人</button>
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
                    <div class="item_list" v-for="(enjoyInvestor,index) in enjoyInvestors" v-if="enjoyInvestors.lngth!=0">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">{{enjoyInvestor.match}}%</span>
                        <span class="pro fr" v-if="enjoyInvestor.source=='follow'">我跟进关联的用户</span>
                        <span class="pro fr" v-if="enjoyInvestor.source=='push'">我推送的用户</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail(enjoyInvestor)" class="click">
                          <div class="block" style="width: 290px;">
                            <span class="name">{{enjoyInvestor.user_real_name}}</span>
                            <span class="zhiwei">{{enjoyInvestor.user_company_career}}</span>
                            <span class="imgs" v-if="enjoyInvestor.user_group!=''"><img src="../../../assets/images/renzhen.png"/></span>
                            <span class="ren">{{enjoyInvestor.user_group}}</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company">{{enjoyInvestor.user_company_name}}</span>
                          </div>
                          <div class="block" style="margin-top: 42px;">
                            <span class="company ft13" v-if="enjoyInvestor.user_invest_industry.length!=0">投资领域：<i v-for="industry in enjoyInvestor.user_invest_industry" :class="{ newColor: industry.is_match==1 }">{{industry.industry_name}}、</i></span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company ft13" v-if="enjoyInvestor.user_invest_stage.length!=0">投资轮次：<i v-for="stage in enjoyInvestor.user_invest_stage" :class="{ newColor: stage.is_match==1 }">{{stage.stage_name}}、</i></span>
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
                        <div class="img" v-else><span class="header">{{enjoyInvestor.user_avatar_txt}}</span></div>
                      </div>
                    </div>
                    <div class="emptyImg" v-if="enjoyInvestors.length==0">
                      <img src="../../../assets/images/zanwushuju.png">
                    </div>
                  </div>
                  <el-pagination
                    class="pagination fr"
                    small
                    v-if="totalData>5"
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
                  <div class="item_top">
                    <span class="top_inn fl">匹配推荐=我的+全网人脉</span>
                    <div class="selectIn fr" style="height: 36px;">
                      <el-select v-model="isFollow" placeholder="请选择" @change="selectFollow">
                        <el-option
                          v-for="item in myAllCont"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="item_lists">
                    <div class="item_list" v-for="projectMatchInvestor in ProjectMatchInvestors" v-if="ProjectMatchInvestors.length!=0">
                      <div class="list_header">
                        <span class="pipei">匹配度 : </span>
                        <span class="bili">{{projectMatchInvestor.match}}%</span>
                        <span class="pro fr" v-if="projectMatchInvestor.is_follow==1">我的人脉</span>
                        <span class="pro fr" v-if="projectMatchInvestor.is_follow==0">全网人脉</span>
                      </div>
                      <div class="list_main">
                        <div @click="toDetail(projectMatchInvestor)" class="click">
                          <div class="block" style="width: 290px;">
                            <span class="name">{{projectMatchInvestor.user_real_name}}</span>
                            <span class="zhiwei">{{projectMatchInvestor.user_company_career}}</span>
                            <span class="imgs" v-if="projectMatchInvestor.user_group!=''"><img src="../../../assets/images/renzhen.png"/></span>
                            <span class="ren">{{projectMatchInvestor.user_group}}</span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company">{{projectMatchInvestor.user_company_name}}</span>
                          </div>
                          <div class="block" style="margin-top: 42px;">
                            <span class="company ft13">投资领域：<i v-for="industry in projectMatchInvestor.user_invest_industry" :class="{ newColor: industry.is_match==1 }">{{industry.industry_name}}、</i></span>
                          </div>
                          <div class="block" style="margin-top: 5px;">
                            <span class="company ft13">投资轮次：<i v-for="stage in projectMatchInvestor.user_invest_stage" :class="{ newColor: stage.is_match==1 }">{{stage.stage_name}}、</i></span>
                          </div>
                        </div>

                        <div class="li clearfix" style="margin-top: 12px;border-top: 1px solid #eff2f7">
                          <button class="button fl" @click="industryPush(0)" v-if="projectMatchInvestor.push_statues==1">
                            <div class="img1"><img src="../../../assets/images/tuisong.png"></div>已推送
                          </button>
                          <button  class="button fl" @click="industryPush(projectMatchInvestor)" v-if="projectMatchInvestor.push_statues==0">
                            <div class="img1"><img src="../../../assets/images/tuisong.png"></div>推送
                          </button>
                          <span class="lineLine fl"></span>
                          <button class="button fl" @click="industryDelete(projectMatchInvestor)" style="border-right: none">
                            <div class="img1"><img src="../../../assets/images/yichu.png" ></div>移除</button>
                        </div>
                        <div class="img" v-if="projectMatchInvestor.user_avatar_url!=''"><img :src="projectMatchInvestor.user_avatar_url"></div>
                        <div class="img" v-else><span class="header">{{projectMatchInvestor.user_avatar_txt}}</span></div>
                      </div>
                    </div>
                    <div class="emptyImg" v-if="ProjectMatchInvestors.length==0">
                      <img src="../../../assets/images/zanwushuju.png">
                    </div>
                    <el-pagination
                      class="pagination fr"
                      small
                      v-if="totalInvestors>5"
                      @current-change="filterChangeInvestors"
                      :current-page.sync="currentPageInvestors"
                      layout="prev, pager, next"
                      :page-size="5"
                      :total="totalInvestors">
                    </el-pagination>
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
    <!--一键尽调弹窗-->
    <research :search-display="searchDisplay" :company-id="companyid" :comp-name="companyname"
              @closeSearchDisplay="closeSearchDisplay"
              @closeCompanySearchDisplay="closeCompanySearchDisplay" lock-scroll>
    </research>

    <!--尽调搜索弹窗-->
    <el-dialog title="一键尽调" :visible="companySearchDisplay" close-on-click-modal close-on-press-escape :before-close="dialogVisibleTo">
      <el-form label-position="top" label-width="140px">
        <el-form-item label="请输入你要尽调的公司">
          <el-input v-model="searchName" icon="search" :on-icon-click="handleIconClick" @keyup.native.enter="handleIconClick" ></el-input><!--@change="searchChange"-->
        </el-form-item>
      </el-form>
      <ul class="onsearch">
        <li v-for="seachCompany in seachCompanys" @click="search(seachCompany)" v-html="seachCompany.company_name">{{seachCompany.company_name}}</li>
      </ul>
    </el-dialog>

    <!--人脉详情弹窗-->
    <alertcontactsdetail :contact-display="contactDisplay" :cardid="cardid" :userid="userid"
                         @closeContact="closeContact"></alertcontactsdetail>

    <!--写跟进弹框-->
    <addfollow :follow-display="followDisplay"
               :projectid="projecmessage.project_id"
               :projectname="projecmessage.pro_intro"
               :followid="followid"
               @closeFollow="closeFollow"></addfollow>

    <!--项目推送弹窗,项目入口弹窗-->
    <projectpush2 :project-push-show2="projectPushDisplay2" :proid="project.project_id" :pro-intro="project.pro_intro" :emitPush="emitPush"
                  @openPreview="openPreview"
                  @closeProjectPush2="closeProjectPush2"
                  @previewPush="previewPush"></projectpush2>

    <!--项目推送弹窗,人脉入口弹窗============================-->
    <projectpush :project-push-show="projectPushDisplay" :user-message="userMessage"
                 :user-email="userEmail"
                 @openPreview="openPreview"
                 @closeProjectPush="closeProjectPush"></projectpush>

    <!--项目预览弹窗-->
    <projectpreview :preview-show="previewDisplay" :comeFrom="'project'"
                    @closePreview="closePreview"
                    @closePreviewANDProjectPush="closePreviewANDProjectPush"
                    @previewPush="previewPush"></projectpreview>

  </div>
</template>

<script type="text/ecmascript-6">
  import cirIcon from '../../../../static/images/circle.png'
  import research from './onekeyresearch.vue'
  import folowup from './followUpDetail.vue'
  import filemanagement from './fileManagement.vue'
  import alertcontactsdetail from './alertContactsDetail.vue'
  import addfollow from './../followUp/addFollow.vue'
  import projectpush2 from './projectPush2.vue'
  import projectpreview from '../myContacts/projectPreview.vue'
  import projectpush from '../myContacts/projectPush.vue'
  export default {
    data(){
      return {
        brand: [
          {
            brand1:'标题一',
            brand2:'APP',
            brand3:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍'
          },
          {
            brand1:'标题二',
            brand2:'APP',
            brand3:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍'
          },
          {
            brand1:'标题三',
            brand2:'APP',
            brand3:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍'
          },
          {
            brand1:'标题三',
            brand2:'APP',
            brand3:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍'
          },
          {
            brand1:'标题五',
            brand2:'APP',
            brand3:'介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍'
          }
        ],
        cirIcon:cirIcon,
        projectPushDisplay:false,//项目推送弹框,人脉入口
        projectPushDisplay2:false,//项目推送弹框,项目入口
        searchDisplay: false,//一键尽调弹框
        companySearchDisplay:false,//公司搜索弹框
        contactDisplay:false ,//人脉详情弹窗


        companyname:"",//公司名称给一键尽调用的
        companyid:"",//公司id给一键尽调用的
        cardid:"",//人脉详情弹框用(点击的那个人的cardid)
        userid:"",//人脉详情弹框用(点击的那个人的userid)
        projecmessage:{
          project_id:'',
          pro_intro:''
        },//项目名称,ID
        followDisplay:false,//添加意向投资人
        show: "detail",
        searchName:"",
        form: {
          name: '',
          region: ''
        },
        loading: true,
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
            /*user_name: "",//赵工佐
             user_mobile: ""//18551711000*/
          },//项目联系人

          pro_schedule: {
            /*"schedule_id": 3,
             "schedule_name": "",//考察
             "created_at": null,
             "updated_at": "2017-06-06 11:00:21",
             "user_id": 0*/
          },//项目进度

          pro_status: {
            /*"status_id": 3,
             "status_name": "",//上线
             "created_at": null,
             "updated_at": null*/
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
        value: 1,
        status_name:'',//一键尽调边上那个按钮线里的字
        activeName:'1',
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
          /*          {
           follow_status:0,
           industry_tag:"暂无匹配",//领域
           investor_career:"暂无匹配",//职位
           investor_company:"暂无匹配",//公司
           investor_desc:"暂无匹配",//介绍
           investor_id:"0",//id
           investor_logo_text:"暂无匹配",//名片名字
           investor_logo_url:"",
           investor_name:"暂无匹配",//名字
           investor_type:2,
           stage_tag:"暂无匹配",//轮次
           user_id: "0",
           match:0,//匹配度
           }*/
        ],//买家图谱数据
        littlePushShow:false,//买家图谱推送弹窗
        littlePush:{
          email:'',
          content:''
        },//买家图谱推送弹窗表单
        formLabelWidth:'74px',
        pushData:[],//买家图谱推送接口参数
        activeFrom:0,//从哪个路由进来的
        previewDisplay:false,//项目推送预览显隐控制
        emitPush:false,//控制项目推送-项目入口的推送函数触发
        getFollowData:false,//看是否要获取跟进的数据
        followid:'',//得到followid
        myAllCont:[{
          value: -1,
          label: '全部'
        }, {
          value: 0,
          label: '全网人脉'
        }, {
          value: 1,
          label: '我的人脉'
        }
        ],//人脉筛选条件
        isFollow:-1,//人脉筛选绑定
        userMessage:{
          user_real_name:'翁浩平',//姓名
          user_company_career:'投资总监',//职位
          user_company_name:'杭州投着乐网络科技有限公司',//公司名称
        },//传递给推送的数据
        userEmail:'',
        scrolled: false,
        qrImg:'',//二维码地址
/*        screenWidth: document.body.clientWidth,
        timer:null,
        timer2:null,
        scrollTop:0,*/
      }
    },
    computed:{
    },
    components: {
      research,
      folowup,
      filemanagement,
      alertcontactsdetail,
      addfollow,
      projectpush2,
      projectpreview,
      projectpush
    },
    //Echart组件
    mounted(){
      this.eChart();
      /*let leftWidth=document.getElementById("wid").offsetLeft+868;
      this.$refs.right.style.left = leftWidth +'px';

      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth
        })()
      };
      window.onscroll = () => {
        return (() => {
          that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        })()
      }*/
    },

    methods:{
      addFollow(){
        this.followid='';
        this.followDisplay=true;
        this.projecmessage.project_id=this.project.project_id;
        this.projecmessage.pro_intro=this.project.pro_intro;
      },//点击写跟近按钮
      closeFollow(msg){
        this.followDisplay=msg;
        this.getEnjoyedInvestors();
        this.getFollowData=true;
      },//关闭添加跟进
      changefollowdata(){
        this.getFollowData=false;
        this.getAllData();
      },//关闭添加跟进重置
      download(e){
        const url=this.URL.weitianshi+this.URL.download+"?user_id="+localStorage.user_id+"&file_id="+e
        window.location.href=url;
      },//下载文件
      searchChange(queryString){
//        this.$tool.console(queryString);
        this.loading=true;
        this.$http.post(this.URL.selectCompany,{user_id:localStorage.user_id,company_name:queryString})
          .then(res=>{
            this.seachCompanys=[];
            let data =res.data.data;
            if(data.length==0) this.seachCompanys=[{company_name:"未查询到结果，<i style='color: #009eff;'>保存公司名称</i>",com_id:-1,newName:queryString}];
//            if(data.length==0) this.seachCompanys=[{company_name:"匹配不到你要搜索的公司,请重新继续输入",com_id:-1}];
            else this.seachCompanys=data;
//            this.$tool.console(res);
            this.loading=false;
          })
          .catch(err=>{
            this.$tool.console(err);
          })
      },//搜索公司
      goOnkey(){
        if(this.project.pro_company_name==""){
          this.companySearchDisplay = true;
        }else{
          this.loading=true;
          this.$http.post(this.URL.getCrawlerCompany, {user_id: localStorage.user_id, company_name: this.project.pro_company_name})
            .then(res => {
              let data = res.data.data;
              if(data.length==0) {//搜索不到信息
                this.companySearchDisplay = true;
                this.searchName=this.project.pro_company_name;
                this.companyname=this.project.pro_company_name;
                this.seachCompanys=[{company_name:"匹配不到你要搜索的公司,请重新继续输入",com_id:-2}];
                this.loading=false;
              }else{//搜索到了
                this.loading=false;
                this.searchDisplay = true;
                this.companyid=data.company.com_id;
                this.companyname=this.project.pro_company_name;
              }
            })
            .catch(err => {
              alert("加载失败");
              this.$tool.console(err);
            })
        }
      },//一键尽调按钮
      search(data){
        if(data.com_id==-1) {
          this.$confirm('把'+data.newName+'添加为您的公司?, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.URL.updateProjectCompany,{user_id:localStorage.user_id,pro_company_name:data.newName,project_id:this.project.project_id})
              .then(res=>{
                console.log(res);
                if(res.data.status_code===2000000){
                  this.$tool.success("修改成功");
                  this.companySearchDisplay = false;
                }
              })
              .catch(err=>{
                this.$tool.console(err);
              })
          }).catch(() => {

          });
        }else if(data.com_id==-2){
          this.$tool.error("匹配不到你要搜索的公司,请重新继续输入")
        }
        else {
          this.companyid=data.com_id;
          this.companyname=data.company_name;
          this.searchDisplay = true;
        }
      },//点击下拉选择公司后
      dialogVisibleTo(){
        this.companySearchDisplay = false;
      },//关闭搜索弹框
      handleIconClick(){
        this.searchChange(this.searchName);
      },//输入搜索
      handleClick:function(tab, event){
        this.show = tab.name ;
      },
      goBack(){
        if(this.activeFrom==0) this.$router.push({name: 'myProject',query: {activeTo: 0}})
        else if(this.activeFrom==2) this.$router.push({name: 'followUp',query: {activeTo: 2}})//路由传参
      },//返回上一层
      closeSearchDisplay(msg){
        this.searchDisplay=msg;
      },//传递给一键尽调窗口
      openPreview(msg){
        this.previewDisplay=true;
      },//打开预览弹框
      closeCompanySearchDisplay(msg){
        this.companySearchDisplay=msg;
      },//传递给一键尽调搜索窗口
      closeContact(msg){
        this.contactDisplay=msg;
      },//人脉详情弹窗关闭

      closeProjectPush(msg){
        this.projectPushDisplay=msg;
        this.getAllData();
      },//关闭项目推送弹框(人脉入口)
      closeProjectPush2(msg){
        this.projectPushDisplay2=msg;
        this.getAllData();
      },//关闭项目推送弹框(项目入口)
      closePreviewANDProjectPush(msg){
        this.projectPushDisplay=false;
        this.projectPushDisplay2=false;
        this.previewDisplay=false;
        this.getAllData();
      },//关闭预览AND关闭项目推送1,关闭项目推送2
      getProjectTag(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          if(arr[i].type==2){
            str+=arr[i].tag_name+'.'
          }
        }
        return str
      },//项目来源编辑
      getteam_tag(arr){
        let str=[];
        for(let i=0;i<arr.length;i++){
          if(arr[i].type==1){
            str.push(arr[i].tag_name)
          }
        }
        return str
      },//项目来源编辑
      getProjectDetail () {
        return new Promise((resolve, reject)=>{
          //做一些异步操作
          this.$http.post(this.URL.getProjectDetail,{user_id:localStorage.user_id,project_id:this.project.project_id})
            .then(res=>{

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
              if(data.pro_schedule=="") {data.pro_schedule={};data.pro_schedule.schedule_name="";data.pro_schedule.schedule_id="";}
              if(data.pro_stage=="") {data.pro_stage={};data.pro_stage.stage_name="-"}
              this.$tool.setTime(data.pro_develop,'dh_start_time');
              this.$tool.setTime(data.pro_history_finance,'finance_time');
              this.project=data;
              this.project.follow_user=data.follow_user;
              this.project.pro_source=this.getProjectTag(data.tag);
              this.project.team_tag=this.getteam_tag(data.tag);
              this.project.pro_BP.file_title=data.pro_BP.file_title+'.'+data.pro_BP.file_ext;
              resolve(3);
              this.loading=false;
            })
            .catch(err=>{
              this.$tool.console(err,2)
            })

        });
      },//获取项目详情数据
      getWxProjectCategory(){
        return new Promise((resolve, reject)=>{
          //做一些异步操作
          this.schedule = this.$global.data.schedule;//设置项目跟进状态
          this.follow_schedule = this.$global.data.follow_schedule;//设置项目状态
          this.follow_scheduleAll = this.$global.data.follow_schedule.slice(0);
          this.follow_scheduleAll.unshift({label:'全部', value:0});//设置项目状态
          resolve(2);
        });
      },//获取所有下拉框的数据
      toEdit(){
        this.$router.push({ name: 'editproject',query: { project_id:this.project.project_id}},)
      },
      projectPush2(){
        this.projectPushDisplay2=true;
      },//项目推送入口,项目入口
      getprojectId(){
        this.project.project_id=this.$route.query.project_id;
        this.activeFrom=this.$route.query.activeTo || 0;
        this.show=this.$route.query.show || "detail";
      },//获取id
      toEdit(){
        this.$router.push({ name: 'editproject',query: { project_id:this.project.project_id}},)
      },//编辑项目
      toDetail(data){
        this.cardid=data.card_id;
        this.userid=data.user_id;
        this.contactDisplay=true;
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

      handleClick2(tab, event) {

        if(tab.name=="1") this.tabs=true;
        else this.tabs=false
      },//点击标签

      /*设置意向投资人右边*/
      getEchartData(){
        return new Promise((resolve, reject)=>{
          //做一些异步操作
          this.$http.post(this.URL.getEnjoyedInvestorsGroup,{user_id:localStorage.user_id,project_id:this.project.project_id})
            .then(res=>{
              if(res.data.status_code==2000000) {
                let data = res.data.data;
                this.chartData=data;
                this.eChart(data.going,data.hold,data.reject);
                resolve(4);
              }
            })
            .catch(err=>{
              this.$tool.console(err,2);
              this.$tool.error("加载超时");
            })

        });

      },//获取意向项目数据(图表)
      getEnjoyedInvestors(){
        return new Promise((resolve, reject)=>{
          //做一些异步操作
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
                if(this.enjoyInvestors.length==0) {
                  this.activeName='2';
                  this.tabs=false;
                }
                resolve(5);
              }
            })
            .catch(err=>{
              this.$tool.console(err,2);
              this.$tool.error("加载超时");
            })
        });
      },//获取意向投资人列表
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
          obj.user_invest_industry=x.card.user_invest_industry;
          obj.user_invest_stage=x.card.user_invest_stage;
          obj.type=x.type;
          obj.user_avatar_url=x.card.user_avatar_url;
          obj.user_avatar_txt=this.$tool.setUrlChange(x.card.user_avatar_url,x.card.user_real_name);
          obj.user_company_career=x.card.user_company_career;
          obj.user_company_name=x.card.user_company_name;
          obj.match=x.match;
          obj.user_group=this.$tool.setTagToString(x.card.user_group,'group_title');
          obj.width=this.selectChange(x.schedule.schedule_id);
          obj.source=x.source;
          newArr.push(obj);
        });
        return newArr;
      },//设置意向投资人列表
      eChart(going,hold,reject){
        if(this.chartCheck) this.chart = this.$echart.init(document.getElementById('echart'));
        let option = {
          color: ['#13CE66', '#009eff', '#F44C4C'],
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
              radius: ['60%','70%'],
              center: ['35%', '55%'],
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  textStyle:{
                    fontSize:"12",
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '16'
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
      filterChangeCurrent(page){
        this.$tool.getTop();
        this.loading=true;
        this.getConCon.user_id=localStorage.user_id;
        this.getConCon.project_id=this.project.project_id;
        this.getConCon.page=page;
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
                this.loading = false;
              }
            }else{
              this.enjoyInvestors=[];
              this.totalData = 0;
              this.loading = false;
            }
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.loading=false;
            this.$tool.error("加载超时");
          })

      },//筛选意向项目

      /*买家图谱*/
      setProjectMatchInvestors(arr){
        let newArr = new Array;
        arr.forEach((x)=> {
          let obj = new Object;
          obj.match=x.match;
          obj.is_follow=x.is_follow;
          obj.type=x.type;
          obj.push_statues=x.push_statues;
          obj.user_avatar_url=x.card.user_avatar_url;
          obj.user_avatar_txt=this.$tool.setUrlChange(x.card.user_avatar_url,x.card.user_real_name);
          obj.user_real_name=x.card.user_real_name;
          obj.user_company_career=x.card.user_company_career;
          obj.user_company_name=x.card.user_company_name;
          obj.user_invest_industry=x.card.user_invest_industry;
          obj.user_invest_stage=x.card.user_invest_stage;
          obj.user_id=x.card.user_id;
          obj.card_id=x.card.card_id;
          obj.user_eamil=x.card.user_email;
          obj.investor_id=x.card.investor_id;
          obj.type=x.type;
          obj.user_group=this.$tool.setTagToString(x.card.user_group,'group_title');
          newArr.push(obj);
        });
        return newArr;
      },//设置买家图谱列表
      getProjectMatchInvestors(){
        return new Promise((resolve, reject)=>{
          //做一些异步操作
          this.getInvestors.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
          this.currentPageInvestors=1;
          this.getInvestors.project_id=this.project.project_id;
          this.getInvestors.page=1;
          this.$http.post(this.URL.getProjectMatchInvestors,this.getInvestors)
            .then(res=>{
              if(res.data.status_code==2000000) {
                let data = res.data.data;
                this.ProjectMatchInvestors=this.setProjectMatchInvestors(data);
                this.totalInvestors = res.data.count;
                resolve(6);
              }

            })
            .catch(err=>{
              this.$tool.console(err,2);
              this.$tool.error("加载超时");
            })
        });
      },//买家图谱列表
      filterChangeInvestors(page){
        this.$tool.getTop();
        this.loading=true;
        this.getInvestors.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPageInvestors=page;
        this.getInvestors.project_id=this.project.project_id;
        this.getInvestors.page=page;
        this.$http.post(this.URL.getProjectMatchInvestors,this.getInvestors)
          .then(res=>{
            if(res.data.status_code===2000000) {
              let data = res.data.data;
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
      },//控制买家图谱页码
      industryPush(data){
        if(data==0){
          this.$tool.warning("已推送过");
        }else{
          this.userMessage.user_real_name=data.user_real_name;
          this.userMessage.user_company_career=data.user_company_career;
          this.userMessage.user_company_name=data.user_company_name;
          this.userMessage.card_id=data.card_id;
          if(data.type=='user'){
            this.userMessage.card_id=data.user_id;
          }
          this.userMessage.type=data.type || '';
          this.userEmail=data.user_eamil;
          this.$store.state.pushProject.projectMessgae={pro_id:this.project.project_id || '',pro_intro:this.project.pro_intro || ''};
          this.$store.state.pushProject.pushMessage.investor_id=data.investor_id;
          this.projectPushDisplay=true;
          this.pushData.email=data.user_eamil;
          this.pushData.project_id=this.project.project_id;
        }
      },//买家图谱推送
      industryDelete(data){
        let delData = new Object;
        delData.user_id = localStorage.user_id;
        delData.investor_id = data.investor_id;
        delData.project_id = this.project.project_id;
        this.$confirm('此操作将移除该买家, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.$http.post(this.URL.exceptMatchAction, delData)
            .then(res => {
              if (res.data.status_code == 2000000) {
                this.$tool.success("移除成功");
                this.getProjectMatchInvestors();
              }
              this.loading = false;
            })
            .catch(err => {
              this.$tool.console(err, 2);
              this.loading = false;
              this.$tool.error("加载超时");
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },//买家图谱人脉删除
      selectFollow(e){
        this.getInvestors.user_id=localStorage.user_id;
//      this.getPra.user_id="2rzyz5vp";
        this.currentPageInvestors=1;
        this.getInvestors.project_id=this.project.project_id;
        this.getInvestors.page=1;
        this.getInvestors.is_follow=e;
        this.$http.post(this.URL.getProjectMatchInvestors,this.getInvestors)
          .then(res=>{
            if(res.data.status_code==2000000) {
              let data = res.data.data;
              this.ProjectMatchInvestors=this.setProjectMatchInvestors(data);
              this.totalInvestors = res.data.count;
            }
          })
          .catch(err=>{
            this.$tool.console(err,2);
            this.$tool.error("加载超时");
          })
      },//筛选买家图谱
      /*编辑跟进记录*/
      getFollowId(id){
        this.followDisplay=true;
        this.followid=id;
        this.getFollowData=false;
      },//拿到跟进记录id
      littlePushCertain(){
        if(!this.littlePush.email){
          this.$tool.error('请输入邮箱')
        }else if(!this.$tool.checkEmail(this.littlePush.email)){
          this.$tool.error('请正确输入邮箱')
        }else{
          this.pushData.push(this.littlePush.email)
          //转化为二维数组
          let newPushData=[];
          newPushData.push(this.pushData)
          this.$http.post(this.URL.pushProject,{
            user_id:localStorage.user_id,
            project_id:this.project.project_id,
            title:this.littlePush.content,
            body:'',
            receives:newPushData
          }).then(res=>{
            if(res.data.status_code===2000000){
              this.$tool.success('推送成功');
              this.$refs['littlePush'].resetFields();
              this.littlePushShow=false;
              this.pushData.pop();
              this.getProjectMatchInvestors();
            }else{
              this.$tool.error(res.data.error_msg)
              this.pushData.pop();
            }
          }).catch(err=>{
            this.pushData.pop();
          })
        }
      },//买家图谱推送确定
      littlePushCancel(){
        this.$refs['littlePush'].resetFields();
        this.littlePushShow=false;
      },//买家图谱推送取消

      /*项目推送*/
      openPreview(msg){
        this.previewDisplay=msg;
      },//打开项目预览
      previewPush(x){
        this.emitPush=x;
      },//项目推送预览隐藏
      closePreview(msg){
        this.previewDisplay=msg;
      },//关闭项目预览
      getAllData(){
//        this.loading=true;
        this.$global.func.getWxProjectCategory()
          .then((data)=>{
            return this.getWxProjectCategory();
          })
          .then((data)=>{
            return this.getProjectDetail();
          })
          .then((data)=>{
            return this.getEchartData();
          })
          .then((data)=>{
            return this.getProjectMatchInvestors();
          })
          .then((data)=>{
            return this.getWX();
          })
          .then((data)=>{
            this.loading=false;
            return this.getEnjoyedInvestors();
          });
      },//重新获取所有数据

      getWX(){
        new Promise((resolve, reject)=>{
        this.$http.post(this.URL.getProjectQr, {
          user_id: localStorage.user_id,
          width:1000,
          path:"pages/oneKeyResearch/oneKeyResearch?id="+this.project.project_id,
          project_id:this.project.project_id
        })
          .then(res => {
            let data=res.data;
            if(data.status_code===2000000){
              this.qrImg=data.qr_src;
            }
          })
          .catch(err => {
            this.$tool.console(err);
          })//请求函数
          resolve(6);
        })
      },//获取二维码
    },
    created () {
      this.$tool.getTop();
      this.getprojectId();
      this.getAllData();
    },
    watch:{

    },
  }
</script>

<style lang="less">
  @import '../../../assets/css/projectDetail.less';

  .scheduleColor{
    color:#20a0ff!important;
  }
</style>
