<template>
  <div class="creatproject">
    <div class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box">
        <div class="left-wrap">
          <!--=================================基本资料=================================-->
          <div class="item-block" style="margin-top:0;padding-bottom: 10px;">
            <div class="block-tt-line">
              <span class="b-title">基本资料</span>
              <span class="b-line" style="width: 624px;"></span>
            </div>
            <div class="block-info block-cc-file" style="margin-top: 48px;">
              <span class="f-title fl">商业计划书</span>
              <!--<span class="f-name">微天使商业计划书</span>
              <span class="del-btn"><i class="el-icon-delete"></i></span>-->
              <span style="margin-left: 20px;" class="fl">
                <el-upload class="Upload"
                           ref="upload"
                           action="api/v/project/projectUpload"
                           :on-change="planChange"
                           :on-success="planuploadsuccess"
                           :on-preview="planPreview"
                           :on-remove="planRemove"
                           :on-error="planuploaderror"
                           :file-list="planList"
                           :before-upload="beforeUpload"
                           accept=".doc, .ppt, .pdf, .zip, .rar, .docx, .pptx"
                           :data="uploadDate">
                  <el-button slot="trigger" type="primary" v-show="planButton" class="fl"><i class="el-icon-plus"></i>上传附件</el-button>
                  <div slot="tip" class="el-upload__tip fr" v-show="planButton">BP私密保护，认证投资人需要向您申请并得到同意后才能查看<br>支持pdf、ppt、pptx、doc、docx、zip、rar文件格式</div>
                </el-upload>
              </span>

            </div>
            <el-form :model="project" ref="project" label-width="100px" class="padding" label-position="top">
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <span class="justIlook">(仅自己可见)</span>
                  <el-form-item
                    label="项目名称"
                    prop="pro_name">
                    <el-input v-model="project.pro_name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <span class="justIlook2">(仅自己可见)</span>
                  <el-form-item
                    label="公司名称"
                    prop="pro_company_name">
                    <el-autocomplete v-model="project.pro_company_name"
                                     :fetch-suggestions="querySearchAsync"
                                     placeholder="请输入内容"
                                     @select="handleSelect" class="width360">

                    </el-autocomplete>
                  </el-form-item>
                </el-col>
                <span class="ques">
                  <el-tooltip placement="bottom-end">
                      <div slot="content">
                        <div class="tips-txt">1、一键同步公司信息，快速创建项目</div>
                        <div class="tips-txt" style="margin-top:5px;">2、可在项目详情查看尽调报告</div>
                      </div>
                      <img src="../../../assets/images/question.png" alt="" />
                  </el-tooltip>
              </span>
              </el-row>
            </el-form>
          </div>
          <!--=================================项目介绍=================================-->
          <div class="item-block" style="margin-top:16px;padding-bottom: 10px;">
            <div class="block-tt-line" style="margin-bottom: 32px;">
              <span class="b-title">项目介绍</span>
              <span class="b-line" style="width: 624px;"></span>
            </div>
            <el-form :model="project" ref="project" label-width="100px" class="padding" label-position="top">
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <el-form-item
                    label="项目介绍"
                    prop="pro_intro"
                    :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'},{min: 1, max:40,message: '最大40个字符'}]">
                    <el-input v-model="project.pro_intro" placeholder="一句话介绍，如帮助FA成交的项目管理工具"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="项目领域"
                    prop="pro_industry"
                    :rules="[{type: 'array',required: true, message: '项目领域不能为空', trigger: 'change'}]">
                    <el-select
                      v-model="project.pro_industry"
                      multiple
                      filterable
                      :multiple-limit="multiplelimit"
                      placeholder="请添加(最多5个)" class="width360" >
                      <el-option
                        v-for="item in industry"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <el-form-item
                    label="项目轮次"
                    prop="pro_finance_stage"
                    :rules="[{type:'number',required: true, message: '项目轮次不能为空', trigger: 'change'}]">
                    <el-select v-model="project.pro_finance_stage" placeholder="请选择" class="width360">
                      <el-option
                        v-for="item in stage"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="padding-right: 5px;">
                  <el-form-item
                    label="所属省级"
                    prop="pro_area_province"

                    :rules="[{required: true, message: '所属省级不能为空', trigger: 'change',type: 'number'}]">
                    <el-select v-model="project.pro_area_province" placeholder="请选择" @change="area1Change">
                      <el-option
                        v-for="item in area"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="padding-left: 5px;">
                  <el-form-item label="所属市级"
                                prop="pro_area_city"
                                :rules="[{required: true, message: '所属市级不能为空', trigger: 'change',type: 'number'}]">
                    <el-select v-model="project.pro_area_city" placeholder="请选择">
                      <el-option
                        v-for="item in area2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <el-form-item
                    label="期望融资"
                    prop="pro_finance_scale"
                    :rules="[{required: true, message: '期望融资不能为空', trigger: 'change',type: 'number'}]">
                    <el-select v-model="project.pro_finance_scale" placeholder="请选择" class="width360">
                      <el-option
                        v-for="item in scale"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="投后股份(%)"
                    prop="pro_finance_stock_after">
                    <el-input v-model="project.pro_finance_stock_after" placeholder="请输入具体数值，如：10"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <el-form-item
                    label="私密设置"
                    prop="open_status">
                    <el-select v-model="project.open_status" placeholder="请选择" class="width360">
                      <el-option label="私密项目（仅自己／团队成员可查看编辑）" value="0"></el-option>
                      <el-option label="公开项目（投放到交易市场参与融资匹配，投资人可以申请查看bp，每日限公开一次）" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="是否独家"
                    prop="is_exclusive">
                    <el-radio class="radio" v-model="project.is_exclusive" :label=2>非独家FA签约</el-radio>
                    <el-radio class="radio" v-model="project.is_exclusive" :label=1>独家FA签约</el-radio>
                    <el-radio class="radio" v-model="project.is_exclusive" :label=0>其他</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :span="24" :gutter="32">
                <el-col :span="24">
                  <el-form-item label="项目亮点"
                                prop="pro_goodness"
                                :rules="[{required: true, message: '项目亮点不能为空', trigger: 'blur'},{min: 1, max:400,message: '最大400个字符'}]">
                    <el-input type="textarea"
                              v-model="project.pro_goodness"
                              :autosize="{ minRows: 4, maxRows: 7}"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </div>
          <el-button type="primary" size="large" style="float: right;margin-top: 32px;" @click="allSave">提交</el-button>
          <div style="height: 50px;"></div>
          <el-dialog
            :title="companyTitle"
            :visible.sync="dialogVisible"
            size="tiny"
            :show-close="close">
            <span>微天使为您找到相似公司，是否一键同步</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sync">一键同步</el-button>
          </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        planList:[],//商业计划书上传列表
        planButton:false,//控制上传按钮的显示
        dialogVisible:false,//是否同步弹窗
        uploadShow:{//计划书上传列表,需要存数据啦

        },
        close:false,
        uploadDate:{user_id: sessionStorage.user_id},//商业计划书上传所带的额外的参数
        project: {
          project_id:'',
          pro_name : '',//项目名称
          pro_company_name : '',//公司名称
          pro_intro : '',//项目介绍
          pro_industry:[],//项目领域
          pro_finance_stage: {
            "stage_id": 2,
            "stage_name": "天使轮",
            "sort": 2,
            "created_at": null,
            "updated_at": null
          },//轮次
          pro_area_province:"",//所属地区1省级单位
          pro_area_city:"",//所属地区2市级单位
          pro_finance_scale:'',//期望融资
          pro_finance_stock_after:'',//投后股分
          open_status:'1',//私密设置
          is_exclusive: 0,//0其他 1独家 2非独家
          pro_goodness:''//项目亮点

        },//项目介绍
        multiplelimit:5,
        /*公司远程搜索*/
        loading: false,
        restaurants: [],
        timeout:  null,
        /*所属地区1省级选项*/
        area: [],
        /*所属地区2市级选项*/
        area2: [],
        /*项目领域默认选项*/
        industry: [],
        /*融资范围*/
        scale:[],
        /*项目轮次选项*/
        stage: [],
        companyTitle:"微天使",
        queryData:{},

      }
    },
    methods: {
      /*获取列表各种数据*/
      getCity(data){
        let arr = [];
        for(let i=0; i<data.length; i++){
          let obj={};
          obj.label=data[i].area_title;
          obj.value=data[i].area_id;
          arr.push(obj)
        }
        return arr
      },//获取城市列表
      getScale(data){
        let arr = [];
        for(let i=0; i<data.length; i++){
          let obj={};
          obj.label=data[i].scale_money;
          obj.value=data[i].scale_id;
          arr.push(obj)
        }
        return arr
      },//获取期望融资
      getStage(data){
        let arr = [];
        for(let i=0; i<data.length; i++){
          let obj={};
          obj.label=data[i].stage_name;
          obj.value=data[i].stage_id;
          arr.push(obj)
        }
        return arr
      },//获取轮次信息
      getIndustry(data){
        let arr = [];
        for(let i=0; i<data.length; i++){
          let obj={};
          obj.label=data[i].industry_name;
          obj.value=data[i].industry_id;
          arr.push(obj)
        }
        return arr
      },//获取项目领域
      getWxProjectCategory(){
        this.$http.post(this.URL.getWxProjectCategory,{user_id: sessionStorage.user_id})
          .then(res=>{
            let data = res.data.data;
            this.area=this.getCity(data.area);//设置城市1列表
            this.scale=this.getScale(data.scale);//设置期望融资
            this.stage=this.getStage(data.stage);//设置轮次信息
            this.industry=this.getIndustry(data.industry);//设置轮次信息
          })
          .catch(err=>{
            console.log(err)
            //            this.loading=false;
          })
      },//获取所有下拉框的数据
      area1Change(data){
        this.project.pro_area_city="";
        this.$http.post(this.URL.getArea,{user_id: sessionStorage.user_id, pid:data})
          .then(res=>{
            let data = res.data.data;
            this.area2=this.getCity(data);
          })
          .catch(err=>{
            console.log(err)
          })
      },//设置二级城市下拉列表
      getNumberFull(data,title1,title2){
        let check=true;
        if(this.getNull(data)){

        }else {
          if (this.checkNumber(parseFloat(data))) {
            if (parseFloat(data) > 100) {
              this.alert(title1);
              check = false;
            }
          } else {
            this.alert(title2);
            check = false;
          }
        }
        return check;
      },//1大于100,2必须为数字
      getNull(data) {
        let reg=/\S/;
        if (!reg.test(data))
        {
          return true;
        }else{
          return false;
        }

      },//判断是不是空
      checkNumber(theObj) {
        let reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(theObj)) {
          return true;
        }
        return false;
      },//判断是不是数字
      /*商业计划书*/
      planChange(file, fileList){
        this.planList=fileList
        if(file.status==="fail") this.planButton=true;
        else this.planButton=false;
      },
      planuploadsuccess(response, file, fileList){
        this.success("上传成功");
        console.log(response)
        let data = response.data;
        this.addplan(data.file_title,data.pro_intro,data.pro_name,data.project_id,data.file_id)
      },//上传成功后添加字段
      planuploaderror(err, file, fileList){
        this.alert("上传失败,请联系管理员")
      },//上传失败
      planRemove(file, fileList) {
        const deleteAtUpload=this.URL.deleteAtUpload;
        if (fileList.length == 0) this.planButton = true;
        else this.planButton = true;
        this.$http.post(deleteAtUpload,{user_id: sessionStorage.user_id,project_id:this.uploadShow.project_id})
          .then(res=>{
            if(res.status===200){
              this.loading=false;
              this.success("删除成功")
            }
            console.log(res)
          })
          .catch(err=>{
            console.log(err)
            this.alert("删除失败,请联系管理员")
          })

      },//删除文件
      addplan(file_title,pro_intro,pro_name,project_id,file_id) {
        let object ={};
        object.file_title=file_title;
        object.pro_intro=pro_intro;
        object.pro_name=pro_name;
        object.project_id=project_id;
        object.file_id=file_id;
        this.uploadShow=object;
      },//添加上传文件时,保存返回的数据
      planPreview(file){
        const url=this.URL.weitianshi+this.URL.download+"?user_id="+sessionStorage.user_id+"&file_id="+this.uploadShow.file_id
        window.location.href=url;
      },//点击下载
      beforeUpload(file){
        let filetypes=[".doc",".ppt",".pdf",".zip",".rar",".docx",".pptx"];
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
        if(!isnext){
          this.alert("不支持的文件格式");
          return false;
        }
        if(parseInt(file.size) > parseInt(20971521)){
          this.alert("暂不支持超过20m文件上传哦");
          return false;
        }
      },//上传前的验证


      /*警告弹窗*/
      alert(text) {
        this.$notify.error({
          message: text,
          offset: 300,
          duration:1000
        });
      },
      /*成功弹窗*/
      success(text) {
        this.$notify({
          message: text,
          type: 'success',
          offset: 300,
          duration:1000
        })
      },
      goBack(){//返回上一层
        this.$router.push('/');
      },
      /*检查所有必填项目以及获取所有数据*/
      submitForm(formName) {
        let check=true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            return
          } else {
            this.alert('必填项不能为空')
            check=false;
          }
        });
        return check;
      },
      /*创建成功弹窗*/
      open2(title,main,confirm,cancel) {
        this.$confirm(main,title , {
          confirmButtonText: confirm,
          cancelButtonText:cancel ,
          type: 'success'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '继续完善'
          });
          this.$router.push({ name: 'editproject', query: {project_id:this.project.project_id}})
        }).catch(() => {
          this.$router.push({ path: '/'})
        });
      },
      /*全部保存按钮*/
      allSave(){
        if(!this.getNumberFull(this.project.pro_finance_stock_after,"投后股份必须小于100","投后股份必须为数字")){console.log("投后没过")}
        else if(this.getNull(this.project.pro_intro)){this.alert("项目介绍不能为空")}
        else if(this.getNull(this.project.pro_goodness)){this.alert("项目亮点不能为空")}
        else if(this.submitForm('project')) {
          this.project.user_id=sessionStorage.user_id;
          this.project.project_id=this.uploadShow.project_id;
          this.$http.post(this.URL.editProject,this.project)
            .then(res=>{
              console.log(res);
              let data=res.data;
              this.project.project_id=data.project_id;
              this.open2('创建成功','完善项目资料，让投资人更全面得了解项目价值','去完善','跳过')
            })
            .catch(err=>{
              this.alert("创建失败");
              console.log(err);
            })

        }
      },
      /*获取数据*/
      loadData(arr){
        let newArr=[];
        for(let i=0; i<arr.length; i++){
          let obj={};
          obj.value=arr[i].company_name;
          obj.address=arr[i].com_id;
          newArr.push(obj)
        }
        return newArr
      },
      /*自动搜索,接口写这里面*/
      querySearchAsync(queryString, cb) {
        this.$http.post(this.URL.selectCompany,{user_id:sessionStorage.user_id,company_name:queryString})
          .then(res=>{
            this.restaurants=[];
            let data=res.data.data;
            this.restaurants=this.loadData(data);
            if(queryString=="") this.restaurants=[];
            let restaurants = this.restaurants;
            /*          let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;*/
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(restaurants);
            }, 300);
          })
          .catch(err=>{
            this.alert("加载失败");
            console.log(err);
          })
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.companyTitle=item.value;
        this.$http.post(this.URL.getOneCompany,{user_id:sessionStorage.user_id,com_id:item.address})
          .then(res=>{
            let data=res.data.data;
            this.queryData=data;
//          console.log(this.$tool.getToObject(data));
          })
          .catch(err=>{
            this.alert("获取失败");
            console.log(err);
          });
        this.dialogVisible=true;
      },
      /*一键同步按钮*/
      sync(){
        this.dialogVisible = false;
        if(this.project.pro_intro=="") this.project.pro_intro=this.queryData.project_info.project_introduce;
        this.project.pro_company_name=this.queryData.company_name;
      },
      getprojectId(){
        this.project.project_id = this.$route.query.project_id;
        console.log(this.$route.query.project_id);
      },
      getWxosProjectData(){
        console.log("我登陆啦")
        console.log(sessionStorage.credential);
        if(sessionStorage.credential==undefined || sessionStorage.credential=="" || sessionStorage.credential==null){

        }else{
          console.log("我进来啦")
          this.$http.post(this.URL.getWxosProjectData,{credential:sessionStorage.credential})
            .then(res=>{
              let data=res.data.project;
              console.log(this.$tool.getToObject(data));
              this.project.pro_industry=data.industry;
              if(data.is_exclusive==4) data.is_exclusive=0;
              this.project.is_exclusive=data.is_exclusive;
              if(data.pro_finance_scale==0) data.pro_finance_scale="";
              this.project.pro_finance_scale=data.pro_finance_scale;
              if(data.pro_finance_stage==0) data.pro_finance_stage={stage_id:""};
              this.project.pro_finance_stage=data.pro_finance_stage;
              this.project.pro_goodness=data.pro_goodness;
              this.project.pro_intro=data.pro_intro;
              sessionStorage.credential="";
            })
            .catch(err=>{
              this.alert("获取失败");
              console.log(err);
            });
        }
      }//微信进入的时候获取
    },
    mounted() {

    },
    created(){
      if(this.planList.length!=0) this.planButton=false;
      else this.planButton=true;
      this.getprojectId();
      this.getWxProjectCategory();
      setTimeout(() => {
        this.getWxosProjectData();
      },1000)

    },
    /*watch: {
     // 如果路由有变化，会再次执行该方法
     "$route": "getWxosProjectData"
     }*/

  }
</script>

<style lang="less">
  @import '../../../assets/css/edit.less';
  .Upload{
    .el-upload{

    }
    .el-upload-list__item{
      /*    width: 200px;*/
    }
    .el-upload-list__item-name{
      font-size:14px;
      color:#475669;
      letter-spacing:0;
      text-decoration:underline
    }
    .el-upload__tip{
      width:539px;
      margin-left: 19px;
      height: 36px;
      font-size:12px;
      color:#5e6d82;
    }
    .el-upload__tip{
      margin-top: 0;
    }

  }
  .el-dialog--tiny{
    width: 390px;
  }
  .el-dialog__body{
    font-size:14px;
    color:#475669;
    letter-spacing:0;
    line-height:21px;
  }
  .el-upload-list__item:first-child{
    margin-top:0px;
  }
  .el-upload-list__item{
    margin-top:0px;
    line-height:1;
  }
  .el-radio{
    padding-right: 15px;
  }

  .edit-page .right-wrap{

  }
  .el-form-item{
    /*margin-bottom: 32px !important;*/
  }

</style>
