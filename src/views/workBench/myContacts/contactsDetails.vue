<template>
  <div id="contactsDetails" class="clearfix"  v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="contain-grid contain-center">
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
                </div>
                <el-pagination
                  class="pagination"
                  small
                  @current-change="filterChangeCurrent"
                  :current-page.sync="currentPage"
                  layout="prev, pager, next"
                  :page-size="10"
                  :total="totalData">
                </el-pagination>
              </el-collapse-transition>
                <span class="b-hander" @click="closeDiv('listShow')" v-show="listShow">收起</span>
                <span class="b-hander" @click="openDiv('listShow')" v-show="!listShow">展开</span>
              </div>

            <!--投资案例-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/anli.png">投资案例</span>
              </div>
            </div>
            <!--个人描述-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/miaoshu.png">个人描述</span>
              </div>
            </div>
            <!--投资需求-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/money2.png">投资需求</span>
              </div>
            </div>
            <!--资源需求-->
            <div class="item">
              <div class="block clearfix" style="margin-bottom: 33px;">
                <span class="title fl"><img class="img" src="../../../assets/images/ziyuan.png">资源需求</span>
              </div>
            </div>
          </div>
        </div>
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
  },
  created(){
      this.getUserId();
  }
}
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/contactsDetails';
</style>
