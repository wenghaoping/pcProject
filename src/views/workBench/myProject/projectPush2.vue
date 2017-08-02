<template>
  <!--项目推送项目入口-->
  <div id="projectPush" v-loading.fullscreen.lock="loading" element-loading-text="加载中">
    <el-dialog :visible="dialogPush" :before-close="handleClose">
      <!--弹窗头部-->
      <span slot="title" class="dialog-title clearfix">
        <div class="lines fl"></div>
        <div class="title fl">项目推送</div>
        <div class="lost fl">今日剩余推送<i>{{pushCount}}</i>次</div>
        <div class="img fl"><img src="../../../assets/images/why.png"></div>
      </span>

      <!--推送项目名-->
      <div>
        <div class="text1">推送项目</div>
        <div class="text2">{{project_name}}</div>
      </div>

      <!--推送人脉-->
      <el-form :inline="true" :model="investor" class="demo-form-inline pushInvestor" label-position="top">
        <!--<el-form-item label="推送人脉" >
          <el-input style="width: 586px;" v-model="investor.name" placeholder="请输入您要推送的投资人"></el-input>
        </el-form-item>-->
        <el-form-item label="推送人脉">
          <el-select v-model="allCheck" filterable
                     style="width: 586px;"
                     remote placeholder="请输入您要推送的投资人"
                     multiple @remove-tag="removeTag"
                     :remote-method="remoteMethod"  popper-class="popper">
            <el-option v-for="(item,index) in allCheck" :key="item.card.card_id" :label="item.card.user_real_name" :value="item.card.user_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-top: 25px;" type="primary" @click="customerAdd">自定义添加</el-button>
        </el-form-item>
      </el-form>

      <!--我的人脉和全网人脉tab页切换-->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!--我的人脉-->
          <el-tab-pane label="我的人脉" name="myContacts">
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              ref="myContacts"
              :data="myContacts"
              tooltip-effect="dark"
              style="width: 100%;font-size: 12px;"
              max-height="430"
              @selection-change="tableCheck1"
              :row-class-name="tableRowClassName">
              <el-table-column type="selection" width="64"></el-table-column>
              <!--姓名-->
              <el-table-column
                label="姓名"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.card.user_real_name}}</div>
                    </div>
                    <div>
                      {{scope.row.card.user_real_name}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--职位-->
              <el-table-column
                label="职位"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.card.user_company_career}}</div>
                    </div>
                    <div>
                      {{scope.row.card.user_company_career}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--公司-->
              <el-table-column
                label="公司"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.card.user_company_name}}</div>
                    </div>
                    <div>
                      {{scope.row.card.user_company_name}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--邮箱-->
              <el-table-column
                label="邮箱"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.card.user_email}}</div>
                    </div>
                    <div>
                      {{scope.row.card.user_email}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--领域-->
              <el-table-column
                label="领域"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt" >{{scope.row.card.user_invest_industry_str}}</div>
                    </div>
                    <div>
                      {{scope.row.card.user_invest_industry_str}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--匹配度-->
              <el-table-column
                label="匹配度"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.match}}</div>
                    </div>
                    <div>
                      {{scope.row.match}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!--全网人脉-->
          <el-tab-pane label="全网人脉" name="netContacts">
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              ref="netContacts"
              :data="netContacts"
              tooltip-effect="dark"
              style="width: 100%;font-size: 12px;"
              max-height="430"
              @selection-change="tableCheck2"
              :row-class-name="tableRowClassName">
              <el-table-column type="selection" width="64"></el-table-column>
              <!--姓名-->
              <el-table-column
                label="姓名"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.card.user_real_name}}</div>
                    </div>
                    <div>
                      {{scope.row.card.user_real_name}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--职位-->
              <el-table-column
                label="职位"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.card.user_company_career}}</div>
                    </div>
                    <div>
                      {{scope.row.card.user_company_career}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--公司-->
              <el-table-column
                label="公司"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.card.user_company_name}}</div>
                    </div>
                    <div>
                      {{scope.row.card.user_company_name}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--邮箱-->
              <el-table-column
                label="邮箱"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.card.user_email}}</div>
                    </div>
                    <div>
                      {{scope.row.card.user_email}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--领域-->
              <el-table-column
                label="领域"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.card.user_invest_industry_str}}</div>
                    </div>
                    <div>{{scope.row.card.user_invest_industry_str}}</div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <!--匹配度-->
              <el-table-column
                label="匹配度"
                min-width="100">
                <template scope="scope">
                  <el-tooltip placement="top">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.match}}</div>
                    </div>
                    <div>
                      {{scope.row.match}}
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>

      <!--标题和正文-->
      <el-form label-position="top" label-width="80px" ref="email" :model="email">
        <el-form-item label="标题" prop="title">
          <el-input v-model="pushTitle" placeholder="便于投资人识别您的身份以及项目概况，例如：来自千月资本的项目推荐-国内首家基因靶向肿瘤治疗项目"></el-input>
        </el-form-item>
        <el-form-item label="正文" prop="main">
          <el-input type="textarea"
                    v-model="pushBody"
                    placeholder="请输入简要项目介绍，作为邮件正文，便于投资人快速了解项目"
                    :autosize="{ minRows: 4, maxRows: 7}"></el-input>
        </el-form-item>
      </el-form>

      <!--按钮组-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="preview">预览</el-button>
        <el-button type="primary" @click="push">推送</el-button>
      </span>

      <!--自定义添加-->
      <!--<customeraddcontacts :dialog-form-visible="dialogFormVisible"></customeraddcontacts>-->

      <!--自定义添加2-->
      <el-dialog class="customerAddForm"  title="自定义添加" :visible.sync="dialogFormVisible" :modal='false' size="full" :close-on-click-modal="false">
        <el-form :model="customerAddForm" ref="customerAddForm">
          <el-form-item label="邮箱"
                        :label-width="formLabelWidth"
                        prop="email"
                        :rules="[{ required: true, message: '邮箱不能为空'}]">
            <el-input v-model="customerAddForm.email" auto-complete="off"  placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="customerAddForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input v-model="customerAddForm.mobile" auto-complete="off" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="公司" :label-width="formLabelWidth">
            <el-input v-model="customerAddForm.company" auto-complete="off" placeholder="请输入公司"></el-input>
          </el-form-item>
          <el-form-item label="品牌" :label-width="formLabelWidth">
            <el-input v-model="customerAddForm.brand" auto-complete="off" placeholder="请输入品牌"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-input v-model="customerAddForm.career" auto-complete="off" placeholder="请输入职位"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelAdd">取 消</el-button>
          <el-button type="primary" @click="certainAdd">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
