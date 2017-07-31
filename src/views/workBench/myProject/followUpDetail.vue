<template>
  <div id="followUpDetail" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div  class="followDetail" v-for="item in content" >
      <!--信息介绍-->
      <div class="followItem" style="margin-top: 0px">
        <div class="item-cicle">
          <div class="item-cicle1"></div>
        </div>
         <div class="item-time">05.04&nbsp;18:34</div>
        <div class="item-name">{{item.follow_user_name}}</div>
        <div class="item-edit">
          <div class="item-edit1 item-right">修改</div>
          <div class="item-edit1">删除</div>
        </div>
      </div>
      <!--信息内容介绍-->
      <div class="followContent">
        <div class="followProject">
            <span>关联项目&nbsp;:&nbsp;</span>
            <span>{{pro_id}}</span>
            <span style="display: inline-block;margin-left: 150px">意向投资人&nbsp;:&nbsp;</span>
            <span>{{item.investor_name}}</span>
            <span class="followProject1" style="display: inline-block;line-height: 24px">{{item.schedule.schedule_name}}</span>
        </div>
        <div class="followContent1">{{item.follow_desc}}</div>
        <!--信息文件名-->
        <div class="followFile" v-for="file in item.follow_file">
          <span>{{file.file_title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import '../../../assets/css/followUpDetail';
</style>
<script type="text/ecmascript-6">

export default {
  props: ["proid"],
  data () {
    return {
      pro_id: this.proid,
      loading:false,//加载
      content:{},
    }
  },
  methods: {
  },
  created(){
   this.$http.post(this.URL.getProjectFollowList,{
      user_id:localStorage.user_id,
      project_id:this.pro_id,
    }).then(res=>{
     let data = res.data.data;
//      this.$tool.console('跟进记录详情列表')
//      this.$tool.console(res)
     this.content=data;
    })
  },
  watch : {
    proid : function(e){
      this.pro_id=e;
    },//获取项目id
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/followUpDetail';
</style>
