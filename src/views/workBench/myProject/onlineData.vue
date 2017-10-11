<template>
    <div id="onlineData" >
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="浏览" name="browse"></el-tab-pane>
        <el-tab-pane label="申请" name="apply"></el-tab-pane>
        <el-tab-pane label="查看详情" name="details"></el-tab-pane>
        <el-tab-pane label="查看BP" name="bp"></el-tab-pane>
        <el-tab-pane label="请求联系" name="contact"></el-tab-pane>
      </el-tabs>
      <el-table :data="tableData" style="width: 100%;cursor: pointer"
                class="top-lists"
                @sort-change="filterChange"
                stripe
                v-loading.body="loading" element-loading-text="拼命加载中">
        <el-table-column prop="pro_name" label="姓名" width="85" show-overflow-tooltip>
          <template scope="scope">
            <el-tooltip placement="top" :disabled="scope.row.user_name.length > 4 ? false:true">
              <div slot="content">
                <div class="tips-txt">{{scope.row.user_name}}</div>
              </div>
              <div>
                {{scope.row.user_name}}
              </div>
            </el-tooltip>
            <div v-if="scope.row.user_name.length === 0">
              -
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="user_organization" label="机构" width="205">
          <template scope="scope">
            <el-tooltip placement="top" :disabled="scope.row.user_organization.length > 14 ? false:true">
              <div slot="content">
                <div class="tips-txt">{{scope.row.user_organization}}</div>
              </div>
              <div>
                {{scope.row.user_organization}}
              </div>
            </el-tooltip>
            <div v-if="scope.row.user_organization.length === 0">
              -
            </div>
          </template>
        </el-table-column>



        <el-table-column prop="group_title" label="角色" width="75"
                         show-overflow-tooltip>
          <template scope="scope">
            <el-tooltip placement="top" :disabled="scope.row.group_title.length > 3 ? false:true">
              <div slot="content">
                <div class="tips-txt">{{scope.row.group_title}}</div>
              </div>
              <div>
                {{scope.row.group_title}}
              </div>
            </el-tooltip>
            <div v-if="scope.row.group_title.length === 0">
              -
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="created_at" label="更新时间" width="134"
                         column-key="created_at"
                         sortable="custom">
          <template scope="scope">
            <div v-if="scope.row.created_at==''">
              -
            </div>
            <div else>
              {{scope.row.created_at}}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="service_desc" label="备注" width="288"
                         show-overflow-tooltip>
          <template scope="scope">
            <el-tooltip placement="top" :disabled="scope.row.service_desc.length > 25 ? false:true">
              <div slot="content">
                <div class="tips-txt">{{scope.row.service_desc}}</div>
              </div>
              <div>
                {{scope.row.service_desc}}
              </div>
            </el-tooltip>
            <div v-if="scope.row.service_desc==''">
              -
            </div>
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

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ["proid"],
        data(){
            return {
              loading: false,
              activeName : "browse",
              totalData : 0,//总页数
              getPra:{},//筛选的请求参数
              currentPage : 0,//当前页数
              project_id: this.proid,
              tableData: [
                {
                  user_name : "张三疯子",//姓名
                  user_organization : "杭州投着乐了网络科技有限公司",//机构
                  group_title : "投资方",//角色
                  created_at : "2017-08-08 13:00", //更新时间
                  service_desc : "这是备注，这里是备注最大宽度是300，最大宽度是300",  //备注
                },
                {
                  user_name : "张三疯子",//姓名
                  user_organization : "杭州投着乐了网络科技有限公司",//机构
                  group_title : "投资方",//角色
                  created_at : "2017-08-08 13:00", //更新时间
                  service_desc : "这是备注，这里是备注最大宽度是300，最大宽度是300",  //备注
                },
                {
                  user_name : "张三疯子疯疯疯",//姓名
                  user_organization : "杭州投着乐了网络科技有限公司限公司限公司限公司",//机构
                  group_title : "投资方资方资方",//角色
                  created_at : "2017-08-08 13:00", //更新时间
                  service_desc : "这是备注，这里是备注最大宽度是300，最大宽度是300",  //备注
                }
              ],
            };
        },
        computed: {},
        mounted() {

        },
        //组件
        components: {

        },
        methods: {
          tabClick(tab, event) {
            console.log(tab.name);

          },
          filterChange(filters){
            this.loading=true;
            this.currentPage=1;
            this.getPra.user_id = localStorage.user_id;
            this.getPra.project_id = this.project_id;
            if(filters.order=="ascending") filters.order="asc"//升降序
            else filters.order="desc";
            this.getPra.order=filters.prop;
            this.getPra.sort=filters.order;

            this.$http.post(this.URL.getProjectList,this.getPra)
              .then(res=>{
                this.loading=false;
                let data = res.data.data;
                this.tableData=this.getList(data);
                this.totalData=res.data.count;
              })
              .catch(err=>{
                this.loading=false;
                this.$tool.console(err,2)
              })
          },//ascending升/descending降/
          filterChangeCurrent(page){
            delete this.getPra.page;
            this.loading = true;
            this.getPra.user_id = localStorage.user_id;
            this.getPra.project_id = this.project_id;
            this.getPra.page = page;//控制当前页码
            this.$http.post(this.URL.getProjectList,this.getPra)
              .then(res=>{
                this.loading=false;
                let data = res.data.data;
                this.$tool.console(res);
                this.tableData=this.getList(data);
                this.totalData=res.data.count;
                this.$tool.getTop();
              })
              .catch(err=>{
                this.loading=false
                this.$tool.console(err,2)
              })
          },//控制页码
          getList(list){
            let arr = new Array;
            for(let i=0; i<list.length; i++){
              let obj = new Object;
              obj.user_name = list[i].user_name;
              obj.user_organization = list[i].user_organization;
              obj.group_title = list[i].group_title;
              obj.created_at = this.$tool.formatDateTime(list[i].created_at);
              obj.service_desc = list[i].service_desc;
              arr.push(obj);
            }
            return arr
          },//总设置列表的数据处理
        },
        //当dom一创建时
        created(){

        },
        watch: {

        }
    }
