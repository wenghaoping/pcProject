<template>
  <div id="dialog">
    <!--<el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="doing">取 消</el-button>
        <el-button
          plain
          @click="open4">
          警告
        </el-button>
        <el-button type="primary" @click="doing">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('update:dialogVisible', false);
    },
    doing(){
      this.$emit('update:dialogVisible', false);
      console.log('visible')
    },
    do(){
      this.$http.post(this.URL.createFileType, {
        user_id: sessionStorage.user_id,
        type_name: this.groups.input
      })
        .then(res => {
          let data =res.data.data;
          let newObj = {};

        })
        .catch(err => {
          console.log(err)
        })

    },
    open4(){
      this.$notify({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning',
        duration:0
      });
    }
  }
}
</script>

<style scoped lang="less">

</style>
