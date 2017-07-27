<template>
  <!--项目推送项目入口-->
  <div id="projectPush" v-loading.fullscreen.lock="loading" element-loading-text="加载中">
    <el-dialog :visible="dialogPush" :before-close="handleClose">
      <span slot="title" class="dialog-title clearfix">
        <div class="lines fl"></div>
        <div class="title fl">项目推送</div>
        <div class="lost fl">今日剩余推送<i>5</i>次</div>
        <div class="img fl"><img src="../../../assets/images/why.png"></div>
      </span>

      <div>
        <div class="text1">推送项目</div>
        <div class="text2">帮助FA成交的项目管理工具</div>
      </div>

      <!--推送人脉-->
      <el-form :inline="true" :model="investor" class="demo-form-inline">
        <el-form-item label="推送人脉">
          <el-input v-model="investor.name" placeholder="请输入您要推送的投资人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="customerAdd">自定义添加</el-button>
        </el-form-item>
      </el-form>

      <!--我的人脉和全网人脉tab页切换-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的人脉" name="myContacts">用户管理</el-tab-pane>
        <el-tab-pane label="全网人脉" name="netContacts">配置管理</el-tab-pane>
      </el-tabs>

      <!---->
      <el-form label-position="top" label-width="80px" ref="email" :model="email">
        <el-form-item label="标题" prop="title"
                      :rules="titleRule">
          <el-input v-model="email.title" placeholder="便于投资人识别您的身份以及项目概况，例如：来自千月资本的项目推荐-国内首家基因靶向肿瘤治疗项目"></el-input>
        </el-form-item>
        <el-form-item label="正文"
                      prop="main">
          <el-input type="textarea"
                    v-model="email.main"
                    placeholder="请输入简要项目介绍，作为邮件正文，便于投资人快速了解项目"
                    :autosize="{ minRows: 4, maxRows: 7}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="preview">预览</el-button>
        <el-button type="primary" @click="push()">推送</el-button>
      </span>
    </el-dialog>


<!--项目预览弹窗-->
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: ["dialogPush","userMessage","userEmail"],
  data () {
  var checkEmail = (rule, value, callback) => {
    if (this.$tool.getNull(value)) {
      return callback(new Error('邮箱不能为空'));
    }
    setTimeout(() => {
      if(!this.$tool.checkEmail(value)){
        callback(new Error('请输入正确的邮箱'));
      }else{
        callback();
      }
    }, 300);


  };//邮箱判断
  var checkTitle = (rule, value, callback) => {
    if (this.$tool.getNull(value)) {
      return callback(new Error('不能为空'));
    }else{
      callback();
    }
  };//不为空判断

  return {
      emailRule: { validator: checkEmail, trigger: 'blur' },
      titleRule: { validator: checkTitle, trigger: 'blur' },
      close:false,//默认关闭
      loading: false,//加载动画
      activeName:'first',
//      dialogPush:false,//控制显不显示

      email:{
        title:'有人给您推荐一个项目,赶紧看看吧',//邮件标题
        main:'',//邮件正文
      },
      email2:{
        nameEmail:'',//人脉的邮箱(一个)
      },
      user:{
        user_real_name:'',
        user_company_career:'',
        user_company_name:'',
      },


      projectList:[],//推送的项目列表
      projectAll:[],//项目列表下拉框基本是不用的

      list: [],
      states: ["Alabama"],
      tableData3: [{
        introduce: '项目的一句话介绍，字数可能会有点长，但不管怎样，就显示一行，如果显示不下那但不管怎样，就显示一行，如果显示不下那但不管怎样，就显示一行，如果显示不下那',
        matching : '100',
        id:1
      }, {
        introduce: '项目的一句话介绍，字数可能会有点长。',
        matching: '50',
        id:2
      }],
      projectRadio:'',


      investor:{
        name:'',
      },
      activeName: 'myContacts'
    }
  },
  methods: {
    preview(){
      this.$emit('changeall',false);
    },
    push(type){
    },//推送按钮
    remoteMethod(query) {
      if (query !== '') {
        this.load = true;
        setTimeout(() => {
          this.load = false;
          this.projectAll = this.list.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.projectAll = [];
      }
    },
    tableRowClassName(row, index) {
      if (index%2 === 1) {
        return 'info-row';
      }
      return '';
    },//控制列表颜色
    getIntroduce(id){
      this.projectList=[];
        let arr = this.tableData3;
        for(let i=0; i<arr.length; i++){
           if(arr[i].id==id){
               this.projectList.push(arr[i].introduce);
           }
        }
    },
    submitForm(formName) {
      let check = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return
        } else {
          check = false;
        }
      });
      return check;
    },
    handleClose(){
      this.$emit('changeClose',false);
    },

    //自定义添加人脉
    customerAdd(){},
    //选项卡切换
    handleClick(tab, event) {
//      console.log(tab, event);
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  watch : {
    projectRadio : function(e){
      this.getIntroduce(e);
    },
    userMessage : function (e) {
      this.user=this.userMessage;
    },
    userEmail : function (e) {
      this.email2.nameEmail=this.userEmail;
    },

  },

}
</script>

<style lang="less">
  @import '../../../assets/css/mycontacts';

</style>
