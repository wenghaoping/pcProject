<template>
  <div id="test">
    <!--上传-->
    <el-row :span="8">
      <el-col :span="8">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/api/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-seccess="success"
          :on-error="err"
          :on-change="handleChange"
          :thumbnail-mode="true"
          :data="form"
          :file-list="fileList"
          :auto-upload="false"
          multiple>
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>



    <!--    <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>-->


  </div>
</template>

<script type="text/ecmascript-6">
  import {tool} from '../assets/js/tool.js'
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    name: 'hello',
    data() {
      return {
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            status: 'finished'
          }
        ],
        form :{data:"我只是个参数",data1:"我只是个参数1",data2:"我只是个参数2"}

      }
    },
    methods: {
      create() {

      },
      onSubmit() {
        var data=this.form;

        console.log(this.$tool.getToObject(data));
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(this.$tool.getToObject(file));
        console.log(this.$tool.getToObject(fileList));
      },
      handlePreview(file) {
        console.log(this.$tool.getToObject(file));
      },
      success(response, file, fileList){
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
      err(err, file, fileList){
        console.log(this.$tool.getToObject(err))
        console.log(this.$tool.getToObject(file))
        console.log(this.$tool.getToObject(fileList))
      },
      handleChange(file, fileList) {
        console.log(this.$tool.getToObject(file))
        console.log(this.$tool.getToObject(fileList))

      }
    }
  }
</script>

<style lang="less">


</style>
