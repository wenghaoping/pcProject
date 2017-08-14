<template>
  <div id="followUpDetail" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div  class="followDetail" v-for="(item,index) in content" >
      <!--信息介绍-->
      <div class="followItem" style="margin-top: 0px">
        <div class="item-cicle">
          <div class="item-cicle1"></div>
        </div>
        <div class="item-time">{{item.follow_time}}</div>
        <div class="item-name">{{item.follow_user_name}}</div>
        <div class="item-edit">
          <el-button
            type="text"
            size="small"
            class="item-edit1 item-right" style="line-height: 19px" @click="addFollow(index)">
            修改
          </el-button>
          <el-button type="text" class="item-edit1" @click="deleteFollowId(index)">删除</el-button>
        </div>
      </div>
      <!--信息内容介绍-->
      <div class="followContent">
        <div class="followProject">
          <span style="display: inline-block;float: left;position: relative;">关联项目&nbsp;:&nbsp;</span>
          <el-tooltip class="item" effect="dark"  placement="top" :disabled="pro_name.length > 10 ? false:true">
            <div slot="content">
              <div class="tips-txt">{{pro_name}}</div>
            </div>
            <span style="width:180px;max-width:200px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;display:inline-block;float: left">{{pro_name}}</span>
          </el-tooltip>
          <span style="display: inline-block;margin-left: 90px;float: left;position: relative;" v-show="item.investor_name!=''">意向投资人&nbsp;:&nbsp;</span>
          <el-tooltip class="item" effect="dark"  placement="top" :disabled="item.investor_name.length > 4 ? false:true">
            <div slot="content">
              <div class="tips-txt">{{item.investor_name}}</div>
            </div>
            <span style="width:58px;max-width:58px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;display:inline-block;float: left;text-align: center">{{item.investor_name}}</span>
          </el-tooltip>
          <span class="followProject1" style="display: inline-block;line-height: 24px;float: left;margin-top: 11px">{{item.schedule.schedule_name}}</span>
        </div>
        <div v-show=" item.follow_desc!=''|| item.follow_file.length!=''"  class="followLine"></div>
        <div class="followContent1" >{{item.follow_desc}}</div>
        <!--信息文件名-->
        <div class="followFile" v-for="(file,item1) in item.follow_file" :key="file.id">
          <span @click.prevent="upload(item1,index)" style="cursor: pointer">{{file.file_title}}.{{file.file_ext}}</span>
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
    </div>
    <!--分页-->
    <el-pagination
      class="pagination fr"
      small
      @current-change="filterChangeCurrent"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :page-size="10"
      :total="totalData" v-show="this.totalData!==0">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
    },
    props: ["proid","proName","getDataTrue"],
    data () {
      return {
        newTime:'',
        dialogFollow:false,//控制写跟进弹框
        pro_id: this.proid,
        pro_name:"",//关联项目
        loading:false,//加载
        loading1:false,//加载动画
        content:{},//跟进记录数据
        dialogVisible: false,
        followid:'',//跟进记录id
        currentPage:1,//跟进列表当前第几页
        totalData:0,//跟进列表总数
        getData1:{},//获取跟进的请求参数
      }
    },
    methods: {
      upload(item1,index){
        let fileId=this.content[index].follow_file[item1].file_id;
        const url=this.URL.weitianshi+this.URL.download+"?user_id="+localStorage.user_id+"&file_id="+fileId;
        window.location.href=url;
      },//下载
      filterChangeCurrent(page){
        this.getProjectFollowList(page);
      },//控制项目页码1
      getProjectFollowList(page){
        this.loading1=true;
        this.getData1.user_id=localStorage.user_id;
        this.getData1.project_id=this.pro_id;
        this.currentPage=page;
        this.getData1.page=page;
        this.$http.post(this.URL.getProjectFollowList,this.getData1)
          .then(res=>{
            if(res.data.status_code==2000000) {
              let data = res.data.data;
//              this.$tool.console("获取跟进记录")
              this.setDateTime(data);//时间格式设置
              this.content=data;
//              this.$tool.console(this.content);
//              console.log(this.content);
              this.totalData = res.data.count;
            }
            this.loading1 = false;
          })
          .catch(err=>{
//            this.$tool.console(err,2);
            this.loading1=false;
            this.$tool.error("加载超时");
          })
      },//获取跟进记录
      setDateTime(data){
        for (let i = 0; i < data.length; i++) {
          data[i].follow_time=new Date(data[i].follow_time*1000).toLocaleString('chinese',{hour12:false}).substr(0, 15).replace(/\//g,'.').replace(/:$/,"");
        }
//        console.log(data[i].follow_time);
      },
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
          follow_id:this.followid
        }).then(res=>{
          this.$tool.success('删除成功');
          this.getProjectFollowList();
          this.$emit('changefollowdata',true)
        })
      },//删除跟进记录
      deleteFollowId(index){
        this.dialogVisible  = true;
        this.followid=this.content[index].follow_id;

      },//获取删除记录id
      addFollow(index){
        this.dialogFollow=true;
        this.followid=this.content[index].follow_id;
        this.getProjectFollowList();
        this.$emit("getfollowid",this.content[index].follow_id);
      },//点击写跟近按钮
    },
    created(){
      this.$tool.getTop();
      this.getProjectFollowList(1);
    },
    watch : {
      proid : function(e){
        this.pro_id=e;
      },//获取项目id
      proName : function(e){
        this.pro_name=e;
      },//获取关联项目
      getDataTrue : function (e) {
        if(e){
          this.getProjectFollowList();
          this.followid="";
          this.$emit('changefollowdata',true)
        }
      },//是否重新获取数据
    }
  }
</script>

<style lang="less">
  @import '../../../assets/css/followUpDetail';
  .el-dialog--tiny{
    width:44%;
    box-shadow: none;
  }
</style>
