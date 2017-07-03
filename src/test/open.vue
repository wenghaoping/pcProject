<template>
  <div id="open">
    <el-button @click="console">点击</el-button>
    <el-button @click="err">点击</el-button>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      test : ''
    }
  },
  methods: {
    console(){
        this.$tool.console("你好")
    },
    err(){
      this.$tool.error("试试");
    }
  },
  watch : {

  },
  computed: {

  }
}
</script>

<style lang="less">

</style>
