<template>
  <div id="app">
    <!--<el-row>-->
      <!--     头部导航 -->
      <header id="header">
        <ul class="select ulfl tc" style="position: relative">
          <li style="width: 150px;margin-right: 100px;vertical-align: middle;display: table-cell;height: 60px;"><img
            src="./assets/images/logoing.png" style="vertical-align:middle;"></li>
          <li @click="toggle(index)" v-for="(tab,index) in tabs">
            <router-link :to=" tab.jump " :class="{border:active===index}">
              {{tab.type}}
            </router-link>
          </li>
          <li id="samllrou">小程序</li>
          <div class="weixin">
            <p style="margin-top: 34px;">微信扫一扫</p>
            <p style="margin-bottom: 15px">发现更多精选资源</p>
            <div class="img">
              <img src="./assets/images/weixin.jpg">
            </div>
            <div class="arrow">
              <img src="./assets/images/arrow.png">
            </div>
          </div>
          <!--<li>-->
            <!--<a target="_blank" href="http://cqc.casicloud.com/youthCmpe/common/home.do" style="width: 200px;">团中央·青年APP大赛</a>-->
          <!--</li>-->
          <li v-show="userRealName" style="float: right;position: relative;margin-right: 55px;line-height: 60px">
            {{userRealName}}
            <span style="display:inline-block;margin-left: 5px"><i class="el-icon-caret-bottom" style="font-size: 10px"></i></span>
            <div class="login-show" style="position: absolute;top: -10px;">
              <el-select v-model="value" style="opacity: 0;height: 33px;color: #000000" placeholder="请选择" @change="loginOut">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

          </li>
          <li v-show="!userRealName" class="login" @click="login">
            登录
          </li>
          <el-autocomplete
            v-model="companyTitle"
            :fetch-suggestions="querySearchAsync"
            placeholder="查竞品，查工商，请输入公司或品牌名称"
            @select="handleSelect"
            class="width350"
          ></el-autocomplete>
        </ul>
      </header>

      <div style="height: 60px;"></div>

      <!--下方主内容切换区-->
      <main style="width: 100%;">
        <transition name="fade" mode="out-in">
          <router-view class="view">
          </router-view>
        </transition>
      </main>

    <!--</el-row>-->
    <alert-identity :identityDisplay="identityDisplay" @closeIdentity="closeIdentity"></alert-identity>
  </div>
