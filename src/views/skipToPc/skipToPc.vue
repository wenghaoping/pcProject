<template>
    <div id="addproject" v-loading.fullscreen="loading" element-loading-text="正在登陆中">

    </div>
</template>

<script type="text/ecmascript-6">


    export default {
        data(){
            return {
                loading: true,
              project_id:"",
              show : "",

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
          if(this.$route.path==='/skipToPc') {
            this.project_id = this.$route.query.project_id || '';
            this.show = this.$route.query.show || '';
            localStorage.user_id = this.$route.query.user_id || '';
            localStorage.token = this.$route.query.token || '';
            this.getCheckUserInfo(localStorage.user_id);
          }

          if(!localStorage.user_id) {
            //没有登录的人去登录
            this.$router.push({name:'login'});
            this.loading=false;
          }else{
            setTimeout(()=>{this.$router.push({ name: 'projectDetails', query: { project_id:this.project_id,show:this.show}});},50);
          }

        },
        watch: {

        }
    }
</script>

<style>

</style>
