/**
 * Created by WengHaoping on 2017/7/3.
 */
this.$http.post(this.URL.getCrawlerBrand, {
  user_id: localStorage.user_id,
  com_id: this.comid
})
  .then(res => {
    let data=res.data.data;
    this.business=data;
    this.trademarkMessage="商标信息"+"("+data.brand.length+")"
  })
  .catch(err => {
    this.$tool.console(err);
  })//请求函数

this.$router.push({name: 'projectDetails', query: {project_id: this.project_id}})//路由传参

/*================输入框================*/
// <el-input v-model="input" placeholder="请输入内容"></el-input>

/*================浮层================*/

/*<el-dialog
title="提示"
:visible.sync="dialogVisible"
size="tiny"
:before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible = false">取 消</el-button>
<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
</span>
</el-dialog>*/

/*================加载动画================*/

// v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中"



