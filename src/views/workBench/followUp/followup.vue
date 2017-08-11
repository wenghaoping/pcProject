<template>
  <div id="followup">
    <!-- 右侧底部主内容区 -->
    <div class="wrap-left" style="height:793px">
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
          <el-button type="primary" @click="addFollow">写更进</el-button>
        </div>
      </div>
      <div class="top-lists" style="height:690px;cursor: pointer">
        <template>
          <el-table :data="tableData" style="width: 100%"
                    @row-click="handleSelect"
                    @header-click="headerClick"
                    @sort-change="filterChange"
                    @filter-change="filterChange"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    stripe>
            <el-table-column prop="pro_name" label="关联项目" show-overflow-tooltip width="150">
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

            <el-table-column prop="card_name" label="意向投资人"
                             show-overflow-tooltip width="140"
                             :filters="card_nameFilters"
                             column-key="card_name"
                             filter-placement="bottom-end">
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

            <el-table-column prop="schedule_name" label="跟进状态"
                             show-overflow-tooltip width="144"
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

            <el-table-column prop="follow_desc" label="跟进描述" show-overflow-tooltip width="289">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.follow_desc.length > 20 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.follow_desc}}</div>
                  </div>
                  <div>
                    {{scope.row.follow_desc}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.follow_desc.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="follow_file_name" label="项目文件" show-overflow-tooltip width="168">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.follow_file_name.length > 17 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.follow_file_name}}</div>
                  </div>
                  <div>
                    {{scope.row.follow_file_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.follow_file_name.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="user_real_name" label="跟进人" show-overflow-tooltip width="143">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.user_real_name.length > 3 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.user_real_name}}</div>
                  </div>
                  <div>
                    {{scope.row.user_real_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.user_real_name.length === 0">
                  --
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="created_at" label="跟进时间"
                             show-overflow-tooltip
                             width="172"
                             :filters="created_atFilters"
                             :filter-multiple="stateCheck"
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
              width="130" class="set-th">
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

          <div class="timeCheck">
            <el-date-picker
              v-model="timeSelect"
              type="date"
              placeholder="选择日期"
              :editable="false"
              @change="timeChange"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
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
  <addfollow :dialog-follow="dialogFollow" :followid="followid" @changeClose="closeFollow"></addfollow>
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
      dialogFollow:false,//控制写跟进弹框
      followid:'',//跟进id

      loading: false,//加载动画
      searchinput:'',//搜索输入框
      totalData:1,//总页数
      currentPage:1,//当前页数
      getPra:{},//筛选的请求参数
      tableData:[
/*        {
         follow_id: 15,
         pro_name: "这里是关联的项目名称这里是关联的项目名称",
         user_real_name: "阮千军阮千军阮千军阮千军阮千军阮千军阮千军阮千军阮千军",
         schedule_name: "签署投资协议",
         follow_file_name: "这个是项目文件的啊项目文件的啊项目文件的啊",
         card_name: "欧阳复欧阳复欧阳复",
         follow_desc: "这里是，跟进的具体描述，不用全部显示，默认默认默认默认默认默认默认默认",
         created_at: "2017-07-13 18:47:20"
         }*/
      ],//列表数据
      schedule_nameFilters:[],//跟进状态筛选
      card_nameFilters:[],//意向投资人
      created_atFilters:[],//更近时间选择
      stateCheck:false,//跟进状态单选
      timeSelect:'',//时间选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7+3600 * 1000 * 24;
        }
      },//计算时间
    }
  },
  methods: {
    handleIconClick(){
      this.loading=true;
      this.getPra.user_id=localStorage.user_id;
      this.getPra.pro_name=this.searchinput;
      this.currentPage=1;
      this.getPra.page=1;
      this.$http.post(this.URL.get_follow_records,this.getPra)
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
    addFollow(){
      this.dialogFollow=true;

    },//点击写跟近按钮
    handleSelect(row, event, column) {
      if(column.label!="重置"){
        this.$router.push({ name: 'projectDetails', query: { project_id:row.project_id,show:'flow',activeTo: 2}})
      }
    },//跳转到更近详情页
    handleEdit(index, row){
        this.dialogFollow=true;
        this.followid=row.follow_id;
    },//点击编辑按钮,跳转
    headerClick(column, event){
      if(column.label==="重置"){
        window.location.reload();
      }
    },//点击重置按钮时
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该跟进, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading=true;
        this.$http.post(this.URL.delete_follow_record, {user_id:localStorage.user_id,follow_id: row.follow_id})
          .then(res => {
            this.loading=false;
            this.$tool.success("删除成功");
            this.handleIconClick();
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
      this.getPra.page=1;//控制当前页码
      this.getPra.user_id=localStorage.user_id;
      if(filters.order){
        if(filters.order=="ascending") filters.order="asc"//升降序
        else filters.order="desc";
//        this.getPra.order=filters.prop;
        this.getPra[filters.prop]=filters.order;
      }else{
        for(let key in filters){
          this.getPra[key]=filters[key];
          if(key === 'schedule_id') this.getPra[key]=filters[key][0];
        }
      } //筛选
      for(let key in this.getPra){
        if(this.getPra[key]=='' || this.getPra[key]=='NaN'){
          delete this.getPra[key];
        }
        if(key == "card_name"){
          this.getPra.card_name=this.filterInvestors(this.getPra.card_name);
        }
      }//删除空的查询项
      this.$tool.console(this.getPra);

      this.$http.post(this.URL.get_follow_records,this.getPra)
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
      delete this.getPra.page;
      this.loading=true;
      this.getPra.user_id=localStorage.user_id;
      this.getPra.page=page;//控制当前页码
      this.$tool.console(this.getPra);
      this.$http.post(this.URL.get_follow_records,this.getPra)
        .then(res=>{
          let data = res.data.data;
          this.tableData=data.follow_record;
          this.loading=false;
        })
        .catch(err=>{
          this.loading=false
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
    timeChange(time){
      this.loading=true;
      this.currentPage=1;
      this.getPra.created_at_time=time;
      this.$http.post(this.URL.get_follow_records,this.getPra)
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
    },//筛选时间
    closeFollow(msg){
      this.dialogFollow=msg;
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
          this.card_nameFilters=this.getInvestors(data.investors);
        })
        .catch(err=>{
          this.$tool.console(err,2)
        })
    },// 获取表头
  },
  created(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.loading=true;
    this.titleSift();
    this.handleIconClick();
  },
  watch :{
    dialogFollow : function (e) {
      if (!e) {
        this.handleIconClick();
      }
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/followup';
</style>
