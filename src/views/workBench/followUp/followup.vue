<template>
  <div id="followup">
    <!-- 右侧底部主内容区 -->
    <div class="wrap-left" style="">
      <div class="top-search-box clearfix">
        <div class="input-box fl">
          <el-input
            placeholder="搜索关联项目"
            icon="search"
            v-model="searchinput"
            :on-icon-click="handleIconClick"
            @keyup.native.enter="handleIconClick">
          </el-input>
        </div>
        <div class="btns-box fr">
          <el-button type="primary" @click="addFollow">写跟进</el-button>
        </div>
      </div>
      <div class="top-lists" style="cursor: pointer">
        <template>
          <el-table :data="tableData" style="width: 100%"
                    @row-click="handleSelect"
                    @header-click="headerClick"
                    @sort-change="filterChange"
                    @filter-change="filterChange"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    stripe >
            <el-table-column prop="pro_intro" label="项目名称" show-overflow-tooltip width="167">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_intro.length > 8 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_intro}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_intro}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_intro.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_name" label="项目介绍" show-overflow-tooltip width="175">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_name.length > 8 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_name}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_name.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="card_name" label="投资人"
                             show-overflow-tooltip width="77">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.card_name.length > 3 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.card_name}}</div>
                  </div>
                  <div>
                    {{scope.row.card_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.card_name.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="user_orginization" label="机构"
                             show-overflow-tooltip width="157">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.user_orginization.length > 10 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_orginization}}</div>
                  </div>
                  <div>
                    {{scope.row.user_orginization}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.user_orginization.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="schedule_name" label="跟进进度"
                             show-overflow-tooltip width="120"
                             :filters="schedule_nameFilters"
                             :filter-multiple="stateCheck"
                             filter-placement="bottom-end"
                             sortable="custom" column-key="schedule_id">
              <template scope="scope">
                <div v-if="scope.row.schedule_name==''">
                  --
                </div>
                <div v-else>
                  <el-tag type="primary" v-if="scope.row.schedule_name=='Hold'">{{scope.row.schedule_name}}</el-tag>
                  <el-tag type="danger" v-else-if="scope.row.schedule_name=='Reject'">{{scope.row.schedule_name}}</el-tag>
                  <el-tag type="success" v-else>{{scope.row.schedule_name}}</el-tag>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="meet_type" label="约谈方式" show-overflow-tooltip width="80"
                             :filters="meet_typeFilters"
                             :filter-multiple="stateCheck"
                             filter-placement="bottom-end">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.meet_type.length > 15 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.meet_type}}</div>
                  </div>
                  <div>
                    {{scope.row.meet_type}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.meet_type.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="meet_time" label="约谈时间"
                             show-overflow-tooltip
                             width="136"
                             column-key="meet_time"
                             sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.meet_time==''">
                  --
                </div>
                <div else>
                  {{scope.row.meet_time}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="meet_status" label="约谈状态" width="80"
                             :filters="meet_statusFilters"
                             :filter-multiple="stateCheck"
                             filter-placement="bottom-end"
                             show-overflow-tooltip>
              <template scope="scope">
                <div v-if="scope.row.meet_status.length === 0">
                  -
                </div>
                <div v-if="scope.row.meet_status.length > 0">
                  {{scope.row.meet_status}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="meet_back" label="约谈反馈" width="82"
                             :filters="meet_backFilters"
                             :filter-multiple="stateCheck"
                             filter-placement="bottom-end"
                             show-overflow-tooltip>
              <template scope="scope">
                <div v-if="scope.row.meet_back.length === 0">
                  -
                </div>
                <div v-if="scope.row.meet_back.length > 0">
                  {{scope.row.meet_back}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" label="跟进时间"
                             show-overflow-tooltip
                             width="137"
                             column-key="create_at"
                             sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.created_at==''">
                  --
                </div>
                <div else>
                  {{scope.row.created_at}}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="reset"
              label="重置"
              width="125" class="flow-btn btn-cur">
              <template scope="scope">
                <el-button
                  type="text"
                  size="small" class="flow-btn btn-cur"
                  @click="handleEdit(scope.$index, scope.row)">
                  编辑
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

  <!--写跟进弹框-->
  <addfollow :follow-display="followDisplay" :followid="followid" @closeFollow="closeFollow"></addfollow>
    <!--<div style="width: 200px;height: 200px;background: red; position: fixed;bottom: 0;right:0;"></div>-->
  </div>
</template>

<script type="text/ecmascript-6">
import addfollow from './addFollow.vue'
export default {
  components: {
    addfollow
  },
  data () {
    return {
      followDisplay:false,//控制写跟进弹框
      followid:'',//跟进id

      loading: false,//加载动画
      searchinput:'',//搜索输入框
      totalData:1,//总页数
      currentPage:1,//当前页数
      getFollow:{},//筛选的请求参数
      tableData:[
        {
          follow_id: 15,
          pro_name: "是项目的名称如这里是关联的项目名称这里是关联的项目名称这里",
          pro_intro: "这里是关联的项目名称这里是关联的项目名称这里",
          card_name: "投资人投资人投资人",
          user_orginization: "杭州投着乐了网络科技科技科技科技",  //机构
          schedule_name: "签署投资协议",//进度
          meet_type: "电话",//约谈方式
          meet_time: "2017-05-06 12:21",//约谈时间
          meet_status: "完成",//约谈状态
          meet_back: "不跟进",//约谈反馈
          created_at: "2017-07-13 18:47:20",//跟进时间


//          follow_file_name: "这个是项目文件的啊项目文件的啊项目文件的啊",
//          follow_desc: "这里是，跟进的具体描述，不用全部显示，默认默认默认默认默认默认默认默认",

          }
      ],//列表数据
      schedule_nameFilters:[],//跟进状态筛选
      meet_typeFilters:[],//约谈方式筛选
      meet_statusFilters:[],//约谈状态筛选
      meet_backFilters:[],//约谈反馈筛选
      stateCheck:false,//跟进状 态单选
    }
  },
  methods: {
    handleIconClick(){
      this.loading=true;
      this.getFollow.user_id=localStorage.user_id;
      this.getFollow.pro_name=this.searchinput;
      this.$store.state.pageANDSelect.followSearchinput = this.searchinput;
      this.currentPage=1;
      this.getFollow.page=1;
      this.$http.post(this.URL.get_follow_records,this.getFollow)
        .then(res=>{
          let data = res.data.data;
          this.tableData=data.follow_record;
          this.totalData=data.count;
          this.loading=false;
        })
        .catch(err=>{
          this.loading=false;
          this.$tool.console(err,2)
        })
    },//搜索===首次进入页面加载的数据

    setRouterData(){
      this.$store.state.pageANDSelect.getFollow = this.getFollow;
      this.$store.state.pageANDSelect.folcurrentPage = this.currentPage;
    },//跳转之后设置参数
    getRouterData(){
      this.getFollow=this.$store.state.pageANDSelect.getFollow;
      this.currentPage=this.$store.state.pageANDSelect.folcurrentPage || 1;
      this.getFollow.page=this.$store.state.pageANDSelect.folcurrentPage || 1;
      this.searchinput = this.$store.state.pageANDSelect.followSearchinput;
    },//从vuex中取数据

    addFollow(){
      this.zgClick("添加跟进");
      this.followDisplay=true;
    },//点击写跟近按钮
    handleSelect(row, event, column) {
      if(column.label!="重置"){
        this.zgClick("查看项目详情");
        this.$router.push({ name: 'projectDetails', query: { project_id:row.project_id,show:'flow',activeTo: 2}})
        this.setRouterData();
      }
    },//跳转到更近详情页
    handleEdit(index, row){
      this.zgClick("编辑跟进");
        this.followDisplay=true;
        this.followid=row.follow_id;
        this.setRouterData();
    },//点击编辑按钮,跳转
    headerClick(column, event){
      if(column.label==="重置"){
        window.location.reload();
      }
    },//点击重置按钮时
    handleDelete(index,row){
      this.setRouterData();
      this.$confirm('您确认要删除当前项目跟进记录及关联文件吗?, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.zgClick("删除跟进");
        this.loading=true;
        this.$http.post(this.URL.delete_follow_record, {user_id:localStorage.user_id,follow_id: row.follow_id})
          .then(res => {
            this.loading=false;
            this.$tool.success("删除成功");
            this.getRouterData();
            this.filterChangeCurrent(this.currentPage || 1);
          })
          .catch(err => {
            this.loading=false;
            this.$tool.error("删除失败");
            this.$tool.console(err);
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },//点击删除按钮
    filterChange(filters){
/*      if(filters.card_name.length==0){
        delete filters.card_name;
      }*/
      this.loading=true;
      this.currentPage=1;
      this.getFollow.page=1;//控制当前页码
      this.getFollow.user_id=localStorage.user_id;
      if(filters.order){
        if(filters.order=="ascending") filters.order="asc"//升降序
        else filters.order="desc";
//        this.getFollow.order=filters.prop;
        this.getFollow[filters.prop]=filters.order;
      }else{
        for(let key in filters){
          this.getFollow[key]=filters[key];
          if(key === 'schedule_id') this.getFollow[key]=filters[key][0];
        }
      } //筛选
      for(let key in this.getFollow){
        if(this.getFollow[key]=='' || this.getFollow[key]=='NaN'){
          delete this.getFollow[key];
        }
/*        if(key == "card_name"){
          this.getFollow.card_name=this.filterInvestors(this.getFollow.card_name);
        }*/
      }//删除空的查询项
      console.log(this.getFollow);

      this.$http.post(this.URL.get_follow_records,this.getFollow)
        .then(res=>{
          let data = res.data.data;
          this.tableData=data.follow_record;
          this.totalData=data.count;
          this.loading=false;
        })
        .catch(err=>{
          this.loading=false
          this.$tool.console(err,2)
        })
    },//筛选 ascending升/descending降/
    filterChangeCurrent(page){
      this.$tool.getTop();
      delete this.getFollow.page;
      this.loading=true;
      this.getFollow.user_id=localStorage.user_id;
      this.getFollow.page=page;//控制当前页码
//      this.$tool.console(this.getFollow);
      this.$http.post(this.URL.get_follow_records,this.getFollow)
        .then(res=>{
          let data = res.data.data;
          this.tableData=data.follow_record;
          this.totalData=data.count;
          this.loading=false;
        })
        .catch(err=>{
          this.loading=false;
          this.$tool.console(err,2)
        })
    },//控制页码
    filterInvestors(data){
      if(data){
        let arr = new Array;
        let filters = this.card_nameFilters;
        for(let i=0; i<data.length; i++){
          let filter = new Array;
          for(let j=0; j<filters.length; j++){
            if(data[i]==filters[j].value){
              filter[0]=filters[j].value;
              filter[1]=filters[j].type;
            }
          }
          arr.push(filter);
        }
        return arr;
      }
    },//意向投资人筛选控制
    closeFollow(msg){
      this.followDisplay=msg;
      this.followid="";
    },//关闭添加跟进

    getInvestors(data){
      let arr = new Array;
      for(let i=0; i<data.length; i++){
        let obj = new Object;
        obj.text=data[i].card_name;
        obj.value=data[i].card_id;
        obj.type=data[i].type;
        arr.push(obj);
      }
      return arr
    },//设置意向投资人表头
    titleSift(){
      this.$http.post(this.URL.getToInvestor,{user_id: localStorage.user_id})
        .then(res=>{
          let data = res.data.data;
          this.schedule_nameFilters=this.$tool.getTitleSift(data.schedule_name);
          this.meet_typeFilters=this.getInvestors(data.investors);
          this.meet_statusFilters=this.getInvestors(data.investors);
          this.meet_backFilters=this.getInvestors(data.investors);
        })
        .catch(err=>{
          this.$tool.console(err,2)
        })
    },// 获取表头
  },
  created(){
    this.getRouterData();
    this.$tool.getTop();
    this.titleSift();
//    this.filterChangeCurrent(this.currentPage || 1);
  },
  watch :{
    followDisplay : function (e) {
      if (!e) {
//        this.handleIconClick();
      }
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/followup';
</style>
