<template>
  <div id="myproject">
      <el-table :data="tableData" border style="width: 100%" @row-click="handleSelect">
        <el-table-column prop="date" label="日期" sortable width="180">
          <template scope="scope">
            <el-popover trigger="hover" placement="top-start">
              <p>时间: {{ scope.row.date }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.date }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
          <template scope="scope">
            <el-popover trigger="hover" placement="top-start">
              <p>姓名: {{ scope.row.name }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.name }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" sortable :formatter="formatter">
        </el-table-column>
        <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      }
    },
    methods:{
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      handleSelect(	row, event, column) {
        console.log(this.$tool.getToObject(row))
        this.$router.push({ name: 'projectDetails', query: { address:row.address}})
      },
      formatter(row, column) {
//        console.log(this.$tool.getToObject(row))
//        console.log(this.$tool.getToObject(column))
        return row.address;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped lang="less">
</style>
