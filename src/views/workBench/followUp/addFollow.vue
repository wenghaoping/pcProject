<template>
  <div id="addFollow" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================添加或编辑跟进记录弹窗=============================================-->
    <el-dialog
      :visible.sync="dialogFollow"
      size="tiny">
      <div class="tagTitle">准确设置项目标签便于查找，并参与项目匹配度计算</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFollow = false">继续添加</el-button>
        <el-button type="primary" @click="dialogFollow = false">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ["dialogFollow","followid"],
    data () {
      return {
        loading:false,
        follow_id:'',
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
      followid : function(e){
        this.follow_id=e;

      },//获取项目id
    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/alertProjectDetail';
</style>
