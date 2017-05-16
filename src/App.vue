<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header">
     <!-- <el-row>
        <el-col :span="24">
          <el-menu default-active="5" class="el-menu-demo" mode="horizontal" menu-trigger="">
            <el-menu-item :span="3" index="1"><img src="./assets/logo/logoing.png"></el-menu-item>
            <el-menu-item index="2">首页</el-menu-item>
            <el-submenu index="3">
              <template slot="title">工作台</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="4"><i class="el-icon-setting"></i>小程序</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>-->
    <el-row>
      <el-col :span="24">
      <el-menu default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item :span="3" index="1"><img src="./assets/logo/logoing.png"></el-menu-item>
        <el-menu-item index="2">首页</el-menu-item>
        <el-menu-item index="myProject" default-active="/myProject">工作台</el-menu-item>
        <el-menu-item index="4"><i class="el-icon-setting"></i>小程序</el-menu-item>
      </el-menu>
      </el-col>
    </el-row>
    </header>

  <!--中间主内容切换区-->
    <main>
      <transition name="fade">
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

  Vue.use(Element)

  export default {
    name: 'app',
    data() {
      return {
        activeIndex: '1'
      };
    },
    created: function(){
      this.$router.push('/myProject');
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
  header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;margin-bottom: 20px}
  header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
/*  header .el-menu-demo{background-color: #40587A !important;color:#fff;}
  header .el-menu-item{color:#fff!important}*/
  .center_header{}
  /*.center_header .el-menu-vertical-demo{background-color: #40587A !important;color:#fff;}*/
/*  !* 主内容区 *!
  main{    display: -webkit-box;  display: -ms-flexbox;  display: flex;  min-height: 800px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
  main .main-left{text-align: center;width: 200px;float: left;}
  main .main-right{-webkit-box-flex: 1;  -ms-flex: 1;  flex: 1;  background-color: #fff; padding: 50px 70px; }
  main .el-menu{background-color: transparent!important;}*/
  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
