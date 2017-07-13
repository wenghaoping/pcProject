<template>
  <el-dialog title="| 添加成功案例"
             id="investSuccessCase"
             :visible.sync="dialogShow"
             :before-close='closeInvestCase'
             size="full">
    <!--单个成功案例的表单-->
    <el-form :model="caseForm"
             ref="investSuccessCase"
             :rules="rule"
             label-width="100px"
             class="demo-dynamic"
             label-position="top">
      <el-form-item v-for="(item, index) in caseForm.investSuccessCase"
                    :key="item.index">
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
          <el-form-item label="投资领域" prop="investIndustry" class="mr32">
            <el-select v-model="item.industry"
                       multiple filterable
                       :multiple-limit="multiplelimit"
                       placeholder="请添加(最多5个)"
                       class="width360">
              <el-option v-for="item in industryList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投资轮次" prop="investStage">
            <el-select v-model="item.stage"
                       multiple filterable
                       :multiple-limit="multiplelimit"
                       placeholder="请添加(最多5个)"
                       class="width360">
              <el-option v-for="item in stageList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!--投资地区和投资金额-->
        <div class="flex">
          <el-form-item label="投资地区" prop="area1" class="width360 mr32">
            <el-select v-model="item.area1" placeholad="请选择" class="width175" @change="area1Change(index)">
              <el-option v-for="area1Item in area1List"
                         :key="area1Item.value"
                         :label="area1Item.label"
                         :value="area1Item.value"></el-option>
            </el-select>
            <el-select v-model="item.area2" placeholad="请选择" class="width175">
              <el-option v-for="area2Item in area2List"
                         :key="area2Item.value"
                         :label="area2Item.label"
                         :value="area2Item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投资金额(万)" prop="scale" class="width360">
            <el-input v-model="item.scale">投资金额</el-input>
          </el-form-item>
        </div>
        <div>
          <el-button type="text" class="red fr" @click="deleteItem(index)">删除本条</el-button>
        </div>
      </el-form-item>
      <div class="tc">
        <el-button type="text primy" @click="continueAdd">+ 继续添加</el-button>
      </div>
    </el-form>
    <div class="clearfix">
      <el-button class="fr certain" @click="certain">确定</el-button>
      <el-button class="fr cancel" @click="cancel" style="margin-right: 23px">取消</el-button>
    </div>
  </el-dialog>
</template>


<script type="text/ecmascript-6">
  export default {
    props: ['dialogShow'],
    data () {
      return {
        caseForm: {
          investSuccessCase: [{
            name: '',
            time: '',
            industry: '',
            stage: '',
            area1: '',
            area2: '',
            scale: '',
          }]
        }
        ,
        rule: {
          name: {},
          time: {},
          industry: {},
          stage: {},
          area1: {},
          area2: {},
          scale: {},
        },
        area1List: [],
        area2List: [],
        industryList: '',
        stageList: '',
        multiplelimit: 5,
      }
    },
    methods: {
//    area1选项变更
      area1Change(index){
        this.$http.post(this.URL.getArea,{
          pid:this.caseForm.investSuccessCase[index].area1
        }).then(res=>{
          let arr = [];
          let data=res.data.data
          for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj.label = data[i].area_title;
            obj.value = data[i].area_id;
            arr.push(obj)
          }
          this.area2List=arr;
          console.log(this.area2List)
        })
      },
//    继续添加
      continueAdd(){
        this.caseForm.investSuccessCase.push({
          name: '', time: '', industry: '', stage: '', area1: '', area2: '', scale: ''
        })
      },
//    删除本条
      deleteItem(index){
        this.caseForm.investSuccessCase.splice(index, 1)
      },
//    确定
      certain(){
        var that=this;
//      标准时间转化为毫秒数
        this.caseForm.investSuccessCase.forEach(x=>{
          x.time=Date.parse(x.time)
        })
        this.$http.post(this.URL.createUserProjectCase,{
          user_id:sessionStorage.user_id,
          project_case:this.caseForm.investSuccessCase
        }).then(res=>{
          console.log(res)
          if(res.data.status_code===2000000){
            that.$emit('closeInvestCase', false)
          }else{
            that.$tool.error(res.data.error_msg)
          }
        })
      },
//    取消
      cancel(){
        this.$emit('closeInvestCase', false)
      },
//    关闭弹窗前的回调
      closeInvestCase(){
        this.$emit('closeInvestCase', false)
      },
    },
    created(){
      this.area1List = this.$global.data.area;
      this.industryList = this.$global.data.industry;
      this.stageList = this.$global.data.stage;
    }
  }
</script>

<style scoped lang="less">
  #investSuccessCase {
    width: 900px !important;
    height: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;

    .width360 {
      width: 360px;
    }
    .mr32 {
      margin-right: 32px;
    }
    .width175 {
      width: 175px;
    }
    .red {
      color: red;
    }
    .el-input {
      margin-bottom: 32px;
    }
    .certain, .cancel {
      border: 1px solid #40587a;
      border-radius: 4px;
      width: 86px;
      height: 34px;
      text-align: center;
      color: #40587a;
    }
    .certain {
      background: #40587a;
      color: white;
    }
  }

  /*隐藏滚动条*/
  #investSuccessCase::-webkit-scrollbar {
    display: none;
  }
</style>
