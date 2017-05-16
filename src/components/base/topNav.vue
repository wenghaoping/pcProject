<template>
  <div class="topNav">
    <el-tabs v-model="activeName2" type="card" class="top_nav">
      <el-tab-pane label="我的项目" name="first">我的项目</el-tab-pane>
      <el-tab-pane label="我的人脉" name="second">我的人脉</el-tab-pane>
      <el-tab-pane label="跟进记录" name="third">跟进记录</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'topNav',
  data() {
    return {
      activeName2:''
    }
  }
}
</script>

<style scoped>

</style>
