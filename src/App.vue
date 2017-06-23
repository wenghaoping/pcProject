<template>
  <div id="app">
<!--     头部导航 -->
    <header id="header">
      <ul class="select ulfl tc"  style="position: relative" >
        <li style="width: 150px;margin-right: 320px;vertical-align: middle;display: table-cell;height: 60px;"><img src="./assets/images/logoing.png" style="vertical-align:middle;"></li>
        <li @click="toggle(index)" v-for="(tab,index) in tabs" >
          <router-link :to=" tab.jump " :class="{border:active===index}">
            {{tab.type}}
          </router-link>
        </li>
          <li id="samllrou">小程序</li>
          <div class="weixin">
            <p style="margin-top: 25px;">微信扫一扫</p>
            <p>发现更多精选资源</p>
            <div class="img">
              <img src="./assets/images/weixin.png">
            </div>
            <div class="arrow">
              <img src="./assets/images/arrow.png">
            </div>
          </div>
        <li style="float: right">
          {{user_name}}
        </li>
      </ul>
    </header>

  <!--下方主内容切换区-->
    <main>
      <transition name="fade"  mode="out-in">
        <router-view class="view">


        </router-view>
      </transition>
    </main>

  </div>

</template>

<script>

  export default {

    name: 'app',
    data () {
      return {
        active: 0,
        tabs: [
/*          {type: '首页',jump:'/index'},*/
          {type: '工作台',jump:'/workBench/myProject'},
          {type: '扫码登陆',jump:'/smallRoutine'},
/*          {type: '测试页面',jump:'/test'},
          {type: '测试页面2',jump:'/test2'}*/
        ],
        user_name:sessionStorage.user_real_name
      }
    },
    methods: {
      toggle(i){
        this.active = i
      },
      setUserId(){
        sessionStorage.user_id='2rzyz5vp';
      }
    },
//    当dom一创建时
    created(){
      this.$router.push('/workBench/myproject');
//      this.$router.push({ name: 'editproject'})
      this.setUserId();

    },
  }
</script>

<style lang="less">

  *{
    padding:0;
    margin:0;
    box-sizing: border-box;
    font-family:"Microsoft YaHei","微软雅黑";

  }
  body{margin: 0;}
/*  .is-light{
    border: none!important;
  }
  .el-tooltip__popper{
    padding: 0!important;
  }*/
  #app {
    /*min-width: 1903px;*/
    background: #f3f4f8;
    main{
      width: 1336px;
      margin: 0 auto;
    }
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
      header {
        width: 100%;
        background:#40587a;
        height: 60px;
      }
    .select{
      cursor: pointer;

      color:#ffffff;
      letter-spacing:0;
      line-height:16px;
      height: 60px;
      li{width: 150px;
        height: 50px;
        line-height: 50px;
        a{
          text-align:center;
          height: 50px;
          display: block;
          color: #fff;
          font-size: 16px;
          width: 70px;
        }

      }
      .border{
        border-bottom: 1px white solid;
        a{
          color: #fff;
        }
      }
    }
  }
  #samllrou:hover + .weixin{
    display: block;
  }
  #samllrou{

  }
  .weixin{
    display: none;

    position: absolute;
    z-index: 100;
    top:53px;
    right:808px;
    background:#ffffff;
    box-shadow:0 4px 4px 0 rgba(64,88,122,0.10);
    border-radius:4px;
    width:227px;
    height:296px;
    p{
      font-size:18px;
      color:#1f2d3d;
      line-height:24px;
      text-align:center;

    }
    .img{
      margin: 32px;
    }
    .arrow{
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
  .el-notification{
    top: 300px;
    left: 0;
    right: 0;
    margin: auto;
  }

</style>
