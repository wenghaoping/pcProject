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
      console.log(this.$route.query)
      sessionStorage.user_id=this.$route.query.id;
      sessionStorage.user_real_name=this.$route.query.name;
      this.$router.push({name:sessionStorage.entrance})
    }
  }
</script>

<style scoped lang="less">

</style>
