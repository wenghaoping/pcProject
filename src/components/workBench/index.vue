<template>
  <div id="workBench">
    <!--左侧导航-->
    <div class="center_header main-left">
      <el-row>
        <el-col>
          <el-menu default-active="1" class="el-menu-vertical-demo" >
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>个人工作台</template>
              <el-menu-item index="1-1">杭州投着乐1</el-menu-item>
              <el-menu-item index="1-2">杭州投着乐2</el-menu-item>
              <el-menu-item index="1-3">杭州投着乐3</el-menu-item>
            </el-submenu>
          </el-menu>
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>团队协作</template>
                <el-menu-item index="2-1">杭州投着乐1</el-menu-item>
                <el-menu-item index="2-2">杭州投着乐2</el-menu-item>
                <el-menu-item index="2-3">杭州投着乐3</el-menu-item>
                <el-menu-item index="2-4">创建团队</el-menu-item>
            </el-submenu>
            <el-menu default-active="3" class="el-menu-vertical-demo" >
              <el-menu-item index="3"><i class="el-icon-menu"></i>个人工作台</el-menu-item>
            </el-menu>
          </el-menu>
        </el-col>

      </el-row>
    </div>
<!--    <div class="aside-menu">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-menu-item index="1"><i class="el-icon-message"></i>个人工作台</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>团队协作</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">杭州投着乐网络有限公司</el-menu-item>
            <el-menu-item index="1-2">微天使</el-menu-item>
            <el-menu-item index="1-3">微天使乐投平台</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2" style="text-align: center;"><el-button>创建团队</el-button></el-menu-item>
        <el-menu-item index="3"><i class="el-icon-setting"></i>项目中转站</el-menu-item>
      </el-menu>
    </div>-->
    <!-- 右侧主内容区 -->
    <div class="main-right" >
      <transition name="fade">
        <router-view class="view">

        </router-view>
      </transition>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
import ElCol from "element-ui/packages/col/src/col";
export default {
  data(){
    return {

    }
  },
  computed:{

  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
#workBench .el-menu-item{height:45px;line-height: 45px;}
#workBench .main-left{width: 160px;position: absolute}
#workBench .main-right{background-color: #fff;padding-left: 170px;}
/* 路由切换动效 */
.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
