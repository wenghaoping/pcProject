<template>
  <div id="projectPush" v-loading.fullscreen.lock="loading" element-loading-text="加载中">
    <el-dialog :visible="dialogPush" :before-close="handleClose">
      <span slot="title" class="dialog-title clearfix">
        <div class="lines fl"></div>
        <div class="title fl">项目推送</div>
        <div class="lost fl">今日剩余推送<i>5</i>次</div>
        <div class="img fl"><img src="../../../assets/images/why.png"></div>
      </span>

      <el-form label-position="top" :model="email2" label-width="80px" style="position: relative" ref="email2">
        <el-form-item label="推送人脉"
                      prop="nameEmail"
                      :rules="emailRule">
          <el-input v-model="email2.nameEmail" placeholder="项目及BP将以邮箱的方式推送，请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div class="message">
        <span class="message_innder fl" v-if="userMessage.user_real_name!=''">{{userMessage.user_real_name}}</span>
        <span class="message_innder fl" v-else>--</span>
        <span class="lines fl"></span>
        <span class="message_innder fl" v-if="userMessage.user_company_career!=''">{{userMessage.user_company_career}}</span>
        <span class="message_innder fl" v-else>--</span>
        <span class="lines fl"></span>
        <span class="message_innder fl" v-if="userMessage.user_company_name!=''">{{userMessage.user_company_name}}</span>
        <span class="message_innder fl" v-else>--</span>
      </div>

      <el-form label-position="top" label-width="80px">
        <el-form-item label="推送项目">
          <el-select v-model="projectList" multiple filterable=""
                     remote multiple placeholder="请输入项目关键词"
                     :remote-method="remoteMethod" ><!--popper-class="block"===========================-->
            <el-option v-for="item in projectAll" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="select">
        <el-tabs v-model="activeName">
          <el-tab-pane label="我的项目" name="first"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="top-lists" style="background: #f3f4f8;cursor: pointer;margin-bottom: 29px;">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          max-height="430"
          :row-class-name="tableRowClassName">
          <el-table-column
            width="64">
            <template scope="scope">
              <el-radio class="radio" v-model="projectRadio" :label="scope.row.id"></el-radio>
            </template>
          </el-table-column>
          <el-table-column
            label="项目介绍"
            min-width="570">
            <template scope="scope">
              <el-tooltip placement="top" :disabled="scope.row.introduce.length > 30 ? false:true">
                <div slot="content">
                  <div class="tips-txt">{{scope.row.introduce}}</div>
                </div>
                <div>
                  {{scope.row.introduce}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="matching"
            label="匹配度"
            min-width="80">
            <template scope="scope">
              <div class="origin">
                {{scope.row.matching}}%
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-form label-position="top" label-width="80px" ref="email" :model="email">
        <el-form-item label="标题" prop="title"
                      :rules="titleRule">
          <el-input v-model="email.title" placeholder="请输入邮件标题"></el-input>
        </el-form-item>
        <el-form-item label="正文"
                      prop="main">
          <el-input type="textarea"
                    v-model="email.main"
                    placeholder="请输入邮件正文"
                    :autosize="{ minRows: 4, maxRows: 7}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="preview">预览</el-button>
        <el-button type="primary" @click="push(2)">继续推送</el-button>
        <el-button type="primary" @click="push(1)">推送</el-button>
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
        user_real_name:'李欣欣',
        user_company_career:'',
        user_company_name:'上海真格基金有限公司',
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
    }
  },
  methods: {
    preview(){
      this.$emit('changeall',false);
    },
    push(type){
//      this.$emit('changeall',false);
      let check1 = this.submitForm('email');
      let check2 = this.submitForm('email2');
      if(this.projectRadio=='') this.$tool.error("请选择要推送的项目")
        else if(!this.$tool.checkEmail(this.email2.nameEmail)) this.$tool.error("请输入正确的邮箱")
      else if(type==1){//关闭
        if(check1 && check2) this.$emit('changeall',false)

/*        this.$http.post(this.URL.getCrawlerBrand, {
          user_id: localStorage.user_id,
        })
          .then(res => {
            let data=res.data.data;
            this.$tool.console(res);
 this.$emit('changeall',false);
          })
          .catch(err => {
            this.$tool.console(err);
          })*/
      }else if(type==2){//继续
          if(check1 && check2) this.$emit('changeall',false)
/*        this.$http.post(this.URL.getCrawlerBrand, {
          user_id: localStorage.user_id,
        })
          .then(res => {
            let data=res.data.data;
            this.$tool.console(res);
            this.$emit('changeall',false);
          })
          .catch(err => {
            this.$tool.console(err);
          })*/
      }
    },//推送按钮1推送1次,2继续推送
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
