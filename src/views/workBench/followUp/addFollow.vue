<template>
  <div id="addFollow" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================添加或编辑跟进记录弹窗=============================================-->
    <el-dialog :visible="dialogFollow" custom-class="dialogFollow" :before-close="handleClose" close-on-press-escape close-on-click-modal>
      <div class="addTitle">
        <span> | </span>添加跟进
      </div>
      <div class="main">
        <el-form :model="follow" ref="follow" label-width="100px" class="padding" label-position="top">
          <el-row :span="24">
            <el-col :span="24">
              <el-form-item
                label="* 关联项目"
                prop="project_name">
                <el-autocomplete v-model="follow.project_name"
                                 :fetch-suggestions="querySearchProject"
                                 placeholder="一句话介绍，如帮助FA成交的项目管理工具"
                                 :maxlength="20"
                                 style="width:360px;"
                                 @select="handleSelectProject">
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="意向投资人"
                prop="card_name"
                :rules="[{max: 20, message: '长度不能大于20个字符', trigger: 'blur' }]">
                <el-autocomplete v-model="follow.card_name"
                                 :fetch-suggestions="querySearchAsync"
                                 placeholder="请选择或添加投资人"
                                 :maxlength="20"
                                 @select="handleSelect">
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="跟进进度"
                prop="schedule_id">
                <el-select v-model="follow.schedule_id"
                           placeholder="请选择"
                           style="width: 165px;">
                  <el-option
                    v-for="item in schedule_name"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" :gutter="32">
            <el-col :span="24">
              <el-form-item label="跟进描述"
                            prop="follow_desc"
                            :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                <el-input type="textarea"
                          style="width: 360px;"
                          v-model="follow.follow_desc"
                          :autosize="{ minRows: 4, maxRows: 30}" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="block-info block-cc-pro" style="margin-top:15px;">
          <span class="f-title fl">项目文件</span>
          <span style="margin-left: 34px;" class="fl">
              <el-upload
                class="upload"
                ref="upload"
                action="api/v/project/uploadFile"
                :on-change="handleChange"
                :on-success="uploadsuccess"
                :on-error="uploaderror"
                :before-upload="beforeUpload"
                :file-list="fileList"
                :data="fileuploadDate"
                :show-file-list="showList"
                accept=".doc, .ppt, .pdf, .zip, .rar, .png, .docx, .jpg, .pptx, .jpeg"
                multiple>
                <el-button slot="trigger" type="primary"><i class="el-icon-plus"></i>上传附件</el-button>
              </el-upload>
          </span>
        </div>
        <div class="block-info block-cc-other" style="margin-bottom: 15px;"
             v-for="(list, index) in uploadShow.lists"
             :key="list.index">
          <span class="f-title">{{list.bp_type}} : </span>
          <span class="f-name" @click.prevent="download(list)"
                style="cursor: pointer">{{list.file_title}}</span>
          <span class="del-btn" @click.prevent="removeList(list)"><img src="../../../assets/images/delete.png"></span>
          <span class="solt-btn" @click.prevent="toGroup(list)">分组设置</span>
        </div>
        <div slot="footer" class="dialog-footer fr" style="margin: 32px 0">
          <!--<el-button @click="saveSecond">继续添加</el-button>-->
          <el-button type="primary" @click="allSave">提 交</el-button>
        </div>
      </div>
    </el-dialog>

    <!--文件分组的弹窗-->
    <el-dialog title="文件分组设置" :visible.sync="dialogFileVisible" :show-close="showList">
      <el-form :model="groups" ref="groups">
        <el-form-item label="分组名称" label-width="80px" prop="input"
                      :rules="[{min: 2, message: '最少2个字符',required: true, message: '分组不能为空', trigger: 'blur'}]">
          <el-row :span="24" :gutter="32">
            <el-col :span="18">
              <el-input v-model="groups.input" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addGroup('groups')">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="radio">
        <el-radio-group v-model="groups.type" @change="groupchange">
          <el-radio v-for="group in groups.group" class="radio"
                    :label="group.value"
                    :key="group.value"
          >{{group.label}}
          </el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFileVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveGroupChange">保　存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ["dialogFollow","followid","projectid","projectname","cardid","cardname","getData"],
    data () {
      return {
        loading:false,
        loading2:false,//加载框加载
        showList: false,//上传列表隐藏
        dialogFileVisible:false,//文件分组设置
        fileuploadDate: {user_id: localStorage.user_id, flag:1 },//项目文件上传带的参数
        restaurants: [],//项目模糊匹配存放
        userArr: [],//意向投资人模糊匹配存放
        timeout: null,
        fileList: [],//批量上传文件列表
        uploadShow: {//上传文件展示列表,就是老夫操作的列表
          lists: []
        },
        groups: {
          input: "",
          group: [
/*              {type: "其他", label: '其他', value: '其他'}*/
              ],
          type: "",
          name:""
        },//分组用的所有参数
        statusLast:0,
        loadingcheck:false,
        follow_id:'',
        value:'',
        follow:{
          project_id:'',//关联项目id
          project_name:'',//关联项目名称
          card_id:'',//意向投资人
          card_name:'',//意向投资人
          schedule_id:'',//跟进进度
          follow_desc:'',//跟进描述
          file_id:[],//文件id
          follow_id:'',//id
        },//跟进记录
        schedule_name: [
/*            {
          value: '选项1',
          label: '黄金糕'
        }*/
        ],//跟进进度下拉框
        project_name:[],//项目搜索下拉框
        saveJumpData:{

        }
      }
    },
    methods: {
      handleClose(e){
        this.$emit("changeClose",false);
      },//关闭
      saveSecond(){
        this.allSave();//添加
        this.follow=this.saveJumpData;
      },//继续添加

      handleSelectProject(item){
        this.follow.project_id = item.label;
      },//选择项目后
      querySearchProject(queryString, cb){
        this.follow.project_id='';
        let obj = new Object;
        obj.user_id=localStorage.user_id;
        obj.search=queryString;
        obj.page=0;
        this.$http.post(this.URL.getProjectList, obj)
          .then(res => {
            this.restaurants=[];
            let data=res.data.data;
            this.restaurants=this.loadData(data);
             let restaurants = this.restaurants;
             clearTimeout(this.timeout);
             this.timeout = setTimeout(() => {
                cb(restaurants);
             }, 300);
          })
          .catch(err => {

          })
      },//项目搜索

      handleSelect(item) {
        console.log(item);
        this.follow.card_id = item.label;
        let name=item.value;
        if(item.label==0) {
          if (name.length > 30) {
            this.$tool.error("名字不能超过20个字")
          } else {
            this.$confirm('是否添加该人脉, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true;
              this.$http.post(this.URL.createUserCard, {user_id: localStorage.user_id, user_real_name: item.na})
                .then(res => {
                  this.loading = false;
                  this.$tool.success("添加成功");
                  this.follow.card_id = res.data.card_id;
                  this.follow.card_name = item.na;
                })
                .catch(err => {
                  this.loading = false;
                  this.$tool.error("添加失败");
                  this.$tool.console(err);
                  this.follow.card_name = item.na;
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消添加'
              });
              this.follow.card_name = item.na;
            });
          }
        }
      },//选择意向投资人后
      querySearchAsync(queryString, cb) {
        this.follow.card_id='';
        this.$http.post(this.URL.match_my_relation, {user_id: localStorage.user_id, user_name: queryString})
          .then(res => {
            this.userArr=[];
            let data=res.data.data;
            this.userArr=this.loadDataUser(data,queryString);
            let userArr = this.userArr;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(userArr);
            }, 300);
          })
          .catch(err => {
          })
      },//意向投资人搜索

      loadData(arr){
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].pro_intro.toString() || "无介绍";
          obj.label = arr[i].project_id;
          newArr.push(obj)
        }
        return newArr;
  },//获取远程数据模拟
      loadDataUser(arr,name){
        let newArr=[];
        var set="新增‘"+name+"’为意向投资人";
        newArr = [{value:set,label:0,na:name}];
        if(name=='') newArr=[];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].user_real_name+'('+arr[i].user_company_name+')';
          if(arr[i].user_company_name=='') obj.value = arr[i].user_real_name;
          obj.label = arr[i].card_id;
          newArr.push(obj);
        }
        return newArr;
      },//获取用户
      getScheduleName(){
        this.schedule_name=this.$global.data.follow_schedule;//设置项目跟进状态
      },// 获取跟进进度
      getFileType(data){
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.label = data[i].type_name;
          obj.value = data[i].type_id;
          arr.push(obj)
        }
        return arr;
      },//获取项目分组信息
      setFileType(){
        this.$http.post(this.URL.getFileType, {user_id: localStorage.user_id})
          .then(res => {
            let data = res.data.data;
            this.groups.group = this.getFileType(data);
          })
          .catch(err => {
            this.$tool.console(err)
          })
      },//设置文件分组标签
      setUploadShow(data){
        for (let i = 0; i < data.length; i++) {
          this.addDomain(data[i].type_name, data[i].file_title+'.'+data[i].file_ext, data[i].file_id, data[i].type);
        }
      },//设置批量上传文件显示
      getFollowUp(){
        this.loading=true;
        for(let key in this.follow){
          this.follow[key]='';
        }
        this.uploadShow.lists=[];
        this.fileList=[];
        this.$http.post(this.URL.get_follow_record, {user_id: localStorage.user_id,follow_id:this.follow_id})
          .then(res => {
            let data = res.data.data;
//            data.schedule_id=data.schedule_id;
            data.file_id=[];
            data.type='card';
            this.follow=data;
            this.$tool.console(this.$tool.getToObject(data));
            this.setUploadShow(data.files);
            this.loading=false;
          })
          .catch(err => {
            this.$tool.console(err);
            this.loading=false;
          })
      },//获取跟进记录

      /*项目文件上传*/
      beforeUpload(file){
        console.log("beforeUpload");
        console.log(file);
        this.num++;
        let filetypes=[".doc",".ppt",".pdf",".zip",".rar",".pptx",".png",".jpg",".docx",".jpeg"];
        let name=file.name;
        let fileend=name.substring(name.lastIndexOf(".")).toLowerCase();
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
          return false;
        }
        if(parseInt(file.size) > parseInt(20971521)){
          this.$tool.error("暂不支持超过20m文件上传哦");
          return false;
        };
        if(parseInt(this.num) > parseInt(5)){
          this.$tool.error("一次最多选择5个文件");
          this.num=0;
          return false;
        }
      },//项目文件上传验证
      //当添加文件时,添加入上传列表
      handleChange(file, fileList){
        console.log("change")
        console.log(file);
        console.log(fileList);
        this.loading=true;
        if(this.loadingcheck){
          this.loading=false;
          this.loadingcheck=false;
        }
      },
      uploadsuccess(response, file, fileList){
        console.log("success")
        console.log(file);
        console.log(fileList);
        let data = response.data;
        this.$tool.success("上传成功");
        this.addDomain(data.type_name, data.file_title, data.file_id, data.type);
        this.loadingcheck=true;
      },//上传成功
      uploaderror(err, file, fileList){
        this.$tool.error("上传失败,请联系管理员")
        this.loadingcheck=false;
        this.loading=false;
      },//上传失败
      download(item){
        let index = this.uploadShow.lists.indexOf(item);
        if (index !== -1) {
          let file_id = this.uploadShow.lists[index].file_id;
          const url=this.URL.weitianshi+this.URL.download+"?user_id="+localStorage.user_id+"&file_id="+file_id;
          window.location.href=url;
          this.$tool.console(url);
          console.log(url)
        }

      },//点击下载
      removeList(item) {
        var index = this.uploadShow.lists.indexOf(item);
        if (index !== -1) {
          this.fileList.splice(index, 1);
          this.$http.post(this.URL.deleteAtFile, {
            user_id: localStorage.user_id,
            file_id: item.file_id
          })
            .then(res => {
              if (res.status === 200) {
                this.loading = false;
                this.uploadShow.lists.splice(index, 1);
                this.$tool.success("删除成功");
              }
            })
            .catch(err => {
              this.$tool.console(err);
              this.$tool.error("删除失败,请联系管理员");
            })
        }
      },//删除当前上传文件
      addDomain(type_name, file_title, file_id, type)  {
        let object = {};
        object.bp_type = type_name;
        object.file_title = file_title;
        object.file_id = file_id;
        object.type = type;//文件类型
        this.uploadShow.lists.push(object);
        this.follow.file_id.push(file_id);
      },//添加上传文件时,加入显示列表

      groupchange(label){
        let index = this.groups.index;
        let data = this.groups.group;
        for(let i=0 ;i<data.length; i++){
          if(data[i].value==label){
            this.groups.name=data[i].label;
            this.uploadShow.lists[index].type=label;
          }
        }
      },//点击分组设置中的单选框
      addGroup(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.URL.createFileType, {
              user_id: localStorage.user_id,
              type_name: this.groups.input
            })
              .then(res => {
                let data =res.data;
                let newObj = {};
                newObj.type = this.groups.input;
                newObj.label = this.groups.input;
                newObj.value = data.type_id;
                this.groups.type = data.type_id;
                this.groups.group.push(newObj);
                this.groups.input = ''
              })
              .catch(err => {
                this.$tool.console(err)
              })
          } else {
            this.$tool.console('error submit!!');
            return false;
          }
        });
      },//添加分组设置的分组选项
      saveGroupChange(){//file_id type_id user_id
        let type = this.groups.type;
        let index = this.groups.index;
        let type_name = this.groups.name;
        this.$http.post(this.URL.setFileType, {
          user_id: localStorage.user_id,
          file_id: this.uploadShow.lists[index].file_id,
          type: this.uploadShow.lists[index].type
        })
          .then(res => {
            if (index !== -1) {
              this.uploadShow.lists[index].bp_type = type_name;
              this.dialogFileVisible = false
            }
          })
          .catch(err => {
            this.$tool.console(err);
          })

      },//发送分组设置请求
      toGroup(item){
        this.groups.type=item.type;
        console.log(item);
        let index = this.uploadShow.lists.indexOf(item);
        this.groups.index = index;
        this.dialogFileVisible = true;
      },//获取分组的位置
      submitForm(formName) {
        let check = true;
        this.$refs[formName].validate((valid) => {
          check=valid;
          /*if (valid) {
           check = true;
           } else {
           check = false;

           }*/
        });
        return check;
      },//提交用
      allSave(){
        let follow=this.submitForm('follow');
        if(this.$tool.getNull(this.follow.card_id) && !this.$tool.getNull(this.follow.card_name)) {
            this.$tool.error("请选择或添加正确的投资人")
        }
        else if(this.$tool.getNull(this.follow.project_id)) this.$tool.error("请选择正确的项目")
        else if(this.$tool.getNull(this.follow.project_name)) this.$tool.error("请选择正确的项目")
        else if(!follow) this.$tool.error("跟进描述不超过500字")
        else {
          this.follow.follow_id=this.follow_id;
          if(this.follow.follow_id=="") delete this.follow.follow_id;
          delete this.follow.files;
          this.follow.user_id=localStorage.user_id;
          this.follow.type="card";
          this.$tool.console(this.$tool.getToObject(this.follow));
          this.loading=true;
          this.$http.post(this.URL.add_follow_record, this.follow)
            .then(res => {
             this.$tool.console(res);
             if(res.data.status_code==2000000){
               this.follow_id=res.data.data;
               this.open2('项目编辑成功', '保存成功', '继续添加', '返回');

             }else{
               this.$tool.error(res.data.error_msg);
             }
             this.loading=false;
            })
            .catch(err => {
             this.loading=false;
             this.$tool.console(err);
            })
         }

      },//发送请求
      /*编辑成功弹窗*/
      open2(title, main, confirm, cancel) {
        this.$confirm(main, title, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'success'
        }).then(() => {
          this.clearData();
          this.follow_id='';
        }).catch(() => {
          this.$emit("changeClose",false);
          this.clearData();
          this.follow_id='';
        });
      },
      clearData(){
        for(let key in this.follow){
          this.follow[key]='';
          this.follow.file_id=[];
        }
        this.uploadShow.lists=[];
        this.fileList=[];
        this.follow.project_id=this.projectid || '';
        this.follow.project_name=this.projectname || '';
        this.follow.card_id=this.cardid || '';
        this.follow.card_name=this.cardname || '';
        this.saveJumpData=this.follow;
      }
    },
    created(){
      this.$global.func.getWxProjectCategory();
      this.getScheduleName();
      this.setFileType();

    },
    watch : {
      followid : function(e){
        this.follow_id=this.followid || '';
        setTimeout(()=>{
          this.getFollowUp();
          this.getData();
        },200)
      },//获取跟进id
      dialogFollow: function(e){
        if(e) {
          this.clearData();
        }else{
          this.follow_id="";
        }
      },//清空数据
    },
    mounted(){

    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/addFollow';
  .el-radio-group{
    line-height: 3!important;
  }
  .el-radio{
    margin-left:0px!important;
    min-width:111px

  }

</style>
