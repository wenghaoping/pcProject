<template>
  <div id="selectbox">
    <el-select v-model="value3" placeholder="请选择" @change="change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

  </div>
</template>

<script type="text/ecmascript-6">
  import visible from './dialog2.vue'
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '黄金糕'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }, {
          value: '4',
          label: '龙须面'
        }, {
          value: '5',
          label: '北京烤鸭'
        }],
        value3: '5'
      }
    },
    methods:{
      change(e){
          console.log(e)
          console.log(this.value3)
      }
    }
  }

</script>

<style scoped lang="less">

</style>
