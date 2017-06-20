<template>
  <div id="myProjct">
    <!--顶部导航栏-->
    <top-nav></top-nav>

    <!--<div class="search">
      <el-input
        placeholder="搜索项目,公司名称"
        icon="search"
        v-model="input2"
        :on-icon-click="handleIconClick">
      </el-input>
    </div>-->

    <!--下方主内容切换区-->
    <main class="clearfix">
      <transition name="fade"  mode="out-in">
        <router-view class="view">


        </router-view>
      </transition>
    </main>

  </div>
</template>
<script type="text/ecmascript-6">
  import topNav from '../../../components/topNav.vue'

  export default {
    data() {
      return {
        input2: '',
        activeName:'first'
      }
    },
    components: {
      topNav
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
        console.log(this.input2);
      }
    }
  };
</script>

<style scoped>
#myProjct .search{width: 190px;position: absolute;left:300px;top:0px;}
#myProjct{
  position: relative;

}
  /* 路由切换动效 */
.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translateX(100px);
}

</style>
