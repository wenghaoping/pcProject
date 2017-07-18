<template>
  <div id="addFollow" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <!--===========================================添加或编辑跟进记录弹窗=============================================-->
    <el-dialog :visible="dialogFollow" custom-class="dialogFollow" :before-close="handleClose" close-on-press-escape close-on-click-modal>
      <div class="addTitle">
        <span> | </span>添加跟进
      </div>
      <div class="main">
        <el-form :model="follow" ref="follow" label-width="100px" class="padding" label-position="top">
          <el-row :span="24" :gutter="32">
            <el-col :span="24">
              <el-form-item
                label="关联项目"
                prop="project"
                :rules="[{ required: true, message: '请选择关联项目', trigger: 'change' }]">
                <el-select v-model="follow.project"
                           placeholder="一句话介绍，如帮助FA成交的项目管理工具"
                style="width: 360px;">
                  <el-option
                    v-for="item in options"
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
<!--          <el-row :span="24" :gutter="32">
            <el-col :span="24">
              <el-form-item label="投资需求描述"
                            prop="user_invest_desc"
                            :rules="[{max: 500, message: '长度不能大于500个字符', trigger: 'blur' }]">
                <el-input type="textarea"
                          v-model="contacts.user_invest_desc"
                          :autosize="{ minRows: 4, maxRows: 7}" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>-->
        </el-form>
      </div>



      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">继续添加</el-button>
        <el-button type="primary" @click="handleClose">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: ["dialogFollow","followid"],

    data () {
      return {
        loading:false,
        follow_id:'',
        value:'',
        follow:{
            project:'',//关联项目

        },//跟进记录
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],

      }
    },
    methods: {
      handleClose(){
        this.$emit("changeClose",false);
      },

    },
    created(){

    },
    watch : {
      followid : function(e){
        this.follow_id=e;

      },//获取项目id
    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/addFollow';
</style>
