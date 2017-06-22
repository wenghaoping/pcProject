<template>
  <div id="dialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="doing">取 消</el-button>
        <el-button type="primary" @click="doing">确 定</el-button>
      </span>
    </el-dialog>
    <button></button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["dialogVisible"],
  data () {
    return {
      msg: ''
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

    }
  }
}
</script>

<style scoped lang="less">

</style>
