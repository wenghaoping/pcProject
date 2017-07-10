<template>
    <el-dialog title="| 添加成功案例"  id="investSuccessCase" :visible.sync="dialogShow" size="full">
      <!--单个成功案例的表单-->
      <el-form :model="caseForm" ref="investSuccessCase" :rules="rule" label-width="100px" class="demo-dynamic" label-position="top">
        <el-form-item v-for="(item, index) in caseForm.investSuccessCase" :key="item.index">
          <!--项目名称和投资时间-->
          <div class="flex">
            <el-form-item label="项目名称" prop="name" class="width360 mr32">
              <el-input v-model="item.name">项目名称</el-input>
            </el-form-item>
            <el-form-item label="投资时间" prop="time" class="width360">
              <el-date-picker v-model="item.time" type="date" placeholder="选择日期" class="width360"></el-date-picker>
            </el-form-item>
          </div>
          <!--投资领域和投资轮次-->
          <div class="flex">
            <el-form-item label="投资领域" prop="industry" class="width360 mr32">
              <el-input v-model="item.industry">项目名称</el-input>
            </el-form-item>
            <el-form-item label="投资轮次" prop="stage" class="width360">
              <el-input v-model="item.stage">投资时间</el-input>
            </el-form-item>
          </div>
          <!--投资地区和投资金额-->
          <div class="flex">
            <el-form-item label="投资地区" prop="area1" class="width360 mr32">
              <el-select v-model="item.area1" placeholad="请选择" class="width175">
                <el-option v-for="area1Item in area1List" :key="area1Item.value" :label="area1Item.label" :value="area1Item.value"></el-option>
              </el-select>
              <el-select v-model="item.area2" placeholad="请选择" class="width175">
                <el-option v-for="area2Item in area2List" :key="area2Item.value" :label="area2Item.label" :value="area2Item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资金额(万)" prop="scale" class="width360">
              <el-input v-model="item.scale">投资金额</el-input>
            </el-form-item>
          </div>
          <div>
            <el-button type="text" class="red fr">删除本条</el-button>
          </div>
        </el-form-item>
        <div class="tc">
          <el-button type="text primy" @click="continueAdd">+ 继续添加</el-button>
        </div>
      </el-form>
      <div class="clearfix">
        <el-button class="fr certain" @click="certain">确定</el-button>
        <el-button class="fr cancel"  @click="cancel" style="margin-right: 23px">取消</el-button>
      </div>
    </el-dialog>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
          caseForm:{
            investSuccessCase: [{
              name:'',
              time:'',
              industry:'',
              stage:'',
              area1:'',
              area2:'',
              scale:''
            }]
          }
        ,
        rule:{
          name:{},
          time:{},
          industry:{},
          stage:{},
          area1:{},
          area2:{},
          scale:{},
        },
        area1List:[],
        area2List:[],
        dialogShow:true
      }
    },
    methods: {
//    继续添加
      continueAdd(){
          this.caseForm.investSuccessCase.push({
            name:'',time:'',industry:'',stage:'',area1:'',area2:'',scale:''
          })
      },
//    确定
      certain(){

      },
//    取消
      cancel(){

      },
    },
    created(){
        this.area1List=this.$global.data.area
    }
  }
</script>

<style scoped lang="less">
  #investSuccessCase{
    width: 900px !important;
    height: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    overflow: auto;

    .width360{
      width: 360px;
    }
    .mr32{
      margin-right: 32px;
    }
    .width175{
      width: 175px;
    }
    .red{
      color: red;
    }
    .el-input{
      margin-bottom: 32px;
    }
    .certain,.cancel{
      border:1px solid #40587a;
      border-radius:4px;
      width:86px;
      height:34px;
      text-align: center;
      color: #40587a;
    }
    .certain{
      background: #40587a;
      color: white;
    }
  }
  /*隐藏滚动条*/
  #investSuccessCase::-webkit-scrollbar{
    display: none;
  }
</style>
