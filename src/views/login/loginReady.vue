<template>
    <div id="loginReady" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        loading:false,
      }
    },
    methods: {

    },
    created(){
      this.loading=true;
      var that=this;
      var a='';
      if(localStorage.entrance){
        a=localStorage.entrance
      }else{
        a='myProject'
      }
      console.log(this.$route.query);
      localStorage.user_id=this.$route.query.id;
      localStorage.user_real_name=this.$route.query.name;
      setTimeout(function(){
        that.$router.push({name:a});
        that.loading=false;
      },100)
    }
  }
</script>

<style scoped lang="less">

</style>
