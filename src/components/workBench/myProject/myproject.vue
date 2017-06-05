<template>
  <div id="myproject">
    <div class="wrap-left fl">
      <div class="top-big-progress">
        <div class="pp-item pp-node pp-start" :class="{'pp-cur':node0}" @click="setNode('0')">
          <p class="pp-num pp-txt">75</p>
          <span class="pp-sec-title">全部项目</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
        </div>
        <div class="pp-item pp-node" :class="{'pp-cur':node1}" @click="setNode('1')">
          <p class="pp-num pp-txt">35</p>
          <span class="pp-sec-title">项目线索</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
          <el-tooltip placement="top" class="pp-cur">
            <div slot="content">
              <div style="width:50px;">签约 : 10 </div>
            </div>
            <span class="circle circle-0">&nbsp;</span>
          </el-tooltip>
        </div>
        <div class="pp-item pp-node" :class="{'pp-cur':node2}" @click="setNode('2')">
          <p class="pp-num pp-txt">28</p>
          <span class="pp-sec-title">FA项目</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
          <el-tooltip placement="top">
            <div slot="content">
              <div style="width:50px;">签约 : 10 </div>
            </div>
            <span class="circle circle-1">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top">
            <div slot="content">
              <div style="width:50px;">签约 : 10 </div>
            </div>
            <span class="circle circle-2">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top">
            <div slot="content">
              <div style="width:50px;">签约 : 10 </div>
            </div>
            <span class="circle circle-3">&nbsp;</span>
          </el-tooltip>

          <el-tooltip placement="top">
            <div slot="content">
              <div style="width:50px;">签约 : 10 </div>
            </div>
            <span class="circle circle-4">&nbsp;</span>
          </el-tooltip>

        </div>
        <div class="pp-item pp-node" v-bind:class="{'pp-cur':node3}" @click="setNode('3')">
          <p class="pp-num pp-txt">15</p>
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

            <el-table-column prop="project" label="项目名称" width="144" show-overflow-tooltip>

            </el-table-column>

            <el-table-column prop="introduce" label="一句话介绍" width="174" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="company" label="公司名称" width="96" show-overflow-tooltip>
              <template scope="scope">
                <div v-if="scope.row.company.length === 0">
                  —
                </div>
                <div v-if="scope.row.company.length > 0">
                  {{scope.row.company}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="address" label="项目来源" width="96" :filters="addressFilters" :filter-method="filterTag" filter-placement="bottom-end" show-overflow-tooltip	>
              <template scope="scope">
                <div v-if="scope.row.address.length === 0">
                  —
                </div>
                <div v-if="scope.row.address.length > 0">
                  {{scope.row.address}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="name" label="跟进人" width="96" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="state" label="跟进状态" width="96" :filters="stateFilters" :filter-method="filterTag" filter-placement="bottom-end" :filter-multiple="stateCheck" sortable="custom">
            </el-table-column>

            <el-table-column prop="field" label="领域" width="144" :filters="fieldFilters" :filter-method="filterTag" filter-placement="bottom-end" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="sole" label="是否独家" width="98" :filters="soleFilters" :filter-method="filterTag" filter-placement="bottom-end" sortable="custom">
              <template scope="scope">
                <el-tag :type="scope.row.sole === '独家' ? 'primary' : scope.row.sole === '非独' ? 'success':'gray' " close-transition>{{scope.row.sole}}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="round" label="轮次" width="80" :filters="roundFilters" :filter-method="filterTag" filter-placement="bottom-end" sortable="custom">
            </el-table-column>
            <el-table-column prop="region" label="地区" width="80" :filters="regionFilters" :filter-method="filterTag" filter-placement="bottom-end" sortable="custom">
            </el-table-column>
            <el-table-column prop="money" label="期望融资" width="102" :filters="moneyFilters" :filter-method="filterTag" filter-placement="bottom-end" >
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
          project: '公司名称公司名称公司名称公司名称',
          introduce:'我是项目介绍我是项目介绍我是项目介绍我是项目介绍',
          company: '',
          address: '我是项目来源1',
          name: '迪丽热巴',
          state:'我是跟进状态1',
          field:'大数据、社交通讯，电商平台，教育培训',
          sole:'独家',
          round:'IPO上市后',
          region:'北京',
          money:'3000万'
        }, {
          project: '我是项目介绍2',
          introduce:'我是项目介绍',
          company: '杭州偷着乐网络科技有限公司',
          address: '',
          name: '我是跟进',
          state:'约谈',
          field:'大数据、社交通讯，电商平台，教育培训',
          sole:"非独",
          round:'Pre-A',
          region:'上海',
          money:'3000万-4000万'
        },{
          project: '我是项目介绍2',
          introduce:'我是项目介绍',
          company: '投着乐',
          address: '我是项目来源2',
          name: '我是跟进人2',
          state:'我是跟进状态2',
          field:'教育培训',
          sole:"其他",
          round:'Pre-A',
          region:'上海',
          money:'4000万'
        },{
          project: '我是项目介绍2',
          introduce:'我是项目介绍',
          company: '投着乐',
          address: '我是项目来源2',
          name: '我是跟进人3',
          state:'我是跟进状态2',
          field:'教育培训',
          sole:"其他",
          round:'Pre-A',
          region:'上海',
          money:'4000万'
        }],
        addressFilters:[{ text: '项目来源1', value: '我是项目来源1' }, { text: '项目来源2', value: '我是项目来源2' },{ text: '约谈', value: '约谈' },{ text: 'FA签约', value: 'FA签约' }],
        stateFilters:[{ text: '项目线索', value: '项目线索' },{ text: '约谈', value: '约谈' },{ text: 'FA签约', value: 'FA签约' }],
        fieldFilters:[{ text: '大数据服务', value: '大数据服务' }, { text: '教育培训', value: '教育培训' }],
        soleFilters:[{ text: '独家', value: '独家' },{ text: '非独', value: '非独' },{ text: '其他', value: '其他' }],
        roundFilters:[{ text: 'IPO上市后', value: 'IPO上市后' },{ text: 'Pre-A', value: 'Pre-A' }],
        regionFilters:[{ text: '北京', value: '北京' },{ text: '上海', value: '上海' }],
        moneyFilters:[{ text: '3000万', value: '3000万' },{ text: '4000万', value: '4000万'}],
        currentPage:1,
        fullscreenLoading: false,//全屏加载
        stateCheck:false,//状态单选
        searchinput:'',
        dialogUploadVisible: false,//第一个弹窗的控制
        node0:true,
        node1:false,
        node2:false,
        node3:false,
        totalData:1000//总数据条数
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
        console.log(this.searchinput);
      },
      dialogUploadVisiblechange(msg){
        this.dialogUploadVisible=msg;
        console.log(msg)
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
      }
    },
    computed: {

    },
    components: {
      alertUpload
    },
    created () {
      // 组件创建完后获取数据，
      const getNodeCountURL=this.URL.PROJECT.getNodeCount/*项目节点数量URL*/
      const url="http://wthrcdn.etouch.cn/weather_mini"
/*      this.$http.post(getNodeCountURL,{user_id: '2rzyz5vp'})
        .then(res=>{
          console.log(res)
          alert("正确")
        })
        .catch(err=>{
          console.log(err)
          alert("错误")
        })*/
      this.$http.get(url,{ params:{city: "杭州"} })
        .then(res=>{ console.log(res,1) })
        .catch(err=>{ console.log(err,2) })

    }

  }
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/myproject';

</style>
