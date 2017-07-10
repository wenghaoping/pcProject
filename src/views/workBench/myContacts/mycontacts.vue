<template>
  <div id="mycontacts" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!-- 右侧底部主内容区 -->
    <div class="wrap-left">
      <div class="top-search-box clearfix">
        <div class="input-box fl">
          <el-input
            placeholder="搜索姓名、手机、公司名称"
            icon="search"
            v-model="searchinput"
            :on-icon-click="handleIconClick"
            @keyup.native.enter="handleIconClick">
          </el-input>
        </div>
        <div class="btns-box fr">
          <el-button type="primary" @click="addContacts">添加人脉</el-button>
        </div>
      </div>
      <div class="top-lists" style="height:690px;background: #f3f4f8;cursor: pointer">
        <template>
          <el-table :data="tableData" style="width: 100%"
                    @row-click="handleSelect"
                    @header-click="headerClick"
                    @sort-change="filterChange"
                    @filter-change="filterChange" stripe>
            <el-table-column prop="user_real_name" label="姓名" width="200">
              <template scope="scope">
                <div class="img fl">
                  <img v-if="scope.row.user_avatar_url!=''" :src="scope.row.user_avatar_url">
                  <span v-else class="header">{{scope.row.user_avatar_url_change}}</span>
                </div>
                <el-tooltip class="fl name" placement="top" :disabled="scope.row.user_real_name.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_real_name}}</div>
                  </div>
                  <div>
                    {{scope.row.user_real_name}}
                  </div>
                </el-tooltip>
                <span class="fl add" v-if="scope.row.is_add==true"><img src="../../../assets/images/add.png"></span>
                <div v-if="scope.row.user_real_name.length === 0">
                  --
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="user_company_career" label="职位" show-overflow-tooltip width="80">
              <template scope="scope">
                <div v-if="scope.row.user_company_career==''">
                  --
                </div>
                <div else>
                  {{scope.row.user_company_career}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="card_company_name" label="公司" show-overflow-tooltip width="144">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.user_company_name.length > 10 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_company_name}}</div>
                  </div>
                  <div>
                    {{scope.row.user_company_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.user_company_name.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="user_brand" label="品牌" show-overflow-tooltip width="80">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.user_brand.length > 5 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_brand}}</div>
                  </div>
                  <div>
                    {{scope.row.user_brand}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.user_brand.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="user_mobile" label="手机" show-overflow-tooltip width="112">
              <template scope="scope">
                <div v-if="scope.row.user_mobile==''">
                  --
                </div>
                <div else>
                  {{scope.row.user_mobile}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="user_email" label="邮箱" show-overflow-tooltip width="148">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.user_email.length > 17 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_email}}</div>
                  </div>
                  <div>
                    {{scope.row.user_email}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.user_email.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="user_invest_industry" label="投资领域"
                             show-overflow-tooltip
                             width="128"
                             column-key="industry"
                             :filters="user_invest_industryFilters"
                             filter-placement="bottom-end">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.user_invest_industry.length > 10 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_invest_industry}}</div>
                  </div>
                  <div>
                    {{scope.row.user_invest_industry}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.user_invest_industry.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="user_invest_stage" label="投资轮次" show-overflow-tooltip
                             width="140"
                             column-key="stage"
                             :filters="user_invest_stageFilters"
                             filter-placement="bottom-end">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.user_invest_stage.length > 10 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_invest_stage}}</div>
                  </div>
                  <div>
                    {{scope.row.user_invest_stage}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.user_invest_stage.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="tag" label="标签" show-overflow-tooltip
                             width="74"
                             column-key="tag"
                             :filters="tagFilters"
                             filter-placement="bottom-end">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.tag.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.tag}}</div>
                  </div>
                  <div>
                    {{scope.row.tag}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.tag.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="login_time" label="最近活跃" show-overflow-tooltip
                             width="100"
                             column-key="login_time"

                             sortable="custom">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.login_time.length > 4 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.login_time}}</div>
                  </div>
                  <div>
                    {{scope.row.login_time}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.login_time.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="reset"
              label="重置"
              width="130" class="set-th">
              <template scope="scope">
                <el-button
                  @click="handlePush(scope.$index, scope.row)"
                  type="text"
                  size="small" class="edits-btn btn-cur">
                  推送
                </el-button>
                <el-button
                  type="text"
                  size="small" class="flow-btn btn-cur" v-if="scope.row.is_bind==0"
                  @click="handleEdit(scope.$index, scope.row)">
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="small" class="flow-btn btn-cur"
                  v-if="scope.row.is_bind==1"
                  @click="handleTag(scope.$index, scope.row)">
                  标签
                </el-button>
                <el-button
                  type="text"
                  size="small" class="send-btn btn-cur"
                  @click="handleDelete(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagenav" v-if="totalData>10">
            <el-pagination
              small
              @current-change="filterChangeCurrent"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="totalData">
            </el-pagination>
          </div>
        </template>
      </div>
    </div>

    <!--标签设置弹框-->
    <el-dialog
      title="标签设置"
      :visible.sync="dialogVisible"
      :show-close="close"
      size="tiny">
      <el-select
        v-model="tagsValue"
        multiple
        filterable
        allow-create
        style="width:100%"
        @change="addChangeTag"
        default-first-option
        placeholder="请输入标签">
        <el-option
          v-for="item in addTags"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="tagTitle">准确设置项目标签便于查找，并参与项目匹配度计算</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </span>
    </el-dialog>

    <!--项目推送弹窗-->
    <projectpush :dialog-push="dialogPushVisible" :user-message="userMessage" :user-email="userEmail" @changeall="dialogVisiblechange"></projectpush>

  </div>
</template>

<script type="text/ecmascript-6">
import projectpush from './projectPush.vue'
export default {
  data () {
    return {
      close:false,
      activeName:'second',
      loading: false,//加载
      dialogUploadVisible:false,//控制添加人脉弹窗
      searchinput:'',//搜索绑定
      dialogVisible:false,//标签弹框设置
      dialogPushVisible:false,//项目推送弹框设置
      totalData:1,//总页数
      currentPage:1,//当前页数
      getPra:{},//筛选的请求参数
      tagsValue:[],//标签弹框数据绑定
      addTags:[{
        value: '',
        label: ''
      }],//人脉标签展示数据
      tableData:[
          {
            user_avatar_url:"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epia77Br2Wk8RiaR8hMAxMG9DerJfzuRCGr5Pf0s2MNDj1FU6dwnpKycchqTRck13S0RTQ6Cg3qZy4A/0",//头像
            user_avatar_url_change:"翁",//代替图片
            user_real_name:'翁浩平',//姓名
            is_add: true,//标签,true显示,false不显示
            user_company_career:'投资总监',//职位
            user_company_name:'杭州投着乐网络科技有限公司',//公司名称
            user_brand:'微天使,FA',//品牌
            user_mobile: "18910359282",//手机
            user_email: "123@168.com",//邮箱
            user_invest_industry: "电子商务",//投资领域
            user_invest_stage: "种子轮 ",//投资轮次
            tag:"海龟",//标签
            tagArray:[],//原版标签,设置标签用的
            login_time:"刚刚活跃",//最近活跃
            is_bind:0,//编辑
        }
      ],//列表数据
      user_invest_industryFilters:[{ text: '', value: '' }],//投资领域筛选条件
      user_invest_stageFilters:[],//投资轮次筛选
      tagFilters:[],//标签筛选条件
      login_timeFilters:[],//最近活跃
      userMessage:{
        user_real_name:'翁浩平',//姓名
        user_company_career:'投资总监',//职位
        user_company_name:'杭州投着乐网络科技有限公司',//公司名称
      },//传递给推送的数据
      userEmail:'',
      tags:{
        changecont:[],//项目标签新增
        index:'',//取数据保存的位置
        card_id:''//人脉id
      }


    }
  },
  components: {
    projectpush
  },
  methods: {

    handleSelect(row, event, column) {
      if(column.label!="重置"){
        this.$router.push({ name: 'contactsDetails', query: { user_id:row.user_id}})
      }
    },//跳转到人脉详情页面传参数
    handleEdit(index, row){
//      this.$router.push({ name: 'editproject', query: { project_id:row.project_id}})
    },//点击编辑按钮,跳转

    getTagId(data){
      let arr = [];
      for(let i=0; i<data.length; i++){
        arr.push(data[i].tag_id);
      }
      return arr;
    },//将标签的id循环取出来
    handleTag(index,row){
        this.dialogVisible = true;
        this.tags.index=index;
        this.tags.card_id=row.card_id;
        this.tagsValue=this.getTagId(this.tableData[index].tagArray);
    },//点击标签按钮
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该人脉, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },//点击删除按钮
    headerClick(column, event){
      if(column.label==="重置"){
        window.location.reload();
      }
    },//点击重置按钮时
    handlePush(index,row){
      this.userMessage.user_real_name=row.user_real_name;
      this.userMessage.user_company_career=row.user_company_career;
      this.userMessage.user_company_name=row.user_company_name;
      this.userEmail=row.user_email;
      this.dialogPushVisible=true;
    },//点击推送,并且传送数据给推送弹框
    addContacts(){
      this.$router.push({name: 'createContacts'})//路由传参
    },//添加人脉
    dialogVisiblechange(msg){
      this.dialogPushVisible=msg;
    },
    /*请求函数*/
    handleIconClick(){
      this.loading=true;
      this.getPra.user_id=sessionStorage.user_id;
      this.getPra.search=this.searchinput;
      this.currentPage=1;
      this.getPra.page=1;
      this.$http.post(this.URL.getConnectUser,this.getPra)
        .then(res=>{
          let data = res.data.data;
          this.tableData=this.getProjectList(data);
          this.loading=false;
          this.totalData=res.data.count;
        })
        .catch(err=>{
          this.loading=false;
          this.$tool.console(err,2)
        })
    },//搜索===首次进入页面加载的数据

    filterChange(filters){
      this.loading=true;
      this.currentPage=1;
      this.getPra.user_id=sessionStorage.user_id;
      if(filters.order){
        if(filters.order=="ascending") filters.order="asc"//升降序
        else filters.order="desc";
        this.getPra.order=filters.prop;
        this.getPra.sort=filters.order;
      }else{
        for(let key in filters){
          this.getPra[key]=filters[key];
        }
      } //筛选
      for(let key in this.getPra){
        if(this.getPra[key]=='' || this.getPra[key]=='NaN'){
          delete this.getPra[key];
        }
      }//删除空的查询项
      this.$tool.console(this.getPra);
      this.$http.post(this.URL.getConnectUser,this.getPra)
        .then(res=>{
          this.loading=false;
          let data = res.data.data;
          this.tableData=this.getProjectList(data);
          this.totalData=res.data.count;
        })
        .catch(err=>{
          this.loading=false
          this.$tool.console(err,2)
        })
    },//筛选 ascending升/descending降/
    filterChangeCurrent(page){
      delete this.getPra.page;
      this.loading=true;
      this.getPra.user_id=sessionStorage.user_id;
      this.getPra.page=page;//控制当前页码
      this.$tool.console(this.getPra);
      this.$http.post(this.URL.getConnectUser,this.getPra)
        .then(res=>{
          this.loading=false;
          let data = res.data.data;
          this.$tool.console(res)
          this.tableData=this.getProjectList(data);
        })
        .catch(err=>{
          this.loading=false
          this.$tool.console(err,2)
        })
    },//控制页码


    titleSift(){
      this.loading=true;
      this.$http.post(this.URL.userTitleSift,{user_id: sessionStorage.user_id})
        .then(res=>{
          let data = res.data.data;
          let card_industry=data.card_industry;//投资领域
          let card_stage=data.card_stage;//投资轮次
          let card_tag=data.card_tag;//标签
          this.user_invest_industryFilters=this.$tool.getTitleSift(card_industry);
          this.user_invest_stageFilters=this.$tool.getTitleSift(card_stage);
          this.tagFilters=this.$tool.getTitleSift(card_tag);
          this.loading=false;
        })
        .catch(err=>{
          this.loading=false;
          this.$tool.console(err,2)
        })
    },// 获取表头

    setUrlChange(url,name){
        let string='';
        if(url=='') string = name.charAt(0);
        else string='';
        return string;
    },//判断要不要用文字显示头像

    /*以下都是辅助函数*/
    getUser_invest_industry(arr){
      let str="";
      if(arr.length==0) {
          str="";
      } else{
        for(let i=0;i<arr.length;i++){
          str+=arr[i].industry_name+'.'
        }
      }
      return str
    },//投资领域处理
    getUser_invest_stage(arr){
      let str="";
      if(arr.length==0) {
        str="";
      } else {
        for (let i = 0; i < arr.length; i++) {
          str += arr[i].stage_name + '.'
        }
      }
      return str
    },//投资轮次处理
    getUser_invest_tag(arr){
      let str="";
      if(arr.length==0) {
        str="";
      } else {
        for (let i = 0; i < arr.length; i++) {
          str += arr[i].tag_name + '.'
        }
      }
      return str
    },//标签处理
    getProjectList(list){
      let arr = new Array;
      for(let i=0; i<list.length; i++){
        let obj=new Object;
        obj.user_id=list[i].user_id;
        obj.user_avatar_url=list[i].user_avatar_url;
        obj.user_real_name=list[i].user_real_name;//姓名
        obj.user_avatar_url_change=this.setUrlChange(list[i].user_avatar_url,list[i].user_real_name);//代替名称
        obj.is_add=list[i].is_add;//标签
        obj.is_bind=list[i].is_bind;//编辑
        obj.user_company_career=list[i].user_company_career;//职位
        obj.user_company_name=list[i].user_company_name;//公司名称
        obj.user_brand=list[i].user_brand;//品牌
        obj.user_mobile=list[i].user_mobile;//手机
        obj.user_email=list[i].user_email;//邮箱
        obj.user_invest_industry=this.getUser_invest_industry(list[i].user_invest_industry);//投资领域
        obj.user_invest_stage=this.getUser_invest_stage(list[i].user_invest_stage);//投资轮次
        obj.tag=this.getUser_invest_tag(list[i].user_invest_tag);//标签
        obj.tagArray=list[i].user_invest_tag;//标签
        obj.login_time=list[i].login_time;//活跃时间
        obj.card_id=list[i].card_id;//活跃时间
        arr.push(obj);
      }
      return arr;
    },//总设置列表的数据处理=====上面的辅助函数都是给老子用的,哈哈哈

    getWxProjectCategory(){
        this.addTags = this.$global.data.tags_user;//设置人脉标签
        this.tags.changecont = this.$global.data.tags_user;//设置人脉标签2另外的
    },//获取所有下拉框的数据
    addChangeTag(e){
      let tagName = this.$tool.checkArr(e, this.addTags);
      if (tagName != undefined) {
        this.$http.post(this.URL.createCustomTag, {user_id: sessionStorage.user_id, type: 3, tag_name: tagName})
          .then(res => {
            let newState = {};
            newState.label = tagName;
            newState.value = res.data.tag_id;
            this.tags.changecont.push(newState);
          })
          .catch(err => {
            this.$tool.error("添加失败");
            this.$tool.console(err);
          })
      }
    },//添加项目标签
    addTag(){
      this.loading=true;
      this.$tool.setTag(this.tagsValue,this.tags.changecont);
      this.$http.post(this.URL.setConnectTag, {user_id:sessionStorage.user_id,card_id: this.tags.card_id,tag: this.tagsValue})
        .then(res => {
          this.loading=false;
          this.dialogVisible = true;
          this.$tool.success("设置成功");
        })
        .catch(err => {
          this.loading=false;
          this.$tool.error("添加失败");
          this.$tool.console(err);

        })
    },//保存标签选择

  },
  created(){
    this.loading=true;
    this.titleSift();
    this.getWxProjectCategory();
    this.handleIconClick();
  }
}
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/mycontacts';
</style>
