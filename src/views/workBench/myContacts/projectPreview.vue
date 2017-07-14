<template>

  <div id="projectPreview" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================项目推送预览弹框=============================================-->
    <el-dialog :visible="dialogPreviewVisible" custom-class="dialogCon" :before-close="handleClose" close-on-press-escape close-on-click-modal>
<h1>项目推送弹框</h1>
<h1>项目推送弹框</h1>
<h1>项目推送弹框</h1>
<h1>项目推送弹框</h1>
<h1>项目推送弹框</h1>
<el-button @click="get">
  点击获取
</el-button>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: ["dialogPreviewVisible"],
  data () {
    return {
//      dialogConVisible: true,
      loading:false,//加载动画
    }
  },
  methods: {
    handleClose(){
      this.$emit('changeCon', false)
    },
    get(){
        console.log(document.getElementById('projectPreview').innerHTML)
    }
  },

}
</script>

<style lang="less">
  @import '../../../assets/css/projectDetail';
  #projectPreview{
    .dialogCon{

    }
  }
</style>
