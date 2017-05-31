<template>
  <div id="editproject">
    <div class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box">
        <div class="left-wrap">
          <div class="item-block" style="margin-top:0;">
            <div class="block-tt-line">
              <span class="b-title">项目文件</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('fileShow')" v-show="fileShow">收起</span>
              <span class="b-hander" @click="openDiv('fileShow')" v-show="!fileShow">展开</span>
            </div>
            <div class="block-info block-cc-file">
              <span class="f-title">商业计划书</span>
              <span class="f-name">微天使商业计划书</span>
              <span class="del-btn"><i class="el-icon-delete"></i></span>
            </div>
            <div class="block-info block-cc-pro">
              <span class="f-title">项目文件</span>
              <span style="margin-left: 20px;"><el-button type="primary" icon="plus">批量上传</el-button></span>
              <span class="f-tips">（仅自己可见）</span>
            </div>
            <el-collapse-transition>
              <div v-show="fileShow">
                <div class="block-info block-cc-other">
                  <span class="f-title">其它 : </span>
                  <span class="f-name">第一季度财务报表</span>
                  <span class="del-btn"><i class="el-icon-delete"></i></span>
                  <span class="solt-btn">分组设置</span>
                </div>
                <div class="block-info block-cc-other" style="margin-top: 15px;">
                  <span class="f-title">报表 : </span>
                  <span class="f-name">微天使第二季度最新财务报表统计数据</span>
                  <span class="del-btn"><i class="el-icon-delete"></i></span>
                  <span class="solt-btn">分组设置</span>
                </div>
              </div>
            </el-collapse-transition>
          </div>
