<template>
  <div id="identityDetail">
    <div class="title clearfix tc">
      创建您的投资名片?
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
      <el-collapse-transition >
        <div v-show="baseInfo" >
          <!--上传头像-->
          <cardUpload @uploadSuccess="uploadSuccess">

          </cardUpload>
          <!--基本资料Form-->
          <el-form :model="ruleForm1" :rules="rule1" ref="ruleForm1" label-width="100px" class="demo-ruleForm"
                   label-position="top" style="height: 520px;margin-top: 22px;">
            <div class="flex">
              <el-form-item label="姓名" prop="name" class="mr32 item">
                <el-input v-model="ruleForm1.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item
                label="公司名称"
                class="item"
                prop="company">
                <el-autocomplete v-model="ruleForm1.company"
                                 :fetch-suggestions="querySearchAsync"
                                 placeholder="请输入公司"
                                 @select="handleSelect" class="width360">
                </el-autocomplete>
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="职位" prop="career" class="mr32 item">
                <el-input v-model="ruleForm1.career" placeholder="请输入职位"></el-input>
              </el-form-item>
              <el-form-item class="item" label="邮箱" prop="email">
                <el-input v-model="ruleForm1.email" placeholder="请输入常用邮箱"></el-input>
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item label="微信" prop="weixin" class="mr32 item">
                <el-input v-model="ruleForm1.weixin" placeholder="请输入微信"></el-input>
              </el-form-item>
              <el-form-item class="item" label="品牌" prop="brand">
                <el-input v-model="ruleForm1.brand" placeholder="请输入品牌名 如：微天使"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="个人描述" prop="desc" class="desc item">
              <el-input type="textarea" v-model="ruleForm1.desc" :rows="5" placeholder="请输入内容"></el-input>
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
                   label-position="top" style="margin-top: 18px;">
            <!--投资领域与轮次-->
            <div class="flex">
              <el-form-item label="投资领域" prop="investIndustry" class="mr32 item" >
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
              <el-form-item class="item" label="投资轮次" prop="investStage">
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
              <el-form-item label="投资金额" prop="investScale" class="mr32 item">
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
              <el-form-item class="item" label="投资地区" prop="investArea">
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
              <el-form-item class="item" label="成功案例">
                <el-button v-show="!hasSuccessCase" @click="addInvestCase">添加</el-button>
                <el-button v-show="hasSuccessCase">继续添加</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <!--完成-->
    <div class="clearfix">
      <el-button class="fr next" @click="next">完成</el-button>
    </div>
    <!--成功案例弹窗-->
    <invest-success-case :dialog-show="dialogShow" @closeInvestCase="closeInvestCase" lock-scroll>

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
        hotCity: '',
//      控制展开收起
        baseInfo: true,
        investPrefer: false,
//      多选数量设定
        multiplelimit: 5,
//      表单数据
        ruleForm1: {
          name: '',
          company: '',
          career: '',
          email: '',
          weixin: '',
          brand: '',
          desc: '',
        },
        ruleForm2: {
          investIndustry: '',
          investStage: '',
          investScale: '',
          investArea: ''
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
        hasSuccessCase: false,
//      控制成功案例弹窗显示/隐藏
        dialogShow: false,
//      上传图片成功的返回值
        image_id: '',
      }
    },
    components: {
      cardUpload, investSuccessCase
    },
    methods: {
      // 跳过
      skip(){
        this.$router.push({name: localStorage.entrance})
      },
      // 完成
      next(){
        if (!this.ruleForm1.name.replace(/^\s+|\s+$/g, "")) {
          this.$tool.error('请正确填写姓名')
        } else if (!this.ruleForm1.company.replace(/^\s+|\s+$/g, "")) {
          this.$tool.error('请正确填写公司名称')
        } else if (!this.ruleForm1.career.replace(/^\s+|\s+$/g, "")) {
          this.$tool.error('请正确填写职位')
        }else if (this.ruleForm1.email && !this.$tool.checkEmail(this.ruleForm1.email)) {
          console.log(1)
          this.$tool.error('请正确填写邮箱')
        }else {
          console.log(this.ruleForm1, this.ruleForm2);
          this.$http.post(this.URL.saveUserIdentity, {
            id: localStorage.id,
            user_id: localStorage.user_id,
            iden_name: this.ruleForm1.name,
            iden_company_name: this.ruleForm1.company,
            iden_company_career: this.ruleForm1.career,
            iden_email: this.ruleForm1.email,
            iden_wx: this.ruleForm1.weixin,
            iden_desc: this.ruleForm1.desc,
            iden_brand: this.ruleForm1.brand,
            industry: this.ruleForm2.investIndustry,
            area: this.ruleForm2.investArea,
            stage: this.ruleForm2.investStage,
            scale: this.ruleForm2.investScale,
            group_id:localStorage.group_id,
          }).then(res => {
            if (res.data.status_code === 2000000) {
              this.$router.push({name: localStorage.entrance})
            } else {
              this.$tool.error(res.data.error_msg)
            }
          })
        }
      },
      // 显示成功案例弹窗
      addInvestCase(){
        this.dialogShow = true
      },
      // 关闭成功案例弹窗
      closeInvestCase(e){
        this.dialogShow = false
      },
      // 公司搜索相关函数
      handleSelect(item) {
        this.companyTitle = item.value;
        this.$http.post(this.URL.getOneCompany, {user_id: localStorage.user_id, com_id: item.address})
        .then(res => {
          let data = res.data.data;
          this.queryData = data;
//          console.log(this.$tool.getToObject(data));
        })
        .catch(err => {
          this.alert("获取失败");
          console.log(err);
        });
        this.dialogVisible = true;
      },
      querySearchAsync(queryString, cb) {
        this.$http.post(this.URL.selectCompany, {user_id: localStorage.user_id, company_name: queryString})
        .then(res => {
          this.restaurants = [];
          let data = res.data.data;
          this.restaurants = this.loadData(data);
          if (queryString == "") this.restaurants = [];
          let restaurants = this.restaurants;
          /*          let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;*/
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(restaurants);
          }, 300);
        })
        .catch(err => {
          console.log(err);
        })
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadData(arr){
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.value = arr[i].company_name;
          obj.address = arr[i].com_id;
          newArr.push(obj)
        }
        return newArr
      },
      // 接收上传图片时返回的image_id
      uploadSuccess(image_id){
        console.log(3)
        console.log(image_id)
        this.image_id = image_id;
      },
    },
    mounted(){
    },
    created(){
      var that=this;
      setTimeout(function(){
        that.industry = that.$global.data.industry;
        that.scale = that.$global.data.scale;
        that.stage = that.$global.data.stage;
        that.hotCity = that.$global.data.hotCity;
      },200)

      //核对是否认证过身份
      this.$http.post(this.URL.getUserGroupByStatus, {
        user_id: localStorage.user_id
      }).then(res => {
        if (res.data.status_code === 2000000) {
          if (res.data.status === 1) {
            this.$router.push({name: 'index'})
          }
        } else {
          this.$tool.error('核对身份接口调用失败')
        }
      })
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/indentity.less";

  .el-input__inner {
    border-radius: 2px !important;
  }
</style>
