<template>
  <div id="samllRoutine">
      <div class="scan">
        <p class="title">微天使，帮您成交的项目管理工具</p>
        <p class="samll">扫一扫，快速创建融资项目</p>
        <div class="img">
          <img src="../../assets/images/weixin.png">
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'samllRourine',
  data () {
    return {
      msg: ''
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
html{  }
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
      width: 162px;
      height: 162px;
      display: block;
      margin: 24px auto 0;
    }
  }

}
</style>
