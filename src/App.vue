<template>
  <div id="app">
    <!--     头部导航 -->
    <header id="header">
      <ul class="select ulfl tc" style="position: relative">
        <li style="width: 150px;margin-right: 320px;vertical-align: middle;display: table-cell;height: 60px;"><img
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
          <a href="http://cqc.casicloud.com/youthCmpe/common/home.do" style="width: 200px;">团中央·青年APP大赛</a>
        </li>
        <li v-if="user_name" style="float: right;margin-right: 359px;">
          {{user_name}}
        </li>
        <li v-else style="float: right;margin-right: 359px;" @click="login">
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

    <p class="Infooter">© 杭州投着乐网络科技有限公司   浙ICP备16041047号-1</p>
  </div>

</template>

<script>

  export default {
    data () {
      return {
        active: 1,
        tabs: [
          {type: '首页', jump: '/index'},
          {type: '工作台', jump: '/'},
//                   {type: '扫码登陆',jump:'/logining'},
          {type: '测试页面', jump: '/test'},
          {type: '测试页面2', jump: '/test2'}
        ],
        user_name: sessionStorage.user_real_name
      }
    },
    methods: {
      toggle(i){
        this.active = i
      },
      setUserId(){
//        sessionStorage.user_id = 'V0VznXa0';
        sessionStorage.user_id='2rzyz5vp';
      },
      login(){
        sessionStorage.entrance='index';
        this.$router.push('/login');
      }
    },
//    当dom一创建时
    created(){
/*       if(sessionStorage.user_id=="" || sessionStorage.user_id==undefined){
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
          this.$router.push({name:"createContacts"});

        this.setUserId();

    },
    watch: {
      user_name: function (e) {
        this.$tool.console(e, 1);
      }
    }
  }
</script>

<style lang="less">
  .Infooter {
    font-size: 12px;
    color: #cccccc;
    line-height: 12px;
    width: 1336px;
    margin: 0 auto;
    margin-top: 60px;
    text-align: center;
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
    padding-bottom: 60px;

    main {

    }
    font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif;
    header {
      width: 100%;
      background: #40587a;
      height: 60px;
      position: fixed;
      z-index: 99999999;
    }
    .select {
      cursor: pointer;

      color: #ffffff;
      letter-spacing: 0;
      line-height: 16px;
      height: 60px;
      li {
        width: 150px;
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
    left: 582px;
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

</style>
