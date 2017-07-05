<template>
  <div id="projectPush" v-loading.fullscreen.lock="loading" element-loading-text="加载中">
    <el-dialog :visible="dialogPush">
      <span slot="title" class="dialog-title clearfix">
        <div class="lines fl"></div>
        <div class="title fl">项目推送</div>
        <div class="lost fl">今日剩余推送<i>5</i>次</div>
        <div class="img fl"><img src="../../../assets/images/why.png"></div>
      </span>

      <el-form label-position="top" label-width="80px" style="position: relative">
        <el-form-item label="推送人脉">
          <el-input v-model="nameEmail" placeholder="项目及BP将以邮箱的方式推送，请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div class="message">
        <span class="message_innder fl" v-if="user_real_name!=''">{{user_real_name}}</span>
        <span class="message_innder fl" v-else>--</span>
        <span class="lines fl"></span>
        <span class="message_innder fl" v-if="user_company_career!=''">{{user_company_career}}</span>
        <span class="message_innder fl" v-else>--</span>
        <span class="lines fl"></span>
        <span class="message_innder fl" v-if="user_company_name!=''">{{user_company_name}}</span>
        <span class="message_innder fl" v-else>--</span>
      </div>

      <el-form label-position="top" label-width="80px">
        <el-form-item label="推送项目">
          <el-select v-model="value9" multiple filterable="" remote multiple placeholder="请输入项目关键词" :remote-method="remoteMethod" >
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>



      <div class="select">
        <el-tabs v-model="activeName">
          <el-tab-pane label="我的项目" name="first" style="margin-left: 64px;"></el-tab-pane>
        </el-tabs>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">预览</el-button>
        <el-button type="primary" @click="cancel">继续推送</el-button>
        <el-button type="primary" @click="cancel">推送</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["dialogPush"],
  data () {
    return {
      close:false,//默认关闭
      loading: false,//加载动画
      activeName:'first',
//      dialogPush:false,//控制显不显示
      nameEmail:'',//人脉的邮箱(一个)
      user_real_name:'李欣欣',
      user_company_career:'',
      user_company_name:'上海真格基金有限公司',
      projectList:[],//推送项目


      options4: [],
      value9: [],
      list: [],

      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"]


    }
  },
  methods: {
    cancel(){
      this.$emit('changeall',false);
    },
    remoteMethod(query) {
      if (query !== '') {
        this.load = true;
        setTimeout(() => {
          this.load = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
}
</script>

<style lang="less">
  @import '../../../assets/css/mycontacts';
</style>
