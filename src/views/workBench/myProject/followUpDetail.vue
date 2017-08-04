<template>
  <div id="followUpDetail" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div  class="followDetail" v-for="(item,index) in content" >
      <!--信息介绍-->
      <div class="followItem" style="margin-top: 0px">
        <div class="item-cicle">
          <div class="item-cicle1"></div>
        </div>
         <div class="item-time">{{new Date((item.follow_time)* 1000).toLocaleString().replace(/[\u4E00-\u9FA5]/g,'').substr(0, 25).replace(/\//g,'.')}}</div>
        <div class="item-name">{{item.follow_user_name}}</div>
        <div class="item-edit">
          <el-button
            type="text"
            size="small"
            class="item-edit1 item-right" style="line-height: 19px" @click="addFollow(index)">
            修改
          </el-button>
          <!--<div >删除</div>-->
          <el-button type="text" class="item-edit1" @click="deleteFollowId(index)">删除</el-button>
        </div>
      </div>
      <!--信息内容介绍-->
      <div class="followContent">
        <div class="followProject">
            <span style="display: inline-block;float: left">关联项目&nbsp;:&nbsp;</span>
            <span style="max-width:200px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;display:inline-block;float: left">{{pro_name}}</span>
            <span style="display: inline-block;margin-left: 90px;float: left">意向投资人&nbsp;:&nbsp;</span>
            <span style="display: inline-block;float: left">{{item.investor_name}}</span>
            <span class="followProject1" style="display: inline-block;line-height: 24px;float: left;margin-top: 11px">{{item.schedule.schedule_name}}</span>
        </div>
        <div class="followContent1">{{item.follow_desc}}</div>
        <!--信息文件名-->
        <div class="followFile" v-for="(file,item1) in item.follow_file" :key="file.id">
          <span @click.prevent="upload(item1,index)" style="cursor: pointer">{{file.file_title}}</span>
        </div>
      </div>
      <!--确认删除弹框-->
      <el-dialog
        title="删除"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose">
        <div class="el-message-box__status el-icon-warning"></div>
        <span style="display: inline-block;margin-left: 44px;">您确认要删除当前项目跟进记录及关联文件吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteFollow">确 定</el-button>
        </span>
      </el-dialog>
      <!--写跟进弹框-->
      <addfollow :dialog-follow="dialogFollow" :followid="followid" :get-data="getData" @changeClose="closeFollow"></addfollow>
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
  import addfollow from '../followUp/addFollow.vue'
export default {
  components: {
    addfollow
  },
  props: ["proid","proName"],
  data () {
    return {
      dialogFollow:false,//控制写跟进弹框
      pro_id: this.proid,
      pro_name:"",//关联项目
      loading:false,//加载
      content:{},//跟进记录数据
      dialogVisible: false,
      followId:'',//删除跟进记录id
      followid:'',//编辑跟进记录id
    }
  },
  methods: {
    upload(item1,index){
      let fileId=this.content[index].follow_file[item1].file_id;
      const url=this.URL.weitianshi+this.URL.download+"?user_id="+localStorage.user_id+"&file_id="+fileId;
      window.location.href=url;
     console.log(fileId,url);
    },
    getData(){
        this.$http.post(this.URL.getProjectFollowList,{
          user_id:localStorage.user_id,
          project_id:this.pro_id,
        }).then(res=>{
          let data = res.data.data;
//          this.$tool.console(res)
          this.content=data;
        })
      },//获取跟进记录
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },//弹框消息提示
    deleteFollow(){
     this.dialogVisible = false;
      this.$http.post(this.URL.delete_follow_record,{
          user_id:localStorage.user_id,
          follow_id:this.followId
      }).then(res=>{
         this.$tool.success('删除成功');
         this.getData();
      })
    },//删除跟进记录
    deleteFollowId(index){
        this.dialogVisible  = true;
        this.followId=this.content[index].follow_id;
    },//获取删除记录id
    addFollow(index){
      this.dialogFollow=true;
      this.followid=this.content[index].follow_id;
      this.getData();
    },//点击写跟近按钮
    closeFollow(msg){
      this.dialogFollow=msg;
      this.followid="";
    },//关闭添加跟进
  },
  created(){
    this.getData()
  },
  watch : {
    proid : function(e){
    this.pro_id=e;
  },//获取项目id
    proName : function(e){
      this.pro_name=e;
    },//获取关联项目
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/followUpDetail';
</style>
