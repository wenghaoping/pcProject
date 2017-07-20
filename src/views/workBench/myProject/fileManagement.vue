<template>
  <div id="fileManagement" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <button class="aa">111111111</button>
    <el-collapse  v-model="activeNames">
      <el-collapse-item>
        <template slot="title">
          <span class="clearfix">
            商业计划书(<span>1</span>)
            <div class="fr">
              <button @click.stop="bpUpload"><i class="header-icon el-icon-information">上传文件</i></button>
            </div>
          </span>
        </template>
        <div>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <span class="clearfix">
            商业计划书(<span>1</span>)
            <div class="fr">
              <button @click.stop="bpUpload"><i class="header-icon el-icon-information">上传文件</i></button>
            </div>
          </span>
        </template>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["proid"],
  data () {
    return {
      pro_id: '',
      loading:false,//加载
      activeNames:['1']//
    }
  },
  methods: {
    //bpUpload
    bpUpload(){
      console.log('bp')
    },
  },
  created(){

  },
  watch : {
    proid : function(e){
      this.pro_id=e;

    },//获取项目id
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/fileManagement';
</style>
