<template>
  <div id="projectDetails" class="clearfix"  v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    {{ this.$route.query.pro_id }}
    <div class="contain-grid contain-center">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box clearfix">
        <div class="item-lists item-lists-top clearfix">
          <div class="item-lists-inner-left fl">
            <div class="item">
              <el-tag type="primary" v-if="project.open_status==0">私密</el-tag>
              <el-tag type="success" v-if="project.open_status==1">公开</el-tag>
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">1. 私密项目仅自己/团队成员可见,项目数据安全不泄露　<br/>2. 公开项目投资人可申请查看,并参与市场融资对接</div>
              <span class="icon"><img src="../../../assets/images/why.png"/></span>
              </el-tooltip>
              <span class="title">{{project.pro_name}}</span>
              <span class="company">{{project.pro_company_name}}</span>
            </div>
            <div class="item" style="margin-top: 14px;">
              <div class="doc">{{project.pro_intro}}</div>
            </div>
            <div class="item" style="margin-top:18px;">
              <span class="mid-tag" v-for="industry in project.pro_industry">{{industry.industry_name}}</span>
            </div>
            <div class="item" style="margin-top:18px;">
              <span class="big-tag">{{project.pro_scale.scale_money}}</span><span class="split">｜</span>
              <span class="big-tag">{{project.pro_area.area_title}}</span><span class="split">｜</span>
              <span class="big-tag">{{project.pro_schedule.schedule_name}}</span><span class="split">｜</span>
              <span class="big-tag">{{project.pro_stage.stage_name}}</span>
              <span class="flower">跟进人 : {{project.follow_up}}</span>
              <span class="flower">来源 : {{project.pro_source}}　</span>
            </div>
            <div class="item" style="margin-top:18px;">
            <span class="project">
              <span class="title">项目完整度:</span>
              <span class="number">{{project.pro_total_score}}%</span>
              <span class="more">超过60%的项目更易被投资人关注</span>
            </span>
              <span class="project" style="width: 291px;">
              <div class="item progress">
                <div class="txt begin">项目线索</div>
                <div class="progress-bar">
                  <span class="circle circle-s"></span>
                  <span class="bar-bg1">&nbsp;</span>
                  <span class="bar-bg2">&nbsp;</span>
                  <span  class="txt state">{{project.pro_status.status_name}}</span>
                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="txt end">佣金收讫</div>
              </div>
            </span>
            </div>
            <div class="onlyone">
              <img v-if="project.is_exclusive==1" src="../../../assets/images/onlyonedark.png"/>
              <img v-else="project.is_exclusive==0" src="../../../assets/images/onlyonelight.png"/>
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
            <div class="button-float" @click="dialogVisible = true" style="cursor:pointer" >
            一键尽调
          </div>
          </div>

          <!--===========================================一键尽调弹窗=============================================-->
          <research :dialog-visible="dialogVisible" v-on:changeall="dialogVisiblechange" lock-scroll>

          </research>

        </div>
        <div style="background-color: #eff2f7;height: 17px;width: 850px;"></div>
        <div class="item-lists clearfix">
          <el-tabs v-model="show" @tab-click="handleClick">
            <el-tab-pane label="项目详情" name="detail"></el-tab-pane>
            <el-tab-pane label="跟进记录" name="flow"></el-tab-pane>
            <el-tab-pane label="文件管理" name="files"></el-tab-pane>
          </el-tabs>
          <div class="ul-lists">
            <div class="item">
              <span class="title"><img class="img" src="../../../assets/images/projectIntroduce.png">项目介绍</span>
              <div class="person-info">
                <span>项目联系人 : </span>
                <span>{{project.contact.user_name}}</span>
                <span>{{project.contact.user_mobile}}</span>
              </div>
            </div>
            <div class="item" style="margin-top:33px;">
              <span class="person-tag" v-for="tag in project.tag" v-if="tag.type==0">{{tag.tag_name}}</span>
            </div>
            <div class="item" style="margin-top:24px;">
              <div class="paper" v-for="file in project.pro_file">
                <img class="img" style="padding-right: 16px;" src="../../../assets/images/paper.png">
                <span class="pt">{{file.file_title}}</span>
                <el-button type="text" size="mini">查看</el-button>
                <el-button type="text" size="mini"><a href="">下载</a></el-button>
              </div>
            </div>
            <div class="item" style="margin-top:24px;height: 49px;" v-if="project.pro_status!=''">
              <div class="bot-det" v-if="project.pro_status!=''">
                <span class="det-title">运营状态：</span>
                <span class="del-info">{{project.pro_status.status_name}}</span>
              </div>
              <div class="bot-det" style="margin-left:170px;" v-if="project.pro_website!=''">
                <span class="det-title">产品链接：</span>
                <span class="del-info"><a href="">{{project.pro_website}}</a></span>
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
              <div class="p-gf">占股比例 : <span>{{user.stock_scale}}%</span></div>
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
                  <p class="det-info">{{project.pro_finance_scale}}万</p>
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
            <div class="item" style="margin-top:35px;" v-if="project.pro_history_finance=''">
              <span class="sec-title">资金用途</span>
              <div class="yt-doc">
                {{project.pro_finance_use}}
              </div>
            </div>
            <div class="item" style="margin-top:6px;" v-if="project.pro_history_finance=''">
              <div>
                <div class="v-progress" style="height: 121px;">
                  <span class="circle circle-s">&nbsp;</span>
                  <span class="v-line v-line-1">&nbsp;</span>
                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="v-progress-table">
                  <div class="v-progress-txt" v-for="finance in project.pro_history_finance">
                    <span class="pro-txt-1">{{finance.created_time}}</span>
                    <span class="pro-txt-2">{{finance.pro_finance_scale}}万</span>
                    <span class="pro-txt-3">{{finance.pro_finance_stage_name}}</span>
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
                <div class="v-progress" style="height: 182px;">
                  <span class="circle circle-s">&nbsp;</span>

                  <span class="v-line v-line-1">&nbsp;</span>
                  <span class="circle circle-c">&nbsp;</span>
                  <span class="v-line v-line-2">&nbsp;</span>

                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="v-progress-table">
                  <div class="v-progress-txt" v-for="develop in project.pro_develop">
                    <span class="pro-txt-1">{{develop.dh_start_time}}</span>
                    <span class="pro-txt-2"  style="color:#5e6d82;">{{develop.dh_event}}</span>
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
                  <p class="det-info">{{project.pro_FA.stock_follow}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="toButton">
            <el-button type="primary" size="large" style="margin:0 auto;display: block;width: 88px;" @click="toEdit">编辑</el-button>
          </div>
        </div>

      </div>
    </div>
    <div class="contain-grid contain-right-1">
      <div class="main-box">
        <el-tabs v-model="show" @tab-click="handleClick">
          <el-tab-pane label="潜在买家" name="detail"></el-tab-pane>
          <el-tab-pane label="人脉匹配" name="flow"></el-tab-pane>
          <el-tab-pane label="全网人脉匹配" name="files"></el-tab-pane>
        </el-tabs>
        <div class="item-lists" style="height:290px;">
          <div id="pieBox" style="width:392px;height:290px;"></div>
        </div>
        <div class="item-lists">
          <div class="item">
            <div class="card-title">
              <span class="card-tag">匹配度：</span>
              <span class="card-val">90%</span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  目标线索<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>目标线索1</el-dropdown-item>
                  <el-dropdown-item>目标线索2</el-dropdown-item>
                  <el-dropdown-item>目标线索3</el-dropdown-item>
                  <el-dropdown-item>目标线索4</el-dropdown-item>
                  <el-dropdown-item>目标线索5</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card-container">
              <div class="card-person">
                <span class="name">张三</span>
                <span class="manger">总监</span>
                <span class="flag"><img src="../../../assets/images/flag.png" />买方FA </span>
              </div>
              <div class="head-img"><img src="../../../assets/images/header.png" alt="" /></div>
              <div class="card-txt">杭州投着乐网络科技有限公司</div>
              <div class="card-doc doc1">投资领域：<span>智能服务、电商</span></div>
              <div class="card-doc doc2">投资轮次：<span>种子轮、天使轮、A轮、B轮</span></div>
              <div class="line">&nbsp;</div>
              <div class="card-bottom">我跟进的用户：<span>感兴趣</span>
                <span class="handler"><img src="../../../assets/images/slice.png" alt="" />移除</span>
              </div>
            </div>
          </div>

          <div class="item">
            <div class="card-title">
              <span class="card-tag">匹配度：</span>
              <span class="card-val">90%</span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  佣金收讫<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>目标线索1</el-dropdown-item>
                  <el-dropdown-item>目标线索2</el-dropdown-item>
                  <el-dropdown-item>目标线索3</el-dropdown-item>
                  <el-dropdown-item>目标线索4</el-dropdown-item>
                  <el-dropdown-item>目标线索5</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card-container">
              <div class="card-person">
                <span class="name">张三</span>
                <span class="manger">总监</span>
                <span class="flag"><img src="../../../assets/images/flag.png" />买方FA </span>
              </div>
              <div class="head-img"><img src="../../../assets/images/header.png" alt="" /></div>
              <div class="card-txt">杭州投着乐网络科技有限公司</div>
              <div class="card-doc doc1">投资领域：<span>智能服务、电商</span></div>
              <div class="card-doc doc2">投资轮次：<span>种子轮、天使轮、A轮、B轮</span></div>
              <div class="line">&nbsp;</div>
              <div class="card-bottom">我跟进的用户：<span>感兴趣</span>
                <span class="handler"><img src="../../../assets/images/slice.png" alt="" />移除</span>
              </div>
            </div>
          </div>

          <div class="item">
            <div class="card-title">
              <span class="card-tag">匹配度：</span>
              <span class="card-val">90%</span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  FA签约<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>目标线索1</el-dropdown-item>
                  <el-dropdown-item>目标线索2</el-dropdown-item>
                  <el-dropdown-item>目标线索3</el-dropdown-item>
                  <el-dropdown-item>目标线索4</el-dropdown-item>
                  <el-dropdown-item>目标线索5</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card-container">
              <div class="card-person">
                <span class="name">张三</span>
                <span class="manger">总监</span>
                <span class="flag"><img src="../../../assets/images/flag.png" />买方FA </span>
              </div>
              <div class="head-img"><img src="../../../assets/images/header.png" alt="" /></div>
              <div class="card-txt">杭州投着乐网络科技有限公司</div>
              <div class="card-doc doc1">投资领域：<span>智能服务、电商</span></div>
              <div class="card-doc doc2">投资轮次：<span>种子轮、天使轮、A轮、B轮</span></div>
              <div class="line">&nbsp;</div>
              <div class="card-bottom">我跟进的用户：<span>感兴趣</span>
                <span class="handler"><img src="../../../assets/images/slice.png" alt="" />移除</span>
              </div>
            </div>
          </div>

          <div class="item">
            <div class="card-title">
              <span class="card-tag">匹配度：</span>
              <span class="card-val">90%</span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  FA买方<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>目标线索1</el-dropdown-item>
                  <el-dropdown-item>目标线索2</el-dropdown-item>
                  <el-dropdown-item>目标线索3</el-dropdown-item>
                  <el-dropdown-item>目标线索4</el-dropdown-item>
                  <el-dropdown-item>目标线索5</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card-container">
              <div class="card-person">
                <span class="name">张三</span>
                <span class="manger">总监</span>
                <span class="flag"><img src="../../../assets/images/flag.png" />买方FA </span>
              </div>
              <div class="head-img"><img src="../../../assets/images/header.png" alt="" /></div>
              <div class="card-txt">杭州投着乐网络科技有限公司</div>
              <div class="card-doc doc1">投资领域：<span>智能服务、电商</span></div>
              <div class="card-doc doc2">投资轮次：<span>种子轮、天使轮、A轮、B轮</span></div>
              <div class="line">&nbsp;</div>
              <div class="card-bottom">我跟进的用户：<span>感兴趣</span>
                <span class="handler"><img src="../../../assets/images/slice.png" alt="" />移除</span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="pagenav">
              <el-pagination small layout="prev, pager, next"
                             :total="50">
              </el-pagination>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="contain-grid contain-right-2 clearfix">
      <div class="main-box">
        <div class="title-box">
          <span class="lit-line"></span>
          <span class="title">动态记录</span>
          <span class="lit-line"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import research from './onekeyresearch.vue'
  const echarts = require('echarts');
  export default {
    data(){
      return {
        show: "detail",
        dialogVisible: false,
        form: {
          name: '',
          region: ''
        },
        loading: false,
        project: {
          project_id: "59W2a0GE",//项目id
          pro_name: "HoopEASY商业计划PPT+for+pitch",//项目名称
          pro_company_name: "HoopEASY",//公司名称
          pro_company_scale: {
            comp_scale_id: 1,
            comp_scale_value: "1-20"
          },//公司规模
          pro_source: "微天使项目",//项目来源
          pro_intro: "一款最酷的篮球社交软件",//项目简介
          pro_total_score: "98.00",//信息完整度
          pro_finance_value: "10.00",//项目估值
          is_exclusive: 0,//0其他 1独家 2非独家
          open_status: 1,//0私密  1公开
          pro_goodness: "专注于篮球项目的移动端社交平台。在基于用户所处的地理位置基础上，将用户个人，球队，比赛，场馆等资源有机整合，形成一个以用户为核心的垂直网络社区，带给篮球爱好者全新的社交方式和运动体验。",//项目介绍
          pro_website: "www.baidu.com",//官方网址
          contact: {
            user_name: "赵工佐",
            user_mobile: "18551711000"
          },//项目联系人

          pro_schedule: {
            "schedule_id": 3,
            "schedule_name": "考察",
            "created_at": null,
            "updated_at": "2017-06-06 11:00:21",
            "user_id": 0
          },//项目进度

          pro_status: {
            "status_id": 3,
            "status_name": "上线",
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
              ct_member_name: "赵工佐",
              ct_member_career: "创始人兼首席执行官",
              ct_member_intro: "前高中和大学校队主力球员，城市街头篮球战队知名成员，热爱篮球运动与健身，球龄16年。美国南加州大学景观建筑硕士，加州大学洛杉矶分校运动学与训练科学在读。曾任职于美国著名设计公司AECOM和SWA从事设计师工作。HoopEASY开创性的开发理念源于Joe对篮球十几年如一日的热爱以及对行业痛点问题的深刻认识。其贯穿中美的设计背景与经验帮助团队打造出与众不同的产品及一流的用户体验。",
              created_at: null,
              updated_at: null,
              stock_scale: null
            },{
              "project_ct_id": 31,
              "ct_index": "952e903cabf7b4a5e82d106c33c646ec",
              "project_id": 37,
              "project_index": "275fa4f135eecf08e5660d23e294e6cd",
              "ct_member_name": "王勇越",
              "ct_member_career": "首席技术官",
              "ct_member_intro": "前高中和大学校队主力球员，城市街头篮球战队知名成员，热爱篮球运动Brian高中时期开始研究电脑网络技术并打下扎实技术功底。大学时期开始创业，主要从事网络安全服务业务，在2001年带领团队远赴韩国，菲律宾等海外国家开发市场，早年的团队成员已成为360网络公司的项目负责人。其至今已积累了10年前台与后台的开发经验，5年项目管理经验，以及多次创业实战经验。通过招募经验丰富，能力出众的技术开发人员，Brian为产品量身打造了一支出色的技术开发团队。\n",
              "created_at": null,
              "updated_at": null,
              "stock_scale": null
            },
          ],
        /*//历史融资信息*/
        pro_history_finance: [{
          project_id: 37,
          pro_finance_stage: 1,//轮次
          pro_finance_scale: "100.00",//金额
          pro_finance_investor: "周杰伦",//投资人
          created_time: null,
          updated_time: null
        },{
          project_id: 37,
          pro_finance_stage: 2,
          pro_finance_scale: "200.00",
          pro_finance_investor: "小哥",
          created_time: null,
          updated_time: null
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
            },
            {
              tag_id: 3,
              tag_name: "全职猎人",
              user_id: 0,
              project_id: 37,
              created_time: null,
              updated_time: null,
              type: 1//团队标签
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
            },
            {
              file_id: 2,
              project_id: 37,
              file_title: "项目文件2",
              file_ext: "git",
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
            },{
              "project_dh_id": 7,
              "dh_index": "ffdb1a610a224ba9336d71adb1fb692e",
              "project_id": 37,
              "project_index": "275fa4f135eecf08e5660d23e294e6cd",
              "dh_start_time": "1433520000",
              "dh_end_time": "1435593600",
              "dh_event": "公司于2015年6月底在美国洛杉矶创立",
              "created_at": null,
              "updated_at": null
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
            bp_id: 34,
            project_id: 37,
            user_id: 181391,
            bp_title: "HoopEASY商业计划PPT+for+pitch",
            bp_ext: "pptx",
            bp_url: "20161201/e6b499c3e94ed4247147cdbfd50ca319.pptx",
            created_at: "2017-06-01 18:14:38",
            updated_at: "2017-06-01 18:14:38",
            deleted_at: null
          }

        },
      }
    },
    computed:{

    },
    components: {
      research
    },
    //Echart组件
    mounted:function(){
      let myPie = echarts.init(document.getElementById('pieBox'));
      let colors = ["#13ce66","#f7ba2a","#20a0ff"];
      let option = {
        legend: {
          orient: 'horizontal',
          bottom: '5',
          data: ['佣金收讫','FA签约','项目线索'],
        },
        series : [
          {
            name: '',
            type: 'pie',
            radius : '72%',
            startAngle:0,
            legendHoverLink:"false",
            markPoint:"",
            center: ['50%', '45%'],
            data:[
              {
                value:315,
                name:'佣金收讫',
                label:{
                  normal:{
                    show:false
                  }
                },
                labelLine:{
                  normal:{
                    show:false
                  },
                  emphasis:{
                    show:false
                  }
                },
                itemStyle:{
                  normal:{
                    color:'#20a0ff'
                  }
                }
              },
              {
                value:95,
                name:'FA签约',
                label:{
                  normal:{
                    show:false
                  }
                },
                labelLine:{
                  normal:{
                    show:false
                  },
                  emphasis:{
                    show:false
                  }
                },
                itemStyle:{
                  normal:{
                    color:'#13ce66'
                  }
                }
              },
              {
                value:55,
                name:'项目线索',
                label:{
                  normal:{
                    show:false
                  }
                },
                labelLine:{
                  normal:{
                    show:false
                  },
                  emphasis:{
                    show:false
                  }
                },
                itemStyle:{
                  normal:{
                    color:'#f7ba2a'
                  }
                }
              },

            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myPie.setOption(option);
    },
    methods:{
      handleClick:function(tab, event){
        this.show = tab.name ;
      },
      goBack(){//返回上一层
        this.$router.go(-1);
      },
      dialogVisiblechange(msg){
        this.dialogVisible=msg;
      },
      getOneProject () {
        this.$http.post(this.URL.getOneProject,{user_id:sessionStorage.user_id,project_id:this.project.pro_id})
          .then(res=>{
            this.loading=false
            let data = res.data.data;

            for(let i=0; i<data.core_users.length; i++){
                if(data.core_users[i].stock_scale==null){
                  data.core_users[i].stock_scale="－"
                }
            }
            if(data.pro_scale=="") {data.pro_scale={};data.pro_scale.scale_money="-";}
            if(data.pro_area=="") {data.pro_area={};data.pro_area.area_title="-";}
            if(data.pro_schedule=="") {data.pro_schedule={};data.pro_schedule.schedule_name="-"}
            if(data.pro_stage=="") {data.pro_stage={};data.pro_stage.stage_name="-"}
            console.log(this.$tool.getToObject(data))
            this.project=data;

          })
          .catch(err=>{
            this.loading=false
            console.log(err,2)
          })
      },//获取项目详情数据
      toEdit(){
        this.$router.push({ name: 'editproject',query: { pro_id:this.project.pro_id}},)
      },
      getproId(){
        this.project.pro_id=this.$route.query.pro_id
        console.log(this.$route.query.pro_id)
      }
    },
    created () {
      // 组件创建完后获取数据，
//      this.loading=true
      this.getproId();
      this.getOneProject();
    }

  }
</script>

<style lang="less">
  @import '../../../assets/css/index.less';
</style>
