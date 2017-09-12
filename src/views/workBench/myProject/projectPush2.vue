<template>
  <!--项目推送项目入口-->
  <div id="projectPush">
    <el-dialog :visible="projectPushShow2" :before-close="handleClose">
      <!--弹窗头部-->
      <span slot="title" class="dialog-title clearfix">
        <div class="lines fl"></div>
        <div class="title fl">项目推送</div>
        <div class="lost fl">今日剩余推送<i>{{pushCount}}</i>次</div>
        <el-tooltip content="Top center" placement="top">
          <div slot="content">每天可以推送5次，1个项目推送给1个投资人计1次，1个项目推送给多个投资人计多次</div>
          <div class="img fl" style="cursor: pointer"><img src="../../../assets/images/why.png"></div>
        </el-tooltip>
      </span>

      <!--推送项目名-->
      <div>
        <div class="text1">推送项目</div>
        <div class="text2">{{project_name}}</div>
      </div>

      <!--推送人脉-->
      <el-form :inline="true" :model="investor" class="demo-form-inline pushInvestor" label-position="top">
        <el-form-item label="推送人脉">
          <el-select v-model="allShow" filterable
                     style="width: 586px;"
                     remote placeholder="请输入您要推送的投资人"
                     multiple @remove-tag="removeTag"
                     :remote-method="remoteMethod"
                     popper-class="popper">
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-top: 25px;background: #40587A;border-color:#40587A;" type="primary" @click="customerAdd">自定义添加</el-button>
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
            style="width: 100%;font-size: 12px!important;"
            max-height="430"
            :row-class-name="tableRowClassName">
            <!--多选框-->
            <el-table-column width="64" v-if="reBorn">
              <template scope="scope">
                <el-checkbox :checked="myCheckList[scope.row.card.card_id] || myCheckList[scope.row.card.user_id]"
                             :label="scope.row.card.card_id || scope.row.card.user_id"
                             @change="myCheck"
                             :name="scope.row.card.user_real_name+'( '+scope.row.card.user_email+' )'"></el-checkbox>
              </template>
            </el-table-column>
            <!--姓名-->
            <el-table-column
              label="姓名"
              prop="name"
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
                    <div class="tips-txt" style="color:#FC703E">{{scope.row.match}}</div>
                  </div>
                  <div>
                    {{scope.row.match}}%
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!--平台推荐投资人-->
        <el-tab-pane label="平台推荐投资人" name="netContacts">
          <el-table
            ref="netContacts"
            :data="netContacts"
            tooltip-effect="dark"
            style="width: 100%;font-size: 12px;"
            max-height="430"
            :row-class-name="tableRowClassName">
            <el-table-column width="64" v-if="reBorn">
              <template scope="scope">
                <el-checkbox :checked="netCheckList[scope.row.card.user_id] || netCheckList[scope.row.card.card_id]"
                             :label="scope.row.card.user_id ||scope.row.card.card_id"
                             @change="netCheck"
                             :name="scope.row.card.user_real_name+'( '+scope.row.card.user_email+' )'"></el-checkbox>
              </template>
            </el-table-column>
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
                    <div class="tips-txt"  style="color:#FC703E">{{scope.row.match}}</div>
                  </div>
                  <div>
                    {{scope.row.match}}%
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!--标题和正文-->
      <el-form label-position="top" label-width="80px" ref="email" :model="email">
        <el-form-item label="标题"
                      prop="title"
                      style="margin-top: 30px">
          <el-input v-model="pushTitle" placeholder="浙江安琪创投-投资VP-杜兴国推荐项目|微天使乐投平台—互联网化FA平台—AI驱动的智能云投行"></el-input>
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
      <el-dialog class="customerAddForm" title="自定义添加" :visible.sync="dialogFormVisible" :modal='false' size="full"
                 :close-on-click-modal="false">
        <el-form :model="customerAddForm" ref="customerAddForm">
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email" :rules="[{ required: true, message: '邮箱不能为空'}]">
            <el-input v-model="customerAddForm.email" auto-complete="off" placeholder="请输入邮箱"
                      :rules="[{ required: false}]"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" :rules="[{ required: true, max:20, message: '姓名不得超过20个字符长度'}]">
            <el-input v-model="customerAddForm.name" auto-complete="off" placeholder="请输入姓名"
                      :rules="[{ required: false}]"></el-input>
          </el-form-item>
          <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
            <el-input v-model="customerAddForm.mobile" auto-complete="off" placeholder="请输入手机"
                      :rules="[{ required: false}]" type="number"></el-input>
          </el-form-item>
          <el-form-item label="公司" :label-width="formLabelWidth" prop="company" :rules="[{ required: false, max:40, message:'公司不得超过40个字符长度'}]">
            <el-input v-model="customerAddForm.company" auto-complete="off" placeholder="请输入公司"></el-input>
          </el-form-item>
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="brand" :rules="[{ required: false, max:40, message:'品牌不得超过40个字符长度'}]">
            <el-input v-model="customerAddForm.brand" auto-complete="off" placeholder="请输入品牌"
                      :rules="[{ required: false}]"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth" prop="career" :rules="[{ required: false, max:40, message:'职位不得超过40个字符长度'}]">
            <el-input v-model="customerAddForm.career" auto-complete="off" placeholder="请输入职位"
                      :rules="[{ required: false}]"></el-input>
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
  import {mapState} from 'vuex'
  export default {
    props: ["projectPushShow2", 'proid', 'proIntro','proName','emitPush'],
    data () {
      return {
        pushbrand:'',
        pushTitle1:'',
        pro_name:this.proName,
        project_name: this.proIntro,
        project_id: this.proid,
        close: false,//默认关闭
        loading: false,
        //默认显示tab
        activeName: 'myContacts',
        //我的人脉数据
        myContacts: [],
        //全网人脉数据
        netContacts: [],
        //我的人脉显示数组和全网人脉显示数据(show:是name;id是id.服务于computed)
        myContactsShow: [],
        netContactsShow: [],
        //发送推送项目时参数
        pushData: [],
        //多选框勾选控制
        myCheckList: {},
        netCheckList: {},
        //控制自定义添加显示和隐藏
        dialogFormVisible: false,
        //自定义添加表单数据
        customerAddForm: {
          email: '',
          name: '',
          mobile: '',
          company: '',
          brand: '',
          career: '',
        },
        formLabelWidth: '74px',
        //可用推送次数
        pushCount: 5,
        //推送邮箱标题和正文
        pushTitle: this.pushTitle1,
        pushBody: '',
        //当前激活的tab页
        activeTab: 'myContacts',
        //input输入的搜索字段
        filterString: '',
        investor: {
          name: '',
        },
        //重新渲染组建
        reBorn: false,
        //自定义添加人脉数据(服务于新加人脉后自动选中)
        newAddContacts: {},

        email: {
          title: '有人给您推荐一个项目,赶紧看看吧',//邮件标题
          main: '',//邮件正文
        },
        email2: {
          nameEmail: '',//人脉的邮箱(一个)
        },
        user: {
          user_real_name: '',
          user_company_career: '',
          user_company_name: '',
        },
        user_company_name:'',
        user_brand:'',
        user_company_career:'',
        user_real_name:'',
      }
    },
    components: {customerAddContacts},
    methods: {
        title(){
            this.user_company_name=localStorage.user_company_name;
            this.user_brand=localStorage.user_brand;
            this.user_company_career=localStorage.user_company_career;
            this.user_real_name=localStorage.user_real_name;
            if(!this.user_brand){
              this.pushbrand=this.user_company_name;
            }else{
              this.pushbrand=this.user_brand;
            }

          this.pushTitle1=this.pushbrand+'-'+this.user_company_career+'-'+this.user_real_name+'推荐项目|微天使乐投平台—互联网化FA平台—AI驱动的智能云投行';
        },
      //获取当前用户部分信息
      getFirstUser(user){
        this.$http.post(this.URL.getOneUserInfo, {user_id: localStorage.user_id})
          .then(res => {
            if (res.data.status_code == 2000000) {
              let data = res.data.data;
              user.firse_user_real_name = data.user_real_name;
              user.firse_user_company_career = data.user_company_career;
              user.firse_user_company_name = data.user_company_name;
            }
          })
          .catch(err => {
            this.$tool.console(err, 2);
            this.$tool.error("加载超时");
          })
      },
      //获取我的人脉数据
      getMyContacts(remote){
        this.$http.post(this.URL.getConnectUserSortByMatch, {
          user_id: localStorage.user_id,
          project_id: this.project_id,
          search: this.filterString,
        }).then(res => {
          if (res.data.status_code === 2000000) {
//          console.log('我的人脉', res.data.data)
            this.myContacts = res.data.data;
            //有参数remote传则是项目搜索时调用当前接口
            if (remote) {
              this.initReborn();
            }
            //如果this.newAddContacts有数据则是自定义人脉时调用当前接口
            if (this.newAddContacts.name && this.newAddContacts.email) {
              let lastOne = this.myContacts.slice(-1)[0].card
              if (lastOne.user_real_name === this.newAddContacts.name && lastOne.user_email === this.newAddContacts.email) {
                //在checkbox上勾选自定义人脉
                if (this.myContacts.slice(-1)[0].type === 'card') {
                  this.myCheckList[lastOne.card_id] = true
                } else {
                  this.myCheckList[lastOne.user_id] = true
                }
                //在input显示中添加自定义人脉
                let newOne=lastOne.user_real_name+'( '+lastOne.user_email+' )'
                this.myContactsShow.push(newOne)
                //在pushData中添加自定义人脉
                this.pushData.push(this.myContacts.slice(-1)[0])
                //清除痕迹
                this.newAddContacts = {};
              }
            }
          } else {
//          console.log(res.data.error_msg)
          }
        })
      },
      //获取全网人脉数据
      getNetContacts(remote){
        this.$http.post(this.URL.getAllConnectUserSortByMatch, {
          user_id: localStorage.user_id,
          project_id: this.project_id,
          search: this.filterString,
        }).then(res => {
          if (res.data.status_code === 2000000) {
//          console.log('全网人脉',res.data.data)
            this.netContacts = res.data.data;
            //项目搜索时调用此接口
            if (remote) {
              this.initReborn();
            }
          } else {
//          console.log(res.data.error_msg)
          }
        })
      },
      //匹配我的人脉和全网人脉是否有同个用户
      matchUser(){
        this.myContacts.forEach(x=>{
          this.netContacts.forEach((y,index)=>{
            if(x.card.card_id===y.card.card_id){
              this.netContacts.splice(index,1)
            }
            if(x.card.user_id===y.card.user_id){
              this.netContacts.splice(index,1)
            }
          })
        })
      },
      //获取可用推送次数
      getPushCount(){
        this.$http.post(this.URL.pushCount, {
          user_id: localStorage.user_id
        }).then(res => {
          if (res.data.status_code === 2000000) {
            this.pushCount = res.data.data.push_count.remain_times;
          }
        })
      },
      //重置我的人脉,全网人脉,选中的我的人脉,选中的全网人脉,可用推送次数数据
      initData(){
        this.pushData = [];
        this.myContactsShow = [];
        this.netContactsShow = [];
        this.myContacts=[];
        this.netContacts=[];
        this.pushTitle = this.pushTitle1;
        this.pushBody = '';
        this.myCheckList = {};
        this.netCheckList = {};
        this.getMyContacts();
        this.getNetContacts();
        this.getPushCount();
      },
      //选项卡切换
      handleClick(tab, event) {
//      console.log(tab.name)
        this.activeTab = tab.name
      },
      //控制列表颜色
      tableRowClassName(row, index) {
        if (index % 2 === 1) {
          return 'info-row';
        }
        return '';
      },
      //自定义添加人脉(跳出弹窗)
      customerAdd(){
        this.dialogFormVisible = true;
      },
      //取消添加自定义人脉
      cancelAdd(){
        this.$refs['customerAddForm'].resetFields();
        this.dialogFormVisible = false;
      },
      //确认添加自定义人脉
      certainAdd(){
        var form = this.customerAddForm;
        if (!form.email) {
          this.$tool.error('请输入邮箱')
        } else if (!this.$tool.checkEmail(form.email)) {
          this.$tool.error('请正确输入邮箱')
        }else if(!form.name){
          this.$tool.error('请输入姓名')
        }else if(form.name.length>20){
          this.$tool.error('姓名不得超过20个字符长度')
        }else if(form.company.length>40){
          this.$tool.error('公司不得超过40个字符长度')
        }else if(form.brand.length>40){
          this.$tool.error('品牌不得超过40个字符长度')
        }else if(form.career.length>40){
          this.$tool.error('职位不得超过40个字符长度')
        } else if (form.mobile) {
          if (!this.$tool.checkPhoneNumber(form.mobile)) {
            this.$tool.error('请正确填写手机号码')
          } else {
            this.$http.post(this.URL.createUserCard, {
              user_id: localStorage.user_id,
              user_email: form.email,
              user_real_name: form.name,
              user_mobile: form.mobile,
              user_company_name: form.company,
              user_company_career: form.career,
              user_brand: form.brand
            }).then(res => {
              if (res.data.status_code === 2000000) {
                this.newAddContacts.name = this.customerAddForm.name;
                this.newAddContacts.email = this.customerAddForm.email;
                this.$refs['customerAddForm'].resetFields();
                this.dialogFormVisible = false;
                this.getMyContacts();
                this.getNetContacts();
              }
            })
          }
        } else {
          this.$http.post(this.URL.createUserCard, {
            user_id: localStorage.user_id,
            user_email: form.email,
            user_real_name: form.name,
            user_mobile: form.mobile,
            user_company_name: form.company,
            user_company_career: form.career,
            user_brand: form.brand
          }).then(res => {
            if (res.data.status_code === 2000000) {
              this.newAddContacts.name = this.customerAddForm.name;
              this.newAddContacts.email = this.customerAddForm.email;
              this.$refs['customerAddForm'].resetFields();
              this.dialogFormVisible = false;
              this.getMyContacts();
              this.getNetContacts();
            }
          })
        }
      },
      //项目搜索
      remoteMethod(query) {
        this.filterString = query;
        if (this.activeTab === "myContacts") {
          this.getMyContacts('remote')
        } else {
          this.getNetContacts('remote')
        }
      },
      //删除标签
      removeTag(e){
        let checktag = e.value
        let pattern = new RegExp("\\((.| )+?\\)", "igm")
        let name = checktag.substring(0, checktag.indexOf('('));
        let email = checktag.match(pattern).toString();
        email = email.substring(2, email.length - 2);

        //取消Input显示
        this.myContactsShow.forEach((x, index) => {
          if (x === e.value) {
            this.myContactsShow.splice(index, 1)
          }
        })
        this.netContactsShow.forEach((x, index) => {
          if (x === e.value) {
            this.netContactsShow.splice(index, 1)
          }
        })

        //删除checkbox勾选和myCheck
        this.myContacts.forEach((x, index) => {
          if (x.card.user_email === email) {
            if (x.card.user_real_name === name) {
              if (x.type === 'card') {
                let thisId = x.card.card_id
                this.myCheckList[thisId] = false;
                this.netCheckList[thisId] =  false;
              } else {
                let thisId = x.card.user_id
                this.myCheckList[thisId] =  false;
                this.netCheckList[thisId] =  false;
              }
              return
            }
          }
        })
        this.netContacts.forEach((x, index) => {
          if (x.card.user_email === email) {
            if (x.card.user_real_name === name) {
              if(x.type==='user'){
                let thisId = x.card.user_id;
                this.netCheckList[thisId] =  false;
                this.myCheckList[thisId] =  false;
                return
              }else{
                let thisId = x.card.card_id;
                this.netCheckList[thisId] =  false;
                this.myCheckList[thisId] =  false;
                return
              }
            }
          }
        })

        //删除pushData
        this.pushData.forEach((x, index) => {
          if (x.card.user_email === email) {
            if (x.card.user_real_name === name) {
              this.pushData.splice(index, 1)
            }
          }
        })
        //强置刷新checkBox状态
        this.reBorn = false;
        setTimeout(() => {
          this.reBorn = true;
        }, 0)
      },
      //数据过滤
      nameFilter(x){
        if (x.card.user_real_name.indexOf(this.filterString) != -1) {
          return x
        }
      },
      //我的人脉表单和全网人脉表单勾选触发
      myCheck(e){
        let thisId = e.target.value;
        let thisName = e.currentTarget.name;
        if (this.myCheckList[thisId] === false) {
          this.myContactsShow.push(thisName);
          this.myCheckList[thisId] = true;
          this.netCheckList[thisId] = true;
          //预处理推送项目接口的参数
          this.myContacts.forEach(x => {
              if(x.type==='card'){
                if (x.card.card_id === thisId) {
                  this.pushData.push(x)
                  return
                }
              }else{
                if (x.card.user_id === thisId) {
                  this.pushData.push(x)
                  return
                }
              }
          })
        } else {
          let thisName = e.currentTarget.name;
          let thisId = e.target.value;
          this.myCheckList[thisId] = false;
          this.netCheckList[thisId] = false;
          this.myContactsShow.splice(this.myContactsShow.indexOf(thisName), 1)
          this.pushData.splice(this.pushData.indexOf(thisId), 1)
        }
        this.initReborn();
      },
      netCheck(e){
        let thisId = e.target.value;
        let thisName = e.currentTarget.name;
        if (this.netCheckList[thisId] === false) {
          this.netContactsShow.push(thisName);
          this.netCheckList[thisId] = true;
          this.myCheckList[thisId] = true;
          //预处理推送项目接口的参数
          this.netContacts.forEach(x => {
            if(x.type==='card'){
              if (x.card.card_id === thisId) {
                this.pushData.push(x);
                return
              }
            }else{
              if (x.card.user_id === thisId) {
                this.pushData.push(x);
                return
              }
            }
          })
        } else {
          let thisName = e.currentTarget.name;
          let thisId = e.target.value;
          this.netCheckList[thisId] = false;
          this.myCheckList[thisId] = false;
          this.netContactsShow.splice(this.netContactsShow.indexOf(thisName), 1)
          this.pushData.splice(this.pushData.indexOf(thisId), 1)
        }
        this.initReborn();
      },
      //预览
      preview(){
        if(this.pushTitle.length>100){
          this.$tool.error('标题不能大于100个字')
        }else if(this.pushBody.length>500){
          this.$tool.error('正文不能大于500个字')
        }else if(this.pushData.length<0){
          this.$tool.error('请先选择推送人脉 ')
        }else if(this.pushData.length>this.pushCount){
          this.$tool.error('推送人数不能超过今日剩余推送次数')
        }else{
            console.log(this.pushData)
          let targetUser = this.pushData[0].card;
          let user = {
            user_real_name: targetUser.user_real_name,
            user_company_career: targetUser.user_company_career,
            user_company_name: targetUser.user_company_name,
            firse_user_real_name: '',//当前用户
            firse_user_company_career: '',
            firse_user_company_name: '',
          };
          this.getFirstUser(user);
          if (this.pushCount != 0) {
            this.$store.state.pushProject.project_id = this.project_id;
            this.$store.state.pushProject.user = user;
            this.$store.state.pushProject.pushMessage.user_id = localStorage.user_id;
            this.$store.state.pushProject.pushMessage.card_id = user.card_id;
            this.$store.state.pushProject.pushMessage.investor_id = user.investor_id;
            this.$store.state.pushProject.pushMessage.email = this.email2.nameEmail;
            this.$store.state.pushProject.pushMessage.title = this.pushTitle;
            this.$store.state.pushProject.pushMessage.body = this.pushBody;
            this.$store.state.pushProject.pushMessage.project_ids = new Array;
            this.$store.state.pushProject.pushMessage.project_ids.push(this.projectRadio);
            this.$store.state.pushProject.email.title = this.pushTitle;
            this.$store.state.pushProject.email.body = this.pushBody;
            this.$emit('openPreview', true);
          } else {
            this.$tool.warning("您今日的推送次数已用完")
          }
        }
      },
      //推送
      push(){
        this.loading=true;
        let dealData = [];
        this.pushData.forEach(x => {

          if (x.type === 'card') {
            dealData.push([x.card.card_id, x.type, x.card.user_email])
          } else {
            dealData.push([x.card.user_id, x.type, x.card.user_email])
          }
        })
        console.log(dealData);
        if (this.pushData.length>0 && dealData.length === 0) {
          this.$tool.error('请选择推送人脉')
        } else if (dealData.length > this.pushCount) {
          this.$tool.error('推送人数不能超过今日剩余推送次数')
        } else if(this.pushTitle.length>100){
            this.$tool.error('标题不能大于100个字')
        }else if(this.pushBody.length>500){
            this.$tool.error('正文不能大于500个字')
        }else {
          this.$http.post(this.URL.pushProject, {
            user_id: localStorage.user_id,
            project_id: this.project_id,
            title: this.pushTitle,
            body: this.pushBody,
            receives: dealData
          }).then(res => {
            if (res.data.status_code === 2000000) {
              this.$tool.success('推送成功');
              this.$emit('closePreviewANDProjectPush', false);
              this.$emit('openPreview', false);
              this.$emit('previewPush',false);
              this.loading=false;
             this.handleClose();
            }
          })
        }
      },
      //关闭弹窗前回调
      handleClose(){
        this.pushData = [];
        this.myContactsShow = [];
        this.netContactsShow = [];
        this.myContacts=[];
        this.netContacts=[];
        this.pushTitle = '';
        this.pushBody = '';
        this.myCheckList = {};
        this.netCheckList = {};
        this.myContactsShow = [];
        this.netContactsShow = [];
        for (let x in this.myCheckList) {
          this.myCheckList[x] = false;
        }
        for (let x in this.netCheckList) {
          x = false;
        }
        //强置刷新checkBox状态
        this.initReborn();
        this.$emit('closeProjectPush2', false);
      },
      //强制刷新checkbox
      initReborn(){
        this.reBorn = false;
        setTimeout(() => {
          this.reBorn = true;
        }, 0)
      },
    },
    computed: mapState({
      allShow(){
        var allShow = [];
        return allShow.concat(this.myContactsShow, this.netContactsShow)
      },
    }),
    mounted(){

    },
    created(){
      this.title();
    },
    watch: {
      //打开该弹框时
      projectPushShow2: function (e) {
        if (e === true) {
          this.loading=true;
          this.project_name = this.proIntro;
          this.project_id = this.proid;
          //为了重置checkBox状态
          if (e === true) {
            this.reBorn = true
          } else {
            this.reBorn = false
          }
          //重置推送项目接口参数
          this.pushData = [];
          this.myContactsShow = [];
          this.netContactsShow = [];
          this.myContacts=[];
          this.netContacts=[];
          this.pushTitle = this.pushTitle1;
          this.pushBody = '';
          this.myCheckList = {};
          this.netCheckList = {};
          this.getPushCount();
          //获取我的人脉和全网人脉的姓名作为勾选框标记
          if (this.project_id) {
            this.$http.post(this.URL.getConnectUserSortByMatch, {
              user_id: localStorage.user_id,
              project_id: this.project_id,
              search: this.filterString,
            }).then(res => {
              if (res.data.status_code === 2000000) {
                this.loading=false;
                res.data.data.forEach(x => {
                  if (x.type === 'card') {
                    this.myCheckList[x.card.card_id] = false;
                  } else {
                    this.myCheckList[x.card.user_id] = false;
                  }
                })
                this.myContacts = res.data.data;
                //如果我的人脉为空,则默认显示全网人脉页面
                if (res.data.data.length === 0) {
                  this.activeName = 'netContacts'
                }
              } else {
//          console.log(res.data.error_msg)
              }
            })
            this.$http.post(this.URL.getAllConnectUserSortByMatch, {
              user_id: localStorage.user_id,
              project_id: this.project_id,
              search: this.filterString,
            }).then(res => {
              if (res.data.status_code === 2000000) {
                res.data.data.forEach(x => {
                  if(x.type === 'user'){
                    this.netCheckList[x.card.user_id] = false;
                  }else{
                    this.netCheckList[x.card.card_id] = false;
                  }
                })
                this.netContacts = res.data.data;
              } else {
//          console.log(res.data.error_msg)
              }
            })
          }
        }
      },
      //项目预览提交推送时
      emitPush: function (e) {
          if(e){
            this.push();
          }
      },
    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/projectPush';



  .popper {
    display: none;
  }
</style>
