<template>
  <div id="identityDetail">
    <div class="title clearfix tc">
      您的资料?
      <div class="fr">
        <el-button class="skip" type="text" @click="skip">跳过</el-button>
      </div>
    </div>
    <!--基本资料-->
    <div class="item-block">
      <div class="block-tt-line">
        <span class="b-title">基本资料</span>
        <span class="b-line"></span>
        <span class="b-hander" @click="baseInfo=!baseInfo" v-show="baseInfo">收起</span>
        <span class="b-hander" @click="baseInfo=!baseInfo" v-show="!baseInfo">展开</span>
      </div>
      <el-collapse-transition>
        <div v-show="baseInfo">
          <!--上传头像-->
          名片
          <upload></upload>
          <!--基本资料Form-->
          <el-form :model="ruleForm1" :rules="rule1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
            <div class="flex">
              <el-form-item label="姓名" prop="name" :col="5">
                <el-input v-model="ruleForm1.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="公司" prop="company" :col="5">
                <el-input v-model="ruleForm1.company" placeholder="请输入公司"></el-input>
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="职位" prop="career" :col="5">
                <el-input v-model="ruleForm1.career" placeholder="请输入职位"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="name" :col="5">
                <el-input v-model="ruleForm1.email" placeholder="请输入常用邮箱"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="微信" prop="weixin" >
              <el-input v-model="ruleForm1.xeixin" placeholder="请输入微信"></el-input>
            </el-form-item>
            <el-form-item label="个人描述" prop="desc">
              <el-input type="textarea" v-model="ruleForm1.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="item-block" style="margin-top:0;padding-bottom: 10px;">
      <div class="block-tt-line">
        <span class="b-title">基本资料</span>
        <span class="b-line" style="width: 624px;"></span>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import upload from '../../components/uploadHeadPic.vue'
  export default {
    data () {
      return {
        baseInfo: true,
        investPrefer: false,
        ruleForm1: {
          name: '',
          company: '',
          career: '',
          email: '',
          weixin: '',
          desc: ''
        },
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
          desc: [
            {required: true, message: '请输入个人描述', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    components: {
      upload
    },
    methods: {
      skip(){
          this.$router.push('/index')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/indentity.less";
  @import "../../assets/css/edit.less";
</style>
