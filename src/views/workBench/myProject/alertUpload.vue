<template>
  <div id="alertUpload" v-loading.fullscreen.lock="loading" element-loading-text="上传中">
    <el-dialog title="批量上传BP" :visible="dialogUploadVisible" :before-close="handleClose" :show-close="showList">
      <div style="height:250px;"></div><!--老子就是一个占位的-->
        <el-upload class="uploadProjec"
                   action="api/v/project/projectUpload"
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
          <div class="el-upload__text"><!--将文件拖到此处，或--><em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip" >BP私密保护，认证投资人需要向您申请并得到同意后才能查看<br>支持pdf、ppt、pptx、doc、docx、zip、rar文件格式</div>
        </el-upload>

      <div slot="footer" class="dialog-footer" style="padding-top: 40px;padding-right: 44px;padding-bottom: 15px;">
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="批量上传BP" :visible="dialogUpload2Visible" :before-close="handleClose" :show-close="showList">
      <div class="loadmodel">
        <el-upload
          class="upload-demo"
          ref="upload"
          size="large"
          action="api/v/project/projectUpload"
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
            <p class="bp fl">BP私密保护，认证投资人需要向您申请并得到同意后才能查看<br>支持pdf、ppt、pptx、doc、docx、zip、rar文件格式</p>
          </div>

        </el-upload>
        <div class="uploadForm" style="padding-top: 32px;">
          <el-form :model="dateForm" ref="dateForm" label-width="100px" class="demo-dynamic" label-position="top">
            <el-row :span="24" :gutter="10">
              <el-col :span="6">
                <el-form-item
                  label="项目名称"
                  :prop="'domains.' + index + '.file_title'"
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index"
                  :rules="[{required: true, message: '项目名称不能为空', trigger: 'blur'}]">
                  <el-input v-model="domain.pro_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="项目介绍"
                  :prop="'domains.' + index + '.pro_intro'"
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index"
                  :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'}]">
                  <el-input v-model="domain.pro_intro"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="商业计划书"
                  :prop="'domains.' + index + '.pro_name'"
                  v-for="(domain, index) in dateForm.domains"
                  :key="domain.index">
                  <el-input v-model="domain.file_title" :disabled="true"></el-input>
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
        <p class="alertIn">{{alentTitle}}</p>
        <div slot="footer" class="dialog-footer clearfix" style="padding-top: 40px;">
          <div class="fr">
            <el-button type="primary" @click="submitUpload('dateForm',dateForm)">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
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
      number:0,//用来和选择数字做对比
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
      uploadDate:{user_id: localStorage.user_id},//上传所带的额外的参数
      loadingcheck:false,
      showList:false,
      alentTitle:""
    }
  },
  methods: {
    //1号添加文件后添加入上传列表,并且跳转到多次上传的列表
    handleChange(file, fileList) {
      this.loading=true;
//      this.$tool.console(file);
//      let type=file.name.substr(file.name.length-3,3)
      this.$emit('changeupload',false)
      this.dialogUpload2Visible=true;

      if(this.loadingcheck){
        this.loading=false;
        this.loadingcheck=false;
//        this.number=0;
      }
      this.$tool.console(this.num,this.number);
      if(parseInt(this.num)==parseInt(this.number)){
        this.alentTitle="";
        this.number=0;
        this.num=0;
      }
    },
    uploadsuccess(response, file, fileList){
        this.number++;
        let data=response.data;
        if(response.status_code==2000000) {
          this.$tool.success("上传成功");
          this.addDomain(data.pro_intro,data.pro_name,data.file_title,data.project_id);
          this.loadingcheck=true;
        }
    },
    uploaderror(err, file, fileList){
      this.loading=false;
      this.loadingcheck=true;
      this.$tool.error("上传失败");
    },
    handlePreview(file) {
      this.$tool.console(file);
    },
    beforeUpload(file){
      this.alentTitle="上传中.....";
      this.num++;
      let filetypes=[".doc",".docx",".ppt",".pptx",".pdf",".zip",".rar"];
      let name=file.name;
      let fileend=name.substring(name.lastIndexOf("."));
      let isnext = false;
      if(filetypes && filetypes.length>0){
        for(var i =0; i<filetypes.length;i++){
          if(filetypes[i]==fileend){
            isnext = true;
            break;
          }
        }
      }
      this.loading=false;
      if(!isnext){
        this.$tool.error("不支持的文件格式");
        this.alentTitle="不支持的文件格式";
        this.number=0;
        this.num=0;
        return false;
      }

      if(parseInt(file.size) > parseInt(20971521)){
        this.$tool.error("暂不支持超过20m文件上传哦");
        this.alentTitle="暂不支持超过20M文件上传哦";
        this.number=0;
        this.num=0;
        return false;
      }
      if(parseInt(this.num) > parseInt(5)){
        this.$tool.error("一次最多选择5个文件");
        this.alentTitle="一次最多选择5个文件";
        this.num=0;
        this.number=0;
        return false;
      }

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
              this.$tool.console(res)
              if(res.status===200){
                this.dialogUpload2Visible=false;
                this.$emit('reload', true);
                this.dateForm.domains=[];
                this.fileList=[];
              }
            }).catch(err=>{
            this.$tool.console(err)
//            this.closeLoading();
          })
          this.$refs.upload.submit();
        } else {
          this.$tool.console('error submit!!');
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

      this.$http.post(deleteUpload,{user_id: localStorage.user_id,project_id:item.project_id})
        .then(res=>{
          if(res.status===200){
            this.loading=false;
            this.$tool.success("删除成功");
          }
            this.$tool.console(res)
        })
        .catch(err=>{
          this.$tool.console(err)

        })
    },
    //添加上传文件时,加入显示列表
    addDomain(pro_intro,pro_name,file_title,project_id) {
      let object ={};
      object.file_title=file_title;
      object.pro_intro=pro_intro;
      object.pro_name=pro_name;
      object.project_id=project_id;
      this.dateForm.domains.push(object);
    },
    //当取消时,清空上传列表
    cancel(){
      this.$confirm('确认关闭？关闭后所有数据清空?')
        .then(_ => {

          let arr=this.dateForm.domains
          this.$tool.console(this.dateForm.domains);
          for(let i=0; i<arr.length; i++){
            this.$http.post(this.URL.deleteUpload,{user_id: localStorage.user_id,project_id:arr[i].project_id})
            .then(res=>{
              if(res.status===200){
              this.loading=false;
              this.$tool.success("删除成功");
            }
              this.$tool.console(res)
            })
            .catch(err=>{
              this.$tool.console(err)
            })
          }
          this.$emit('changeupload',false);
          this.dialogUpload2Visible=false;
          this.dateForm.domains=[];
          this.fileList=[];
          conosle.log("删除啦")
        })
        .catch(_ => {

        });
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
  }
}
</script>

<style scoped lang="less">
  .alertIn{
    color: red;
  }
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
  font-size:12px;
  color:#5e6d82;
  letter-spacing:0;
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
