<template>
  <div id="fileManagement" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--新建文件分组按钮-->
    <el-button class="createNewGroup" @click.prevent="toGroup(list)">新建文件分组</el-button>
    <!--文件分组的弹窗-->
    <el-dialog title="文件分组设置" :visible.sync="dialogFileVisible" :show-close="showList">
      <el-form>
        <el-form-item label="分组名称" label-width="80px" prop="input"
                      :rules="[{min: 2, message: '最少2个字符',required: true, message: '分组不能为空', trigger: 'blur'}]">
          <el-row :span="24" :gutter="32">
            <el-col :span="18">
              <el-input v-model="newGroupName" auto-complete="off"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFileVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGroup">保　存</el-button>
      </div>
    </el-dialog>
    <!--文件类别-->
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="clearfix collapseHead">
            商业计划书(<span>1</span>)
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
                 :data="fileuploadDate"
                 :show-file-list="false"
                 accept=".doc, .ppt, .pdf, .zip, .rar, .png, .docx, .jpg, .pptx, .jpeg"
                 multiple>
                    <el-button class="upload" type="text"><img src="/static/images/shangchuan.png">批量上传</el-button>
               </el-upload>
            </div>
          </span>
        </template>
        <div>
          <div class="block-info block-cc-other" style="margin-bottom: 15px;"
               v-for="(list, index) in uploadShow2.lists"
               :key="list.index">
            <span class="f-name" style="cursor: pointer">{{list.file_title}}</span>
            <div class="fr">
              <el-dropdown>
                <span class="el-dropdown-link">
                  下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
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
        activeNames: [],
        //项目文件上传带的参数 fileuploadDate:
        fileuploadDate: {user_id: localStorage.user_id},
        //批量上传文件列表
        fileList: [],
        //上传文件展示列表,就是老夫操作的列表
        uploadShow2: {
          lists: []
        },
        //新建分组弹窗控制
        dialogFileVisible:false,
        //新建分组弹窗是否显示关闭按钮
        showList: false,
        //批量上传按钮禁用控制
        loadingcheck: false,
        //新建分组名称
        newGroupName:'',
        list:[],
      }
    },
    methods: {
      //上传文件前端验证
      beforeUpload(file){
        this.fileuploadDate.project_id = this.project_id;
        console.log(this.project_id)
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
        }
        ;
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
        this.$tool.success("上传成功")
        this.addDomain(data.type_name, data.file_title, data.file_id, data.type);
        this.loadingcheck = true;
      },
      //上传失败
      uploaderror(err, file, fileList){
        this.$tool.error("上传失败,请联系管理员")
        this.loadingcheck = false;
        this.loading = false;
      },
      //删除当前上传文件
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
      //添加上传文件时,加入显示列表
      addDomain(type_name, file_title, file_id, type)  {
        let object = {};
        object.bp_type = type_name;
        object.file_title = file_title;
        object.file_id = file_id;
        object.type = type;//文件类型
        this.uploadShow2.lists.push(object);

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
      //添加分组设置的分组选项
      addGroup() {

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
      //获取分组的位置
      toGroup(item){
        this.groups.type = item.type;
        var index = this.uploadShow2.lists.indexOf(item)
        this.groups.index = index;
        this.dialogFileVisible = true;

      },
      //获取分组列表信息
      initData(){
        //获取分组列表
        this.$http.post(this.URL.getFileType, {
          user_id: localStorage.user_id
        }).then(res => {
          this.groupList = res.data.data;
          //获取分组列表内部文件数据
          this.$http.post(this.URL.getProjectFiles, {
            user_id: localStorage.user_id,
            project_id: this.project_id
          }).then(res => {
            //把分组内的文件放到对应的分组内
            for (let key in res.data.data) {
              this.groupList.forEach(x => {
                if (x.type_id == key) {
                  x.fileData = (res.data.data[key])
                } else {
                  x.fileData = []
                }
              })
            }
            this.$tool.console(this.groupList)
          })
        })
      }
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
