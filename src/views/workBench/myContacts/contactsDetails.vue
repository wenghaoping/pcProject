<template>
  <div id="contactsDetails">
  <h1>我是人脉详情</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      contacts:{
        user_id:'',//id
      }
    }
  },
  methods: {
    getUserId(){
      this.contacts.user_id=this.$route.query.user_id;
    },
  },
  created(){
      this.getUserId();
  }
}
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/contactsDetails';
</style>
