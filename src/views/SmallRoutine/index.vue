<template>
  <div id="samllRoutine">
      <div class="scan">
        <p class="title">微天使，帮您成交的项目管理工具</p>
        <p class="samll">扫一扫，快速创建融资项目</p>
        <div class="img">
          <vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>
        </div>
        <br/>
        <br/>
        <br/>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="change">更换验证码尝试</el-button>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import VueQArt from 'vue-qart'
export default {
  data () {
    return {
      input: '',
      config: {
        value: 'https://www.baidu.com',
        imagePath: '../../../static/170.png',
        filter: 'color'
      },
      downloadButton: false
    }
  },
  methods: {
    change(){
      this.config.value=this.input
    }
  },
  components: {
      VueQArt
  }
}
</script>

<style scoped lang="less">
#samllRoutine{
  background: #f3f4f8;
  font-family:PingFangSC-Regular;
  padding-top: 156px;
  padding-bottom: 312px;
  .scan{
    box-shadow:0 4px 4px 0 rgba(64,88,122,0.10);
    border-radius:4px;
    width:410px;
    height:410px;
    text-align: center;
/*    margin: 156px auto 0;*/
    margin:auto;
    background: #ffffff;
    .title{
      font-size:20px;
      color:#1f2d3d;
      line-height:20px;
      padding-top: 40px;
    }
    .samll{
      font-size:13px;
      color:#5e6d82;
      line-height:13px;
      margin-top: 71px;
    }
    .img{
      width: 195px;
      height: 195px;
      display: block;
      margin: 24px auto 0;
    }
  }

}
</style>
