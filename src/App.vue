<template>
  <div id="app">
    <el-row>

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
        <li v-show="user_name" style="float: right;position: relative;margin-right: 55px;line-height: 60px">
          {{user_name}}
          <span style="display:inline-block;margin-left: 5px"><i class="el-icon-caret-bottom" style="font-size: 10px"></i></span>
          <div class="login-show" v-show="user_id" style="position: absolute;top: -10px;">
            <el-select v-model="value" style="opacity: 0;height: 33px;color: #000000" placeholder="请选择" @change="loginOut">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!--<div class="sss" @click="opp" style="position: absolute;top: 36px;z-index: 111111">-->
             <!--<i class="el-icon-caret-bottom "></i>-->
            <!--</div>-->
          <!--<div class="out" v-if="flag" @click="loginOut" >退出登录</div>-->

          </div>

        </li>
        <li v-show="!user_name" class="login" @click="login">
          登录
        </li>
        <el-autocomplete
          v-model="companyTitle"
          :fetch-suggestions="querySearchAsync"
          placeholder="查竞品，查工商，请输入公司或品牌名称"
          @select="handleSelect"
          class="width350"
        ></el-autocomplete>
        <!--<li @click="loginOut">-->
          <!--退出登录-->
        <!--</li>-->
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



    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        brand1:'',
        restaurants: [],
        companyTitle: '',
        timeout:  null,
        cb:'',
        options: [
//            {
//          value: 0,
//          label: '个人信息'
//        },
          {
          value: 0,
          label: '退出登录'
        }],
        value:'',
        flag:false,
        active: 0,
        tabs: [
          {type: '首页', jump: '/'},
          {type: '工作站', jump: '/workBench'},
//          {type: '扫码登陆',jump:'/logining'},
//          {type: '一键尽调', jump: '/API/DD?company=杭州卓健信息科技有限公司&id=NC81sv9XmvLTsIQ5g7PeHWD0iOySYBrtAHC5M5poeOlkITcTYTChn92kadP9Kau8&includeInvestorMap=false;'},
//          {type: '测试页面2', jump: '/test2'}
        ],
        user_name:'',
        user_id:'',
      }
    },
    mounted(){
    },
    methods: {
      // 切换选项卡
      toggle(i){
        this.active = i;
        // 控制点击工作台跳转情况
        if(this.active===1){
          localStorage.entrance='myProject';
          if(localStorage.user_id){
            this.$router.push({name:'myProject'});
          }else{
            this.$router.push({name:"telephoneLogin"});
          }
        }
      },
      // 伪造user_id
      setUserId(){
//        localStorage.user_id = 'V0VznXa0';
        localStorage.user_id = '8W1ERo3W';//自己的
//        localStorage.user_id='2rzyz5vp';
//        localStorage.user_id='2rzyJEwp';
        localStorage.user_real_name='翁浩平';
        this.$store.state.logining.user_real_name='黄晨曦';
      },
      // 登录
      login(){
        localStorage.entrance='myProject';
        this.$router.push('/login');
      },
      //

      //显示退出登录
      opp(){
        this.flag=!this.flag;
      },
      //*获取远程数据模拟
      loadData(arr){
        var newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].project_name=="" ? arr[i].company_name : arr[i].company_name + '(' +arr[i].project_name + ')';
          obj.address = arr[i].com_id;
          obj.company_name = arr[i].company_name;
          obj.pro_id=arr[i].pro_id;
          newArr.push(obj)
        }
        return newArr;
      },
      //*自动搜索,接口写这里面
      querySearchAsync(queryString, cb) {
        if(queryString.length>2) {
          this.$http.post(this.URL.selectCompany, {company_name: queryString})
            .then(res => {
              this.restaurants = [];
              let data = res.data.data;
                this.restaurants = this.loadData(data);
              let restaurants = this.restaurants;
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                  if(data.length==0){
                    cb([{value:"未查询到结果，换个关键词试试",address:-1}]);
                  }else{
                    cb(restaurants);
                  }
              }, 500);
            })
            .catch(err => {
              this.$tool.console(this.restaurants);
            })
        }else{
          cb([]);
        }
      },
      handleSelect(item) {
        this.loading=true;
        this.companyTitle=item.company_name;
        this.companyId = item.address ;
        this.$http.post(this.URL.getCrawlerCompany, {company_name:this.companyTitle})
          .then(res => {
            let data = res.data.data;
            if(data.length!=0){
              this.$router.push({name: 'onekeyResearch', query: {company:  item.company_name,pro:item.pro_id}})//路由传参
            }else{
              this.$tool.warning("未查询到该公司信息，无法获取");
            }
            this.loading=false;
          })
          .catch(err => {
            this.$tool.error("获取失败");
            this.$tool.console(err);
            this.loading=false;
          });
      },//选择了搜索出来的数据后
      //检查localStorage.user_id
      checkUser(){
        //this.$tool.console(this.$route.path)
        this.user_id=localStorage.user_id;
        this.user_name=this.userRealName;
        //头部导航下标不对应问题解决
        if(this.$route.path==='/workBench' || this.$route.path==='/workBench/'){
          this.active=1
        }

        //看是否需要加入项目库
        this.addProject();

        //未登录状态下拦截
        if(!localStorage.user_id && this.$route.path!=='/'
          && this.$route.path!=='/login' && this.$route.path!=='/login/codeLogin'
          && this.$route.path!=='/login/telephoneLogin' && this.$route.path!=='/forgetPassword'
          && this.$route.path!=='/loginReady' &&this.$route.path!=='/login/'
          && this.$route.path!=='/bindTelephone' && this.$route.path!=='/workBench/'
          && this.$route.path!=='/workBench' && this.$route.path!=='/qr'
          && this.$route.path!=='/API/DD' && this.$route.path!=='/aboutUs'
          && this.$route.path!=='/onekeyResearch' && this.$route.path!='/emailContact'){
//          this.$tool.error('请先登录');
          this.$router.push({name:'index'});
        }
        //十二小时不动后退出登录
        setTimeout(function(){
          localStorage.clear()
        },43200000)
        //登录状态下拦截
        /*if(localStorage.user_id && (this.$route.path==='/identityChoose' || this.$route.path==='/identityDetail')){
          this.$router.push({name:'index'})
        }*/


      },
      //登出
      loginOut(e){
        if(e==0){
          localStorage.clear();
          this.$router.push({name: 'login'});//路由传参
          setTimeout(()=>{ window.location.reload();},50)
        }
      },
      //加入项目库
      addProject(){
        console.log(this.$route);
        //第一次取出数据,防止登录后,又去取值,被覆盖
        if(this.$route.query.flog==='mail') {
          localStorage.projectId = this.$route.query.project_id || '';//加入项目库的项目id
          localStorage.flog = this.$route.query.flog || '';//是否是邮箱加入项目库
          localStorage.type = this.$route.query.type || '';
          localStorage.userId = this.$route.query.user_id || '';//邮箱推送者id
        }

        //如果是加入项目库操作的
        if(localStorage.flog === 'mail'){

          if(!localStorage.user_id) {
            //没有登录的人去登录
            this.$router.push({name:'telephoneLogin'});
          }else if(this.$route.query.user_id===localStorage.user_id){
            //推送者和接受者是同一人时
            this.$tool.warning("您的项目库中已存在此项目");
            localStorage.flog = "";//把默认值清空;
            setTimeout(()=>{ this.$router.push('/workBench/'); window.location.reload();},50);
          }else if((localStorage.userId!==localStorage.user_id)&&(localStorage.flog==='mail')&&(localStorage.type==='user')) {
            //当不是同一人时,且是加入项目的时候
            this.$http.post(this.URL.importProject,{user_id: localStorage.userId, project_id:localStorage.projectId})
              .then(res=>{
                if(res.data.status_code==2000000) {
                  this.$tool.success("项目导入成功");
                  localStorage.flog = "";//把默认值清空;
                  setTimeout(()=>{ this.$router.push('/workBench/'); window.location.reload();},50);
                }
              })
              .catch(err=>{
                this.$tool.error("项目导入失败");
                localStorage.flog = "";//把默认值清空;
                setTimeout(()=>{  this.$router.push('/workBench/');window.location.reload();},50);
              })
          }
        }





          /*if((this.$route.query.user_id===localStorage.user_id)&&(this.$route.query.flog==='mail')&&(this.$route.query.type==='user')){
            this.$http.post(this.URL.importProject,{user_id: this.$route.query.user_id, project_id:this.$route.query.project_id})
              .then(res=>{
                if(res.data.status_code==2000000) {
                  this.$tool.success("项目导入成功");
                  setTimeout(()=>{ this.$router.push('/workBench/'); window.location.reload();},50)
                }
              })
              .catch(err=>{
                this.$tool.error("项目导入失败");
                setTimeout(()=>{  this.$router.push('/workBench/');window.location.reload();},50)
              })
          }else{
            localStorage.clear();
            setTimeout(()=>{ window.location.reload();},50)
            this.$router.push({name: 'login'});//路由传参
          }*/

      }//邮箱加入项目库
    },
    //当dom一创建时
    created(){
      this.user_name = localStorage.user_real_name;
    },
    computed:{
      userRealName(){
        let user_real_name=this.$store.state.logining.user_real_name || localStorage.user_real_name;
        return user_real_name;
      },
    },
    watch: {
      "$route": "checkUser"
    }
  }
</script>

<style lang="less">
  /*.el-autocomplete, .el-dropdown{*/
    /*position: relative;*/
    /*top: 12px!important;*/
    /*right: 15%!important;*/
  /*}*/
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
  .out{
    /*display: none;*/
  }
  /*.sss:focus + .out{*/
    /*display: block;*/
  /*}*/
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
    /*overflow: auto!important;*/
  }
  .newColor{
    color:#40587A!important;
  }
  /*  .is-light{
      border: none!important;
    }
    .el-tooltip__popper{
      padding: 0!important;
    }*/
   #app {
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
    /*min-width: 1903px;*/
    background: #f3f4f8;
     /*overflow-x: hidden;*/
    main {
      min-height: 791px;
    }
    font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif;
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
  #samllrou:hover + .weixin {
    display: block;
  }

  #samllrou {
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

  /*  !* 主内容区 *!*/
  /*  main{min-height: 800px;}*/

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
/*    background:#40587a;
    border-radius:2px;
    width:88px;
    height:36px;color:#ffffff;cursor: pointer;*/margin-left: 16px;
  }
</style>
