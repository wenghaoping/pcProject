<template>
  <div id="selectbox">
    <el-button type="primary" @click='dialogVisible = true'>点击打开 Dialog</el-button>

    <visible :dialog-visible="dialogVisible"></visible>

  </div>
</template>

<script type="text/ecmascript-6">
  import visible from './dialog2.vue'
  export default {
    components: {
      visible
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {

    }

}
</script>

<style scoped lang="less">

</style>
