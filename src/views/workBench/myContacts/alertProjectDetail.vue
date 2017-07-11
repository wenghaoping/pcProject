<template>
    <div id="alertProjectDetail" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
      <!--===========================================项目详情弹窗=============================================-->
      <el-dialog :visible="dialogProVisible" custom-class="dialogPro" :before-close="handleClose" close-on-press-escape close-on-click-modal>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleTo">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleTo">确 定</el-button>
      </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["dialogProVisible","proid"],
  data () {
    return {
      loading:false,
      pro_id:'',
    }
  },
  methods: {
    handleClose(){

    },
    dialogVisibleTo(){
      this.$emit('changeall', false)
    }
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
  @import '../../../assets/css/alertProjectDetail';
</style>
