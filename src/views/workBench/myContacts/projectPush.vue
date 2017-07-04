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
          <el-select v-model="projectList" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

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
//      dialogPush:false,//控制显不显示
      nameEmail:'',//人脉的邮箱(一个)
      user_real_name:'李欣欣',
      user_company_career:'',
      user_company_name:'上海真格基金有限公司',
      projectList:[],//推送项目


    }
  },
  methods: {
    cancel(){
      this.$emit('changeall',false);
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/mycontacts';
</style>