</template>
<script type="text/ecmascript-6">
  import alertIdentity from './views/identity/alertIdentity.vue';
  export default {
    data () {
      return {
        restaurants: [],
        companyTitle: '',
        timeout: null,
        options: [
          {
            value: 0,
            label: '个人信息'
          },
          {
            value: 1,
            label: '身份认证'
          },
          {
            value: 2,
            label: '退出登录'
          }],
        value: '',
        flag: false,
        active: 0,
        tabs: [
          {type: '首页', jump: '/'},
          {type: '工作站', jump: '/workBench'}
//          {type: '扫码登陆',jump:'/logining'},
//          {type: '一键尽调', jump: '/API/DD?company=杭州卓健信息科技有限公司&id=NC81sv9XmvLTsIQ5g7PeHWD0iOySYBrtAHC5M5poeOlkITcTYTChn92kadP9Kau8&includeInvestorMap=false;'},
//          {type: '测试页面2', jump: '/test2'}
        ],
        user_name: '',
        user_id: '',
        routerName: '',
        identityDisplay: false // 显示认证弹框
      };
    },
    mounted () {

    },
    methods: {
      // 切换选项卡
      toggle (i) {
        this.active = i;
        if (this.active === 0) { this.zgClick('首页'); }
        if (this.active === 1) { this.zgClick('工作站'); }
        if (this.active === 2) { this.zgClick('小程序'); }
        // 控制点击工作台跳转情况
        if (this.active === 1) {
          localStorage.entrance = 'myProject';
          if (localStorage.user_id) {
            this.$router.push({name: 'myProject', query: {activeTo: 0}});

//            setTimeout(()=>{ window.location.reload()},1000);
          } else {
            this.$router.push({name: 'telephoneLogin'});
          }
        }
      },
      // 登录
      login () {
        this.zgClick('登陆');
        localStorage.entrance = 'myProject';
        this.$router.push({path: 'login'});
      },
      // 获取远程数据模拟
      loadData (arr) {
        var newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].project_name === '' ? arr[i].company_name : arr[i].company_name + '(' + arr[i].project_name + ')';
          obj.address = arr[i].com_id;
          obj.company_name = arr[i].company_name;
          obj.pro_id = arr[i].pro_id;
          newArr.push(obj);
        }
        return newArr;
      },
      // 自动搜索,接口写这里面
      querySearchAsync (queryString, cb) {
        if (queryString.length > 2) {
          this.$http.post(this.URL.selectCompany, {company_name: queryString})
            .then(res => {
              this.restaurants = [];
              let data = res.data.data;
              this.restaurants = this.loadData(data);
              let restaurants = this.restaurants;
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                if (data.length === 0) {
                  let callback = [{value: '未查询到结果，换个关键词试试', address: -1}];
                  cb(callback);
                } else {
                  cb(restaurants);
                }
              }, 500);
            })
            .catch(err => {
              this.$tool.console(err);
            });
        } else {
          let callback = [];
          cb(callback);
        }
      },
      // 选择了搜索出来的数据后
      handleSelect (item) {
        this.loading = true;
        this.companyTitle = item.company_name;
        this.companyId = item.address;
        this.$http.post(this.URL.getCrawlerCompany, {company_name: this.companyTitle})
          .then(res => {
            let data = res.data.data;
            if (data.length !== 0) {
              this.$router.push({name: 'onekeyResearch', query: {company: item.company_name, pro: item.pro_id}});// 路由传参
            } else {
              this.$tool.warning('未查询到该公司信息，无法获取');
            }
            this.loading = false;
          })
          .catch(err => {
            this.$tool.error('获取失败');
            this.$tool.console(err);
            this.loading = false;
          });
      },
      // 检查localStorage.user_id
      checkUser () {
        this.user_id = localStorage.user_id;
        // 头部导航下标不对应问题解决
        if (this.$route.path === '/workBench' || this.$route.path === '/workBench/') {
          this.active = 1;
        }

        // 看是否需要加入项目库
        this.addProject();

        // 未登录状态下拦截
        if (!localStorage.user_id && this.$route.path !== '/' &&
          this.$route.path !== '/login' && this.$route.path !== '/login/codeLogin' &&
          this.$route.path !== '/login/telephoneLogin' && this.$route.path !== '/forgetPassword' &&
          this.$route.path !== '/loginReady' && this.$route.path !== '/login/' &&
          this.$route.path !== '/bindTelephone' && this.$route.path !== '/qr' &&
          this.$route.path !== '/API/DD' && this.$route.path !== '/aboutUs' &&
          this.$route.path !== '/onekeyResearch' && this.$route.path !== '/emailContact' &&
          this.$route.path !== '/addProject' && this.$route.path !== '/iosBanner' &&
          this.$route.path !== '/skipToPc') {
//          this.$tool.error('请先登录');
//          && this.$route.path!=='/workBench/'&& this.$route.path!=='/workBench'
          this.$router.push({name: 'index'});
          this.$store.state.logining.user_id = '';
          this.$store.state.logining.user_real_name = '';
        }
        // 十二小时不动后退出登录
        setTimeout(function () {
          localStorage.clear();
          sessionStorage.clear();
        }, 43200000);
        // 登录状态下拦截
        /* if(localStorage.user_id && (this.$route.path==='/identityChoose' || this.$route.path==='/identityDetail')){
         this.$router.push({name:'index'})
         } */
      },
      // 个人信息,认证,登出
      loginOut (e) {
        if (e === 0) {
          this.$router.push({name: 'personalInformation'}); // 个人信息
        } else if (e === 1) {
          this.getUserGroupByStatus();
        } else if (e === 2) {
          localStorage.clear();
          sessionStorage.clear();
          this.$router.push({path: 'login'});// 登陆
          this.$store.state.logining.user_real_name = '';
          this.$store.state.logining.user_id = '';
          setTimeout(() => { window.location.reload(); }, 100);
        }
        this.value = '';
      },
      // 加入项目库
      addProject () {
        // 如果是加入项目库操作的
        if (sessionStorage.flog === 'mail') {
          if (!localStorage.user_id) {
            // 没有登录的人去登录

          } else if (sessionStorage.userId !== localStorage.user_id) {
            // 推送者和接受者是不是一人时
            this.$tool.warning('此链接不是分享给您的,请进入正确的链接');
            sessionStorage.clear();// 把默认值清空;
            setTimeout(() => { this.$router.push({name: 'myProject', query: {activeTo: 0}}); }, 1000);
          } else if ((sessionStorage.userId === localStorage.user_id) && (sessionStorage.flog === 'mail') && (sessionStorage.type === 'user')) {
            // 当是同一人时,且是加入项目的时候
            this.$http.post(this.URL.importProject, {user_id: sessionStorage.userId, project_id: sessionStorage.projectId})
              .then(res => {
                if (res.data.status_code === 2000000) {
                  this.$tool.success('项目导入成功');
                  sessionStorage.clear();// 把默认值清空;
                  setTimeout(() => { this.$router.push({name: 'myProject', query: {activeTo: 0}}); }, 1000);
                }
              })
              .catch(err => {
                this.$tool.error('项目导入失败');
                console.log(err);
                sessionStorage.clear();// 把默认值清空;
                setTimeout(() => { this.$router.push({name: 'myProject', query: {activeTo: 0}}); }, 1000);
              });
          }
        }
      },
      // 关闭认证信息
      closeIdentity () {
        this.identityDisplay = false;
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
              this.identityDisplay = true;
            } else {
              this.$router.push({name: 'identityChoose'});
            }
          } else {
            this.$tool.error('核对身份接口调用失败');
          }
        });
      }
    },
    // 当dom一创建时
    created () {
      this.user_name = localStorage.user_real_name;
      this.zgIdentify(localStorage.user_id, {name: localStorage.user_real_name});
      this.getCheckUserInfo(localStorage.user_id);
    },
    computed: {
      userRealName () {
        let userRealName = this.$store.state.logining.user_real_name || localStorage.user_real_name;
        return userRealName;
      }
    },
    components: {
      alertIdentity
    },
    watch: {
      '$route' (to, from) {
        this.checkUser();
        if (from.name === this.routerName) {
          this.zgTimeOut(from.name);
        }
        this.routerName = to.name;
        this.zgTimeIn();
      }
    }
  };
