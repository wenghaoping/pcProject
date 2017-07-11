<template>
  <div id="followUpDetail" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <h1>我是跟进记录详情</h1>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: ["proid"],
  data () {
    return {
      pro_id: '',
      loading:false,//加载
    }
  },
  methods: {

  },
  created(){

  },
  watch : {
    proid : function(e){
      this.pro_id=e;

    },//获取项目id
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/followUpDetail';
</style>
