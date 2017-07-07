<template>
  <div id="investSuccessCase">
    <div>| 添加成功案例</div>
    <!--单个成功案例的表单-->
    <el-form :model="investSuccessCase" ref="investSuccessCase" :rules="rule" label-width="100px" class="demo-dynamic" label-position="top">
      <el-form-item v-for="(item, index) in investSuccessCase" :key="item.index">
        <!--项目名称和投资时间-->
        <div class="flex">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="item.name">项目名称</el-input>
          </el-form-item>
          <el-form-item label="投资时间" prop="time">
            <el-date-picker v-model="item.time" type="date" placeholder="选择日期" class="width360"></el-date-picker>
          </el-form-item>
        </div>
        <!--投资领域和投资轮次-->
        <div class="flex">
          <el-form-item label="投资领域" prop="industry">
            <el-input v-model="item.industry">项目名称</el-input>
          </el-form-item>
          <el-form-item label="投资轮次" prop="stage">
            <el-input v-model="item.stage">投资时间</el-input>
          </el-form-item>
        </div>
        <!--投资地区和投资金额-->
        <div class="flex">
          <el-form-item label="投资地区" prop="area1">
            <el-select v-model="item.area1" placeholad="请选择">
              <el-option v-for="area1Item in area1List" :key="area1Item.value" :label="area1Item.label" :value="area1Item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投资金额(万)" prop="scale" >
            <el-input v-model="item.scale">投资金额</el-input>
          </el-form-item>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        investSuccessCase: [{
          name:'',
          time:'',
          industry:'',
          stage:'',
          area1:'',
          area2:'',
          scale:''
        }],
        rule:{
          name:{},
          time:{},
          industry:{},
          stage:{},
          area1:{},
          area2:{},
          scale:{},
        },
        area1List:[]
      }
    },
    methods: {

    },
    created(){
        console.log(this.$global.data.area)
        console.log(typeof this.$global.data.area)
        this.area1List=this.$global.data.area
    }
  }
</script>

<style scoped lang="less">

</style>
