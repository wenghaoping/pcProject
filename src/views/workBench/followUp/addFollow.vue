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
                label="关联项目"
                prop="project"
                :rules="[{ required: true, message: '请选择关联项目', trigger: 'change' }]">
                <el-select
                  v-model="follow.project"
                  filterable
                  remote
                  placeholder="一句话介绍，如帮助FA成交的项目管理工具"
                  :remote-method="remoteMethod"
                  :loading="loading2" style="width: 360px;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24" :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="意向投资人"
                prop="people"
                :rules="[{max: 20, message: '长度不能大于20个字符', trigger: 'blur' }]">
                <el-autocomplete v-model="follow.people"
                                 :fetch-suggestions="querySearchAsync"
                                 placeholder="请添加"
                                 @select="handleSelect">
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="跟进进度"
                prop="round">
                <el-select v-model="follow.round"
                           placeholder="请选择"
                           style="width: 165px;">
                  <el-option
                    v-for="item in options"
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
                            prop="sec"
                            :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                <el-input type="textarea"
                          style="width: 360px;"
                          v-model="follow.sec"
                          :autosize="{ minRows: 4, maxRows: 7}" placeholder="请输入"></el-input>
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
          <el-button @click="handleClose">继续添加</el-button>
          <el-button type="primary" @click="handleClose">提 交</el-button>
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
    props: ["dialogFollow","followid"],
    data () {
      return {
        loading:false,
        loading2:false,//加载框加载
        showList: false,//上传列表隐藏
        dialogFileVisible:false,//文件分组设置
        fileuploadDate: {user_id: localStorage.user_id},//项目文件上传带的参数
        fileList: [],//批量上传文件列表
        uploadShow: {//上传文件展示列表,就是老夫操作的列表
          lists: []
        },
        groups: {
          input: "",
          group: [{type: "其他", label: '其他', value: '其他'}],
          type: "",
          name:""
        },//分组用的所有参数
        loadingcheck:false,
        follow_id:'',
        value:'',
        follow:{
          project:'',//关联项目
          people:'',//意向投资人
          round:'',//跟进进度
          sec:'',//跟进描述

        },//跟进记录
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        list: [],
        states: ["Alabama", "Alaska", "Arizona",
          "Arkansas", "California", "Colorado",
          "Connecticut", "Delaware", "Florida",
          "Georgia", "Hawaii", "Idaho", "Illinois",
          "Indiana", "Iowa", "Kansas", "Kentucky",
          "Louisiana", "Maine", "Maryland",
          "Massachusetts", "Michigan", "Minnesota",
          "Mississippi"]

      }
    },
    methods: {
      handleClose(){
        this.$emit("changeClose",false);
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading2 = true;
          setTimeout(() => {
            this.loading2 = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      handleSelect(item) {
        this.companyTitle = item.value;
        this.$http.post(this.URL.getOneCompany, {user_id: localStorage.user_id, com_id: item.address})
          .then(res => {
            let data = res.data.data;
            this.$tool.console(this.$tool.getToObject(data))
            this.queryData = data;
          })
          .catch(err => {
            this.$tool.error("获取失败");
            this.$tool.console(err);
          });
        this.dialogVisible = true;
      },//选择了搜索出来的数据后
      /*自动搜索,接口写这里面*/
      querySearchAsync(queryString, cb) {
        /*this.$http.post(this.URL.selectCompany, {user_id: localStorage.user_id, company_name: queryString})
          .then(res => {
            this.restaurants=[];
            let data=res.data.data;
            this.restaurants=this.loadData(data);
            if(queryString=="") this.restaurants=[];
            let restaurants = this.restaurants;
            /!*             let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;*!/
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(restaurants);
            }, 300);
          })
          .catch(err => {
//          this.alert("加载失败");
            this.$tool.console(this.restaurants);
          })*/
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      /*获取远程数据模拟*/
      loadData(arr){
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].company_name;
          obj.address = arr[i].com_id;
          newArr.push(obj)
        }
        return newArr;
      },


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

      /*项目文件上传*/
      beforeUpload(file){
        this.num++;
        this.fileuploadDate.project_id = this.project_id;
        this.uploadDate.project_id = this.project_id;
        let filetypes=[".doc",".ppt",".pdf",".zip",".rar",".pptx",".png",".jpg",".docx",".jpeg"];
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
        this.loading=true;
        if(this.loadingcheck){
          this.loading=false;
          this.loadingcheck=false;
        }
      },
      uploadsuccess(response, file, fileList){
        let data = response.data
        this.$tool.success("上传成功");
        this.addDomain(data.type_name, data.file_title, data.file_id, data.type);
        this.loadingcheck=true;
      },
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
        }

      },//点击下载

      removeList(item) {
        var index = this.uploadShow2.lists.indexOf(item);
        if (index !== -1) {
          this.fileList.splice(index, 1)
          this.$http.post(this.URL.deleteAtFile, {
            user_id: localStorage.user_id,
            project_id: item.project_id,
            file_id: item.file_id
          })
            .then(res => {
              if (res.status === 200) {
                this.loading = false;
                this.uploadShow.lists.splice(index, 1)
                this.$tool.success("删除成功")
              }
            })
            .catch(err => {
              this.$tool.console(err)
              this.$tool.error("删除失败,请联系管理员")
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
      cancelGroupChange(){
        this.dialogFormVisible = false;
        this.project.pro_status = this.statusLast;
      },//取消后
      saveGroupChange(){//file_id type_id user_id
        let type = this.groups.bp_type;
        let index = this.groups.index;
        let type_name = this.groups.name
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
            this.$tool.console(err)
          })

      },//发送分组设置请求
      toGroup(item){
        this.groups.type=item.type;
        var index = this.uploadShow2.lists.indexOf(item);
        this.groups.index = index;
        this.dialogFileVisible = true;
      },//获取分组的位置

    },
    created(){

    },
    watch : {
      followid : function(e){
        this.follow_id=e;

      },//获取项目id
    },
    mounted(){
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/addFollow';
</style>