</script>

<style lang="less">
  .width350 .el-input{
    font-size: 12px!important;
  }
  .width350{
    width:26%;
    display: inline-block;
    position: relative;
    top: 12px!important;
    right: 4%!important;
  }
  .el-select-dropdown__list{
    padding: 0!important;
  }
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover, .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #ffffff;
  }
.el-select-dropdown__item{
  font-size: 14px;
  padding: 0px 10px!important;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #48576a;
  height: 33px!important;
  line-height: 33px!important;
  box-sizing: border-box;
  cursor: pointer;
  }
  .sss{
    width:30px;
    height:30px;
    background: red;
  }

  .el-table-filter__content{
    max-height: 250px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Microsoft YaHei", "微软雅黑";

  }
  body {
    margin: 0;
    position: relative;
    padding:0!important;
  }
  .newColor{
    color:#40587A!important;
  }

   #app {
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
    background: #f3f4f8;
    main {
      min-height: 872px;
    }
    font-family: "He`lvetica Neue", "PingFang SC", Arial, sans-serif;
    header {
      width: 100%;
      background: #40587a;
      height: 60px;
      position: fixed;
      z-index: 300;
    }
    .select {
      cursor: pointer;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 16px;
      height: 60px;
      li {
        margin-right: 50px;
        height: 50px;
        line-height: 50px;
        a {
          text-align: center;
          height: 50px;
          display: block;
          color: #fff;
          font-size: 16px;
          width: 70px;
        }

      }
      li:hover{
        color: white;
        opacity: 0.5;
      }
      .border {
        border-bottom: 1px white solid;
        a {
          color: #fff;
        }
      }
    }
  }
  @media screen and(max-width: 1353px){
    #app{
    width: 100% !important;
    el-row{
      width:100%!important;
    }
  }
  }
  @media screen and(max-width: 500px){
    #header{
      display: none!important;
    }

  }
  #samllrou:hover + .weixin {
    display: block;
  }
  .weixin {
    display: none;
    position: fixed;
    z-index: 100;
    top: 53px;
    left: 400px;
    background: #ffffff;
    box-shadow: 0 4px 4px 0 rgba(64, 88, 122, 0.10);
    border-radius: 4px;
    width: 227px;
    height: 296px;
    p {
      font-size: 18px;
      color: #1f2d3d;
      line-height: 24px;
      text-align: center;

    }
    .img {
      margin: 0px 32px 32px;
      width: 162px;
      height: 162px;
      img {
        width: 100%;
      }
    }
    .arrow {
      position: absolute;
      top: -14px;
      right: 105px
    }
  }

  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .el-notification {
    top: 300px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .login{
    float: right !important;
    margin-right: 6% !important;
    @media screen and(max-width: 1400px){
      margin-right: 6% !important;
    }
  }
  .btn1{
    margin-left: 16px;
  }
</style>