</script>

<style lang="less">
  #onlineData{
    .el-tabs__header{
      background: #ffffff!important;
    }
    .el-tabs{
      .el-tabs__content{
        display: none;
      }
    }
    .el-table{
      border:none;
      &::before,&::after{
        height: 0;
        width:0;
      }
      th{
        height: 50px;
      }
      td{
        height: 64px;
      }
    }
    .el-table .cell, .el-table th>div{
      padding-right: 0px;
    }
    .el-table--striped .el-table__body tr:hover{
      background: #eef1f6;
    }
    .el-table--striped .el-table__body tr:nth-child(2n){
      background: #f9fafc !important;
    }
    .top-lists{

      thead{
        th{
          font-size: 12px;
          font-weight: 100;
          border:none;
          &:nth-child(1){
            .cell{
              width: 90px!important;
            }

          }
        }
        th:nth-last-child(2){
          .cell{
            cursor: pointer;
          }
        }
      }
      tbody{

        td{
          border:none;
          .cell{
            font-size: 12px;
            div{
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }

        .edits-btn{

          margin-left: 0;
          color:#c0ccda;

        }
        .btn-cur{
          color:#20a0ff !important;

        }
        .flow-btn,.send-btn{
          color:#c0ccda;
          margin-left: 5px;

        }
        .more{
          width: 12px;
          display: inline-block;

          vertical-align: middle;
          //margin-left: 8px;
          margin-top: -4px;
          cursor: pointer;
        }

      }
      .el-table {
        .cell{
          //padding-right:1px;
          padding-left: 0;
          .el-tag{
            padding:0 10px;
          }
          .el-tag--gray{
            background: transparent;
            border:none;
          }
          .el-table__column-filter-trigger{
            margin-left: 2px;
          }
          .caret-wrapper{
            margin-left: 0;
            width:15px;
          }
        }
      }
    }
    .pagenav{
      text-align: right;
      height: 45px;
      padding-top: 10px;
      background: #f3f4f8;
      button,.number{
        background: transparent;
      }
      .active{
        background: #20a0ff;
      }
    }
  }

</style>
