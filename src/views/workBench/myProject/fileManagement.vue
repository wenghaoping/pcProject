<template>
  <div id="fileManagement" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--新建文件分组按钮-->
    <el-button class="createNewGroup" @click.prevent="toGroup">新建文件分组</el-button>
    <!--文件分组的弹窗-->
    <el-dialog title="文件分组设置" :visible.sync="dialogFileVisible" :show-close="showList">
      <el-form :model="newGroupName"  ref="newGroupName">
        <el-form-item label="分组名称" label-width="80px" prop="name"
                      :rules="[{min: 2, message: '最少2个字符',required: true, trigger: 'blur'}]">
          <el-row :span="24" :gutter="32">
            <el-col :span="18">
              <el-input v-model="newGroupName.name" auto-complete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addGroup" style="background: #40587a;border-color: #40587a;">保　存</el-button>
      </div>
    </el-dialog>
    <!--文件类别-->
    <el-collapse v-model="activeNames">
      <el-collapse-item :name="index" v-for="(item,index) in groupList" :key="item.type_id">
        <!--组别表头-->
        <template slot="title">
          <span class="clearfix collapseHead">
            {{item.type_name}}(<span>{{item.fileNum}}</span>)
            <div class="fr">
               <el-upload
                 class="upload"
                 ref="upload"
                 action="api/v/project/uploadFile"
                 :on-change="handleChange"
                 :on-success="uploadsuccess"
                 :on-error="uploaderror"
                 :before-upload="beforeUpload"
                 :file-list="fileList"
                 :data="{user_id:this.localStorage.user_id,project_id:project_id,type:item.type_id}"
                 :show-file-list="false"
                 accept=".doc, .ppt, .pdf, .zip, .rar, .png, .docx, .jpg, .pptx, .jpeg"
                 multiple>
                    <el-button class="upload" type="text"><img src="/static/images/shangchuan.png">上传文件</el-button>
               </el-upload>
            </div>
          </span>
        </template>
        <!--文件列表-->
        <div class="fileList">
          <div class="block-info block-cc-other" style="margin-bottom: 15px;"
               v-for="(file, index) in item.file"
               :key="file.file_id">
            <span class="f-name" style="cursor: pointer">{{file.file_id}}</span>
            <div class="fr">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <img src="/static/images/threePoint.png" class="threePoint">
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>移至</el-dropdown-item>
                  <el-dropdown-item @click.prevent="removeList(list)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!--<span class="del-btn" @click.prevent="removeList(list)"><img src="../../../assets/images/delete.png"></span>
            <span class="solt-btn" @click.prevent="toGroup(list)">分组设置</span>-->
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ["proid"],
    data () {
      return {
        project_id: this.proid,
        //加载
        loading: false,
        //分组列表
        groupList: [],
        //被展开的分组
        activeNames: [],
        //批量上传文件列表
        fileList: [],
        //上传文件展示列表,就是老夫操作的列表
        uploadShow2: {
          lists: [
            {
              bp_type: "1",
              file_title:"2",
              file_id:"3",
              type:"4"
            }
          ]
        },
        //新建分组弹窗控制
        dialogFileVisible:false,
        //新建分组弹窗是否显示关闭按钮
        showList: false,
        //批量上传按钮禁用控制
        loadingcheck: false,
        //新建分组弹框表单数据
        newGroupName:{
          name:''
        },
        list:[],
      }
    },
    methods: {
      //重新获取分组列表信息
      initData(){
        //获取分组列表
        this.$http.post(this.URL.getFileType, {
          user_id: localStorage.user_id
        }).then(res => {
          console.log('fisrt-groupList',res.data.data)
          var groupList = res.data.data;
          //获取分组列表内部文件数据
          this.$http.post(this.URL.getProjectFiles, {
            user_id: localStorage.user_id,
            project_id: this.project_id
          }).then(res => {
//            console.log('res',this.$tool.getToObject(res))
            //把分组内的文件放到对应的分组内
            var groupWithFile=res.data.data
            groupList.forEach(y=>{
              groupWithFile.forEach(x=>{
                if(y.type_id===x.type) {
                  y.file = x.file;
                  y.fileNum = x.count
                }
              })
            })
            //将没有文件的分组设定默认值0
            groupList.forEach(x=>{
              if(!x.file){
                x.file=[];
                x.fileNum=0;
              }
            })
            this.groupList=groupList;
            console.log('groupList',this.groupList)
          })
        })
      },

      //打开新建分组弹窗
      toGroup(){
        this.dialogFileVisible = true;
        this.newGroupName.name='';
        console.log(this.getGroupName())
      },
      //将所有分组名称放到一个数组里(辅助函数)
      getGroupName(){
        var allGroupName=[]
        this.groupList.forEach(x=>{
          allGroupName.push(x.type_name)
        })
        return allGroupName
      },
      //新建分组--确定
      addGroup() {
        if(!this.$tool.getNull(this.newGroupName.name)){
          //检查是否和已有分组重名,若全不重名则创建分组
          if(this.getGroupName().indexOf(this.newGroupName.name)===-1){
            this.$http.post(this.URL.createFileType,{
              user_id:localStorage.user_id,
              type_name:this.newGroupName.name
            }).then(res=>{
              if(res.data.status_code===2000000){
                this.$tool.success('新建文件分组成功')
                this.$refs['newGroupName'].resetFields();
                this.dialogFileVisible=false;
              }else{
                this.$tool.error(res.data.error_msg)
              }
            })
          }else{
            this.$tool.error('已有相同命名的文件分组')
          }
        }else{
          this.$tool.error('请输入分组名称')
        }
      },
      //新建分组--取消
      cancel(){
        this.$refs['newGroupName'].resetFields();
        this.dialogFileVisible = false;
      },

      //上传文件上传之前的钩子函数
      beforeUpload(file){
//        this.fileuploadDate.project_id = this.project_id;
        let filetypes = [".doc", ".ppt", ".pdf", ".zip", ".rar", ".pptx", ".png", ".jpg", ".docx", ".jpeg"];
        let name = file.name;
        let fileend = name.substring(name.lastIndexOf("."));
        let isnext = false;
        if (filetypes && filetypes.length > 0) {
          for (var i = 0; i < filetypes.length; i++) {
            if (filetypes[i] == fileend) {
              isnext = true;
              break;
            }
          }
        }
        this.loading = false;
        if (!isnext) {
          this.$tool.error("不支持的文件格式");
          return false;
        }
        if (parseInt(file.size) > parseInt(20971521)) {
          this.$tool.error("暂不支持超过20m文件上传哦");
          return false;
        };
      },
      //当添加文件时,添加入上传列表
      handleChange(file, fileList){
        this.loading = true;
        this.activeNames.push('1')
        if (this.loadingcheck) {
          this.loading = false;
          this.loadingcheck = false;
        }
      },
      //上传文件成功
      uploadsuccess(response, file, fileList){
        let data = response.data
        console.log(data)
        this.$tool.success("上传成功")
        this.addDomain(data.type_name, data.file_title, data.file_id, data.type);
        this.loadingcheck = true;
        console.log(this.fileList)
      },
      //上传失败
      uploaderror(err, file, fileList){
        this.$tool.error("上传失败,请联系管理员")
        this.loadingcheck = false;
        this.loading = false;
      },
      //添加上传文件时,加入显示列表
      addDomain(type_name, file_title, file_id, type)  {
        let object = {};
        object.bp_type = type_name;
        object.file_title = file_title;
        object.file_id = file_id;
        object.type = type;//文件类型
        this.uploadShow2.lists.push(object);
        console.log(this.uploadShow2.lists)
      },
      //删除列表中的文件
      removeList(item) {
        var index = this.uploadShow2.lists.indexOf(item)
        if (index !== -1) {
          this.fileList.splice(index, 1)
          const deleteAtFile = this.URL.deleteAtFile;
          this.$http.post(deleteAtFile, {
            user_id: localStorage.user_id,
            project_id: item.project_id,
            file_id: item.file_id
          })
          .then(res => {
            if (res.status === 200) {
              this.loading = false;
              this.uploadShow2.lists.splice(index, 1)
              this.$tool.success("删除成功")
            }
          })
          .catch(err => {
            this.$tool.console(err)
            this.$tool.error("删除失败,请联系管理员")
          })
        }
      },
      //点击下载
      download(item){
        let index = this.uploadShow2.lists.indexOf(item);
        if (index !== -1) {
          let file_id = this.uploadShow2.lists[index].file_id;
          const url=this.URL.weitianshi+this.URL.download+"?user_id="+localStorage.user_id+"&file_id="+file_id;
          window.location.href=url;
        }

      },



      //点击分组设置中的单选框
      groupchange(label){
        let index = this.groups.index;
        let data = this.groups.group;
        for (let i = 0; i < data.length; i++) {
          if (data[i].value == label) {
            this.groups.name = data[i].label;
            this.uploadShow2.lists[index].type = label;
          }
        }
      },
      //发送分组设置请求
      saveGroupChange(){//file_id type_id user_id
        let type = this.groups.bp_type;
        let index = this.groups.index;
        let type_name = this.groups.name
        this.$http.post(this.URL.setFileType, {
          user_id: localStorage.user_id,
          file_id: this.uploadShow2.lists[index].file_id,
          type: this.uploadShow2.lists[index].type
        })
        .then(res => {
          if (index !== -1) {
            this.uploadShow2.lists[index].bp_type = type_name;
            this.dialogFileVisible = false
          }
        })
        .catch(err => {
          this.$tool.console(err)
        })

      },
    },
    created(){
      this.initData();
    },
    watch: {}
  }
</script>

<style lang="less">
  @import '../../../assets/css/fileManagement';
</style>
:on-change="handleChange(item.type_id)"
:on-success="uploadsuccess(item.type_id)"
:on-error="uploaderror(item.type_id)"
:before-upload="beforeUpload(item.type_id)"
:file-list="fileList[index]"
:data="{user_id:localStorage.user_id}"
