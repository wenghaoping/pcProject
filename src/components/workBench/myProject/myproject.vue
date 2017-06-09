<template>
  <div id="myproject" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div class="wrap-left fl">
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
              <div style="width:50px;">约谈 : {{nodeCount.interview}} </div>
            </div>
            <span class="circle circle-0" @click="setNode('2')">&nbsp;</span>
          </el-tooltip>
          <el-tooltip placement="top" :class="{'pp-cur':node3}" >
            <div slot="content">
              <div style="width:50px;">考察 : {{nodeCount.investigate}} </div>
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
              <div style="width:100px;">引荐投资方 : {{nodeCount.recommended}} </div>
            </div>
            <span class="circle circle-1" @click="setNode('5')">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top" :class="{'pp-cur':node6}" >
            <div slot="content">
              <div style="width:80px;">投资协议 : {{nodeCount.agreement}} </div>
            </div>
            <span class="circle circle-2" @click="setNode('6')">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top" :class="{'pp-cur':node7}" >
            <div slot="content">
              <div style="width:50px;">交割 : {{nodeCount.delivery}} </div>
            </div>
            <span class="circle circle-3" @click="setNode('7')">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top" :class="{'pp-cur':node8}">
            <div slot="content">
              <div style="width:80px;">待收佣金 : {{nodeCount.collect}} </div>
            </div>
            <span class="circle circle-4"  @click="setNode('8')">&nbsp;</span>
          </el-tooltip>

        </div>
        <div class="pp-item pp-node" v-bind:class="{'pp-cur':node9}">
          <p class="pp-num pp-txt">{{nodeCount.revenue}}</p>
          <span class="pp-sec-title"  @click="setNode('9')">佣金收讫</span>
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
            @keyup.enter="handleIconClick">
          </el-input>
        </div>
        <div class="btns-box">
          <el-button type="primary" @click="dialogUploadVisible = true">批量上传项目</el-button>
          <el-button type="primary" @click="createProject">创建项目</el-button>

          <alertUpload :dialog-upload-visible="dialogUploadVisible" v-on:changeupload="dialogUploadVisiblechange">

          </alertUpload>
        </div>
      </div>
      <div class="top-lists" style="height:690px;background: #f3f4f8;">
          <template>
            <el-table :data="tableData" style="width: 100%"
                      @row-click="handleSelect"
                      @header-click="headerClick"
                      @sort-change="sortChange"
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
                  —
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_source" label="项目来源" width="96" :filters="pro_sourceFilters"
                             filter-placement="bottom-end"
                             column-key="source"
                             show-overflow-tooltip	>
              <template scope="scope">
                <div v-if="scope.row.pro_source.length === 0">
                  —
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
                  —
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
                             column-key="industry">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_industry.length > 8 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_industry}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_industry}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_industry.length === 0">
                  —
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="is_exclusive" label="是否独家" width="98" :filters="soleFilters"
                             filter-placement="bottom-end" sortable="custom" column-key="is_exclusive">
              <template scope="scope">
                <el-tag :type="scope.row.is_exclusive === 0 ? 'primary' : scope.row.is_exclusive === 1 ? 'success':'gray' " close-transition>
