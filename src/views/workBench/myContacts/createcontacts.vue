<template>
  <div id="createcontacts">
<!--    <div class="contain-center edit-page">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box">
        <div class="left-wrap">
          &lt;!&ndash;=================================基本资料=================================&ndash;&gt;
          <div class="item-block" style="margin-top:0;padding-bottom: 10px;">
            <div class="block-tt-line">
              <span class="b-title">基本资料</span>
              <span class="b-line" style="width: 624px;"></span>
            </div>
            <div class="block-info block-cc-file" style="margin-top: 48px;">
              <span class="f-title fl">商业计划书</span>
              <span style="margin-left: 20px;" class="fl">
                <el-upload class="Upload"
                           ref="upload"
                           action="/project/projectUpload"
                           :on-change="planChange"
                           :on-success="planuploadsuccess"
                           :on-preview="planPreview"
                           :on-remove="planRemove"
                           :on-error="planuploaderror"
                           :file-list="planList"
                           :before-upload="beforeUpload"
                           accept=".doc, .ppt, .pdf, .zip, .rar, .docx, .pptx"
                           :data="uploadDate">
                  <el-button slot="trigger" type="primary" v-show="planButton" class="fl"><i class="el-icon-plus"></i>上传附件</el-button>
                  <div slot="tip" class="el-upload__tip fr" v-show="planButton">BP私密保护，认证投资人需要向您申请并得到同意后才能查看<br>支持pdf、ppt、pptx、doc、docx、zip、rar文件格式</div>
                </el-upload>
              </span>

            </div>
            <el-form :model="project" ref="project" label-width="100px" class="padding" label-position="top">
              <el-row :span="24" :gutter="32">
                <el-col :span="12">
                  <span class="justIlook">(仅自己可见)</span>
                  <el-form-item
                    label="项目名称"
                    prop="pro_name">
                    <el-input v-model="project.pro_name" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <span class="justIlook2">(仅自己可见)</span>
                  <el-form-item
                    label="公司名称"
                    prop="pro_company_name">
                    <el-autocomplete v-model="project.pro_company_name"
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
        </div>
      </div>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {

  }
}
</script>

<style lang="less">

</style>
