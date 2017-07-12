<template>
  <div id="identityDetail">
    <div class="title clearfix tc">
      您的资料?
      <div class="fr">
        <el-button class="skip" type="text" @click="skip">跳过</el-button>
      </div>
    </div>
    <!--基本资料-->
    <div class="item-block" style="margin-top: 0">
      <div class="block-tt-line">
        <span class="b-title">基本资料</span>
        <span class="b-line"></span>
        <span class="b-hander" @click="baseInfo=!baseInfo" v-show="baseInfo">收起</span>
        <span class="b-hander" @click="baseInfo=!baseInfo" v-show="!baseInfo">展开</span>
      </div>
      <el-collapse-transition>
        <div v-show="baseInfo">
          <!--上传头像-->
          <cardUpload>

          </cardUpload>
          <!--基本资料Form-->
          <el-form :model="ruleForm1" :rules="rule1" ref="ruleForm1" label-width="100px" class="demo-ruleForm"
                   label-position="top">
            <div class="flex">
              <el-form-item label="姓名" prop="name" class="mr32">
                <el-input v-model="ruleForm1.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="公司" prop="company">
                <el-input v-model="ruleForm1.company" placeholder="请输入公司"></el-input>
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="职位" prop="career" class="mr32">
                <el-input v-model="ruleForm1.career" placeholder="请输入职位"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm1.email" placeholder="请输入常用邮箱"></el-input>
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="微信" prop="weixin" class="mr32">
                <el-input v-model="ruleForm1.xeixin" placeholder="请输入微信"></el-input>
              </el-form-item>
              <el-form-item label="品牌" prop="brand">
                <el-input v-model="ruleForm1.brand" placeholder="请输入品牌名 如:微天使"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="个人描述" prop="desc" class="desc">
              <el-input type="textarea" v-model="ruleForm1.desc" :rows="5"   placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <!--投资偏好-->
    <div class="item-block">
      <div class="block-tt-line">
        <span class="b-title">投资偏好</span>
        <span class="b-line"></span>
        <span class="b-hander" @click="investPrefer=!investPrefer" v-show="investPrefer">收起</span>
        <span class="b-hander" @click="investPrefer=!investPrefer" v-show="!investPrefer">展开</span>
      </div>
      <el-collapse-transition>
        <div v-show="investPrefer">
          <!--投资偏好Form-->
          <el-form :model="ruleForm2" :rules="rule2" ref="ruleForm2" label-width="100px" class="demo-ruleForm"
                   label-position="top">
            <!--投资领域与轮次-->
            <div class="flex">
              <el-form-item label="投资领域" prop="investIndustry" class="mr32">
                <el-select v-model="ruleForm2.investIndustry"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)"
                           class="width360">
                  <el-option v-for="item in industry"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="投资轮次" prop="investStage">
                <el-select v-model="ruleForm2.investStage"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)"
                            class="width360">
                  <el-option v-for="item in stage"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!--投资金额和地区-->
            <div class="flex">
              <el-form-item label="投资金额" prop="investScale" class="mr32">
                <el-select v-model="ruleForm2.investScale"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)"
                           class="width360">
                  <el-option v-for="item in scale"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="投资地区" prop="investArea">
                <el-select v-model="ruleForm2.investArea"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)"
                           class="width360">
                  <el-option v-for="item in hotCity"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!--成功案例-->
            <div class="flex">
              <el-form-item label="成功案例">
                <el-button v-show="!hasSuccessCase" @click="addInvestCase">添加</el-button>
                <el-button v-show="hasSuccessCase">继续添加</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <!--完成-->
    <div>
      <el-button class="fr next" @click="next">完成</el-button>
    </div>
    <!--成功案例弹窗-->
    <invest-success-case :dialog-show="dialogShow" @closeInvestCase="closeInvestCase">

    </invest-success-case>
  </div>
</template>


