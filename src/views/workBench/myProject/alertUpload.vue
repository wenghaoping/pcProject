<template>
  <div id="alertUpload" >
    <el-dialog title="批量上传创建项目" :visible="dialogUploadVisible" :before-close="handleClose" :show-close="showList">
      <div style="height:250px;"></div><!--老子就是一个占位的-->
        <el-upload class="uploadProjec"
                   action="/project/projectUpload"
                   :on-preview="handlePreview"
                   :on-change="handleChange"
                   :on-success="uploadsuccess"
                   :on-error="uploaderror"
                   :file-list="fileList"
                   :before-upload="beforeUpload"
                   :on-progress="handleProgress"
                   :data="uploadDate"
                   :show-file-list="showList"_
                   ref="upload"
                   accept=".doc, .ppt, .pdf, .zip, .rar, .docx, .pptx"
                   drag multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip" >BP私密保护，投资人可通过申请查看来了解项目价值<br>支持pdf、ppt、doc、zip、rar文件格式</div>
        </el-upload>

      <div slot="footer" class="dialog-footer" style="padding-top: 40px;">
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="批量上传创建项目" :visible="dialogUpload2Visible" :before-close="handleClose" :show-close="showList">
      <div class="loadmodel" v-loading.fullscreen.lock="loading" element-loading-text="上传中">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/project/projectUpload"
          :on-preview="handlePreview"
          :on-change="handleChange"
          :on-success="uploadsuccess"
          :on-progress="handleProgress"
          :on-error="uploaderror"
          :file-list="fileList"
          :data="uploadDate"
          :before-upload="beforeUpload"
          :show-file-list="showList"
          accept=".doc, .ppt, .pdf, .zip, .rar, .docx, .pptx"
          multiple>
          <div class="inner">
            <el-button slot="trigger" type="primary" class="fl"><i class="el-icon-plus"></i>上传附件</el-button>
            <p class="bp fl">BP私密保护，投资人可通过申请查看来了解项目价值支持pdf、ppt、doc、png，jpg，jpeg文件格式</p>
          </div>

        </el-upload>
        <div class="uploadForm" style="padding-top: 32px;">
          <el-form :model="dateForm" ref="dateForm" label-width="100px" class="demo-dynamic" label-position="top">
            <el-row :span="24" :gutter="10">
              <el-col :span="6">
                <el-form-item
                  label="项目名称"
                  :prop="'domains.' + index + '.bp_title'"
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index"
                  :rules="[{required: true, message: '项目名称不能为空', trigger: 'blur'}]">
                  <el-input v-model="domain.pro_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="项目介绍"
                  :prop="'domains.' + index + '.pro_desc'"
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index"
                  :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'}]">
                  <el-input v-model="domain.pro_desc"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="商业计划书"
                  :prop="'domains.' + index + '.pro_name'"
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index">
                  <el-input v-model="domain.bp_title" :disabled="true"></el-input>
                </el-form-item>

              </el-col>
              <el-col :span="2" >
                <el-form-item
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index"
                  style="padding-top: 23px;">
                  <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer" style="padding-top: 40px;">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitUpload('dateForm',dateForm)">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["dialogUploadVisible"],
  data () {
    return {
      num:0,//控制一次最多选择个数
//      dialogUploadVisible: false,//第一个弹窗的控制
      dialogUpload2Visible:false,//第二个弹窗的控制
      status:"",//状态success/exception
      percentage:0,//进度
      formLabelWidth: '880px',
      fileList:[
      ],//上传文件的列表
      dateForm: {//展示的列表
        domains: [],
      },
      loading:false,
      uploadDate:{user_id: sessionStorage.user_id},//上传所带的额外的参数
      loadingcheck:'',
      showList:false
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    //1号添加文件后添加入上传列表,并且跳转到多次上传的列表
    handleChange(file, fileList) {
      this.loading=true;
      let type=file.name.substr(file.name.length-3,3)
//      console.log(fileList)
      this.$emit('changeupload',false)
      this.dialogUpload2Visible=true;
      if(!this.loadingcheck){
        this.loading=false;
      }
      console.log("change")
    },
    uploadsuccess(response, file, fileList){
        this.loadingcheck=true;
        let data=response.data
        if(response.status_code==2000000) {
          this.success("上传成功");
          this.addDomain(data.pro_desc,data.pro_name,data.bp_title,data.project_id);
          this.loading=false;
          this.loadingcheck=false;
        }
    },
    uploaderror(err, file, fileList){
      this.loading=false;
      this.alert("上传失败");
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file){
      this.num++;
      if(parseInt(file.size) > parseInt(31457280)){
        this.alert("请上传小于30MB的文件");
        console.log("超过啦")
        return false;
      };
      if(parseInt(this.num) > parseInt(5)){
        this.alert("一次最多选择5个文件");
        this.num=0;
        return false;
      }
//      this.loading=true;
    },
    handleProgress(event, file, fileList){
      this.percentage=parseInt(event.percent);
    },
    //提交表单服务器时
    submitUpload(formName,formData) {
      let obj = this.dateForm.domains;
        this.$refs[formName].validate((valid) => {
        if (valid) {
          const saveUploadURL=this.URL.saveUpload
          this.$http.post(saveUploadURL,obj)
            .then(res=>{
              console.log(res)
              if(res.status===200){
                this.dialogUpload2Visible=false;
              }
            }).catch(err=>{
            console.log(err)
//            this.closeLoading();
          })
          this.$refs.upload.submit();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //删除当前上传文件
    removeDomain(item) {
      const deleteUpload=this.URL.deleteUpload
      var index = this.dateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dateForm.domains.splice(index, 1)
        this.fileList.splice(index, 1)
      }

      this.$http.post(deleteUpload,{user_id: sessionStorage.user_id,project_id:item.project_id})
        .then(res=>{
          if(res.status===200){
//            this.loading=false;
            this.alert("删除成功");
          }
            console.log(res)
        })
        .catch(err=>{
          console.log(err)

        })
    },
    //添加上传文件时,加入显示列表
    addDomain(bp_title,pro_desc,pro_name,project_id) {
      let object ={};
      object.bp_title=bp_title;
      object.pro_desc=pro_desc;
      object.pro_name=pro_name;
      object.project_id=project_id;
      this.dateForm.domains.push(object);
    },
    //当取消时,清空上传列表
    cancel(){
      this.$confirm('确认关闭？关闭后所有数据清空')
        .then(_ => {
          this.$emit('changeupload',false);
          this.dialogUpload2Visible=false;
          this.dateForm.domains.splice(0,this.dateForm.domains.length)
        })
        .catch(_ => {});
    },
//    dialogVisiblechange() {
//      this.$emit('changeupload',false)
//    },
    handleClose(done) {
      this.$confirm('确认关闭？关闭后所有数据清空')
        .then(_ => {
          this.$emit('changeupload',false);
          this.dialogUpload2Visible=false;
          done()
        })
        .catch(_ => {});
    },
    /*警告弹窗*/
    alert(text) {
      this.$notify.error({
        message: text,
        offset: 300,
        duration:2000
      });
    },
    /*成功弹窗*/
    success(text) {
      this.$notify({
        message: text,
        type: 'success',
        offset: 300,
        duration:2000
      })
    },
  }
}
</script>

<style scoped lang="less">
  .el-notification{
    z-index: 2005;
  }
  .el-upload__tip{
    text-align: center;
  }
.uploadProjec{
  width: 360px;
  height: 180px;
  position: absolute;
  right: 0px;
  top:0px;
  left: 0px;
  bottom: 0px;
  margin: auto;
  .el-upload-dragger{
    background-color:#f9fafc!important;
    font-size: 40px;
  }
}
.bp{
  display: inline-block;
  width: 549px;
  font-size:12px;
  color:#5e6d82;
  letter-spacing:0;
  line-height: 36px;
  padding-left: 10px;
}
  .el-progress--circle{
    left: 30%;
  }
  .loadmodel{
    width: 100%;
  }
  .el-notification{
    z-index: 2004;
  }
</style>