<!--                  <template scope="scope">
                    <div v-if="scope.row.is_exclusive=== 1">
                      独家
                    </div>
                    <div v-if="scope.row.is_exclusive===0">
                      其他
                    </div>
                    <div v-if="scope.row.is_exclusive===2">
                      非独
                    </div>
                  </template>-->
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="pro_stage" label="轮次" width="80" :filters="pro_stageFilters"
                             filter-placement="bottom-end"
                             sortable="custom" column-key="stage">
              <template scope="scope">
                <div v-if="scope.row.pro_stage.length === 0">
                  —
                </div>
                <div v-if="scope.row.pro_stage.length > 0">
                  {{scope.row.pro_stage}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pro_area" label="地区" width="80"
                             column-key="area"
                             :filters="pro_areaFilters"
                             filter-placement="bottom-end"
                             sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.pro_area.length === 0">
                  —
                </div>
                <div v-if="scope.row.pro_area.length > 0">
                  {{scope.row.pro_area}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pro_scale" label="期望融资" width="102"
                             :filters="pro_scaleFilters"
                             filter-placement="bottom-end"
                             column-key="scale"
                             :filter-multiple="stateCheck">
              <template scope="scope">
                <div v-if="scope.row.pro_scale.length === 0">
                  —
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
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="totalData">
            </el-pagination>
          </div>
        </template>
      </div>
    </div>
    <div class="page-grid wrap-right contain-right-2 fl">
      <div class="main-box">
        <div class="title-box">
          <span class="lit-line"></span>
          <span class="title">动态记录</span>
          <span class="lit-line"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  import alertUpload from './alertUpload.vue'
  export default {
    components: {ElButton},
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
          pro_id:''
        }*/
        ],
        pro_sourceFilters:[{ text: '约谈', value: '约谈' },{ text: 'FA签约', value: 'FA签约' }],
        pro_scheduleFilters:[{ text: '项目线索', value: '项目线索' }],
        pro_industryFilters:[{ text: '大数据服务', value: '大数据服务' }],
        soleFilters:[{ text: '独家', value: 0 },{ text: '非独', value: 1 },{ text: '其他', value: 2 }],
        pro_stageFilters:[{ text: 'IPO上市后', value: 'IPO上市后' },{ text: 'Pre-A', value: 'Pre-A' }],
        pro_areaFilters:[],
        pro_scaleFilters:[{ text: '3000万', value: '3000万' },{ text: '4000万', value: '4000万'}],
        currentPage:1,
        stateCheck:false,//状态单选
        searchinput:'',
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
        totalData:1000,//总数据条数
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
        console.log(this.$tool.getToObject(row))
        console.log(column)
        if(column.label!="重置"){
          this.$router.push({ name: 'projectDetails', query: { address:row.address}})
        }
      },//跳转到项目详情页面传参数
      handleEdit(index, row){
        console.log(index);
        console.log(this.$tool.getToObject(row));
        this.$router.push({ name: 'editproject', query: { address:row.address}})
        /*跳转到编辑页面*/
      },//跳转到编辑页
      createProject(){
        this.$router.push({ name: 'creatproject', query: {}})
      },//跳转到创建项目页面
      dialogUploadVisiblechange(msg){
        this.dialogUploadVisible=msg;
      },//控制弹窗

      /*请求函数*/
      handleCurrentChange(val) {
//          const currURL=this.get
//        this.loading=true;
//        this.$http.post(currURL,{user_id: '2rzyz5vp',current:val})
//          .then(res=>{
//            let data = res.data.data
//            console.log(data)
//            this.tableData=this.getProjectList(data)
//            this.loading=false;
//          })
//          .catch(err=>{
//            this.loading=false;
//            console.log(err,2)
//          })
        console.log(val);
      },//控制当前页码

      handleIconClick(){
        this.loading=true;
        this.$http.post(this.getProjectListURL,{user_id: '2rzyz5vp',search:this.searchinput})
          .then(res=>{
            this.searchinput="";
            let data = res.data.data
            console.log(data)
            this.tableData=this.getProjectList(data)
            this.loading=false;
          })
          .catch(err=>{
            this.loading=false;
            console.log(err,2)
          })
      },//搜索===首次进入页面加载的数据
      filterChange(filters){
        this.loading=true
        let para="";
        for(let key in filters){
          for(let i=0;i<filters[key].length; i++){
            para+=parseInt(filters[key][i])+',';
          }
          this.getPra[key]=para.substr(0, para.length - 1);
        }
        this.getPra.user_id='2rzyz5vp';
        this.$http.post(this.getProjectListURL,this.getPra)
          .then(res=>{
            this.loading=false
            let data = res.data.data
            this.tableData=this.getProjectList(data)
          })
          .catch(err=>{
            this.loading=false
            console.log(err,2)
          })
      },//筛选
      sortChange(column){//ascending升/descending降
        this.loading=true
        if(column.order=="ascending") column.order="asc"
        else column.order="desc"
        this.$http.post(this.getProjectListURL,{user_id: '2rzyz5vp',order:column.prop,sort:column.order})
          .then(res=>{
            this.loading=false
            let data = res.data.data
            this.tableData=this.getProjectList(data)
          })
          .catch(err=>{
            this.loading=false
            console.log(err,2)
          })
      },//排序升降
      setNode(v){
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
        this.$http.post(this.getProjectListURL,{user_id: '2rzyz5vp',order:parseInt(v)})
          .then(res=>{
            this.loading=false
            let data = res.data.data
            this.tableData=this.getProjectList(data)
          })
          .catch(err=>{
            this.loading=false
            console.log(err,2)
          })

      },//控制顶部样式并且筛选
      headerClick(column, event){
//        console.log(column)
//        console.log(event)
        if(column.label==="重置"){
          window.location.reload();
        }
      },//点击重置按钮时

      getNodeCount(){
        const getNodeCountURL=this.URL.getNodeCount
        this.$http.post(getNodeCountURL,{user_id: '2rzyz5vp'})
          .then(res=>{
              let data = res.data.data
              this.nodeCount.whole=data.total.schedule_count//全部项目
              this.totalData=Math.ceil(data.total.schedule_count/10)//页码
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
            alert(err)
//            this.loading=false;
          })
      },// 项目节点数量
      titleSift(){
        this.loading=true;
        const titleSiftURL=this.URL.titleSift
        this.$http.post(titleSiftURL,{user_id: '2rzyz5vp'})
          .then(res=>{
            let data = res.data.data
            console.log(data)
            let pro_area=data.pro_area;//地区
            let pro_industry=data.pro_industry;//领域
            let pro_scale=data.pro_scale;//期望融资
            let pro_schedule=data.pro_schedule;//跟进状态
            let pro_source=data.pro_source;//项目来源
            let pro_stage=data.pro_stage;//轮次
            this.pro_areaFilters=this.getTitleSift(pro_area);
            this.pro_industryFilters=this.getTitleSift(pro_industry);
            this.pro_scaleFilters=this.getTitleSift(pro_scale);
            this.pro_scheduleFilters=this.getTitleSift(pro_schedule);
            this.pro_sourceFilters=this.getTitleSift(pro_source);
            this.pro_stageFilters=this.getTitleSift(pro_stage);
            this.loading=false;
          })
          .catch(err=>{
            this.loading=false;
            console.log(err,2)
          })
      },// 获取表头
      getTitleSift(data){
        let arr = [];
        for(let key in data){
          let obj=new Object;
          obj.text=data[key]
          obj.value=key
          arr.push(obj)
        }
        return arr
      },//设置表头

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

      getProjectList(list){
        let arr = new Array;
        for(let i=0; i<list.length; i++){
          let obj=new Object;
          obj.pro_name=list[i].pro_name;
          obj.pro_intro=list[i].pro_intro;
          obj.pro_company_name=list[i].pro_company_name;
          obj.pro_source=list[i].pro_source;
          obj.pro_follow_up_user=list[i].pro_follow_up_user;
          obj.pro_schedule=list[i].pro_schedule;
          obj.pro_industry=this.getProjectPro_industry(list[i].pro_industry)
          obj.is_exclusive=list[i].is_exclusive;
          obj.pro_stage=this.getProjectPro_stage(list[i].pro_stage)
          obj.pro_area=this.getProjectPro_area(list[i].pro_area)
          obj.pro_scale=this.getProjectPro_scale(list[i].pro_scale)
          obj.pro_id=list[i].pro_id;
          arr.push(obj)
        }
        return arr
      }//总设置列表的数据处理=====上面的辅助函数都是给老子用的,哈哈哈
    },
    computed: {

    },
    components: {
      alertUpload
    },
    created () {
      // 组件创建完后获取数据，
      this.getProjectListURL=this.URL.getProjectList
      this.loading=true;
      this.getNodeCount();
      this.titleSift();
      this.handleIconClick();
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
</style>
