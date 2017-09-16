<template>
  <div id="iosBanner">
    <div class="titleTo">
    </div>
    <div class="iosBanner">
      <img src="../../assets/images/jump.jpg">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


  export default {
    data(){
      return {


      };
    },
    computed: {},
    mounted() {

    },
    //组件
    components: {

    },
    methods: {},
    //当dom一创建时
    created(){

    },
    watch: {

    }
  }
</script>

<style  lang="less">
  #iosBanner {
  .titleTo{
    height: 60px;
    width:100%;
    background: #f3f4f8;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9999;
  }
    .iosBanner {
      width: 750px;
    margin: 0 auto;
    }
  }
</style>
