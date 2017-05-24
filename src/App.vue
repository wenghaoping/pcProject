<template>
  <div id="app">
<!--     头部导航 -->
    <header id="header">
      <ul class="select ulfl tc">
        <li style="width: 150px;"><img src="./assets/logo/logoing.png"></li>
        <li @click="toggle(index)" v-for="(tab,index) in tabs" :class="{border:active===index}">
          <router-link :to=" tab.jump ">
            {{tab.type}}
          </router-link>
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
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  //引入自己的CSS,格式化样式
  import './assets/css/base.css'
  import './assets/css/animate.css'
  import $ from 'jquery'
  import tool from './assets/js/tool.js';
  Vue.use(Element)//UI库
  Vue.use(tool);//自己的库
  export default {

    name: 'app',
    data () {
      return {
        active: 0,
        tabs: [
          {type: '首页',jump:'/index'},
          {type: '工作台',jump:'/workBench/myProject'},
          {type: '小程序',jump:'/smallRoutine'},
          {type: '测试页面',jump:'/test'}
        ]
      }
    },
    methods: {
      toggle(i){
        this.active = i

      }
    },
//    当dom一创建时
    created(){
      this.$router.push('/index');
    },
  }
</script>

<style lang="less">
  @import './assets/css/index.less';
  body{margin: 0;}
  #app {
    min-width: 1920px;
    margin: 0 auto;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
      header{
         width: 100%;background: #40587A;height: 60px;
       }
    width: 100%;background: #40587A;height: 60px;

    .select{
      color:#fff;
      cursor: pointer;
      li{width: 100px;height: 50px;line-height: 50px;

        a{
          width: 100px;height: 50px;display: block;color: #fff;
        }
      }
      .border{
        border-bottom: 3px white solid;

        a{
          color: #fff;
        }
      }
    }
  }

/*  !* 主内容区 *!*/
  main{min-height: 800px;}

  /* 路由切换动效 */
  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

</style>
