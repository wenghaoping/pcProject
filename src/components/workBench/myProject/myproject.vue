<template>
  <div id="myproject">
    <div class="wrap-left fl">
      <div class="top-big-progress">
        <div class="pp-item pp-node pp-start">
          <p class="pp-num pp-txt">75</p>
          <span class="pp-sec-title">全部项目</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
        </div>
        <div class="pp-item pp-node">
          <p class="pp-num pp-txt">35</p>
          <span class="pp-sec-title">项目线索</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
          <el-tooltip placement="top">
            <div slot="content">
              <div style="width:50px;">签约 : 10 </div>
            </div>
            <span class="circle circle-0">&nbsp;</span>
          </el-tooltip>
        </div>
        <div class="pp-item pp-node">
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

        </div>
        <div class="pp-item pp-node">
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
            v-model="input"
            :on-icon-click="handleIconClick">
          </el-input>
        </div>
        <div class="btns-box">
          <el-button type="primary" @click="dialogUploadVisible = true">批量上传项目</el-button>
          <el-button type="primary">创建项目</el-button>

          <alertUpload :dialog-upload-visible="dialogUploadVisible" v-on:changeupload="dialogUploadVisiblechange">

          </alertUpload>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" @row-click="handleSelect" stripe>
        <el-table-column prop="project" label="项目名称" min-width="120" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="introduce" label="项目介绍" min-width="130" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="company" label="公司名称" min-width="130" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="address" label="项目来源" width="112" :filters="addressFilters" :filter-method="filterTag" filter-placement="bottom-end" show-overflow-tooltip	>
        </el-table-column>

        <el-table-column prop="name" label="跟进人" min-width="90" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="state" label="跟进状态" min-width="135" :filters="stateFilters" :filter-method="filterTag" filter-placement="bottom-end" :filter-multiple="stateCheck" sortable>
        </el-table-column>

        <el-table-column prop="field" label="领域" min-width="85" :filters="fieldFilters" :filter-method="filterTag" filter-placement="bottom-end" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="sole" label="是否独家" width="135" :filters="soleFilters" :filter-method="filterTag" filter-placement="bottom-end" sortable>
          <template scope="scope">
            <el-tag :type="scope.row.sole === '独家' ? 'primary' : 'success'" v-if="scope.row.sole === '独家'" close-transition>{{scope.row.sole}}</el-tag>
            <el-tag :type="scope.row.sole === '其他' ? 'gray' : 'success'" v-else close-transition>{{scope.row.sole}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="round" label="轮次" width="105" :filters="roundFilters" :filter-method="filterTag" filter-placement="bottom-end" sortable>
        </el-table-column>
        <el-table-column prop="region" label="地区" width="105" :filters="regionFilters" :filter-method="filterTag" filter-placement="bottom-end" sortable>
        </el-table-column>
        <el-table-column prop="money" label="期望融资" width="140" :filters="moneyFilters" :filter-method="filterTag" filter-placement="bottom-end" >
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagenav">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[50, 100, 150, 200]"
          :page-size="50"
          layout="total, sizes, prev, pager, next, jumper"
          :total="150">
        </el-pagination>
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
          company: '偷着了偷着了偷着了偷着了偷着了偷着了偷着了偷着了',
          address: '我是项目来源1',
          name: '迪丽热巴',
          state:'我是跟进状态1',
          field:'大数据服务',
          sole:'独家',
          round:'IPO上市后',
          region:'北京',
          money:'3000万'
        }, {
          project: '我是项目介绍2',
          introduce:'我是项目介绍',
          company: '杭州偷着乐网络科技有限公司',
          address: '我是项目来源2',
          name: '我是跟进',
          state:'约谈',
          field:'教育培训',
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
        input:'',
        dialogUploadVisible: false,//第一个弹窗的控制
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
      },
      handleSelect(row, event, column) {          //跳转传参数
        console.log(this.$tool.getToObject(row))
        console.log(column)
        if(column.label!="操作"){

          this.$router.push({ name: 'projectDetails', query: { address:row.address}})
        }
      },
      handleEdit(index, row){
        console.log(index);
        console.log(this.$tool.getToObject(row));
        /*跳转到编辑页面*/
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleIconClick:function(){
        console.log(0);
      },
      dialogUploadVisiblechange(msg){
        this.dialogUploadVisible=msg;
        console.log(msg)
      },
    },
    computed: {
      howType(){
        let type;
        let data = this.tableData
        for (var i = 0; i < data.length; i++) {
          let obj = data[i];
          for (var key in obj) {
            if (obj['sole'] === '独家') {
              type = 'primary';
            } else if (obj['sole'] === '非独') {
              type = 'success';
            } else {
              type = 'gray';
            }
          }
          console.log(obj)
        }
        return type
      }
    },
    components: {
      alertUpload
    }

  }
</script>

<style scoped lang="less">
  @import '../../../assets/css/myproject';
  #myproject{
    .el-tag--primary{
      color:#20a0ff;
    }
    .pagenav{
      margin-top: 16px;
      .el-pagination{
        text-align: center;
      }
    }
    .contain-right-2{
      width:234px;
      height: 1000px;
      margin-left: 22px;
      margin-top: -71px;
      background: #fff;
      .main-box{
        .title-box{
          margin-top: 17px;
          text-align: center;
          span{
            display: inline-block;
            vertical-align: middle;
          }
          .title{
            font-size:16px;
            color:#475669;
            margin:0 5px;
            // font-weight: bold;
          }
          .lit-line{
            width:25px;
            height: 1px ;
            background: #c0ccda;
          }
        }
      }
    }
    .el-table__row{
      font-size: 20px!important;
    }
  }
</style>
