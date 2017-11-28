<template>
  <!--评分统计-->
    <div id="scoreStatistics">
      <el-table :data="tableData" style="width: 100%;cursor: pointer"
                class="top-lists"
                @sort-change="filterChange"
                stripe
                v-loading.body="loading" element-loading-text="拼命加载中">
        <!--<el-table-column prop="user" label="姓名" width="200" show-overflow-tooltip>
          <template scope="scope">
            <el-tooltip placement="top" :disabled="scope.row.user.user_name.length > 4 ? false:true">
              <div slot="content">
                <div class="tips-txt">{{scope.row.user.user_name}}</div>
              </div>
              <div>
                {{scope.row.user.user_name}}
                {{scope.row.user.user_company_career}}
                {{scope.row.user.user_brand}}
              </div>
            </el-tooltip>
            <div v-if="scope.row.user.user_name.length === 0">
              -
            </div>
          </template>
        </el-table-column>-->

        <el-table-column props="tables">
          <template scope="scope">
            <el-table-column :prop="'scope.row.tables[' + scope.$index + '].index_score'"
                             :label="'scope.row.tables[' + scope.$index + '].index_name'"
                             min-width="85" show-overflow-tooltip
                             :key="scope.$index">
              <template scope="scope2">
                {{scope2.row}}
              </template>
            </el-table-column>
          </template>
        </el-table-column>

      </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props: ['proid'],
      data () {
        return {
          loading: false,
          project_id: this.proid,
          schedule_id: 17,
          getPra: {}, // 筛选的请求参数
          currentPage: 1, // 当前页数
          totalData: 0, // 总页数
          tableData: [
/*            {
              scores: [
                {index_name: ' 指标', index_score: 22},
                {index_name: '一二三四五六七八九十一二三四五六七八九十', index_score: 99},
                {index_name: '指标指标', index_score: 66}
              ],
              index_sum: 187,
              is_show: 1,
              remark: '定阿斯蒂芬好绝望偶尔会个',
              score: 9.9,
              user: {
                user_brand: '有限公司',
                user_company_career: 'PHP',
                user_name: '朱甜甜'
              }
            }, */
            {
              tables: [
                {index_name: '姓名', index_score: '朱甜甜'},
                {index_name: ' 指标', index_score: 22},
                {index_name: '一二三四五六七八九十一二三四五六七八九十', index_score: 99},
                {index_name: '指标指标', index_score: 66},
                {index_name: '总评分', index_score: 36}
              ]
            },
            {
              tables: [
                {index_name: '姓名', index_score: '朱甜甜2'},
                {index_name: ' 指标', index_score: 212},
                {index_name: '一二三四五六七八九十一二三四五六七八九十', index_score: 99},
                {index_name: '指标指标', index_score: 616},
                {index_name: '总评分', index_score: 336}
              ]
            }
          ]
        };
      },
      computed: {},
      mounted () {},
      // 组件
      components: {},
      methods: {
        filterChange (filters) {
          this.loading = true;
          this.currentPage = 1;
          this.getPra.user_id = localStorage.user_id;
          this.getPra.project_id = this.project_id;
          if (filters.order === 'ascending') filters.order = 'asc';// 升降序
          else filters.order = 'desc';
          this.getPra.order = filters.order;
          this.getPra.sort = filters.prop;
          this.$http.post(this.URL.getProjectJudgeScoreList, this.getPra)
            .then(res => {
              this.loading = false;
              let data = res.data.data;
              this.tableData = this.getList(data);
              this.totalData = res.data.count;
            })
            .catch(err => {
              this.loading = false;
              console.log(err, 2);
            });
        }, // ascending升/descending降/
        filterChangeCurrent (page) {
          delete this.getPra.page;
          this.loading = true;
          this.getPra.user_id = localStorage.user_id;
          this.getPra.project_id = this.project_id;
          this.getPra.schedule_id = this.schedule_id;
          this.getPra.page = page;// 控制当前页码
          this.$http.post(this.URL.getProjectJudgeScoreList, this.getPra)
            .then(res => {
              this.loading = false;
              let data = res.data.data;
              this.tableData = this.getList(data);
              this.totalData = res.data.count;
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        }, // 控制页码
        getList (list) {
          let arr = [];
          for (let i = 0; i < list.length; i++) {
            let obj = {};
            obj.user_name = list[i].user_name;
            obj.user_organization = list[i].user_organization;
            obj.group_title = list[i].group_title;
            obj.created_at = list[i].created_at;
            obj.service_desc = list[i].service_desc;
            arr.push(obj);
          }
          return arr;
        }// 总设置列表的数据处理
      },
      // 当dom一创建时
      created () {
//        this.filterChangeCurrent(1);
      },
      watch: {}
    };
</script>

<style lang="less">

</style>
