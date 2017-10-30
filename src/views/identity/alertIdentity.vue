<template>
  <div id="alertContactsDetail">
    <!--===========================================认证弹窗=============================================-->
    <el-dialog :visible="identityDisplay" custom-class="dialogCon" :before-close="closeIdentity" close-on-press-escape close-on-click-modal
               v-loading="loading"
               element-loading-text="拼命加载中">
      <div class="contain-grid contain-center3 fl">
        <div class="main-box clearfix">
          <div class="renzheng_center">
            <div class="imgrenzhen">
              <div class="renzhen inlineBlock">
                <img v-if="renzhen === 0" src="../../assets/images/shenhezhong.png"><!--!-->
                <img v-else-if="renzhen === 1" src="../../assets/images/shenhetongguo.png"><!--勾-->
                <img v-else-if="renzhen === 2" src="../../assets/images/weitongguo.png"><!--X-->
              </div>
              <div class="faweixin inlineBlock">
                <img src="../../assets/images/index-qr.png">
              </div>
            </div>
            <p class="maifang tc">{{maiFang}}</p>
            <p  class="maifangweixin tc">{{maiFangWeiXin}}</p>
          </div>
          <div class="item-lists clearfix">
            <div class="item-list item-list-main">
              <!--基本信息-->
              <div class="item clearfix">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/rectangle.png">基本信息</span>
                </div>
                <div class="tit_second inlineBlock">
                  <div class="tit clearfix">
                    <div class="tit_left fl">姓名 ： </div>
                    <div class="tit_right1 fl">{{contacts.user_real_name | nullTo_}}</div>
                  </div>
                  <div class="tit clearfix">
                    <div class="tit_left fl">公司 ： </div>
                    <div class="tit_right1 fl">{{contacts.user_company_name | nullTo_}}</div>
                  </div>
                  <div class="tit clearfix">
                    <div class="tit_left fl">邮箱 ： </div>
                    <div class="tit_right1 fl">{{contacts.user_email | nullTo_}}</div>
                  </div>
                </div>
                <div class="tit_second inlineBlock">
                  <div class="tit clearfix">
                    <div class="tit_left fl">职位 ： </div>
                    <div class="tit_right1 fl">{{contacts.user_company_career | nullTo_}}</div>
                  </div>
                  <div class="tit clearfix">
                    <div class="tit_left fl">品牌 ： </div>
                    <div class="tit_right1 fl">{{contacts.user_brand | nullTo_}}</div>
                  </div>
                  <div class="tit clearfix">
                    <div class="tit_left fl">微信 ： </div>
                    <div class="tit_right1 fl">{{contacts.weixin | nullTo_}}</div>
                  </div>
                </div>
                <div class="tit_second">
                  <div class="tit clearfix">
                    <div class="tit_left fl">名片 ： </div>
                    <div class="tit_right1 fl"><div class="img"><img src="../../assets/images/header.png"></div></div>
                  </div>
                </div>
              </div>
              <!--投资案例-->
              <div class="item" v-if="contacts.project_case.length!=0">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/anli.png">投资案例</span>
                </div>
                <div class="block lh" v-for="cased in contacts.project_case">
                  <span class="radio" style=" line-height: 14px;"><img src="../../assets/images/radioTag.png"></span>
                  <span class="time" style="margin-left: 15px">{{cased.case_deal_time}}</span>
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
                  <span class="title fl"><img class="img1" src="../../assets/images/miaoshu.png">个人描述</span>
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
                  <span class="title fl"><img class="img1" src="../../assets/images/money2.png">投资需求</span>
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
                  <div class="tit_left fl">投资描述 ： </div>
                </div>
                <div class="block" v-if="contacts.user_invest_desc!=''">
                  <div class="tit_mian">{{contacts.user_invest_desc}}</div>
                </div>
              </div>
              <!--业务需求-->
              <div class="item">
                <div class="block clearfix" style="margin-bottom: 33px;">
                  <span class="title fl"><img class="img1" src="../../assets/images/anli.png">业务需求</span>
                </div>
                <div class="block tit clearfix">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">需要FA（财务顾问）融资服务</div>
                </div>
                <div class="block tit clearfix">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">申请加入中国FA行业联盟</div>
                </div>
                <div class="block tit clearfix">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">加入FA社群认证会员</div>
                </div>
                <div class="block tit clearfix">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">申请试用创业项目库的管理saas系统</div>
                </div>
                <div class="block tit clearfix">
                  <div class="tit_left fl queren"><img src="../../assets/images/queren.png"></div>
                  <div class="tit_right2 fl ">兼做FA业务</div>
                </div>
              </div>
            </div>
          </div>
          <div class="toButton" style="padding-left: 0;">
            <el-button type="primary" size="large" style="margin-left:45%;margin-bottom: 15px;" @click="newIdentity">重新认证</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['identityDisplay'],
    data () {
      return {
        loading: false, // 加载动画
        contacts: {
          card_id: '', // id
          user_id: '', // user_id
          user_real_name: '张三', // 姓名
          user_nickname: '昵称', // 昵称
          user_mobile: '18758307033', // 名片手机号
          user_email: 'zhangsan@weitianshi.cn', // 邮箱
          user_company_name: '杭州投着乐网络科技有限公司 ', // 公司名称
          import_user_name: '', // 来源
          user_brand: '投着乐', // 品牌
          user_company_career: '投资经理', // 职位
          user_invest_tag: [], // 人脉标签
          user_avatar_url: '', // 头像URL
          user_invest_industry: [], // 领域标签
          user_invest_stage: [], // 轮次
          user_invest_scale: [], // 投资金额
          user_invest_area: {
            area_id: '',
            area_title: '', // 市级
            pid: ''// 省级
          }, // 所属地区1省级单位
          user_intro: '我们重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。 2.行中：管家确保出现在用户出行过程中每一个重要和紧急的环节。 我们的管家分为线上的总部管家和线下的目的地管家。目前，我们在全球7个国家建立了分公司、办事处。飞机落地之后，对接当地管家。此外，用户在任何时候都可以通过微信公众号或者 24 小时待机的国内电话联系到总部管家，并得到总部管家的帮助。', // 个人描述
          user_resource_give: [], // 提供的资源
          user_resource_find: [], // 寻求对接的资源
          user_invest_desc: '', // 投资需求描述
          user_resource_desc: '', // 资源需求描述
          project_case: [
            {
              case_deal_time: 1503936000, // 时间
              case_stage_name: 'pre-A轮', // 轮次
              case_name: '第三个项目', // 名称
              case_money: '15800000', // 钱
              has_many_industry: '金融', // 金融,人工智能
              has_one_city: '北京'// 地区
            }
          ], // 投资案例
          weixin: '12345321' // 微信
        }, // 人脉参数
        user_invest: true, // 投资需求
        user_resource: true, // 资源需求
        renzhen: 1 // 认证情况
      };
    },
    methods: {
      // 关闭弹窗
      closeIdentity () {
        this.$emit('closeIdentity', false);
      },
      // 设置投资案例
      setProjectCase (arr) {
        let newArr = [];
        arr.forEach((x) => {
          let obj = {};
          obj.case_deal_time = this.$tool.formatDateTime(x.case_deal_time);
          obj.case_stage_name = x.case_stage_name;
          obj.case_name = x.case_name;
          obj.case_money = x.case_money;
          obj.has_many_industry = this.$tool.setTagToString(x.has_many_industry, 'industry_name');
          obj.has_one_city = x.has_one_city.area_title;
          newArr.push(obj);
        });
        return newArr;
      },
      // 获取个人详情
      getOneUserInfo () {
        this.loading = true;
        this.$http.post(this.URL.getOneUserInfo, {user_id: localStorage.user_id, card_id: this.contacts.card_id, investor_user_id: this.contacts.user_id})
          .then(res => {
            let data = res.data.data;
            this.$tool.console(this.$tool.getToObject(data));
            data.user_invest_industry = this.$tool.setTagToString(data.user_invest_industry, 'industry_name');
            data.user_invest_stage = this.$tool.setTagToString(data.user_invest_stage, 'stage_name');
            data.user_invest_scale = this.$tool.setTagToString(data.user_invest_scale, 'scale_money');
            data.user_resource_find = this.$tool.setTagToString(data.user_resource_find, 'resource_name');
            data.user_resource_give = this.$tool.setTagToString(data.user_resource_give, 'resource_name');
            data.project_case = this.setProjectCase(data.project_case);
            data.user_avatar_txt = this.$tool.setUrlChange(data.user_avatar_url, data.user_real_name);
            if (data.user_invest_industry === '' && data.user_invest_stage === '' && data.user_invest_scale === '' && data.user_invest_desc === '') {
              this.user_invest = false;// 投资需求
            } else {
              this.user_invest = true;// 投资需求
            }
            if (data.user_resource_give === '' && data.user_resource_find === '' && data.user_resource_desc === '') {
              this.user_resource = false;// 资源需求
            } else {
              this.user_resource = true;// 投资需求
            }
            this.contacts = data;
          })
          .catch(err => {
            this.$tool.console(err, 2);
            this.$tool.error('加载超时');
          });
        this.loading = false;
      },
      // 重新认证
      newIdentity () {
        this.$router.push({name: 'identityChoose'});
      },
      // 是否认证过身份
      getUserGroupByStatus () {
        // 核对是否认证过身份
        this.$http.post(this.URL.getUserGroupByStatus, {
          user_id: localStorage.user_id
        }).then(res => {
          if (res.data.status_code === 2000000) {
            if (res.data.status === 1 || res.data.status === 2) {
              // 认证过了
            }
          } else {
            this.$tool.error('核对身份接口调用失败');
          }
        });
      }
    },
    created () {

    },
    computed: {
      maiFang () {
        if (this.renzhen === 0) {
          return '买方FA认证审核中';
        } else if (this.renzhen === 1) {
          return '买方FA认证审核通过';
        } else if (this.renzhen === 2) {
          return '买方FA认证审核未通过';
        }
      },
      maiFangWeiXin () {
        if (this.renzhen === 0) {
          return '添加FA哥微信weitianshicn，加速审核';
        } else if (this.renzhen === 1) {
          return '认证会员将由微天使创始人直接服务，添加微信weitianshicn';
        } else if (this.renzhen === 2) {
          return '添加FA哥微信weitianshicn，重新审核';
        }
      }
    },
    watch: {
      contactDisplay: function (e) {
        if (e) {
          this.contacts.card_id = this.cardid || 0;
          this.contacts.user_id = this.userid || '';
          this.getOneUserInfo();
        } else {
          for (let key in this.contacts) {
            if (this.$tool.isArray(this.contacts[key])) {
              this.contacts[key] = [];
            } else {
              this.contacts[key] = '';
            }
          }
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../../assets/css/alertContactsDetail';
  .tit_second{
    width: 49%;
  }
  .tit_right1{
    font-size:14px;
    color:#475669;
    width: 320px;
    display: block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    margin-left: 13px;
    .img{
      width:90px;
      height:54px;
      overflow: hidden;
      img{
        width: 100%;
      }

    }
  }
  .renzheng_center{
    width: 438px;
    margin: 0 auto;
    padding-top: 48px;
    .imgrenzhen{
      width: 210px;
      margin: 0 auto;
    }
    .renzhen{
      width:80px;
      height:80px;
      img{
        width: 100%;
      }
    }
    .faweixin{
      width:80px;
      height:80px;
      margin-left: 36px;
      img{
        width: 100%;
      }
    }
    .maifang{
      font-size:24px;
      color:#1f2d3d;
      margin-top: 27px;
    }
    .maifangweixin{
      font-size:16px;
      color:#8492a6;
      margin-top: 12px;
    }
  }
  .queren{
    width: 20px;
    height: 20px;
    img{
      width: 100%;
    }
  }
  .tit_right2{
    font-size:16px;
    color:#5e6d82;
    width: 320px;
    display: block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    margin-left: 13px;
  }
</style>

