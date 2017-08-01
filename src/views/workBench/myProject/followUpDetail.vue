<template>
  <div id="followUpDetail" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div  class="followDetail" v-for="item in content" >
      <!--信息介绍-->
      <div class="followItem" style="margin-top: 0px">
        <div class="item-cicle">
          <div class="item-cicle1"></div>
        </div>
         <div class="item-time">{{new Date((item.follow_time)* 1000).toLocaleString().replace(/[\u4E00-\u9FA5]/g,'').substr(0, 25)}}</div>
        <div class="item-name">{{item.follow_user_name}}</div>
        <div class="item-edit">
          <div class="item-edit1 item-right" style="line-height: 32px">修改</div>
          <!--<div >删除</div>-->
          <el-button type="text" class="item-edit1" @click="dialogVisible = true">删除</el-button>
          <el-dialog
            title="删除"
            :visible.sync="dialogVisible"
            size="tiny"
            :before-close="handleClose">
            <div class="el-message-box__status el-icon-warning"></div>
            <span style="display: inline-block;margin-left: 44px;">您确认要删除当前项目跟进记录及关联文件吗？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
          </el-dialog>
        </div>
      </div>
      <!--信息内容介绍-->
      <div class="followContent">
        <div class="followProject">
            <span>关联项目&nbsp;:&nbsp;</span>
            <span style="max-width:200px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{pro_id}}</span>
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
  .el-dialog--tiny{
    width:44%;
    box-shadow: none;
  }
</style>
<script type="text/ecmascript-6">

export default {
  props: ["proid"],
  data () {
    return {
      pro_id: this.proid,
      loading:false,//加载
      content:{},
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
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
