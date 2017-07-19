<template>
  <div id="createcontacts">
    <div class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box">
        <div class="left-wrap" ref="left" style="margin-top:24px;">
          <!--=================================基本资料=================================-->
          <div class="item-block" style="margin-top:0;margin-bottom: 16px;">
            <div class="bigTitle">添加人脉</div>
            <div class="block-tt-line">
              <span class="b-title">基本资料</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('contactShow')" v-show="contactShow">收起</span>
              <span class="b-hander" @click="openDiv('contactShow')" v-show="!contactShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="contactShow">
                <div class="block-info block-cc-file clearfix">
                  <span class="f-title fl">名片</span>
                  <span style="margin-left: 20px;" class="fl">
                    <el-upload class="Upload"
                               ref="upload"
                               action="api/v/user/uploadConnectCard"
                               :on-change="planChange"
                               :on-success="planuploadsuccess"
                               :on-remove="planRemove"
                               :on-error="planuploaderror"
                               :file-list="planList"
                               :before-upload="beforeUpload"
                               accept=".jpg, .png, .jpeg"
                               :data="uploadDate">
                      <el-button slot="trigger" type="primary" v-show="planButton" class="fl button"><i class="el-icon-plus"></i>上传名片</el-button>
                      <div slot="tip" class="el-upload__tip fr" v-show="planButton">支持JPG、PNG、JPEG</div>
                    </el-upload>
                  </span>

                </div>
                <el-form :model="contacts" ref="contacts" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="姓名"
                        prop="user_real_name" :rules="nullRule">
                        <el-input v-model="contacts.user_real_name" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="昵称"
                        prop="user_nickname"
                        :rules="[{max: 20, message: '长度不能大于20个字符', trigger: 'blur' }]">
                        <el-input v-model="contacts.user_nickname" placeholder="请输入昵称"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="手机"
                        prop="user_mobile"
                        :rules="PhoneRule">
                        <el-input v-model.number="contacts.user_mobile" placeholder="请输入手机"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="邮箱"
                        prop="user_email"
                        :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]">
                        <el-input v-model="contacts.user_email" placeholder="请输入邮箱"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="公司"
                        prop="user_company_name"
                        :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                        <el-input v-model="contacts.user_company_name" placeholder="请输入公司名称"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="品牌"
                        prop="user_brand"
                        :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                        <el-input v-model="contacts.user_brand" placeholder="请输入品牌名、如：微天使"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="职位"
                        prop="user_company_career"
                        :rules="[{max: 40, message: '长度不能大于40个字符', trigger: 'blur' }]">
                        <el-input v-model="contacts.user_company_career" placeholder="请输入职位"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="人脉标签"
                        prop="user_invest_tag">
                        <el-select v-model="contacts.user_invest_tag"
                                   multiple placeholder="请添加" class="width360"
                                   :multiple-limit="multiplelimit"
                                   filterable allow-create
                                   default-first-option
                                   @change="addChangeTag">
                          <el-option
                            v-for="item in tags_con"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>
          <!--=================================投资需求=================================-->
          <div class="item-block" style="margin-top:0;margin-bottom: 16px;">
            <div class="block-tt-line">
              <span class="b-title">投资需求</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('InvestmentShow')" v-show="InvestmentShow">收起</span>
              <span class="b-hander" @click="openDiv('InvestmentShow')" v-show="!InvestmentShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="InvestmentShow">
                <el-form :model="contacts" ref="contacts1" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="投资领域"
                        prop="user_invest_industry">
                        <el-select
                          v-model="contacts.user_invest_industry"
                          multiple
                          :multiple-limit="multiplelimit"
                          placeholder="请选择(最多5个)" class="width360">
                          <el-option
                            v-for="item in industry"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目轮次"
                        prop="user_invest_stage">
                        <el-select v-model="contacts.user_invest_stage"
                                   multiple
                                   :multiple-limit="multiplelimit"
                                   placeholder="请选择(最多5个)" class="width360">
                          <el-option
                            v-for="item in stage"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="期望融资"
                        prop="user_invest_scale">
                        <el-select v-model="contacts.user_invest_scale"
                                   multiple
                                   :multiple-limit="multiplelimit"
                                   placeholder="请选择(最多5个)"
                                   class="width360">
                          <el-option
                            v-for="item in scale"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="投资地区"
                        prop="user_invest_area">
                        <el-select v-model="contacts.user_invest_area" multiple
                                   :multiple-limit="multiplelimit"
                                   placeholder="请选择(最多5个)"
                                   class="width360">
                          <el-option
                            v-for="item in area"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item label="投资需求描述"
                                    prop="user_invest_desc"
                                    :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                        <el-input type="textarea"
                                  v-model="contacts.user_invest_desc"
                                  :autosize="{ minRows: 4, maxRows: 7}" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>

          <!--=================================资源需求=================================-->
          <div class="item-block" style="margin-top:0;margin-bottom: 16px;">
            <div class="block-tt-line">
              <span class="b-title">资源需求</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('resourcesShow')" v-show="resourcesShow">收起</span>
              <span class="b-hander" @click="openDiv('resourcesShow')" v-show="!resourcesShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="resourcesShow">
                <el-form :model="contacts" ref="contacts2" label-width="100px" class="padding" label-position="top">
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="他能提供的资源"
                        prop="user_resource_give">
                        <el-select
                          v-model="contacts.user_resource_give"
                          multiple
                          :multiple-limit="multiplelimit"
                          placeholder="请选择(最多5个)" class="width360">
                          <el-option
                            v-for="item in giveTo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="寻求对接的资源"
                        prop="user_resource_find">
                        <el-select v-model="contacts.user_resource_find"
                                   multiple
                                   :multiple-limit="multiplelimit"
                                   placeholder="请选择(最多5个)" class="width360">
                          <el-option
                            v-for="item in pushTo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="24">
                      <el-form-item label="资源需求描述"
                                    prop="user_resource_desc"
                                    :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                        <el-input type="textarea"
                                  v-model="contacts.user_resource_desc"
                                  :autosize="{ minRows: 4, maxRows: 7}" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-collapse-transition>
          </div>

          <button class="button save" style="margin-top:15px;float: right;display: block;" @click="allSave">保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    var checkNull = (rule, value, callback) => {
      if (this.$tool.getNull(value)) {
        return callback(new Error('不能为空'));
      }else{
        callback();
      }
    };//不为空判断
    var checkPhoneNumber = (rule, value, callback) => {
      if (!this.$tool.getNull(value)) {
        setTimeout(() => {
          if (!this.$tool.checkNumber(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (!this.$tool.checkPhoneNubmer(value)) {
              callback(new Error('请输入正确的手机号'));
            }else{
              callback();
            }
          }
        }, 100);
      }else{
        callback();
      }
    };//电话号码正则判断
    return {
      card_id:'',//名片ID
      nullRule: { validator: checkNull, trigger: 'blur' },
      PhoneRule: { validator: checkPhoneNumber, trigger: 'blur' },
      multiplelimit: 5,//一次最多选5个,下拉表

      planList: [
/*          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}*/
          ],//名片上传列表
      planButton: true,//控制上传按钮的显示
      uploadShow: {},//计划书上传列表,需要存数据啦
      uploadDate: {user_id: localStorage.user_id},//商业计划书上传所带的额外的参数
      contacts: {
        card_id:'',//id
        user_id:'',//user_id
        user_real_name:'',//姓名
        user_nickname:'',//昵称
        user_mobile:'',//名片手机号
        user_email:'',//邮箱
        user_company_name:' ',//公司名称
        import_user_name:'',//来源
        user_brand:'',//品牌
        user_company_career:'',//职位
        user_invest_tag:[],//人脉标签
        user_avatar_url:'',//头像URL
        user_invest_industry: [],//领域标签
        user_invest_stage: [],//轮次
        user_invest_scale: [],//投资金额
        user_invest_area: [],//所属地区1省级单位
        user_intro:'',//个人描述
        user_resource_give:[],//提供的资源
        user_resource_find:[],//寻求对接的资源
        user_invest_desc:'',//投资需求描述
        user_resource_desc:'',//资源需求描述
      },//人脉参数

      tags_con: [],//人脉标签选项
      industry: [],//领域标签选项
      stage: [],//轮次标签选项
      scale:[],//投资金额100-500选项
      /*所属地区1省级选项*/
      area: [],
      giveTo:[],//能提供的资源
      pushTo:[],//对接的资源
      contactShow: true,//基本资料框
      InvestmentShow: false,//投资需求框
      resourcesShow: false,//资源需求框
      tags:{
        changecont:[],//项目标签新增
        index:'',//取数据保存的位置
        card_id:''//人脉id
      }
    }
  },
  methods: {
    openDiv(v){
      this[v] = true;
    },
    closeDiv(v){
      this[v] = false;
    },
    goBack(){//返回上一层
      this.$router.go(-1);
    },
    /*商业计划书*/
    planChange(file, fileList){
      this.planList = fileList
      if (file.status === "fail") this.planButton = true;
      else this.planButton = false;
    },
    planuploadsuccess(response, file, fileList){
      this.$tool.success("上传成功")
      this.addplan(response.image_id);
    },//上传成功后添加字段
    planuploaderror(err, file, fileList){
      this.$tool.error("上传失败,请联系管理员")
    },//上传失败
    planRemove(file, fileList) {
      if (fileList.length == 0) this.planButton = true;
      else this.planButton = true;
      this.$http.post(this.URL.deleteConnectCard, {user_id: localStorage.user_id, image_id: this.uploadShow.image_id, card_id:this.card_id})
        .then(res => {
          if (res.status === 200) {
            this.loading = false;
              this.$tool.success("删除成功");
          }
        })
        .catch(err => {
          this.$tool.console(err);
          this.$tool.error("删除失败,请联系管理员");
        })

    },//删除文件
    addplan(image_id) {
      let object = {};
      object.image_id = image_id;
      this.uploadShow = object;
    },//添加上传文件时,保存返回的数据
    beforeUpload(file){
      this.uploadDate.user_id = localStorage.user_id;
      let filetypes=[".jpg",".png",".jpeg"];
      let name=file.name;
      let fileend=name.substring(name.lastIndexOf("."));
      let isnext = false;
      if(filetypes && filetypes.length>0){
        for(var i =0; i<filetypes.length;i++){
          if(filetypes[i]==fileend){
            isnext = true;
            break;
          }
        }
      }
      this.loading=false;
      if(!isnext){
        this.$tool.error("不支持的文件格式");
        return false;
      }
      if(parseInt(file.size) > parseInt(1048580)){
        this.$tool.error("暂不支持超过1M文件上传哦");
        return false;
      };
    },//上传前的验证

    /*添加人脉标签*/
    addChangeTag(e){
      let tagName = this.$tool.checkArr(e,this.tags_con);

      if (tagName != undefined) {
        this.$http.post(this.URL.createCustomTag, {user_id: localStorage.user_id, type: 3, tag_name: tagName})
          .then(res => {
            let newState = {};
            newState.label = tagName;
            newState.value = res.data.tag_id;
            this.tags.changecont.push(newState);
          })
          .catch(err => {
            this.$tool.error("添加失败");
            this.$tool.console(err);
          })
      }
    },//添加人脉标签

    allSave(){
        let contacts=this.submitForm('contacts');
        let contacts1=this.submitForm('contacts1');
        let contacts2=this.submitForm('contacts2');
        if(!contacts) {this.$tool.error("姓名不能为空")}
      else if(!contacts1) this.$tool.error("投资需求过长")
       else if(!contacts2) this.$tool.error("资源需求过长")
      else{
          this.$tool.setTag(this.contacts.user_invest_tag,this.tags_con);
          let allData=new Object;
          allData=this.contacts;
          allData.user_id=localStorage.user_id;
          allData.card_id=this.contacts.card_id || '';
          allData.image_id=this.uploadShow.image_id || '';
          this.$tool.console(this.$tool.getToObject(allData),2);
          this.$http.post(this.URL.createUserCard, allData)
            .then(res => {
              this.card_id=res.data.card_id;
              this.loading=false;
              this.open2('名片编辑成功', "是否继续编辑", '查看详情', '继续编辑')
            })
            .catch(err => {
              this.$tool.error("编辑失败");
              this.$tool.console(err);
            })
        }

    },//保存人脉

    /*编辑成功弹窗*/
    open2(title, main, confirm, cancel) {
      this.$confirm(main, title, {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        type: 'success'
      }).then(() => {
        this.$router.push({name: 'contactsDetails', query: {card_id: this.card_id}})
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '继续编辑'
        });
//        this.getProjectDetail();
      });
    },
    submitForm(formName) {
      let check = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return
        } else {
          check = false;
        }
      });
      return check;
    },//提交用
    getWxProjectCategory(){
      let data = this.$global.data.categoryData;
      this.area = this.$global.data.hotCity;//设置热门城市
      this.scale = this.$tool.getScale(data.scale);//设置期望融资
      this.stage = this.$tool.getStage(data.stage);//设置轮次信息
      this.industry = this.$tool.getIndustry(data.industry);//设置轮次信息
      this.tags_con = this.$global.data.tags_user;//设置人脉标签
      this.giveTo=this.$global.data.resource;//设置提供的资源和对接的资源
      this.pushTo=this.$global.data.resource;//设置提供的资源和对接的资源
    },//获取所有下拉框的数据

    /*以下都是辅助函数*/
    set_industry(arr){
      let newArr = new Array;
      arr.forEach((x)=> {
        newArr.push(x.industry_id);
      });
      return newArr
    },//列表领域处理
    set_stage(arr){
      let newArr = new Array;
      arr.forEach((x)=> {
        newArr.push(x.stage_id);
      });
      return newArr
    },//列表轮次处理
    set_scale(arr){
      let newArr = new Array;
      arr.forEach((x)=> {
        newArr.push(x.scale_id);
      });
      return newArr
    },//列表期望金额处理
    set_GiveFind(arr){
      let newArr = new Array;
      arr.forEach((x)=> {
        newArr.push(x.resource_id);
      });
      return newArr
    },//资源提供或者寻求处理
    set_area(arr){
      let newArr = new Array;
      arr.forEach((x)=> {
        newArr.push(x.area_id);
      });
      return newArr
    },//资源提供或者寻求处理
    setTag(arr){
      let newArr = new Array;
      arr.forEach((x)=> {
        newArr.push(x.tag_id);
      });
      return newArr;
    },//设置标签的函数

    getOneUserInfo(){
      this.loading=true;
      this.$http.post(this.URL.getOneUserInfo,{user_id:localStorage.user_id,card_id: this.card_id})
        .then(res => {
          let data = res.data.data;
          this.$tool.console(this.$tool.getToObject(data));
          data.user_invest_industry=this.set_industry(data.user_invest_industry);
          data.user_invest_stage=this.set_stage(data.user_invest_stage);
          data.user_invest_scale=this.set_scale(data.user_invest_scale);
          data.user_resource_find=this.set_GiveFind(data.user_resource_find);
          data.user_resource_give=this.set_GiveFind(data.user_resource_give);
          data.user_invest_area=this.set_area(data.user_invest_area);
          data.user_invest_tag=this.setTag(data.user_invest_tag);
          this.tags.changecont=this.setTag(data.user_invest_tag);
          this.contacts=data;
          this.loading=false;
        })
        .catch(err=>{
          this.$tool.console(err,2);
          this.loading=false;
          this.$tool.error("加载超时");
        })
    },//获取个人详情
    getContactsId(){
      this.card_id = this.$route.query.card_id || '';
    }

  },
  created(){

    this.getWxProjectCategory();
    setTimeout(() =>{
      this.getContactsId();
      this.getOneUserInfo();
      if (this.planList.length != 0) this.planButton = false;
      else this.planButton = true;
    },200)
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/edit.less';

   #createcontacts{
     .button{
       background:#40587a;
       border-radius:4px;
       height:37px;
       font-size:14px;
       color:#ffffff;
       cursor: pointer;
     }
     .save{
       width:88px;
       margin-bottom: 30px;
     }
     .bigTitle{
       font-size:22px;
       color:#1f2d3d;
       margin-bottom: 32px;
     }
    .el-upload__tip{
      margin-left: 16px;
      font-size:14px;
      color:#5e6d82;
      line-height: 18px;
    }
     .Upload {
       .el-upload-list__item {
         line-height: 1.8;
          margin-top: 0px;
       }
       .el-upload-list__item-name {
         font-size: 14px;
         color: #475669;
         letter-spacing: 0;
         text-decoration: underline
       }
       .el-upload-list__item:first-child{
          margin-top: 0px;
       }

     }
   }
</style>
