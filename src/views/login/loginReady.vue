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
      localStorage.user_id=this.$route.query.id;
      localStorage.user_real_name=this.$route.query.name;
      this.$router.push({name:localStorage.entrance})
    }
  }
</script>

<style scoped lang="less">

</style>