<!--=================================项目介绍=================================-->
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">项目介绍</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('ProjectShow')" v-show="ProjectShow">收起</span>
              <span class="b-hander" @click="openDiv('ProjectShow')" v-show="!ProjectShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="ProjectShow">
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
                        prop="company">
                        <el-select :span="12" v-model="project.company" filterable="" remote placeholder="公司名称" :remote-method="remoteMethod"
                                   :loading="loading" loading-text="正在加载" class="width360">
                          <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
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
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="项目介绍"
                        prop="introduce"
                        :rules="[{required: true, message: '项目介绍不能为空', trigger: 'blur'}]">
                        <el-input v-model="project.introduce" placeholder="一句话介绍，如帮助FA成交的项目管理工具"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="所属地区"
                        prop="district"
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
                      <el-form-item label="　　">
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
                    <el-col :span="24">
                      <el-form-item
                        label="运营状态"
                        prop="companystate">

                        <el-radio-group v-model="project.companystate" @change="radiochange">
                          <el-radio v-for="companystate in companystates" class="radio"
                                    :label="companystate.label"
                                    :key="companystate.value"
                                    >{{companystate.value}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="公司规模"
                        prop="companySize">
                        <el-select v-model="project.companySize" placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in companySize"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="产品链接"
                        prop="url">
                        <el-input v-model="project.url" placeholder="请输入项目主页地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="6">
                      <el-form-item
                        label="项目联系人"
                        prop="name">
                        <el-input v-model="project.contacts" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="手机号">
                        <el-input v-model="project.phone" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="项目来源">
                        <el-input v-model="project.source" placeholder="请输入项目来源，如：来源机构、来源人"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :span="24" :gutter="32">
                    <el-col :span="12">
                      <el-form-item
                        label="私密设置"
                        prop="private">
                        <el-select v-model="project.private" multiple placeholder="请选择" class="width360">
                          <el-option label="私密项目（仅自己／团队成员可查看编辑）" value="私密项目（仅自己／团队成员可查看编辑）"></el-option>
                          <el-option label="公开" value="公开"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="项目标签"
                        prop="tag">
                        <el-select v-model="project.tag" multiple placeholder="请选择" class="width360">
                          <el-option
                            v-for="item in projectTag"
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
<!--=================================核心团队=================================-->
          <div class="item-block">
            <div class="block-tt-line">
              <span class="b-title">核心团队</span>
              <span class="b-line"></span>
              <span class="b-hander" @click="closeDiv('teamShow')" v-show="teamShow">收起</span>
              <span class="b-hander" @click="openDiv('teamShow')" v-show="!teamShow">展开</span>
            </div>
            <el-collapse-transition>
              <div v-show="teamShow">
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
                        prop="company">
                        <el-select :span="12" v-model="project.company" filterable="" remote placeholder="公司名称" :remote-method="remoteMethod"
                                   :loading="loading" loading-text="正在加载" class="width360">
                          <el-option v-for="item in companyList" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
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
            </el-collapse-transition>
          </div>
        </div>
        <div class="right-wrap">
          <div class="command-box">
            <div class="command-title">
              项目完整度：<span class="command-val">30%</span>
            </div>
            <div class="command-title-sec">
              完整度超过60%的项目更容易被投资人关注
            </div>
            <div class="command-progress">
              <div class="progress-bg"></div>
              <div class="progress-fg"></div>
            </div>
          </div>
          <div class="check-block" style="margin-top:12px;">
              <span class="block-icon">
                <img src="../../../assets/images/arts.png" alt="">
              </span>
            <span class="block-tlt">项目文件
                <span class="tlt-tips">必填项不能为空</span>
              </span>
            <span class="check-flag">
                <!-- <img src="../assets/gou.png" alt=""> -->
                <span class="flag-txt">待完善</span>
              </span>
          </div>

          <div class="check-block">
              <span class="block-icon">
                <img src="../../../assets/images/arts.png" alt="">
              </span>
            <span class="block-tlt">项目介绍
                <span class="tlt-tips">必填项不能为空</span>
              </span>
            <span class="check-flag">
                <img src="../../../assets/images/gou.png" alt="">
              </span>
          </div>

          <div class="check-block">
              <span class="block-icon">
                <img src="../../../assets/images/group.png" alt="">
              </span>
            <span class="block-tlt">核心团队
                <span class="tlt-tips">必填项不能为空</span>
              </span>
            <span class="check-flag">
                <img src="../../../assets/images/gou.png" alt="">
              </span>
          </div>

          <div class="check-block">
              <span class="block-icon">
                <img src="../../../assets/images/money.png" alt="">
              </span>
            <span class="block-tlt">融资信息
                <span class="tlt-tips">必填项不能为空</span>
              </span>
            <span class="check-flag">
                <!-- <img src="../../../assets/gou.png" alt=""> -->
                <span class="flag-txt">待完善</span>

              </span>
          </div>

          <div class="check-block">
              <span class="block-icon">
                <img src="../../../assets/images/time.png" alt="">
              </span>
            <span class="block-tlt">里程碑
                <span class="tlt-tips">必填项不能为空</span>
              </span>
            <span class="check-flag">
                <!-- <img src="../../../assets/gou.png" alt=""> -->
                <span class="flag-txt">待完善</span>

              </span>
          </div>

          <div class="check-block cur-block">
              <span class="block-icon">
                <img src="../../../assets/images/doc.png" alt="">
              </span>
            <span class="block-tlt">FA签约协议
                <span class="tlt-tips">必填项不能为空</span>
              </span>
            <span class="check-flag">
                <!-- <img src="../../../assets/gou.png" alt=""> -->
                <span class="flag-txt">待完善</span>

              </span>
          </div>
          <div class="bot-btn">
            <el-button type="primary" size="large">保存项目</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--添加运营状态的弹窗-->
    <el-dialog title="添加运营状态" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="运营状态" :label-width="formLabelWidth">
          <el-input v-model="form.state" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addState">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data(){
    return {
      name:"",
      show:"detail",
      fileShow:true,
      ProjectShow:true,
      teamShow:true,
      multiplelimit:5,
      project: {
        name : '',//项目名称
        company : '',//公司名称
        introduce : '',//项目介绍
        district1:'',//所属地区1省级单位
        district2:'',//所属地区2市级单位
        frequency:'',//项目轮次
        field:[],//项目领域
        companystate:"概念",//运营状态
        companySize:[],//公司规模
        url:'',//产品链接
        contacts:'',//项目联系人
        phone:'',//手机号
        source:'',//项目来源
        private:'',//私密设置
        tag:''//项目标签
      },
      companyList: [],//公司搜索的数据
      list: [],
      loading: false,
      states: ["阿里","百度","投着乐网络科技有限公司"],
      /*所属地区1省级选项*/
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
      /*运营状态默认值*/
      companystates:[{
        label:'概念',
        value:'概念',
      },{
        label:'研发',
        value:'研发',
      },{
        label:'上线',
        value:'上线',
      },{
        label:'盈利',
        value:'盈利',
      },{
        label:'自定义添加',
        value:'自定义添加',
      }],
      /*公司规模*/
      companySize:[{
        value: '1-20人',
        label: '1-20人'
      },{
        value: '20-50人',
        label: '20-50人'
      },{
        value: '50-100人',
        label: '50-100人'
      }],
      projectTag:[{
        label:'阿里系',
        value:'阿里系',
      },{
        label:'百度系',
        value:'百度系',
      },{
        label:'淘宝系',
        value:'淘宝系',
      },],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      /*运营状态*/
      form: {
          state:''
      }
    }
  },
  computed:{

  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods:{
    openDiv:function(v){
      this[v] = true ;
    },
    closeDiv:function(v){
      this[v] = false ;
    },
    goBack(){//返回上一层
      this.$router.go(-1);
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.companyList = this.list.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 1000);
      } else {
        this.companyList = [];
      }
    },
    radiochange(label){/*控制添加radio*/
      if(label=="自定义添加"){
        this.dialogFormVisible=true;
      }
    },
    /*添加运营状态*/
    addState(){
      let newState={};
      newState.label=this.form.state
      newState.value=this.form.state
      this.project.companystate=this.form.state
      this.companystates.splice(length-1,0,newState)
      this.dialogFormVisible = false
    }

  }
}
</script>

<style scoped lang="less">
  @import '../../../assets/css/edit.less';
</style>
