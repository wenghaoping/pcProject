<template>
    <div id="cardUpload">
      <div class="cardFrame flex">
        <span class="card">名片</span>
        <el-upload
          class="upload-demo"
          action="api/v/user/uploadCard"
          :data="uploadData"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList">
          <el-button size="small" type="primary" style="background:#40587a;border-color: #40587a ">
            <i class="el-icon-plus"></i>
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">支持JPG、PNG、JPEG，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
        data () {
            return {
              uploadData:{
                user_id:sessionStorage.user_id,
                id:sessionStorage.id,
              },
              fileList: [],
            }
        },
        methods: {
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.log(file);
          }
        },
        created(){
          console.log(sessionStorage.user_id,sessionStorage.id)
        }
    }
</script>

<style scoped lang="less">
  #cardUpload{
    vertical-align: baseline;
    margin-top: 32px;
    .card{
      margin-top: 5px;
      margin-right: 16px;
    }
    .el-upload__tip{
      display: inline-block;
      margin-left: 16px;
    }
  }
</style>
