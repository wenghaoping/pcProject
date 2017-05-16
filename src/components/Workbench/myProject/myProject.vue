<template>
  <div class="myProjct">
    <!--<el-tabs v-model="activeName2" type="card" class="top_nav">
      <el-tab-pane label="我的项目" name="first">我的项目</el-tab-pane>
      <el-tab-pane label="我的人脉" name="second">我的人脉</el-tab-pane>
      <el-tab-pane label="跟进记录" name="third">跟进记录</el-tab-pane>

    </el-tabs>-->
    <topNav>

    </topNav>
    <div class="search">
      <el-input
        placeholder="搜索项目,公司名称"
        icon="search"
        v-model="input2"
        :on-icon-click="handleIconClick">
      </el-input>
    </div>
    <!-- 右侧底部主内容区 -->
    <div>
      <transition name="fade">
        <router-view class="view">

        </router-view>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import topNav from './topNav.vue'
  export default {
    data() {
      return {
        input2: '',
        activeName2:''
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
.myProjct .search{width: 190px;position: absolute;left:300px;top:0px;}
.myProjct{position: relative;}
  /* 路由切换动效 */
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
