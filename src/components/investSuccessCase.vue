<template>
  <div id="investSuccessCase">
    <el-form :model="investSuccessCase" ref="investSuccessCase" label-width="100px" class="demo-dynamic">
      <el-form-item
        v-for="(item, index) in investSuccessCase"
        :key="item.key"
        :prop="'domains.' + index + '.value'"
        :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">
        <div class="flex">
          <el-input v-model="investSuccessCase.value"></el-input>
          <el-input v-model="investSuccessCase.value"></el-input>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        investSuccessCase: {}
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">

</style>
