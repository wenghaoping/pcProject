<template>
    <div id="cardUpload">
      <div class="cardFrame flex">
        <span class="card">名片</span>
        <el-upload
          class="upload-demo"
          action="https://dev.weitianshi.cn/api/v/user/uploadCard"
          :data="uploadData"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :on-success="uploadSuccess"
        >
          <el-button size="small" type="primary" style="background:#40587a;border-color: #40587a ">
            <i class="el-icon-plus"></i>
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">支持JPG、PNG、JPEG，且不超过1M</div>
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
              image_id:''
            }
        },
        methods: {
          // 取消列表里的文件时触发
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          // 点击列表里的文件触发
          handlePreview(file) {
            console.log(file);
          },
          // 上传文件之前触发
          beforeUpload(file){
            let filetypes=[".png",".jpg",".jpeg"];
            let name=file.name;
            let fileend=name.substring(name.lastIndexOf("."));
            let isnext = false;
            if(filetypes && filetypes.length>0){
              for(var i =0; i<filetypes.length;i++){
                if(filetypes[i]===fileend){
                  isnext = true;
                  break;
                }
              }
            }
            this.loading=false;
            if(!isnext){
              this.$tool.error("不支持的文件格式");
              return false;
            }
            if(parseInt(file.size) > parseInt(1024)){
              this.$tool.error("暂不支持超过1m文件上传哦");
              return false;
            };
            if(parseInt(this.num) > parseInt(1)){
              this.$tool.error("一次最多选择1个文件");
              this.num=0;
              return false;
            }
          },
          // 上传成功时触发
          uploadSuccess(response, file, fileList){
            console.log(response)
            if(response.status_code===2000000){
              console.log(2)
              this.$emit('upLoadSuccess',response.image_id)
            }else{
              this.$tool.error('上传失败')
              return '上传失败'
            }
          },
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
