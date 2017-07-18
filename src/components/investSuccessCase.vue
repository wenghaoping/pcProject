<template>
  <div id="investSuccessCase">
    <el-dialog title="| 添加成功案例"
               :visible.sync="dialogShow"
               :before-close='closeInvestCase'
               close-on-click-modal>
      <!--单个成功案例的表单-->
      <el-form :model="caseForm"
               ref="investSuccessCase"
               label-width="100px"
               class="demo-dynamic"
               label-position="top">
        <el-form-item v-for="(item, index) in caseForm.investSuccessCase"
                      :prop="'investSuccessCase.' +index"
                      :key="item.index">
          <!--项目名称和投资时间-->
          <div class="flex mb30">
            <el-form-item label="项目名称"
                          :prop="'investSuccessCase.'+ index +'.case_name'"
                          class="width360 mr32"
                          :rules="[{required: true, message: '请填写姓名', trigger: 'blur'},
                         {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}]">
              <el-input v-model="item.case_name" placeholder="请输入">项目名称</el-input>
            </el-form-item>
            <el-form-item label="投资时间"
                          class="width360">
              <el-date-picker v-model="item.case_deal_time"
                              :editable="false"
                              type="date"
                              placeholder="请选择"
                              class="width360"></el-date-picker>
            </el-form-item>
          </div>
          <!--投资领域和投资轮次-->
          <div class="flex mb30">
            <el-form-item label="投资领域"
                          :prop="'investSuccessCase.'+ index +'.case_investIndustry'"
                          class="mr32"
                          :rules="[{required: true, message: '请填写投资领域', trigger: 'blur'}]">
              <el-select v-model="item.case_industry"
                         multiple filterable
                         :multiple-limit="multiplelimit"
                         placeholder="请选择"
                         class="width360">
                <el-option v-for="item in industryList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资轮次"
                          :prop="'investSuccessCase.'+ index +'.stage'"
                          :rules="[{required: true, message: '请填写投资轮次', trigger: 'blur'}]">
              <el-select v-model="item.case_stage"
                         filterable
                         placeholder="请选择"
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
          <div class="flex mb30">
            <el-form-item label="投资地区"
                          :prop="'investSuccessCase['+ index +'].case_city'"
                          class="width360 mr32"
                          :rules="{required: true, message: '请填写投资地区', trigger: 'blur'}">
              <el-select v-model="item.case_province" placeholad="请选择" class="width175" @change="area1Change(index)">
                <el-option v-for="area1Item in area1List"
                           :key="area1Item.value"
                           :label="area1Item.label"
                           :value="area1Item.value"></el-option>
              </el-select>
              <el-select v-model="item.case_city" placeholad="请选择" class="width175" style="margin-left: 5px;">
                <el-option v-for="area2Item in area2List"
                           :key="area2Item.value"
                           :label="area2Item.label"
                           :value="area2Item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资金额(万)"
                          :prop="'investSuccessCase.'+ index + '.case_money'"
                          class="width360"
                          :rules="[{required: true, message: '请填写投资金额', trigger: 'blur'},
                         {min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur'}]">
              <el-input v-model="item.case_money" type="number" placeholder="请输入具体数值，如：100">投资金额</el-input>
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
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    props: ['dialogShow'],
    data () {
      return {
        caseForm: {
          investSuccessCase: [{
            case_name : '',
            case_deal_time: '',
            case_industry: '',
            case_stage: '',
            case_province: '',
            case_city: '',
            case_money: '',
          }]
        },
        /*rule:  [{
          name: [{required: true, message: '请填写姓名', trigger: 'blur'},],
          time: {required: true, message: '请选择时间', trigger: 'blur'},
          industry: {required: true, message: '请选择领域', trigger: 'blur'},
          stage: {required: true, message: '请选择轮次', trigger: 'blur'},
          area1: {required: true, message: '请选择省份', trigger: 'blur'},
          area2: {required: true, message: '请选择市区', trigger: 'blur'},
          scale: [{required: true, message: '请填写金额', trigger: 'blur'}],
        }],*/
        area1List: [],
        area2List: [],
        industryList: '',
        stageList: '',
        multiplelimit: 5,
        // 标准时间记录
        caseTime:[],
      }
    },
    methods: {
//    area1选项变更
      area1Change(index){
        this.$http.post(this.URL.getArea,{
          pid:this.caseForm.investSuccessCase[index].case_province
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
          this.caseForm.investSuccessCase[index].case_city='';
          console.log(this.area2List)
        })
      },
//    继续添加
      continueAdd(){
        this.caseForm.investSuccessCase.push({
          case_name: '', case_deal_time: '', case_industry: '', case_stage: '', case_province: '', case_city: '', case_money: ''
        })
      },
//    删除本条
      deleteItem(index){
        this.caseForm.investSuccessCase.splice(index, 1)
      },
//    确定
      certain(){
        var that=this;
        var item=this.caseForm.investSuccessCase;
        var is_complete=true;
        console.log(item)
        // 前端验证表单
        item.forEach((x,index)=>{
          if(x.case_name.replace(/^\s+|\s+$/g, "") && x.case_name.replace(/^\s+|\s+$/g, "").length<16 && x.case_industry && x.case_stage && x.case_province && x.case_city && x.case_money.replace(/^\s+|\s+$/g, "") && x.case_money.replace(/^\s+|\s+$/g, "").length<9){

          }else{
            this.$tool.error('请完善表单');
            is_complete=false;
            return
          }
        })
        if(is_complete){
          console.log('发送请求')
          // 标准时间转化为毫秒数
          this.caseForm.investSuccessCase.forEach(x=>{
            this.caseTime.push(x.case_deal_time)
            x.case_deal_time=Date.parse(x.case_deal_time)
          })
          console.log(this.caseForm.investSuccessCase);

          // 发送请求
          this.$http.post(this.URL.createUserProjectCase,{
            user_id:localStorage.user_id,
            project_case:this.caseForm.investSuccessCase,
          }).then(res=>{
            console.log(res);
            if(res.data.status_code===2000000){
              this.$tool.success('投资成功案例保存成功')
              this.caseForm.investSuccessCase.forEach((x,index)=>{
                x.case_deal_time=this.caseTime[index]
              })
              this.caseTime=[];
              that.$emit('closeInvestCase', false)
            }else{
              that.$tool.error(res.data.error_msg)
            }
          })
        }
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
      setTimeout(x=>{
        this.area1List = this.$global.data.area;
        this.industryList = this.$global.data.industry;
        this.stageList = this.$global.data.stage;
      },200)
    }
  }
</script>

<style lang="less">
  #investSuccessCase {
    .el-dialog--small{
      width: 880px !important;
    }
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
  .el-form-item__content{
    height: 36px !important;
  }
  .mb30{
    margin-bottom: 30px;
  }
  .el-input{
    margin-bottom: 0 !important;
  }
  .el-dialog__body{
    padding: 30px 64px;
  }
  .el-dialog__header{
    padding-left: 64px;
  }

</style>
