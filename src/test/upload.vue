<template>
  <div id="test">
    <!--上传-->
    <el-row :span="8">
      <el-col :span="8">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/project/projectUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="success"
          :on-error="err"
          :on-change="handleChange"
          :thumbnail-mode="true"
          :data="form"
          :file-list="fileList"
          multiple>
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>

  </div>
</template>

<script type="text/ecmascript-6">
  import {tool} from '../global/tool.js'
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    name: 'hello',
    data() {
      return {
        fileList: [

        ],
        form :{user_id: '2rzyz5vp'}

      }
    },
    methods: {
      create() {

      },
      onSubmit() {
        var data=this.form;
        console.log(this.$tool.getToObject(data));
      },
      submitUpload() {
        this.$refs.upload.submit();
//        console.log(this.fileList)
      },
      handleRemove(file, fileList) {
        console.log(this.$tool.getToObject(file));
        console.log(this.$tool.getToObject(fileList));
      },
      handlePreview(file) {
        console.log(this.$tool.getToObject(file));
      },
      success(response, file, fileList){
        console.log(response)
/*        console.log(file)
        console.log(fileList)*/
        console.log("success")
      },
      err(err, file, fileList){
        console.log(this.$tool.getToObject(err))
//        console.log(this.$tool.getToObject(file))
//        console.log(this.$tool.getToObject(fileList))
      },
      handleChange(file, fileList) {
        console.log(this.$tool.getToObject(file))
//        console.log(this.$tool.getToObject(fileList))
        console.log("handleChange")

      }
    }
  }
</script>

<style lang="less">


</style>
