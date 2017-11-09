<template>
    <div id="addproject" v-loading.fullscreen="loading" element-loading-text="正在登陆中">

    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        loading: true,
        project_id: '',
        show: ''

      };
    },
    computed: {},
    mounted () {

    },
    // 组件
    components: {

    },
    methods: {},
    // 当dom一创建时
    created () {
      if (this.$route.path === '/skipToPc') {
        this.project_id = this.$route.query.project_id || '';
        this.show = this.$route.query.show || '';
        this.type = this.$route.query.type || '';
        localStorage.user_id = this.$route.query.user_id || '';
        localStorage.token = this.$route.query.token || '';
        this.getCheckUserInfo(this.$route.query.user_id)
          .then((data) => {
            if (this.type === 'project_list') {
              return this.$router.push({name: 'myProject', query: {activeTo: 0}});
            } else if (this.type === 'user_detail') {
              return this.$router.push({name: 'personalInformation'}); // 个人信息
            } else {
              return this.$router.push({name: 'projectDetails', query: {project_id: this.project_id, show: this.show}});
            }
          });
      }
    },
    watch: {

    }
  };
</script>

<style>

</style>