<!--项目预览弹窗-->
  </div>
</template>

<script type="text/ecmascript-6">
  import customerAddContacts from '../../../components/customerAddContacts.vue'
  export default {
  props: ["dialogPush",'proid','proname'],
  data () {
    var checkEmail = (rule, value, callback) => {
      if (this.$tool.getNull(value)) {
        return callback(new Error('邮箱不能为空'));
      }
      setTimeout(() => {
        if (!this.$tool.checkEmail(value)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      }, 300);


    };//邮箱判断
    var checkTitle = (rule, value, callback) => {
      if (this.$tool.getNull(value)) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };//不为空判断
    return {
      project_name:this.proname,
      project_id:this.proid,
      close:false,//默认关闭
      activeName: 'myContacts',
      //我的人脉数据
      myContacts:[],
      //全网人脉数据
      netContacts:[],
      //选中的我的人脉数据
      myContactsCheck:[],
      //选中的全网人脉数据
      netContactsCheck:[],
      loading: false,
      //控制自定义添加显示和隐藏
      dialogFormVisible:false,
      //自定义添加表单数据
      customerAddForm: {
        email:'',
        name: '',
        mobile:'',
        company:'',
        brand:'',
        career:'',
      },
      formLabelWidth: '74px',
      //可用推送次数
      pushCount:5,
      //推送邮箱标题和正文
      pushTitle:'',
      pushBody:'',


      emailRule: {validator: checkEmail, trigger: 'blur'},
      titleRule: {validator: checkTitle, trigger: 'blur'},
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
      projectRadio:'',
      investor:{
        name:'',
      },
    }
  },
  components:{customerAddContacts},
  methods: {
    //获取我的人脉数据
    getMyContacts(){
      this.$http.post(this.URL.getConnectUserSortByMatch, {
        user_id: localStorage.user_id,
        project_id: this.project_id
      }).then(res => {
        if(res.data.status_code===2000000){
//          console.log('我的人脉', res.data.data)
          this.myContacts=res.data.data;
        }else{
          console.log(res.data.error_msg)
        }
      })
    },
    //获取全网人脉数据
    getNetContacts(){
      this.$http.post(this.URL.getAllConnectUserSortByMatch, {
        user_id: localStorage.user_id,
        project_id: this.project_id
      }).then(res => {
        if(res.data.status_code===2000000){
          console.log('全网人脉',res.data.data)
          this.netContacts=res.data.data;
        }else{
          console.log(res.data.error_msg)
        }
      })
    },
    //获取可用推送次娄
    getPushCount(){
      this.$http.post(this.URL.pushCount,{
        user_id:localStorage.user_id
      }).then(res=>{
        if(res.data.status_code===2000000){
          this.pushCount=res.data.data.push_count.remain_times;
        }
      })
    },
    //重置我的人脉,全网人脉,选中的我的人脉,选中的全网人脉,可用推送次数数据
    initData(){
      this.getMyContacts();
      this.getNetContacts();
      this.getPushCount();
      this.myContactsCheck=[];
      this.netContactsCheck=[];
    },
    //选项卡切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //控制列表颜色
    tableRowClassName(row, index) {
      if (index%2 === 1) {
        return 'info-row';
      }
      return '';
    },
    //自定义添加人脉(跳出弹窗)
    customerAdd(){
     this.dialogFormVisible=true;
     console.log(this.dialogFormVisible)
    },
    //取消添加自定义人脉
    cancelAdd(){
      this.$refs['customerAddForm'].resetFields();
      this.dialogFormVisible=false;
    },
    //确认添加自定义人脉
    certainAdd(){
      var form=this.customerAddForm;
      if(!form.email){
        this.$tool.error('请输入邮箱')
      }else if(!this.$tool.checkEmail(form.email)){
        this.$tool.error('请正确输入邮箱')
      }else{
        this.$http.post(this.URL.createUserCard,{
          user_id:localStorage.user_id,
          user_email:form.email,
          user_real_name:form.name,
          user_mobile:form.mobile,
          user_company_name:form.company,
          user_company_career:form.career,
          user_brand:form.brand
        }).then(res=>{
          console.log(res)
          if(res.data.status_code===2000000){
            this.$refs['customerAddForm'].resetFields();
            this.dialogFormVisible=false;
            this.getMyContacts();
            this.getNetContacts();
            this.getPushCount();
          }
        })
      }
    },
    //我的人脉表单选择
    tableCheck1(val){
      console.log(val)
      this.myContactsCheck=val;
      console.log(this.allCheck)
    },
    //全网人脉表单选择
    tableCheck2(val){
      this.netContactsCheck=val;
      console.log(this.allCheck)
    },
    //预览
    preview(){
      this.$emit('changeall',false);
    },
    //推送
    push(){
      let dealData=[]
      this.allCheck.forEach(x=>{
        if(x.type==='card'){
          dealData.push([x.card.card_id,x.type,x.card.user_email])
        }else{
          dealData.push([x.card.user_id,x.type,x.card.user_email])
        }
      })
      console.log(dealData)
      if(dealData.length===0){
        this.$tool.error('请选择推送人脉')
      }else if(dealData.length>this.pushCount){
        console.log(dealData.length,this.pushCount)
        this.$tool.error('推送人数不能超过今日剩余推送次数')
      }else{
        this.$http.post(this.URL.pushProject,{
          user_id:localStorage.user_id,
          project_id:this.project_id,
          title:this.pushTitle,
          body:this.pushBody,
          receives:dealData
        }).then(res=>{
          if(res.data.status_code===2000000){
            this.$tool.success('推送成功');
            this.initData();
          }
        })
      }
    },
    /*//推送人脉搜索
    remoteMethod(query) {
      if (query !== '') {
        this.load = true;
        setTimeout(() => {
          this.load = false;
          this.myContacts = this.list.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.myContacts = [];
      }
    },*/
    //项目搜索
    remoteMethod(query) {
      this.loading=true;
      this.$http.post(this.URL.matchProject,{
        user_id: localStorage.user_id,
        card_id: this.user.card_id,
        pro_intro: query})
      .then(res=>{
        let data = res.data.data;
//          this.$tool.console(data.projects);
        this.tableData3=data.projects;
        this.projectAll=this.setProjectAll(data.projects);
        this.loading=false;
      })
      .catch(err =>{
        this.$tool.console(err,2);
        this.loading=false;
      })
    },
    //删除标签
    removeTag(e){
      //console.log(e);

    },

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
  },
  computed:{
    allCheck(){
      var allCheck=[];
      return allCheck.concat(this.myContactsCheck,this.netContactsCheck)
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  created(){
    //初始化数据
    this.initData();
  },
}
</script>

<style lang="less">
  @import '../../../assets/css/mycontacts';
</style>