<script type="text/ecmascript-6">
  import cardUpload from '../../components/cardUpload.vue'
  import investSuccessCase from '../../components/investSuccessCase'
  export default {
    data () {
      return {
//      初始列表信息
        industry: '',
        area: '',
        stage: '',
        scale: '',
        hotCity:'',
//      控制展开收起
        baseInfo: true,
        investPrefer: true,
//      多选数量设定
        multiplelimit: 5,
//      表单数据
        ruleForm1: {
          name: '',
          company: '',
          career: '',
          email: '',
          weixin: '',
          brand:'',
          desc: '人民广告派发活动传单大型商场超市内举办相关活动，吸引人流量的同时，通过活动宣传单上的二维码和品牌活动引导用户下载，从而提升装机量和品牌形象人民广告派发活动传单大型商场超市内举办相关活动，吸引人流量的同时，通过活动宣传单上的二维码和品牌活动引导用户下载，从而提升装机量和品牌形象'
        },
        ruleForm2: {
          investIndustry: '',
          investStage:'',
          investScale:'',
          investArea:''
        },
//      表单验证规则
        rule1: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          company: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
            {min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur'}
          ],
          career: [
            {required: true, message: '请输入您的职位', trigger: 'blur'},
            {min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur'}
          ],
          email: [
            {required: false, message: '请输入您的邮箱', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          weixin: [
            {required: false, message: '请输入微信号码', trigger: 'blur'},
            {min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur'}
          ],
          brand: [
            {required: false, message: '请输入品牌名称', trigger: 'blur'},
            {min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur'}
          ],
          desc: [
            {required: false, message: '请输入个人描述', trigger: 'blur'},
            {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'}
          ],
        },
        rule2: {
          investIndustry: [{type: 'array', required: false, message: '投资领域不能为空', trigger: 'change'}],
          investStage: [{type: 'array', required: false, message: '投资轮次不能为空', trigger: 'change'}],
          investScale: [{type: 'array', required: false, message: '投资金额不能为空', trigger: 'change'}],
          investArea: [{type: 'array', required: false, message: '投资地区不能为空', trigger: 'change'}],
        },
//      是否添加过成功案例
        hasSuccessCase:false,
//      控制成功案例弹窗显示/隐藏
        dialogShow:false,
      }
    },
    components: {
      cardUpload,investSuccessCase
    },
    methods: {
//      跳过
      skip(){
        this.$router.push({name:sessionStorage.entrance})
      },
//      完成
      next(){
        if(!this.ruleForm1.name){
          this.$tool.error('请正确填写姓名')
        }else if(!this.ruleForm1.company){
          this.$tool.error('请正确填写公司名称')
        }else if(!this.ruleForm1.career){
          this.$tool.error('请正确填写职位')
        }else{
          console.log(this.ruleForm1,this.ruleForm2)
          this.$http.post(this.URL.saveUserIdentity,{
            id:sessionStorage.id,
            user_id:sessionStorage.user_id,
            iden_name:this.ruleForm1.name,
            iden_company_name:this.ruleForm1.company,
            iden_company_career:this.ruleForm1.career,
            iden_email:this.ruleForm1.email,
            iden_wx:this.ruleForm1.weixin,
            iden_desc:this.ruleForm1.desc,
            iden_brand:this.ruleForm1.brand,
            industry:this.ruleForm2.investIndustry,
            area:this.ruleForm2.investArea,
            stage:this.ruleForm2.investStage,
            scale:this.ruleForm2.investScale
          }).then(res=>{
            if(res.data.status_code===2000000){
              this.$router.push({name:sessionStorage.entrance})
            }else{
              this.$tool.error(res.data.error_msg)
            }
          })
        }
      },
//      显示成功案例弹窗
      addInvestCase(){
        this.dialogShow=true
      },
//      关闭成功案例弹窗
      closeInvestCase(e){
        this.dialogShow=false
      }
    },
    mounted(){
    },
    created(){
      this.industry=this.$global.data.industry;
      this.scale=this.$global.data.scale;
      this.stage=this.$global.data.stage;
      this.hotCity=this.$global.data.hotCity;
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/indentity.less";
  #investSuccessCase {
    width: 900px !important;
    height: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;
  }
</style>
