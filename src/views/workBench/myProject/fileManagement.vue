<template>
  <div id="fileManagement" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--新建文件分组按钮-->
    <el-button class="createNewGroup" @click.prevent="toGroup">新建文件分组</el-button>
    <!--文件类别-->
    <el-collapse v-model="activeNames">
      <el-collapse-item :name="index" v-for="(item,index) in groupList" :key="item.type_id">
        <!--分组表头-->
        <template slot="title">
          <span class="clearfix collapseHead">
            {{item.type_name}}  (<span>{{item.fileNum}}</span>)
             <el-button v-if="item.type_id>4" class="upload delete fr" type="text" @click.stop="getTypeId(item.type_id,3)"><img src="/static/images/shangchuan.png">删除</el-button>
            <div class="fr">
               <el-upload
                 class="upload"
                 ref="upload"
                 action="api/v/project/uploadFile"
                 :on-change="handleChange"
                 :on-progress="uploadProgress"
                 :on-success="uploadsuccess"
                 :on-error="uploaderror"
                 :before-upload="beforeUpload"
                 :file-list="fileList"
                 :data="{user_id:this.localStorage.user_id,project_id:project_id,type:item.type_id}"
                 :show-file-list="false"
                 accept=".doc, .ppt, .pdf, .zip, .rar, .png, .docx, .jpg, .pptx, .jpeg"
                 multiple>
                    <el-button class="upload" type="text" @click="getTypeId(item.type_id,2)"><img src="/static/images/shangchuan.png">上传文件</el-button>
               </el-upload>
            </div>
            <el-button v-if="item.type_id>4" class="upload rename fr" type="text" @click.stop="getTypeId(item.type_id,1)"><img src="/static/images/shangchuan.png">重命名</el-button>
          </span>
        </template>
        <!--文件列表-->
        <div class="fileList">
          <div class="block-info block-cc-other" style="margin-bottom: 15px;"
               v-for="(file, index) in item.file"
               :key="file.file_id">
            <span class="f-name" style="cursor: pointer" @click="download">{{file.file_title}}</span>
            <div class="fr">
              <el-dropdown  @command="fileDeal" trigger="click">
                <span class="el-dropdown-link" @click="getFileId(file.file_id,item.type_id)">
                  <img src="/static/images/threePoint.png" class="threePoint">
                </span>
                <el-dropdown-menu slot="dropdown" class="curor">
                  <el-dropdown-item command="1">查看</el-dropdown-item>
                  <el-dropdown-item command="2">移至</el-dropdown-item>
                  <el-dropdown-item command="3">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <!--新添文件列表-->
        <div class="fileList">
          <div class="block-info block-cc-other" style="margin-bottom: 15px; position:relative;"
               v-for="(newF, index) in item.newFile"
               :key="newF.file_id">
            <span class="f-name" style="cursor: pointer" @click="download">{{newF.name}}</span>
            <img src="../../../assets/images/loading.gif" style="width:16px;height: 16px;margin-left: 10px;">
            <span class="upLoading" v-loading.body="true"></span>
            <div class="fr">
              <el-dropdown  @command="fileDeal" trigger="click">
                <span class="el-dropdown-link">
                  <img src="/static/images/threePoint.png" class="threePoint">
                </span>
                <el-dropdown-menu slot="dropdown" class="curor">
                  <el-dropdown-item command="1">查看</el-dropdown-item>
                  <el-dropdown-item command="2">移至</el-dropdown-item>
                  <el-dropdown-item command="3">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!--文件分组的弹窗-->
    <el-dialog title="文件分组设置" :visible.sync="dialogFileVisible" :show-close="showList">
      <el-form :model="newGroupName"  ref="newGroupName">
        <el-form-item label="分组名称" label-width="80px" prop="name"
                      :rules="[{min: 2, message: '最少2个字符',required: true, trigger: 'blur'}]">
          <el-row :span="24" :gutter="32">
            <el-col :span="18">
              <el-input v-model="newGroupName.name" auto-complete="off" @keyup.enter="addGroup"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addGroup" style="background: #40587a;border-color: #40587a;">保　存</el-button>
      </div>
    </el-dialog>
    <!--移动文件分组弹框-->
    <el-dialog class="moveFileFrame" title="移至" :visible.sync="fileMoveFrame">
        <el-radio-group v-model="radio">
          <el-radio class="groupRadio" v-for="group in groupList" :key="group.type_id" :label="group.type_id">{{group.type_name}}</el-radio>
        </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileMoveFrame = false">取 消</el-button>
        <el-button type="primary" @click="fileMove">确 定</el-button>
      </div>
    </el-dialog>
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
        //批量上传文件列表(组件处理)
        fileList: [],
        //批量上传文件列表(自己处理)
        uploadList:[],
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
        //被点击的上传按钮所属分组
        typeId:0,
        //文件分组显示和隐藏
        fileMoveFrame:false,
        //文件分组单选的值
        radio:0,
        list:[],
      }
    },
    methods: {
      //重新获取分组列表信息
      initData(file){
        //获取分组列表
        this.$http.post(this.URL.getAllFileType, {
          user_id: localStorage.user_id
        }).then(res => {
//          console.log('fisrt-groupList',res.data.data)
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

            //如果有值传进来
            if(file){
              console.log('开始了')
              console.log(this.uploadList)
              console.log(this.uploadList[0])
              //剔除掉已经上传成功的文件
              this.uploadList.forEach((x,index)=>{
                if(x.name===file.name){
                  this.uploadList.splice(index,1)
                }
              })
            }

            //将没有文件的分组设定默认值0
            groupList.forEach((x,index)=>{
              if(!x.file){
                x.file=[];
                x.fileNum=0;
              }
              x.newFile=[];
              //如果有值传进来,那么此次触发由上传成功触发
              if(file){
                this.uploadList.forEach((y,index)=>{
                  if(x.type_id===y.typeId){
                    x.newFile.push(y)
                  }
                })
              }
            })
            this.groupList=groupList;
            /*if(file){
              console.log(this.groupList)
            }*/
          })
        })
      },
      //打开新建分组弹窗
      toGroup(){
        this.dialogFileVisible = true;
        this.newGroupName.name='';
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
                this.initData();
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
      //获取当前按钮的typeId(辅助函数)
      getTypeId(typeId,type){
        this.typeId=typeId;
        if(type===1){
          this.renameGroup();
        }else if(type===3){
          this.deleteGroup();
        }
      },
      //重命名分组
      renameGroup(){
        this.$prompt('请输入分组名', '新建文件分组', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$http.post(this.URL.renameFileType,{
            user_id:localStorage.user_id,
            type_id:this.typeId,
            type_name:value
          }).then(res => {
            console.log(res)
            if (res.data.status_code === 2000000) {
              this.loading = false;
              this.$tool.success("分组重命名成功")
              this.initData()
            }else{
              this.$tool.error(res.data.error_msg)
            }
          })
        });
      },
      //删除分组
      deleteGroup(){
        this.$confirm('删除文件分组后,分组内文件也会相应删除.确定删除?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.URL.deleteFileType,{
              user_id:localStorage.user_id,
              type_id:this.typeId,
              project_id:this.project_id
            }).then(res => {
              console.log(res)
              if (res.data.status_code === 2000000) {
                this.loading = false;
                this.$tool.success("删除成功")
                this.initData()
              }else{
                this.$tool.error(res.data.error_msg)
              }
          })
        })
      },
      //上传文件上传之前的钩子函数
      beforeUpload(file){
        let filetypes = [".doc", ".ppt", ".pdf", ".zip", ".rar", ".pptx", ".png", ".jpg", ".docx", ".jpeg"];
        //去除文件类型后缀
        let name = file.name;
        let fileend = name.substring(name.lastIndexOf(".")).toLowerCase();
        let isnext = false;
        //文件格式和上传文件数量前端校验
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

        //给上传文件加typeId属性标志其分组后存入uploadList
        file.typeId=this.typeId
        this.uploadList.push(file)

        //将上传文件放入相应数据的newFile属性中
        this.groupList.forEach(x=>{
          if(x.type_id===this.typeId){
            x.newFile.push(file);
          }
        });
      },
      //当添加文件时,添加入上传列表
      handleChange(file, fileList){
        this.loading = true;
        this.activeNames.push('1');
        if (this.loadingcheck) {
          this.loading = false;
          this.loadingcheck = false;
        }
//        console.log('handleChange',file,fileList)
      },
      //文件上传中
      uploadProgress(event,file,fileList){
        //不知道为什么文件上传中的勾子函数内的console会触发两次,且event的值不同
        /*console.log('文件上传中')
        console.log(event)
        console.log(file)
        console.log(fileList)*/
      },
      //上传文件成功
      uploadsuccess(response, file, fileList){
        let data = response.data;
        this.$tool.success("上传成功");
        this.loadingcheck = true;
//        console.log('3',response,file)
        this.initData(file)
        //将还未上传成功的文件重新放回newFile中
//        console.log('重点',this.groupList)
//        console.log(this.uploadList)
      /*  this.uploadList.forEach((x)=>{
          this.groupList.forEach((y,index)=>{
            if(x.typeId===y.type_id){
              y.newFile.push(x);
            }
          })
        })*/
      },
      //上传失败
      uploaderror(err, file, fileList){
        this.$tool.error("上传失败,请联系管理员")
        this.loadingcheck = false;
        this.loading = false;
      },
      //获取fileId(辅助函数)
      getFileId(fileId,groupId){
        this.fileId=fileId;
        this.groupId=groupId;
      },
      //文件操作
      fileDeal(command){
        //删除文件
        if(parseInt(command)===3){
          this.$confirm('确定删除?', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.URL.deleteAtFile,{
             user_id:localStorage.user_id,
             file_id:this.fileId
             }).then(res => {
             if (res.data.status_code === 2000000) {
             this.loading = false;
             this.$tool.success("删除成功")
             this.initData()
             }else{
             this.$tool.error(res.data.error_msg)
             }
             })
          }).catch(() => {});
        }
        //移动文件
        if(parseInt(command)===2){
          this.fileMoveFrame=true;
          this.radio=this.groupId;
        }
      },
      //移动文件接口调用
      fileMove(){
        console.log(this.radio)
        this.$http.post(this.URL.setFileType,{user_id:localStorage.user_id,file_id:this.fileId,type:this.radio}).then(res=>{
          console.log(res)
          if(res.data.status_code===2000000){
            this.fileMoveFrame=false;
            this.$tool.success('移动文件成功')
            this.initData();
          }else{
            this.$tool.error(res.data.error_msy)
          }
        })
      },
      //点击下载
      download(){
          const url=this.URL.weitianshi+this.URL.download+"?user_id="+localStorage.user_id+"&file_id="+this.fileId;
          window.location.href=url;
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
  .el-loading-mask{
    display: none;
    /*left:205px!important;*/
    /*top:610px!important;*/
  }
</style>

