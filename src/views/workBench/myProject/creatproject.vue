<template>
  <div class="creatproject">
    <div class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box">
        <div class="left-wrap">
          <!--=================================基本资料=================================-->
          <div class="item-block" style="margin-top:0;">
            <div class="block-tt-line">
              <span class="b-title">基本资料</span>
              <span class="b-line"></span>
            </div>
            <div class="block-info block-cc-file">
              <span class="f-title fl">商业计划书</span>
              <!--<span class="f-name">微天使商业计划书</span>
              <span class="del-btn"><i class="el-icon-delete"></i></span>-->
              <span style="margin-left: 20px;" class="fl">
                <el-upload class="Upload"
                           action="/api/upload"
                           :on-change="planChange"
                           :on-success="planuploadsuccess"
                           :on-remove="planRemove"
                           :file-list="planList"
                >
                  <el-button slot="trigger" type="primary" v-show="planButton" class="fl"><i class="el-icon-plus"></i>上传附件</el-button>
                  <div slot="tip" class="el-upload__tip fr" v-show="planButton">BP私密保护，投资人可通过申请查看来了解项目价值支持pdf、ppt、doc、png，jpg，jpeg文件格式</div>
                </el-upload>
              </span>

            </div>
            <el-form :model="project" ref="project" label-width="100px" class="padding" label-position="top">
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <span class="justIlook">(仅自己可见)</span>
                  <el-form-item
                    label="项目名称"
                    prop="name">
                    <el-input v-model="project.name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <span class="justIlook2">(仅自己可见)</span>
                  <el-form-item
                    label="公司名称"
                    prop="company"
                  >
                    <el-autocomplete v-model="project.company"
                                     :fetch-suggestions="querySearchAsync"
                                     placeholder="请输入内容"
                                     @select="handleSelect" class="width360">

                    </el-autocomplete>
                  </el-form-item>
                </el-col>
                <span class="ques">
                  <el-tooltip placement="bottom-end">
                      <div slot="content">
                        <div class="tips-txt">1、一键同步公司信息，快速创建项目</div>
                        <div class="tips-txt" style="margin-top:5px;">2、可在项目详情查看尽调报告</div>
                      </div>
                      <img src="../../../assets/images/question.png" alt="" />
                  </el-tooltip>
              </span>
              </el-row>
            </el-form>
          </div>
          <!--=================================项目介绍=================================-->
          <div class="item-block" style="margin-top:16px;">
            <div class="block-tt-line">
              <span class="b-title">项目介绍</span>
              <span class="b-line"></span>
            </div>
            <el-form :model="project" ref="project" label-width="100px" class="padding" label-position="top">
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <el-form-item
                    label="项目介绍"
                    prop="introduce"
                    :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'}]">
                    <el-input v-model="project.introduce" placeholder="一句话介绍，如帮助FA成交的项目管理工具"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="项目领域"
                    prop="field"
                    :rules="[{type: 'array',required: true, message: '项目领域不能为空', trigger: 'change'}]">
                    <el-select
                      v-model="project.field"
                      multiple
                      filterable
                      allow-create
                      :multiple-limit="multiplelimit"
                      placeholder="请添加(最多5个)" class="width360" >
                      <el-option
                        v-for="item in projectfield"
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
                    label="项目轮次"
                    prop="frequency"
                    :rules="[{required: true, message: '项目轮次不能为空', trigger: 'change'}]">
                    <el-select v-model="project.frequency" placeholder="请选择" class="width360">
                      <el-option
                        v-for="item in projectFrequency"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="所属省级"
                    prop="district1"
                    :rules="[{required: true, message: '所属地区不能为空', trigger: 'change'}]">
                    <el-select v-model="project.district1" placeholder="请选择">
                      <el-option-group v-for="group in city" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所属市级"
                                prop="district2"
                                :rules="[{required: true, message: '所属地区不能为空', trigger: 'change'}]">
                    <el-select v-model="project.district2" placeholder="请选择">
                      <el-option
                        v-for="item in city2"
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
                    prop="except"
                    :rules="[{required: true, message: '期望融资不能为空', trigger: 'change'}]">
                    <el-select v-model="project.except" placeholder="请选择" class="width360">
                      <el-option
                        v-for="item in exceptedFinancing"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="投后股份(%)"
                    prop="shares">
                    <el-input v-model="project.shares" placeholder="请输入具体数值，如：10"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <el-form-item
                    label="私密设置"
                    prop="private">
                    <el-select v-model="project.private" placeholder="请选择" class="width360">
                      <el-option label="私密项目（仅自己／团队成员可查看编辑）" value="私密项目（仅自己／团队成员可查看编辑）"></el-option>
                      <el-option label="公开" value="公开"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="运营状态"
                    prop="exclusive">
                    <el-radio class="radio" v-model="project.exclusive" label="1">非独家FA签约</el-radio>
                    <el-radio class="radio" v-model="project.exclusive" label="2">独家FA签约</el-radio>
                    <el-radio class="radio" v-model="project.exclusive" label="3">其他</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :span="24" :gutter="32">
                <el-col :span="24">
                  <el-form-item label="项目亮点"
                                prop="highlights"
                                :rules="[{required: true, message: '项目亮点不能为空', trigger: 'blur'}]">
                    <el-input type="textarea"
                              v-model="project.highlights"
                              :autosize="{ minRows: 4, maxRows: 7}"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </div>
          <el-button type="primary" size="large" style="margin: 0px auto; display: block;" @click="allSave">提交</el-button>
          <div style="height: 50px;"></div>
          <el-dialog
            title="杭州投着乐网络科技有限公司（微天使）"
            :visible.sync="dialogVisible"
            size="tiny"
            :show-close="close">
            <span>微天使为您找到相似公司，是否一键同步</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sync">一键同步</el-button>
          </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      planList:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],//商业计划书上传列表
      planButton:false,//控制上传按钮的显示
      dialogVisible:false,//是否同步弹窗
      close:false,
      project: {
        name : '',//项目名称
        company : '',//公司名称
        introduce : '',//项目介绍
        field:[],//项目领域
        frequency:'',//项目轮次
        district1:'',//所属地区1省级单位
        district2:'',//所属地区2市级单位
        except:'',//融资范围
        shares:'',//投后股分
        private:'',//私密设置
        exclusive:'1',//是否独家
        highlights:''//项目亮点

      },//项目介绍
      multiplelimit:5,
      companyList: [],//公司搜索的数据
      /*公司远程搜索*/
      states: ["阿里","百度","投着乐网络科技有限公司"],
      loading: false,
      restaurants: [],
      timeout:  null,
      city: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }],
      /*所属地区2市级选项*/
      city2: [{
        value: '杭州',
        label: '杭州'
      }, {
        value: '温州',
        label: '温州'
      }, {
        value: '宁波',
        label: '宁波'
      }],
      /*项目轮次选项*/
      projectFrequency: [{
        value: 'A轮',
        label: 'A轮'
      }, {
        value: 'B轮',
        label: 'B轮'
      },{
        value: '天使轮',
        label: '天使轮'
      }],
      /*项目领域默认选项*/
      projectfield: [{
        value: '人工智能',
        label: '人工智能'
      }, {
        value: '教育培训',
        label: '教育培训'
      }, {
        value: 'IT',
        label: 'IT'
      }],
      /*融资范围*/
      exceptedFinancing:[
        {label:'10万-100万',value:'10万-100万'},
        {label:'100万-1000万',value:'100万-1000万'}
      ],

    }
  },
  methods: {
    /*商业计划书上传*/
    planChange(file, fileList){
      if(file.status==="fail") {this.planButton=true;this.open("上传失败,请联系管理员");}
      else this.planButton=false;
    },
    planuploadsuccess(response, file, fileList){
      this.planList = fileList
    },
    planRemove(file, fileList) {
      this.planList = fileList.slice(1,1);
      if (fileList.length == 0) this.planButton = true;
      else this.planButton = true;

    },
    goBack(){//返回上一层
      this.$router.go(-1);
    },
    /*检查所有必填项目以及获取所有数据*/
    submitForm(formName) {
      let check=true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return
        } else {
          this.open('必填项不能为空')
          check=false;
        }
      });
      return check;
    },
    /*警告弹窗*/
    open(text) {
      this.$notify.error({
        message: text,
        offset: 300
      });
    },
    /*创建成功弹窗*/
    open2(title,main,confirm,cancel) {
      this.$confirm(main,title , {
        confirmButtonText: confirm,
        cancelButtonText:cancel ,
        type: 'success'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '继续完善'
        });
        this.$router.push({ name: 'editproject', query: {}})
      }).catch(() => {

        this.$router.push({ name: 'indexmyProject', query: {}})
      });
    },
    /*全部保存按钮*/
    allSave(){
      if(this.submitForm('project')) this.open2('创建成功','完善项目资料，让投资人更全面得了解项目价值','去完善','跳过')
      console.log(this.$tool.getToObject(this.project));
    },
    /*获取数据*/
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" }
      ];
    },
    /*自动搜索,接口写这里面*/
    querySearchAsync(queryString, cb) {
      console.log(queryString)
      this.project.company=queryString;
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 500 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
     this.dialogVisible=true;
    },
    /*一键同步按钮*/
    sync(){
      this.dialogVisible = false;
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }

}
</script>

<style lang="less">
  @import '../../../assets/css/edit.less';
  .Upload{
    .el-upload{

    }
    .el-upload-list__item{
      /*    width: 200px;*/
    }
    .el-upload-list__item-name{
      font-size:14px;
      color:#475669;
      letter-spacing:0;
      text-decoration:underline
    }
    .el-upload__tip{
      width:539px;
      margin-left: 19px;
      height: 36px;
      line-height: 36px;
      font-size:12px;
      color:#5e6d82;
    }
    .el-upload__tip{
      margin-top: 0;
    }

  }
  .el-radio{
    width:102px
  }
  .el-dialog--tiny{
    width: 390px;
  }
  .el-dialog__body{
    font-size:14px;
    color:#475669;
    letter-spacing:0;
    line-height:21px;
  }
  .el-upload-list__item:first-child{
    margin-top:0px;
  }
  .el-upload-list__item{
    margin-top:0px;
    line-height:1;
  }
</style>
