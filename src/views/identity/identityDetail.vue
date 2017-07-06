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
          <cardUpload></cardUpload>
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
              <el-form-item label="邮箱" prop="name">
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
            <div class="flex">
              <el-form-item label="投资领域" prop="investIndustry">
                <el-select v-model="ruleForm2.investIndustry"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)"
                           class="mr32">
                  <el-option v-for="item in industry"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="投资领域" prop="investIndustry">
                <el-select v-model="ruleForm2.investIndustry"
                           multiple filterable
                           :multiple-limit="multiplelimit"
                           placeholder="请添加(最多5个)">
                  <el-option v-for="item in industry"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

          </el-form>
        </div>
      </el-collapse-transition>
    </div>

  </div>
</template>


<script type="text/ecmascript-6">
  import cardUpload from '../../components/cardUpload.vue'
  export default {
    data () {
      return {
//      初始列表信息
        industry: '',
        area: '',
        stage: '',
        scale: '',
//      控制展开收起
        baseInfo: false,
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
          desc: '人民广告派发活动传单大型商场超市内举办相关活动，吸引人流量的同时，通过活动宣传单上的二维码和品牌活动引导用户下载，从而提升装机量和品牌形象人民广告派发活动传单大型商场超市内举办相关活动，吸引人流量的同时，通过活动宣传单上的二维码和品牌活动引导用户下载，从而提升装机量和品牌形象'
        },
        ruleForm2: {
          investIndustry: '',
        },
//      表单验证规则
        rule1: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          company: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          career: [
            {required: true, message: '请输入您的职位', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入您的邮箱', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          weixin: [
            {required: true, message: '请输入微信号码', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          brand: [
            {required: true, message: '请输入品牌名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请输入个人描述', trigger: 'blur'},
            {min: 0, max: 500, message: '长度在 0 到 500 个字符', trigger: 'blur'}
          ],
        },
        rule2: {
          investIndustry: [{type: 'array', required: true, message: '投资领域不能为空', trigger: 'change'}]
        }
      }
    },
    components: {
      cardUpload
    },
    methods: {
      //跳过
      skip(){
        this.$router.push('/index')
      },
      //获取所有下拉框的数据
    },
    mounted(){
    },
    created(){
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/indentity.less";
  @import "../../assets/css/edit.less";
</style>
