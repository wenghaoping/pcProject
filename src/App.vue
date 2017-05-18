<template>
  <div id="app">
<!--     头部导航 -->
    <header id="header">
      <el-row>
        <el-col :span="24">
        <el-menu default-active="myProject" class="el-menu-demo" mode="horizontal" :router="true">
          <el-menu-item :span="3" index="1"><img src="./assets/logo/logoing.png"></el-menu-item>
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/workBench/myProject">工作台</el-menu-item>
          <el-menu-item index="/SmallRoutine"><i class="el-icon-setting"></i>小程序</el-menu-item>
        </el-menu>
        </el-col>
      </el-row>
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
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  //引入自己的CSS,格式化样式
  import './assets/css/base.css'
  import './assets/css/animate.css'
  Vue.use(Element)

  export default {
    name: 'app',
    data() {
      return {
        activeIndex: '1'
      };
    },
//    当dom一创建时
    created(){
      this.$router.push('/index');
    },
  }
</script>

<style>
  body{margin: 0;}
  #app {
    min-width: 1200px;
    margin: 0 auto;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
  }
  .bg{background: #40587A}
  /* 头部导航 */
  #header{z-index: 1000;transition: all 0.5s ease;}
  #header .header-fixed{position: fixed;top: 0;left: 0;right: 0;}
  #header .is-active{color:#ccc}
/*  header .el-menu-demo{background-color: #40587A !important;color:#fff;}
  header .el-menu-item{color:#fff!important}*/
  .center_header{}
  /*.center_header .el-menu-vertical-demo{background-color: #40587A !important;color:#fff;}*/
/*  !* 主内容区 *!*/
  main{min-height: 800px;}
/*  main .main-left{text-align: center;width: 200px;float: left;}
  main .main-right{-webkit-box-flex: 1;  -ms-flex: 1;  flex: 1;  background-color: #fff; padding: 50px 70px; }
  main .el-menu{background-color: transparent!important;}*/
  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

</style>
