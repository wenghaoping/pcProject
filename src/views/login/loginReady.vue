<template>
    <div id="loginReady">
      <div>这里是loginReady</div>
    </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {

      }
    },
    methods: {

    },
    created(){
      var that=this;
      console.log(this.$route.query)
      localStorage.user_id=this.$route.query.id;
      localStorage.user_real_name=this.$route.query.name;
      setTimeout(function(){
        that.$router.push({name:localStorage.entrance})
      },2000)
    }
  }
</script>

<style scoped lang="less">

</style>
