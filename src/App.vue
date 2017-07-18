<template>
  <div id="app">
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
        <li>
          <a target="_blank" href="http://cqc.casicloud.com/youthCmpe/common/home.do" style="width: 200px;">团中央·青年APP大赛</a>
        </li>
        <li v-if="user_name" style="float: right;">
          {{user_name}}
        </li>
        <li v-show="!user_id" class="login" @click="login">
          登录
        </li>
      </ul>
    </header>
    <div style="height: 60px;"></div>

    <!--下方主内容切换区-->
    <main>
      <transition name="fade" mode="out-in">
        <router-view class="view">


        </router-view>
      </transition>
    </main>

    <div class="Infooter tc">
      <p>关于我们 | 联系我们</p>
      <p> © 杭州投着乐网络科技有限公司   浙ICP备16041047号-1</p>
    </div>
  </div>

</template>

<script>

  export default {
    data () {
      return {
        active: 0,
        tabs: [
          {type: '首页', jump: '/'},
          {type: '工作台', jump: '/workBench'},
//          {type: '扫码登陆',jump:'/logining'},
//          {type: '测试页面', jump: '/test'},
//          {type: '测试页面2', jump: '/test2'}
        ],
        user_name: localStorage.user_real_name,
        user_id:'',
      }
    },
    methods: {
      // 切换选项卡
      toggle(i){
        this.active = i
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
        localStorage.user_id = 'V0VznXa0';
//        localStorage.user_id='2rzyz5vp';
//        localStorage.user_real_name='杜兴国';
      },
      // 登录
      login(){
        localStorage.entrance='myProject';
        this.$router.push('/login');
      },
      // 检查localStorage.user_id
      checkUser(){
        console.log(this.$route.path)
        this.user_id=localStorage.user_id;
        //头部导航下标不对应问题解决
        if(this.$route.path==='/workBench' || this.$route.path==='/workBench/'){
          this.active=1
        }
        //未登录状态下拦截
        if(!localStorage.user_id && this.$route.path!=='/' && this.$route.path!=='/login' && this.$route.path!=='/login/codeLogin' && this.$route.path!=='/login/telephoneLogin' && this.$route.path!=='/forgetPassword' && this.$route.path!=='/loginReady' &&this.$route.path!=='/login/' && this.$route.path!=='/bindTelephone' && this.$route.path!=='/workBench/' && this.$route.path!=='/workBench' && this.$route.path!=='/qr'){
          this.$tool.error('请先登录')
          this.$router.push({name:'index'})
        }
        //一小时不动后退出登录
        setTimeout(function(){
          localStorage.clear()
        },3600000)
        //登录状态下拦截
        /*if(localStorage.user_id && (this.$route.path==='/identityChoose' || this.$route.path==='/identityDetail')){
          this.$router.push({name:'index'})
        }*/
      },
    },
//    当dom一创建时
    created(){
/*       if(localStorage.user_id=="" || localStorage.user_id==undefined){
         this.$router.push({ name: 'SmallRoutine'});
       }else{
       //        this.$router.push('/');
       this.active=0;
       }*/
        //this.$router.push({name:"identityDetail"});
//        this.$router.push({name:"contactsDetails"});
//        this.$router.push({name:"projectDetails"});

//        this.$router.push({name:"telephoneLogin"});

//        this.$router.push({name:"myContacts"});
//        this.$router.push({name:"createContacts"});
//        this.setUserId();
    },
    watch: {
      user_name: function (e) {
        this.$tool.console(e, 1);
      },
      "$route": "checkUser"
    }
  }
</script>

<style lang="less">
  .Infooter {

    background:#444444;
    font-size: 12px;
    color:#a1a1a1;
    line-height: 12px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    p:first-child{
      margin-bottom: 10px;
    }
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
  }

  /*  .is-light{
      border: none!important;
    }
    .el-tooltip__popper{
      padding: 0!important;
    }*/
  #app {
    /*min-width: 1903px;*/
    background: #f3f4f8;

    main {
      min-height: 669px;
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
    margin-right: 18% !important;
    @media screen and(max-width: 1400px){
      margin-right: 10% !important;
    }
  }
</style>
