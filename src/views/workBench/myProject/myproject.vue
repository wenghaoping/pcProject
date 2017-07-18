<template>
  <div id="myproject" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="wrap-left fl" style="height: 888px;">
      <div class="top-big-progress">
        <div class="pp-item pp-node pp-start" :class="{'pp-cur':node0}" @click="setNode('0')">
          <p class="pp-num pp-txt">{{nodeCount.whole}}</p>
          <span class="pp-sec-title">全部项目</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
        </div>
        <div class="pp-item pp-node" :class="{'pp-cur':node1}" @click="setNode('1')">
          <p class="pp-num pp-txt">{{nodeCount.clue}}</p>
          <span class="pp-sec-title">项目线索</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
          <el-tooltip placement="top" :class="{'pp-cur':node2}" >
            <div slot="content">
              <div style="width:50px;text-align: center;">约谈 : {{nodeCount.interview}} </div>
            </div>
            <span class="circle circle-0" @click="setNode('2')">&nbsp;</span>
          </el-tooltip>
          <el-tooltip placement="top" :class="{'pp-cur':node3}" >
            <div slot="content">
              <div style="width:50px;text-align: center;">考察 : {{nodeCount.investigate}} </div>
            </div>
            <span class="circle circle-5" @click="setNode('3')">&nbsp;</span>
          </el-tooltip>
        </div>
        <div class="pp-item pp-node" :class="{'pp-cur':node4}" @click="setNode('4')">
          <p class="pp-num pp-txt">{{nodeCount.sign}}</p>
          <span class="pp-sec-title">签署FA协议</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
          <el-tooltip placement="top" :class="{'pp-cur':node5}" >
            <div slot="content">
              <div style="width:100px;text-align: center;">引荐投资方 : {{nodeCount.recommended}} </div>
            </div>
            <span class="circle circle-1" @click="setNode('5')">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top" :class="{'pp-cur':node6}" >
            <div slot="content">
              <div style="width:80px;text-align: center;">投资协议 : {{nodeCount.agreement}} </div>
            </div>
            <span class="circle circle-2" @click="setNode('6')">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top" :class="{'pp-cur':node7}" >
            <div slot="content">
              <div style="width:50px;text-align: center;">交割 : {{nodeCount.delivery}} </div>
            </div>
            <span class="circle circle-3" @click="setNode('7')">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top" :class="{'pp-cur':node8}">
            <div slot="content">
              <div style="width:80px;text-align: center;">待收佣金 : {{nodeCount.collect}} </div>
            </div>
            <span class="circle circle-4"  @click="setNode('8')">&nbsp;</span>
          </el-tooltip>

        </div>
        <div class="pp-item pp-node" :class="{'pp-cur':node9}" @click="setNode('9')">
          <p class="pp-num pp-txt">{{nodeCount.revenue}}</p>
          <span class="pp-sec-title"  >佣金收讫</span>
        </div>
      </div>
      <div class="clearfx"></div>
      <div class="top-search-box">
        <div class="input-box">
          <el-input
            placeholder="搜索项目、公司名称"
            icon="search"
            v-model="searchinput"
            :on-icon-click="handleIconClick"
            @keyup.native.enter="handleIconClick">
          </el-input>
        </div>
        <div class="btns-box">
          <el-button type="primary" @click="dialogUploadVisible = true">批量上传项目</el-button>
          <el-button type="primary" @click="createProject">创建项目</el-button>

          <alertUpload :dialog-upload-visible="dialogUploadVisible" v-on:changeupload="dialogUploadVisiblechange" @reload="handleIconClick">

          </alertUpload>
        </div>
      </div>
      <div class="top-lists" style="height:690px;background: #f3f4f8;cursor: pointer">
          <template>
            <el-table :data="tableData" style="width: 100%"
                      @row-click="handleSelect"
                      @header-click="headerClick"
                      @sort-change="filterChange"
                      @filter-change="filterChange" stripe>
            <el-table-column prop="pro_name" label="项目名称" width="144" show-overflow-tooltip>
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_name.length > 7 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_name}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_name.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_intro" label="一句话介绍" width="174" show-overflow-tooltip>
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_intro.length > 10 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_intro}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_intro}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column prop="pro_company_name" label="公司名称" width="96" show-overflow-tooltip>
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_company_name.length > 5 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_company_name}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_company_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_company_name.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_source" label="项目来源" width="96" :filters="pro_sourceFilters"
                             filter-placement="bottom-end"
                             column-key="pro_source"
                             show-overflow-tooltip	>
              <template scope="scope">
                <div v-if="scope.row.pro_source.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_source.length > 0">
                  {{scope.row.pro_source}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_follow_up_user" label="跟进人" width="96" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="pro_schedule" label="跟进状态" width="96" :filters="pro_scheduleFilters"
                             filter-placement="bottom-end"
                             :filter-multiple="stateCheck"
                             column-key="pro_schedule"
                             sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.pro_schedule==''">
                  -
                </div>
                <div else>
                  {{scope.row.pro_schedule}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_industry" label="领域" width="144"
                             :filters="pro_industryFilters"
                             filter-placement="bottom-end"
                             show-overflow-tooltip
                             column-key="pro_industry">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_industry.length > 8 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_industry}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_industry}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_industry==''">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="is_exclusive" label="是否独家" width="98" :filters="soleFilters"
                             filter-placement="bottom-end" sortable="custom" column-key="is_exclusive">
              <template scope="scope">

                <el-tag :type="scope.row.is_exclusive === '独家' ? 'primary' : scope.row.is_exclusive === '非独家'  ? 'success':'gray' " close-transition>
                     <div v-if="scope.row.is_exclusive.length === 0">
                       -
                     </div>
                     <div else>
                       {{scope.row.is_exclusive}}
                     </div>
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="pro_stage" label="轮次" width="80" :filters="pro_stageFilters"
                             filter-placement="bottom-end"
                             sortable="custom" column-key="pro_stage">
              <template scope="scope">
                <div v-if="scope.row.pro_stage.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_stage.length > 0">
                  {{scope.row.pro_stage}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pro_area" label="地区" width="80"
                             column-key="pro_area"
                             :filters="pro_areaFilters"
                             filter-placement="bottom-end"
                             sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.pro_area.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_area.length > 0">
                  {{scope.row.pro_area}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pro_scale" label="期望融资" width="102"
                             :filters="pro_scaleFilters"
                             filter-placement="bottom-end"
                             column-key="pro_scale"
                             :filter-multiple="stateCheck">
              <template scope="scope">
                <div v-if="scope.row.pro_scale.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_scale.length > 0">
                  {{scope.row.pro_scale}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="reset"
              label="重置"
              width="130" class="set-th">
              <template scope="scope">
                <el-button
                  @click="handleEdit(scope.$index, scope.row)"
                  type="text"
                  size="small" class="edits-btn btn-cur">
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="small" class="flow-btn">
                  跟进
                </el-button>
                <el-button
                  type="text"
                  size="small" class="send-btn">
                  推送
                </el-button>
                <img src="../../../assets/images/more.png" alt="" class="more">
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
<!--    <div class="page-grid wrap-right contain-right-2 fl">
      <div class="main-box">
        <div class="title-box">
          <span class="lit-line"></span>
          <span class="title">动态记录</span>
          <span class="lit-line"></span>
        </div>
      </div>
    </div>-->

  </div>
</template>

<script type="text/ecmascript-6">
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  import alertUpload from './alertUpload.vue'
  export default {
    components: {ElButton,alertUpload},
    data() {
      return {
        tableData: [
/*            {
          pro_name: '公司名称公司名称公司名称公司名称',
          pro_intro:'我是项目介绍我是项目介绍我是项目介绍我是项目介绍',
          pro_company_name: '',
          pro_source: '我是项目来源1',
          pro_follow_up_user: '迪丽热巴',
          pro_schedule:'跟进状态1',
          pro_industry:'大数据、社交通讯，电商平台，教育培训',
          is_exclusive:'独家',
          pro_stage:'IPO上市后',
          pro_area:'北京',
          pro_scale:'3000万',
          project_id:''
        }*/
        ],
        pro_sourceFilters:[{ text: '约谈', value: '约谈' },{ text: 'FA签约', value: 'FA签约' }],
        pro_scheduleFilters:[{ text: '项目线索', value: '项目线索' }],
        pro_industryFilters:[{ text: '大数据服务', value: '大数据服务' }],
        soleFilters:[{ text: '独家', value:1},{ text: '非独', value:2},{ text: '其他', value:0}],
        pro_stageFilters:[{ text: 'IPO上市后', value: 'IPO上市后' }],
        pro_areaFilters:[],
        pro_scaleFilters:[{ text: '3000万', value: '3000万' }],
        stateCheck:false,//状态单选
        searchinput:'',//搜索输入框
        dialogUploadVisible: false,//第一个弹窗的控制
        node0:true,
        node1:false,
        node2:false,
        node3:false,
        node4:false,
        node5:false,
        node6:false,
        node7:false,
        node8:false,
        node9:false,
        currentPage:1,//当前第几页
        totalData:0,//总数据条数
        nodeCount:{
          whole:0,//全部项目
          clue:0,//项目线索
          interview:0,//约谈
          investigate:0,//考察
          sign:0,//签署FA协议
          recommended:0,//引荐投资方
          agreement:0,//投资协议
          delivery:0,//交割
          collect:0,//待收佣金
          revenue:0//佣金收益
        },
        loading:false,
        filter:true,
        getPra:{},//筛选的请求参数
        getProjectListURL:''//首页获取列表的URL
      }
    },
    methods:{
      handleSelect(row, event, column) {
        if(column.label!="重置"){
          this.$router.push({ name: 'projectDetails', query: { project_id:row.project_id}})
        }
      },//跳转到项目详情页面传参数
      handleEdit(index, row){
        this.$router.push({ name: 'editproject', query: { project_id:row.project_id}})
      },//跳转到编辑页
      createProject(){
        this.$router.push({ name: 'creatproject'})
      },//跳转到创建项目页面
      dialogUploadVisiblechange(msg){
        this.dialogUploadVisible=msg;
      },//控制弹窗

      /*请求函数*/
      handleIconClick(){
        this.loading=true;
        this.getPra.user_id=localStorage.user_id;
        this.getPra.search=this.searchinput;
        this.currentPage=1;
        this.getPra.page=1;
        this.$http.post(this.getProjectListURL,this.getPra)
          .then(res=>{
            let data = res.data.data
            this.tableData=this.getProjectList(data)
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
        this.getPra.user_id=localStorage.user_id;
        if(filters.pro_schedule) {
            if(parseInt(filters.pro_schedule)){
              this.setNode(parseInt(filters.pro_schedule))
            } else if(filters.pro_schedule.length=== 0) {
              this.setNode(0)
            }
        }//设置顶部样式
        if(filters.order){
          if(filters.order=="ascending") filters.order="asc"//升降序
          else filters.order="desc";
          this.getPra.order=filters.prop;
          this.getPra.sort=filters.order;
        }else{
//          let para="";
          for(let key in filters){
            /*             for(let i=0;i<filters[key].length; i++){
             if(key=="pro_source") para+=filters[key][i]+',';
              else*/
                /*para+=parseInt(filters[key][i])+',';
            }*/
//            this.getPra[key]=parseInt(para.substr(0, para.length - 1));
            this.getPra[key]=filters[key];

          }
        } //筛选
        for(let key in this.getPra){
          if(this.getPra[key]=='' || this.getPra[key]=='NaN'){
            delete this.getPra[key];
          }
        }//删除空的查询项
        this.$http.post(this.getProjectListURL,this.getPra)
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
        this.getPra.user_id=localStorage.user_id;
        this.getPra.page=page;//控制当前页码
        this.$http.post(this.getProjectListURL,this.getPra)
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
      setNode(v){
        this.currentPage=1;
        this.loading=true  ;
        this.node0 = false ;
        this.node1 = false ;
        this.node2 = false ;
        this.node3 = false ;
        this.node4 = false ;
        this.node5 = false ;
        this.node6 = false ;
        this.node7 = false ;
        this.node8 = false ;
        this.node9 = false ;
        this['node' + v] = true ;
        this.$http.post(this.getProjectListURL,{user_id: localStorage.user_id,pro_schedule:parseInt(v)})
          .then(res=>{
            this.loading=false
            let data = res.data.data
            this.tableData=this.getProjectList(data)
          })
          .catch(err=>{
            this.loading=false
            this.$tool.console(err,2)
          })

      },//控制顶部样式并且筛选
      headerClick(column, event){
        if(column.label==="重置"){
          window.location.reload();
        }
      },//点击重置按钮时

      getNodeCount(){
        const getNodeCountURL=this.URL.getNodeCount
        this.$http.post(getNodeCountURL,{user_id: localStorage.user_id})
          .then(res=>{
              let data = res.data.data

              this.nodeCount.whole=data.total.schedule_count//全部项目
              this.totalData=data.total.schedule_count//页码
              let nodeList=data.node_list;
              for(let key in nodeList){//数据导入顶部标签
                switch (nodeList[key].schedule_id){
                  case 1:
                    this.nodeCount.clue=nodeList[key].schedule_count
                    break;
                  case 2:
                    this.nodeCount.interview=nodeList[key].schedule_count
                    break;
                  case 3:
                    this.nodeCount.investigate=nodeList[key].schedule_count
                    break;
                  case 4:
                    this.nodeCount.sign=nodeList[key].schedule_count
                    break;
                  case 5:
                    this.nodeCount.recommended=nodeList[key].schedule_count
                    break;
                  case 6:
                    this.nodeCount.agreement=nodeList[key].schedule_count
                    break;
                  case 7:
                    this.nodeCount.delivery=nodeList[key].schedule_count
                    break;
                  case 8:
                    this.nodeCount.collect=nodeList[key].schedule_count
                    break;
                  case 9:
                    this.nodeCount.revenue=nodeList[key].schedule_count
                    break;
                  default:
                    alert("错误")
                    break;
                };
              }
//              this.loading=false;

          })
          .catch(err=>{

//            this.loading=false;
          })
      },// 获取项目节点数量
      titleSift(){
        this.loading=true;
        const titleSiftURL=this.URL.titleSift
        this.$http.post(titleSiftURL,{user_id: localStorage.user_id})
          .then(res=>{
            let data = res.data.data
//            this.$tool.console(data)
            let pro_area=data.pro_area;//地区
            let pro_industry=data.pro_industry;//领域
            let pro_scale=data.pro_scale;//期望融资
            let pro_schedule=data.pro_schedule;//跟进状态
            let pro_source=data.pro_source;//项目来源
            let pro_stage=data.pro_stage;//轮次
            this.pro_areaFilters=this.$tool.getTitleSift(pro_area);
            this.pro_industryFilters=this.$tool.getTitleSift(pro_industry);
            this.pro_scaleFilters=this.$tool.getTitleSift(pro_scale);
            this.pro_scheduleFilters=this.$tool.getTitleSift(pro_schedule);
            this.pro_sourceFilters=this.$tool.getTitleSift(pro_source);
            this.pro_stageFilters=this.$tool.getTitleSift(pro_stage);
            this.loading=false;
          })
          .catch(err=>{
            this.loading=false;
            this.$tool.console(err,2)
          })
      },// 获取表头

      /*以下都是辅助函数*/
      getProjectPro_industry(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          str+=arr[i].industry_name+'.'
        }
        return str
      },//列表领域处理
      getProjectPro_stage(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          str+=arr[i].stage_name+'.'
        }
        return str
      },//列表轮次处理
      getProjectPro_area(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          str+=arr[i].area_title+'.'
        }
        return str
      },//列表地区处理
      getProjectPro_scale(arr){
        let str=""
        if(arr.length===0) {
          str=""
        } else {
            for(let i=0;i<arr.length;i++){
              str+=arr[i].scale_money+'.'
            }
        }
        return str
      },//列表期望金额处理
      getProjectPro_source(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          str+=arr[i].tag_name+'.'
        }
        return str
      },//列表项目来源处理

      getProjectList(list){
        let arr = new Array;
        for(let i=0; i<list.length; i++){
          let obj=new Object;
          obj.pro_name=list[i].pro_name;
          obj.pro_intro=list[i].pro_intro;
          obj.pro_company_name=list[i].pro_company_name;
          obj.pro_source=this.getProjectPro_source(list[i].pro_source);
          obj.pro_follow_up_user=list[i].pro_follow_up_user;
          obj.pro_schedule=list[i].pro_schedule;
          obj.pro_industry=this.getProjectPro_industry(list[i].pro_industry)
          obj.is_exclusive=list[i].is_exclusive;
          obj.pro_stage=this.getProjectPro_stage(list[i].pro_stage)
          obj.pro_area=this.getProjectPro_area(list[i].pro_area)
          obj.pro_scale=this.getProjectPro_scale(list[i].pro_scale)
          obj.project_id=list[i].project_id;
          arr.push(obj)

        }
        return arr
      }//总设置列表的数据处理=====上面的辅助函数都是给老子用的,哈哈哈
    },
    computed: {

    },
    created () {
      // 组件创建完后获取数据，
      this.getProjectListURL=this.URL.getProjectList
      this.loading=true;
      this.getNodeCount();
      this.titleSift();
      this.handleIconClick();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "handleIconClick"
    }

  }
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/myproject';
  .el-table-filter__content{
    max-height: 250px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-table-filter__list{
    min-width: 130px!important;;
  }
  .el-table-filter__bottom button:first-child{
    color:#20a0ff;
  }


  .el-dialog{
    .el-dialog__header{
      padding-left: 64px;
      padding-top: 32px;
    }
  }



</style>
