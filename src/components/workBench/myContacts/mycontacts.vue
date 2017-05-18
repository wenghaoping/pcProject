<template>
  <div id="mycontacts">
    <!-- 右侧底部主内容区 -->
      <h1>我是我的人脉页面</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'hello',
  data () {
    return {
      msg: '',
      activeName:'second'
    }
  },
  components: {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>

</style>
