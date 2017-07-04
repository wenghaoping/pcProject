<template>
    <div id="uploadHeadPic">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="headPic"
        accept=".jpg, .png, .jpeg"
        list-type="picture">
        <el-button size="small" type="primary">
          <i class="el-icon-plus"></i>
          点击上传
        </el-button>
        <div slot="tip" class="el-upload__tip">支持JPG、PNG、JPEG</div>
      </el-upload>
    </div>
</template>


<script type="text/ecmascript-6">
    export default {
        data () {
            return {
              headPic: [
                {
                  name: 'food2.jpeg',
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
              ]
            }
        },
        methods: {
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.log(file);
          }
        }
    }
</script>

<style scoped lang="less">
  @import "../assets/css/indentity.less";
</style>
