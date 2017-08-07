<template>

  <div id="projectPreview" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================项目推送预览弹框=============================================-->
    <el-dialog :visible="dialogPreviewVisible" :show-close="close"  custom-class="dialogCon" :before-close="handleClose" close-on-press-escape close-on-click-modal>
      <div class="top_pro">
        <p v-if="email.title==''">邮件标题 : {{user.firse_user_company_name}}－{{user.firse_user_company_career}}－{{user.firse_user_real_name}}推送给您一个项目|微天使乐投平台—互联网化FA平台—AI驱动的智能云投行</p>
        <p v-else>邮件标题 : {{email.title}}</p>
        <p v-if="email.body==''">邮件正文 : 尊敬的{{user.user_real_name}}，下面是来自{{user.firse_user_company_name}}-{{user.firse_user_company_career}}-{{user.firse_user_real_name}}的项目推荐。你可以注册/登录微天使工作站找到更多精选FA项目资源。</p>
        <p v-else>邮件正文 : {{email.body}}</p>
      </div>
      <div class="contain-grid contain-center1 fl">
        <div class="main-box clearfix">
          <div class="item-lists item-lists-top clearfix">
            <div class="item-lists-inner-left fl">
              <div class="item height">
                <el-tag type="success" v-if="project.open_status==1">公开</el-tag>
                <el-tag type="primary" v-else>私密</el-tag>
                <span class="title">{{project.pro_intro}}</span>
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
              <div class="item progress height" style="margin-top:18px;padding-top: 8px;">
                <!--<div class="txt begin" style="margin-left: 8px;" :style="styleObject">项目线索</div>
                <div class="progress-bar">
                  <span class="circle circle-s"></span>
                  <span class="bar-bg1">&nbsp;</span>
                  <span  class="txt state" style="left:80px;"  v-if="project.pro_schedule.schedule_id==2">约谈</span>
                  <span  class="txt state" style="left:184px;" v-if="project.pro_schedule.schedule_id==4">签署FA协议</span>
                  <span  class="txt state" style="left:310px;" v-if="project.pro_schedule.schedule_id==5">引荐投资方</span>
                  <span  class="txt state" style="left:450px;" v-if="project.pro_schedule.schedule_id==7">交割</span>
                  <span  class="txt state" style="left:550px;" v-if="project.pro_schedule.schedule_id==8">待收佣金</span>
                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="txt end" :class="{ scheduleColor: project.pro_schedule.schedule_id==9}">佣金收讫</div>-->
              </div>
              <div class="onlyone">
                <img v-if="project.is_exclusive==0" src="../../../assets/images/onlyonedark.png"/>
                <img v-else-if="project.is_exclusive==1" src="../../../assets/images/onlyonelight.png"/>
              </div>
            </div>
          </div>
          <div class="item-lists clearfix" style="padding-top: 10px;">

            <!--推送用户-->
            <div class="ul-lists">
              <div class="item">
                <span class="title"><img class="img" src="../../../assets/images/projectIntroduce.png">推送用户</span>
              </div>
              <div class="ul-lists" style="margin-top:16px;padding: 0">
                <div class="item">
                  <span class="p-name">{{user.user_real_name}}</span>
                  <span class="p-mg">{{user.user_company_career}}</span>
                  <span class="p-mg">{{user.user_company_name}}</span>
                </div>
              </div>
            </div>
            <!--项目资料-->
            <div class="ul-lists" style="margin-top:18px;">
              <div class="item">
                <span class="title"><img class="img" src="../../../assets/images/projectIntroduce.png">项目资料</span>
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

            <div class="ul-lists list tc" >
              <div class="toButton" style="padding-left: 0">
                <button  @click="handleClose" class="btn1">返回</button>
                <button  @click="pushProject" class="btn1">推送</button>
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
  props: ["dialogPreviewVisible","investorid",'comeFrom'],
  data () {
    return {
      close:false,//默认关闭
      loading:false,//加载动画
      show: "detail",
      styleObject: {
        color: '',
      },
      project: {
        project_id: "",//项目id59W2a0GE
        pro_name: "HoopEASY商业计划PPT+for+pitch",//项目名称HoopEASY商业计划PPT+for+pitch
        pro_company_name: "HoopEASY",//HoopEASY
        pro_company_scale: {
          comp_scale_id: 1,
          comp_scale_value: "1-20"
        },//公司规模
        pro_source: "项目来源微天使项目",//项目来源微天使项目
        pro_intro: "项目简介一款最酷的篮球社交软件",//项目简介一款最酷的篮球社交软件
        pro_total_score: "98.00",//98.00
        pro_finance_value: "10.00",//项目估值10.00
        is_exclusive: 1,//0其他 1独家 2非独家
        open_status: 1,//0私密  1公开
        pro_goodness: "项目介绍专注于篮球项目的移动端社交平台。在基于用户所处的地理位置基础上，将用户个人，球队，比赛，场",//项目介绍专注于篮球项目的移动端社交平台。在基于用户所处的地理位置基础上，将用户个人，球队，比赛，场馆等资源有机整合，形成一个以用户为核心的垂直网络社区，带给篮球爱好者全新的社交方式和运动体验。
        pro_website: "www.baidu.com",//官方网址www.baidu.com
        contact: {
          user_name: "赵工佐",//赵工佐
          user_mobile: "18551711000"//18551711000
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
          "status_name": "上线",//上线
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
            ct_member_name: "赵工佐",//赵工佐
            ct_member_career: "赵工佐",
            ct_member_intro: "赵工佐赵工佐赵工佐赵工佐赵工佐",
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
      user:{
        user_real_name:'顾家',
        user_company_career:'投资尽力',
        user_company_name:'杭州投着乐网络科技有限公司',
        firse_user_real_name:'顾家',//当前用户
        firse_user_company_career:'投资尽力',
        firse_user_company_name:'杭州投着乐网络科技有限公司',
      },
      pushMessage:{},//推送用的数据
      project_id:'',
      project_intro:'',
      email:{

      }
    }
  },
  methods: {
    handleClose(){
      this.$emit('closePreview', false);
    },//关闭当前弹窗
    getFirstUser(){
      this.$http.post(this.URL.getOneUserInfo,{user_id: localStorage.user_id})
        .then(res=>{
          if(res.data.status_code==2000000) {
            let data = res.data.data;
            this.user.firse_user_real_name=data.user_real_name;
            this.user.firse_user_company_career=data.user_company_career;
            this.user.firse_user_company_name=data.user_company_name;
          }
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.$tool.error("加载超时");
        })
    },//获取当前用户部分信息
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
      this.loading=true;
      this.$http.post(this.URL.getProjectDetail,{user_id:localStorage.user_id,project_id:this.project_id})
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
          if(data.pro_schedule=="") {data.pro_schedule={};data.pro_schedule.schedule_name="-";this.styleObject={color:"#20a0ff"}}
          if(data.pro_stage=="") {data.pro_stage={};data.pro_stage.stage_name="-"}
          this.getLocalTime(data.pro_develop);
          this.getLocalTime2(data.pro_history_finance);
          this.project=data;
          this.project.follow_up=data.follow_up.follow_desc;
          this.project.pro_source=this.getProjectTag(data.tag);
          this.project.pro_BP.file_title=data.pro_BP.file_title+'.'+data.pro_BP.file_ext;
          this.loading=false;
        })
        .catch(err=>{
          this.loading=false;
          this.$tool.console(err,2)
        })
    },//获取项目详情数据
    pushProject(){
      console.log(this.comeFrom)
      if(this.comeFrom==='contacts'){
        this.$http.post(this.URL.pushUser, this.pushMessage)
        .then(res => {
          if(res.data.status_code===2000000){
            let data=res.data.data;
            this.$tool.success("推送成功");
            this.$emit('changeCloseProjectpush',false);
            this.$emit('changeCon', false);
          }else{
            this.$tool.error(res.data.error_msg)
          }
        })
        .catch(err => {
          this.$tool.console(err);
          this.$tool.success("推送失败");
        })
      }else{
        this.$emit('previewPush',true);
        this.$emit('changeCon', false);
      }
    },//推送项目
  },
  watch:{
    dialogPreviewVisible:function(e){
      if(e){
        this.project_id=this.$store.state.pushProject.project_id;
        this.user=this.$store.state.pushProject.user;
        this.pushMessage=this.$store.state.pushProject.pushMessage;
        this.project_intro=this.$store.state.pushProject.pro_intro;
        this.email=this.$store.state.pushProject.email;
        this.getFirstUser();
        this.getProjectDetail();
      }
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/projectPreview';

</style>
