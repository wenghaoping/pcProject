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
          <el-tooltip placement="top" class="pp-cur">
            <div slot="content">
              <div style="width:50px;">约谈 : {{nodeCount.interview}} </div>
            </div>
            <span class="circle circle-0">&nbsp;</span>
          </el-tooltip>
          <el-tooltip placement="top" class="pp-cur">
            <div slot="content">
              <div style="width:50px;">考察 : {{nodeCount.investigate}} </div>
            </div>
            <span class="circle circle-5">&nbsp;</span>
          </el-tooltip>
        </div>
        <div class="pp-item pp-node" :class="{'pp-cur':node2}" @click="setNode('2')">
          <p class="pp-num pp-txt">{{nodeCount.sign}}</p>
          <span class="pp-sec-title">签署FA协议</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
          <el-tooltip placement="top">
            <div slot="content">
              <div style="width:100px;">引荐投资方 : {{nodeCount.recommended}} </div>
            </div>
            <span class="circle circle-1">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top">
            <div slot="content">
              <div style="width:80px;">投资协议 : {{nodeCount.agreement}} </div>
            </div>
            <span class="circle circle-2">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top">
            <div slot="content">
              <div style="width:50px;">交割 : {{nodeCount.delivery}} </div>
            </div>
            <span class="circle circle-3">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top">
            <div slot="content">
              <div style="width:80px;">待收佣金 : {{nodeCount.collect}} </div>
            </div>
            <span class="circle circle-4">&nbsp;</span>
          </el-tooltip>

        </div>
        <div class="pp-item pp-node" v-bind:class="{'pp-cur':node3}" @click="setNode('3')">
          <p class="pp-num pp-txt">{{nodeCount.revenue}}</p>
          <span class="pp-sec-title">佣金收讫</span>
        </div>
      </div>
      <div class="clearfx"></div>
      <div class="top-search-box">
        <div class="input-box">
          <el-input
            placeholder="搜索项目、公司名称"
            icon="search"
            v-model="searchinput"
            :on-icon-click="handleIconClick">
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
            <el-table :data="tableData" style="width: 100%" @row-click="handleSelect" @header-click="headerClick" @sort-change="sortChange"stripe>

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

            <el-table-column prop="pro_source" label="项目来源" width="96" :filters="pro_sourceFilters" :filter-method="filterTag" filter-placement="bottom-end" show-overflow-tooltip	>
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

            <el-table-column prop="pro_schedule" label="跟进状态" width="96" :filters="pro_scheduleFilters" :filter-method="filterTag" filter-placement="bottom-end" :filter-multiple="stateCheck" sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.pro_schedule==''">
                  —
                </div>
                <div else>
                  {{scope.row.pro_schedule}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_industry" label="领域" width="144" :filters="pro_industryFilters" :filter-method="filterTag" filter-placement="bottom-end" show-overflow-tooltip>
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

            <el-table-column prop="is_exclusive" label="是否独家" width="98" :filters="soleFilters" :filter-method="filterTag" filter-placement="bottom-end" sortable="custom">
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

            <el-table-column prop="pro_stage" label="轮次" width="80" :filters="pro_stageFilters" :filter-method="filterTag" filter-placement="bottom-end" sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.pro_stage.length === 0">
                  —
                </div>
                <div v-if="scope.row.pro_stage.length > 0">
                  {{scope.row.pro_stage}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pro_area" label="地区" width="80" :filters="pro_areaFilters" :filter-method="filterTag" filter-placement="bottom-end" sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.pro_area.length === 0">
                  —
                </div>
                <div v-if="scope.row.pro_area.length > 0">
                  {{scope.row.pro_area}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pro_scale" label="期望融资" width="102" :filters="pro_scaleFilters" :filter-method="filterTag" filter-placement="bottom-end" >
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
              @size-change="handleSizeChange"
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
        tableData: [{
          pro_name: '公司名称公司名称公司名称公司名称',
          pro_intro:'我是项目介绍我是项目介绍我是项目介绍我是项目介绍',
          pro_company_name: '',
          pro_source: '我是项目来源1',
          pro_follow_up_user: '迪丽热巴',
          pro_schedule:'我是跟进状态1',
          pro_industry:'大数据、社交通讯，电商平台，教育培训',
          is_exclusive:'独家',
          pro_stage:'IPO上市后',
          pro_area:'北京',
          pro_scale:'3000万',
          pro_id:''
        }],
        pro_sourceFilters:[{ text: '项目来源1', value: '我是项目来源1' }, { text: '项目来源2', value: '我是项目来源2' },{ text: '约谈', value: '约谈' },{ text: 'FA签约', value: 'FA签约' }],
        pro_scheduleFilters:[{ text: '项目线索', value: '项目线索' },{ text: '约谈', value: '约谈' },{ text: 'FA签约', value: 'FA签约' }],
        pro_industryFilters:[{ text: '大数据服务', value: '大数据服务' }, { text: '教育培训', value: '教育培训' }],
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
        loading:false
      }
    },
    methods:{
      filterTag(value, row) {               //筛选
        let object=this.$tool.getToObject(row)
        for(var key in object){
          if(object[key]===value){
            return object[key]===value
          }
        }
        console.log("111111")
      },
      handleSelect(row, event, column) {          //跳转传参数
        console.log(this.$tool.getToObject(row))
        console.log(column)
        if(column.label!="重置"){
          this.$router.push({ name: 'projectDetails', query: { address:row.address}})
        }
      },
      handleEdit(index, row){
        console.log(index);
        console.log(this.$tool.getToObject(row));
        this.$router.push({ name: 'editproject', query: { address:row.address}})
        /*跳转到编辑页面*/
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      handleIconClick:function(){
        const getProjectListURL=this.URL.getProjectList
        this.$http.post(getProjectListURL,{user_id: '2rzyz5vp',search:this.searchinput})
          .then(res=>{
            this.searchinput="";
            let data = res.data.data
            console.log(data)

            /*let arr = new Array;
            for(let i=0; i<data.length; i++){
              let obj=new Object;
              obj.pro_name=data[i].pro_name;
              obj.pro_intro=data[i].pro_intro;
              obj.pro_company_name=data[i].pro_company_name;
              obj.pro_source=data[i].pro_source;
              obj.pro_follow_up_user=data[i].pro_follow_up_user;
              obj.pro_schedule=data[i].pro_schedule;
              obj.pro_industry=this.getProjectPro_industry(data[i].pro_industry)
              obj.is_exclusive=data[i].is_exclusive;
              obj.pro_stage=this.getProjectPro_stage(data[i].pro_stage)
              obj.pro_area=this.getProjectPro_area(data[i].pro_area)
              obj.pro_scale=this.getProjectPro_scale(data[i].pro_scale)
              obj.pro_id=data[i].pro_id;
              arr.push(obj)
            }*/
//            console.log(arr)
            this.tableData=this.getProjectList(data)
/*            pro_name: '公司名称公司名称公司名称公司名称',
              pro_intro:'我是项目介绍我是项目介绍我是项目介绍我是项目介绍',
              pro_company_name: '',
              pro_source: '我是项目来源1',
              pro_follow_up_user: '迪丽热巴',
              pro_schedule:'我是跟进状态1',
              pro_industry:'大数据、社交通讯，电商平台，教育培训',
              is_exclusive:'独家',
              pro_stage:'IPO上市后',
              pro_area:'北京',
              pro_scale:'3000万',
              pro_id:''*/
            this.loading=false;
          })
          .catch(err=>{
            this.loading=false;
            console.log(err,2)
          })
      },//搜索
      dialogUploadVisiblechange(msg){
        this.dialogUploadVisible=msg;
      },
      setNode(v){
        this.node0 = false ;
        this.node1 = false ;
        this.node2 = false ;
        this.node3 = false ;
        this['node' + v] = true ;

      },
      headerClick(column, event){//点击重置按钮时
        console.log(column)
        console.log(event)
        if(column.label==="重置"){
          this.filterTag()
        }
      },
      sortChange(column, prop, order){
        console.log(column)
        console.log(prop)
        console.log(order)
      },
      createProject(){
        this.$router.push({ name: 'creatproject', query: {}})
      },
      /*请求函数*/
      getNodeCount(){
        // 项目节点数量URL
        const getNodeCountURL=this.URL.getNodeCount
        this.$http.post(getNodeCountURL,{user_id: '2rzyz5vp'})
          .then(res=>{
              let data = res.data.data
              this.nodeCount.whole=data.total.schedule_count//全部项目
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
              if(res.status===200){
                this.loading=false;
              }
          })
          .catch(err=>{
            alert(err)
            this.loading=false;
          })
      },
      titleSift(){
        this.loading=true;
        // 获取表头URL
        const titleSiftURL=this.URL.titleSift
/*        this.$http.post(titleSiftURL,{user_id: '2rzyz5vp'})
          .then(res=>{
            let data = res.data.data
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
          })*/
      },
      getTitleSift(data){
        let arr = [];
        for(let key in data){
          let obj=new Object;
          obj.text=data[key]
          obj.value=key
          arr.push(obj)
        }
        return arr
      },
      getProjectPro_industry(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          str+=arr[i].industry_name+'.'
        }
        return str
      },
      getProjectPro_stage(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          str+=arr[i].stage_name+'.'
        }
        return str
      },
      getProjectPro_area(arr){
        let str=""
        for(let i=0;i<arr.length;i++){
          str+=arr[i].area_title+'.'
        }
        return str
      },
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
      },
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
      }
    },
    computed: {

    },
    components: {
      alertUpload
    },
    created () {
      // 组件创建完后获取数据，
      this.loading=true;
      this.getNodeCount();
      this.titleSift();
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

</style>
