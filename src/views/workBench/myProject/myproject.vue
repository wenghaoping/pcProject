<template>
  <div id="myproject">
    <div class="wrap-left fl" style="">
      <div class="top-big-progress">
        <div class="pp-item pp-node pp-start" :class="{'pp-cur':node0}" @click="setNode('0')">
          <p class="pp-num pp-txt">{{nodeCount.whole}}</p>
          <span class="pp-sec-title">全部项目</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
        </div>
        <div class="pp-item pp-node" :class="{'pp-cur':node1}" @click="setNode('1')">
          <p class="pp-num pp-txt">{{nodeCount.clue}}</p>
          <span class="pp-sec-title">项目线索</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
          <el-tooltip placement="top" :class="{'pp-cur':node2}" >
            <div slot="content">
              <div style="width:50px;text-align: center;">约谈 : {{nodeCount.interview}} </div>
            </div>

              <span class="circle circle-0" @click="setNode('2')">
                <span class="getClick"></span>
            </span>
          </el-tooltip>
        </div>
        <div class="pp-item pp-node" :class="{'pp-cur':node4}" @click="setNode('4')">
          <p class="pp-num pp-txt">{{nodeCount.sign}}</p>
          <span class="pp-sec-title">FA签约</span>
        </div>
        <div class="pp-item pp-lines">
          <span class="lp-line">&nbsp;</span>
          <el-tooltip placement="top" :class="{'pp-cur':node5}" >
            <div slot="content">
              <div style="width:100px;text-align: center;">引荐投资方 : {{nodeCount.recommended}} </div>
            </div>
            <span class="circle circle-1" @click="setNode('5')">
              <span class="getClick"></span>
            </span>
          </el-tooltip>

          <el-tooltip placement="top" :class="{'pp-cur':node6}" >
            <div slot="content">
              <div style="width:80px;text-align: center;">投资协议 : {{nodeCount.agreement}} </div>
            </div>
            <span class="circle circle-2" @click="setNode('6')">
              <span class="getClick"></span>
            </span>
          </el-tooltip>

          <el-tooltip placement="top" :class="{'pp-cur':node7}" >
            <div slot="content">
              <div style="width:50px;text-align: center;">交割 : {{nodeCount.delivery}} </div>
            </div>
            <span class="circle circle-3" @click="setNode('7')">
              <span class="getClick"></span>
            </span>
          </el-tooltip>

          <el-tooltip placement="top" :class="{'pp-cur':node8}">
            <div slot="content">
              <div style="width:80px;text-align: center;">待收佣金 : {{nodeCount.collect}} </div>
            </div>
            <span class="circle circle-4"  @click="setNode('8')">
              <span class="getClick"></span>
            </span>
          </el-tooltip>

        </div>
        <div class="pp-item pp-node" :class="{'pp-cur':node9}" @click="setNode('9')">
          <p class="pp-num pp-txt">{{nodeCount.revenue}}</p>
          <span class="pp-sec-title"  >佣金收讫</span>
        </div>
      </div>
      <div class="clearfx"></div>
      <div class="top-search-box">
        <div class="input-box">
          <el-input
            placeholder="搜索项目、公司名称"
            icon="search"
            v-model="searchinput"
            :on-icon-click="handleIconClick"
            @keyup.native.enter="handleIconClick">
          </el-input>
        </div>
        <div class="btns-box">
          <el-button type="primary" @click="uploadAll">批量上传项目</el-button>
          <el-button type="primary" @click="createProject">创建项目</el-button>


        </div>
      </div>
      <div class="top-lists" style="cursor: pointer">
          <template>
            <el-table :data="tableData" style="width: 100%"
                      @row-click="handleSelect"
                      @header-click="headerClick"
                      @sort-change="filterChange"
                      @filter-change="filterChange" stripe
                      v-loading="loading"
                      element-loading-text="拼命加载中">
            <el-table-column prop="pro_name" label="项目名称" width="170" show-overflow-tooltip>
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_name.length > 14 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_name}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_name}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_name.length === 0">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_intro" label="一句话介绍" width="222">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_intro.length > 14 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_intro}}</div>
                  </div>
                  <span class="pro_intro" :class="{ prointro: scope.row.pro_intro.length < 15, prointrolone: scope.row.pro_intro.length >= 15 }">
                    {{scope.row.pro_intro}}
                  </span>
                </el-tooltip>
              </template>
            </el-table-column>



            <el-table-column prop="pro_source" label="项目来源" width="96" :filters="pro_sourceFilters"
                             filter-placement="bottom-end"
                             column-key="pro_source"
                             show-overflow-tooltip>
              <template scope="scope">
                <div v-if="scope.row.pro_source.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_source.length > 0">
                  {{scope.row.pro_source}}
                </div>
              </template>
            </el-table-column>

<!--            <el-table-column prop="pro_follow_up_user" label="跟进人" width="96" show-overflow-tooltip>
            </el-table-column>-->

            <el-table-column prop="pro_schedule" label="项目进度" width="96" :filters="pro_scheduleFilters"
                             filter-placement="bottom-end"
                             :filter-multiple="stateCheck"
                             column-key="pro_schedule"
                             sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.pro_schedule==''">
                  -
                </div>
                <div else>
                  {{scope.row.pro_schedule}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_industry" label="领域" width="166"
                             :filters="pro_industryFilters"
                             filter-placement="bottom-end"
                             show-overflow-tooltip
                             column-key="pro_industry">
              <template scope="scope">
                <el-tooltip placement="top" :disabled="scope.row.pro_industry.length > 8 ? false:true">
                  <div slot="content">
                    <div class="tips-txt">{{scope.row.pro_industry}}</div>
                  </div>
                  <div>
                    {{scope.row.pro_industry}}
                  </div>
                </el-tooltip>
                <div v-if="scope.row.pro_industry==''">
                  -
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="is_exclusive" label="是否独家" width="98" :filters="soleFilters"
                             filter-placement="bottom-end" sortable="custom" column-key="is_exclusive">
              <template scope="scope">

                <el-tag :type="scope.row.is_exclusive === '独家' ? 'primary' : scope.row.is_exclusive === '非独家'  ? 'success':'gray' " close-transition>
                     <div v-if="scope.row.is_exclusive.length === 0">
                       -
                     </div>
                     <div else>
                       {{scope.row.is_exclusive}}
                     </div>
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="pro_stage" label="轮次" width="80" :filters="pro_stageFilters"
                             filter-placement="bottom-end"
                             sortable="custom" column-key="pro_stage">
              <template scope="scope">
                <div v-if="scope.row.pro_stage.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_stage.length > 0">
                  {{scope.row.pro_stage}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_area" label="地区" width="80"
                             column-key="pro_area"
                             :filters="pro_areaFilters"
                             filter-placement="bottom-end"
                             sortable="custom">
              <template scope="scope">
                <div v-if="scope.row.pro_area.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_area.length > 0">
                  {{scope.row.pro_area}}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="pro_scale" label="期望融资" width="102"
                             :filters="pro_scaleFilters"
                             filter-placement="bottom-end"
                             column-key="pro_scale"
                             :filter-multiple="stateCheck">
              <template scope="scope">
                <div v-if="scope.row.pro_scale.length === 0">
                  -
                </div>
                <div v-if="scope.row.pro_scale.length > 0">
                  {{scope.row.pro_scale}}
                </div>
              </template>
            </el-table-column>

              <el-table-column prop="created_at" label="创建时间" width="96" show-overflow-tooltip
                               sortable="custom" column-key="created_at">
                <template scope="scope">
                  <el-tooltip placement="top" :disabled="scope.row.created_at.length > 5 ? false:true">
                    <div slot="content">
                      <div class="tips-txt">{{scope.row.created_at}}</div>
                    </div>
                    <div>
                      {{scope.row.created_at}}
                    </div>
                  </el-tooltip>
                  <div v-if="scope.row.created_at.length === 0">
                    -
                  </div>
                </template>
              </el-table-column>
            <el-table-column
              prop="reset"
              label="重置"
              width="130" class="set-th">
              <template scope="scope">
                <el-button
                  @click="handleEdit(scope.$index, scope.row)"
                  type="text"
                  size="small" class="edits-btn btn-cur">
                  编辑
                </el-button>
                <el-button
                  @click="addFollow(scope.$index, scope.row)"
                  type="text"
                  size="small" class="flow-btn btn-cur">
                  跟进
                </el-button>
                <el-button
                  @click="addprojectPush(scope.$index, scope.row)"
                  type="text"
                  size="small" class="send-btn btn-cur">
                  推送
                </el-button>
                <el-button
                  type="text"
                  size="small" class="send-btn btn-cur">
                  <img src="../../../assets/images/more.png" alt="" class="more">
                </el-button>
                <el-select v-model="scope.row.moreShow" placeholder="请选择" @change="moreChange(scope.$index, scope.row)">
                  <el-option
                    v-for="item in moreList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagenav" v-if="totalData>10">
            <el-pagination
              small
              @current-change="filterChangeCurrent"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="totalData">
            </el-pagination>
          </div>
        </template>
      </div>
    </div>

    <!--上传弹框-->
    <alertUpload :upload-display="uploadDisplay"
                 @uploadDisplayChange="uploadDisplayChange"
                 @reload="handleIconClick"></alertUpload>
    <!--写跟进弹框-->
    <addfollow :follow-display="followDisplay" :projectid="projecmessage.project_id" :projectname="projecmessage.project_name"
               @closeFollow="closeFollow"></addfollow>

    <!--项目推送项目入口弹窗-->
    <projectpushtopro :project-push-show2="projectPushDisplay2" :proid="pushId" :pro-intro="pushIntro" :emitPush="emitPush"
                  @openPreview="openPreview"
                  @closeProjectPush2="closeProjectPush2"
                  @previewPush="previewPush"
    ></projectpushtopro>

    <!--项目预览弹窗-->
    <projectpreview :preview-show="previewDisplay" :comeFrom="'project'"
                    @closePreview="closePreview"
                    @closePreviewANDProjectPush="closePreviewANDProjectPush"
                    @previewPush="previewPush"></projectpreview>

<!--    <div class="page-grid wrap-right contain-right-2 fl">
      <div class="main-box">
        <div class="title-box">
          <span class="lit-line"></span>
          <span class="title">动态记录</span>
          <span class="lit-line"></span>
        </div>
      </div>
    </div>-->
    <!--<div style="width: 200px;height: 200px;background: red; position: fixed;bottom: 0;right:0;"></div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
  import alertUpload from './alertUpload.vue';
  import addfollow from './../followUp/addFollow.vue';
  import projectpushtopro from './projectPushToPro.vue';
  import projectpreview from '../myContacts/projectPreview.vue';
  export default {
    components: {
      ElButton,
      alertUpload,
      addfollow,
      projectpreview,
      projectpushtopro
    },
    data() {
      return {
        followDisplay:false,//控制写跟进弹框
        projectPushDisplay2:false,//项目推送弹窗
        projecmessage:{
          project_id:'',
          project_name:''
        },//项目名称,ID,跟进弹窗用
        tableData: [
/*            {
          pro_name: '公司名称公司名称公司名称公司名称',
          pro_intro:'我是项目介绍我是项目介绍我是项目介绍我是项目介绍',
          pro_company_name: '',
          pro_source: '我是项目来源1',
          pro_follow_up_user: '迪丽热巴',
          pro_schedule:'跟进状态1',
          pro_industry:'大数据、社交通讯，电商平台，教育培训',
          is_exclusive:'独家',
          pro_stage:'IPO上市后',
          pro_area:'北京',
          pro_scale:'3000万',
          project_id:''
        }*/
        ],
        pro_sourceFilters:[
/*            { text: '约谈', value: '约谈' }*/
            ],
        pro_scheduleFilters:[
 /*{ text: '项目线索', value: '项目线索' }*/
            ],
        pro_industryFilters:[/*{ text: '大数据服务', value: '大数据服务' }*/],
        soleFilters:[{ text: '独家', value:1},{ text: '非独', value:2},{ text: '其他', value:0}],
        pro_stageFilters:[/*{ text: 'IPO上市后', value: 'IPO上市后' }*/],
        pro_areaFilters:[],
        pro_scaleFilters:[/*{ text: '3000万', value: '3000万' }*/],
        stateCheck:false,//状态单选
        searchinput:'',//搜索输入框
        uploadDisplay: false,//上传弹框控制
        node0:true,
        node1:false,
        node2:false,
        node3:false,
        node4:false,
        node5:false,
        node6:false,
        node7:false,
        node8:false,
        node9:false,
        currentPage:1,//当前第几页
        totalData:0,//总数据条数
        nodeCount:{
          whole:0,//全部项目
          clue:0,//项目线索
          interview:0,//约谈
          investigate:0,//考察
          sign:0,//签署FA协议
          recommended:0,//引荐投资方
          agreement:0,//投资协议
          delivery:0,//交割
          collect:0,//待收佣金
          revenue:0//佣金收益
        },
        loading:false,
        filter:true,
        getPra:{},//筛选的请求参数
        getProjectListURL:'',//首页获取列表的URL
        moreShow:false,//更多的选项绑定
        moreList:[{
          value: '0',
          label: '删除'
        }],//更多的选项表单
        pushId:'',//推送项目传值-项目ID
        pushIntro:'',//推送项目传值-项目名称
        previewDisplay:false,//控制项目推送预览显隐
        emitPush:false,//控制项目推送-项目入口的推送函数触发
        pro_schedule:"",//筛选选项
      }
    },
    methods:{
      uploadAll(){
        this.uploadDisplay = true;
        this.zgClick("批量上传项目");
      },//批量上传项目
      handleSelect(row, event, column) {
        if(column.label!="重置"){
          this.zgClick("查看项目详情");
          this.$router.push({ name: 'projectDetails', query: { project_id:row.project_id,show:'detail'}});
          this.setRouterData();
        }
      },//跳转到项目详情页面传参数
      setRouterData(){
        this.$store.state.pageANDSelect.getPra = this.getPra;
        this.$store.state.pageANDSelect.pracurrentPage = this.currentPage;
      },//跳转之后设置参数
      getRouterData(){
        this.getPra=this.$store.state.pageANDSelect.getPra;
        this.currentPage=this.$store.state.pageANDSelect.pracurrentPage || 1;
        this.getPra.page=this.$store.state.pageANDSelect.pracurrentPage || 1;
        let node = this.$store.state.pageANDSelect.node | 0;
        for(let i=0; i<9;i++){this['node'+i] = false};
        this['node' + node] = true;
        this.searchinput = this.$store.state.pageANDSelect.proSearchinput || "";
//        console.log(this.searchinput);
        this.pro_schedule = node;
      },//从vuex中取数据


      handleEdit(index, row){
        this.zgClick("编辑项目");
        this.$router.push({ name: 'editproject', query: { project_id:row.project_id}});
        this.setRouterData();
      },//跳转到编辑页
      createProject(){
        this.zgClick("创建项目");
        this.$router.push({ name: 'creatproject'});
        this.setRouterData();
      },//跳转到创建项目页面

      uploadDisplayChange(msg){
        this.uploadDisplay=msg;
      },//控制上传弹窗



      //跟进
      addFollow(index, row){
        this.zgClick("添加跟进");
        this.followDisplay=true;
        this.projecmessage.project_id=row.project_id;
        this.projecmessage.project_name=row.pro_intro;
      },//点击写跟近按钮
      openPreview(msg){
        this.previewDisplay=msg;
      },//打开预览弹框
      closeFollow(msg){
        this.followDisplay=msg;
      },//关闭添加跟进
      addprojectPush(index, row){
        this.zgClick("项目推送");
        this.pushId=row.project_id;
        this.pushIntro=row.pro_intro;
        this.projectPushDisplay2=true;
      },//点击项目推送
      closeProjectPush2(msg){
        this.projectPushDisplay2=msg;
//        this.handleIconClick();
      },//关闭项目推送弹窗
      closePreviewANDProjectPush(msg){
        this.projectPushDisplay2=false;
        this.previewDisplay=false;
//        this.handleIconClick();
      },//关闭预览AND关闭项目推送1,关闭项目推送2

      //*请求函数
      handleIconClick(){
        this.$tool.getTop();
        this.loading=true;
        this.getPra.user_id=localStorage.user_id;
        this.getPra.search=this.searchinput;
        this.$store.state.pageANDSelect.proSearchinput = this.searchinput;
        this.currentPage=1;
        this.getPra.page=1;
        this.$http.post(this.getProjectListURL,this.getPra)
          .then(res=>{
            let data = res.data.data
            this.tableData=this.getProjectList(data);
            this.loading=false;
            this.totalData=res.data.count;
          })
          .catch(err=>{
            this.loading=false;
            this.$tool.console(err,2)
          })
      },//搜索===首次进入页面加载的数据

      filterChange(filters){
        this.loading=true;
        this.currentPage=1;
        this.getPra.user_id=localStorage.user_id;
        if(filters.pro_schedule) {
            if(parseInt(filters.pro_schedule)){
              this.setNode(parseInt(filters.pro_schedule))
            } else if(filters.pro_schedule.length=== 0) {
              this.setNode(0)
            }
        }//设置顶部样式
        if(filters.order){
          if(filters.order=="ascending") filters.order="asc"//升降序
          else filters.order="desc";
          this.getPra.order=filters.prop;
          this.getPra.sort=filters.order;
        }else{
//          let para="";
          for(let key in filters){
            /*             for(let i=0;i<filters[key].length; i++){
             if(key=="pro_source") para+=filters[key][i]+',';
              else*/
                /*para+=parseInt(filters[key][i])+',';
            }*/
//            this.getPra[key]=parseInt(para.substr(0, para.length - 1));
            this.getPra[key]=filters[key];

          }
        } //筛选
        for(let key in this.getPra){
          if(this.getPra[key]=='' || this.getPra[key]=='NaN'){
            delete this.getPra[key];
          }
        }//删除空的查询项
//        console.log(this.getPra);
        this.$http.post(this.getProjectListURL,this.getPra)
          .then(res=>{
            this.loading=false;
            let data = res.data.data;
            this.tableData=this.getProjectList(data);
            this.totalData=res.data.count;
          })
          .catch(err=>{
            this.loading=false
            this.$tool.console(err,2)
          })
      },//筛选 ascending升/descending降/
      filterChangeCurrent(page){
        delete this.getPra.page;
        this.loading=true;
        this.getPra.user_id=localStorage.user_id;
        this.getPra.page=page;//控制当前页码
        this.getPra.pro_schedule = this.pro_schedule;
        this.$http.post(this.getProjectListURL,this.getPra)
          .then(res=>{
            this.loading=false;
            let data = res.data.data;
            this.$tool.console(res);
            this.tableData=this.getProjectList(data);
            this.totalData=res.data.count;
            this.$tool.getTop();
          })
          .catch(err=>{
            this.loading=false
            this.$tool.console(err,2)
          })
      },//控制页码

      setNode(v){
        this.currentPage=1;
        this.loading=true  ;
        this.node0 = false ;
        this.node1 = false ;
        this.node2 = false ;
        this.node3 = false ;
        this.node4 = false ;
        this.node5 = false ;
        this.node6 = false ;
        this.node7 = false ;
        this.node8 = false ;
        this.node9 = false ;
        this['node' + v] = true ;
        this.$store.state.pageANDSelect.node = v;
        this.$http.post(this.getProjectListURL,{user_id: localStorage.user_id,pro_schedule:parseInt(v)})
          .then(res=>{
            this.loading=false;
            let data = res.data.data;
            this.tableData=this.getProjectList(data);
            this.totalData=res.data.count//页码
          })
          .catch(err=>{
            this.loading=false
            this.$tool.console(err,2)
          })

      },//控制顶部样式并且筛选

      headerClick(column, event){
        if(column.label==="重置"){
          window.location.reload();
        }
      },//点击重置按钮时

      getNodeCount(){
        const getNodeCountURL=this.URL.getNodeCount
        this.$http.post(getNodeCountURL,{user_id: localStorage.user_id})
          .then(res=>{
              let data = res.data.data

              this.nodeCount.whole=data.total.schedule_count//全部项目
              this.totalData=data.total.schedule_count//页码
              let nodeList=data.node_list;
              for(let key in nodeList){//数据导入顶部标签
                switch (nodeList[key].schedule_id){
                  case 1:
                    this.nodeCount.clue=nodeList[key].schedule_count
                    break;
                  case 2:
                    this.nodeCount.interview=nodeList[key].schedule_count
                    break;
                  case 3:
                    this.nodeCount.investigate=nodeList[key].schedule_count
                    break;
                  case 4:
                    this.nodeCount.sign=nodeList[key].schedule_count
                    break;
                  case 5:
                    this.nodeCount.recommended=nodeList[key].schedule_count
                    break;
                  case 6:
                    this.nodeCount.agreement=nodeList[key].schedule_count
                    break;
                  case 7:
                    this.nodeCount.delivery=nodeList[key].schedule_count
                    break;
                  case 8:
                    this.nodeCount.collect=nodeList[key].schedule_count
                    break;
                  case 9:
                    this.nodeCount.revenue=nodeList[key].schedule_count
                    break;
                  default:
                    alert("错误")
                    break;
                };
              }
//              this.loading=false;

          })
          .catch(err=>{

//            this.loading=false;
          })
      },// 获取项目节点数量
      titleSift(){
        const titleSiftURL=this.URL.titleSift
        this.$http.post(titleSiftURL,{user_id: localStorage.user_id})
          .then(res=>{
            let data = res.data.data
//            this.$tool.console(data)
            let pro_area=data.pro_area;//地区
            let pro_industry=data.pro_industry;//领域
            let pro_scale=data.pro_scale;//期望融资
            let pro_schedule=data.pro_schedule;//跟进状态
            let pro_source=data.pro_source;//项目来源
            let pro_stage=data.pro_stage;//轮次
            this.pro_areaFilters=this.$tool.getTitleSift(pro_area);
            this.pro_industryFilters=this.$tool.getTitleSift(pro_industry);
            this.pro_scaleFilters=this.$tool.getTitleSift(pro_scale);
            this.pro_scheduleFilters=this.$tool.getTitleSift(pro_schedule);
            this.pro_sourceFilters=this.$tool.getTitleSift(pro_source);
            this.pro_stageFilters=this.$tool.getTitleSift(pro_stage);
          })
          .catch(err=>{
            this.$tool.console(err,2)
          })
      },// 获取表头

      getProjectList(list){
        let arr = new Array;
        for(let i=0; i<list.length; i++){
          let obj=new Object;
          obj.pro_name=list[i].pro_name;
          obj.pro_intro=list[i].pro_intro;
          obj.pro_company_name=list[i].pro_company_name;
          obj.pro_source=this.$tool.setTagToString(list[i].pro_source,'tag_name');
          obj.pro_follow_up_user=list[i].pro_follow_up_user;
          obj.pro_schedule=list[i].pro_schedule;
          obj.pro_industry=this.$tool.setTagToString(list[i].pro_industry,'industry_name');
          obj.is_exclusive=list[i].is_exclusive;
          obj.pro_stage=this.$tool.setTagToString(list[i].pro_stage,'stage_name');
          obj.pro_area=this.$tool.setTagToString(list[i].pro_area,'area_title');
          obj.pro_scale=this.$tool.setTagToString(list[i].pro_scale,'scale_money');
          obj.project_id=list[i].project_id;
          obj.created_at=list[i].created_at;
          obj.moreShow="";
          arr.push(obj);
        }
        return arr
      },//总设置列表的数据处理

      //更多按钮
      moreChange(index,row){
        this.setRouterData();
        this.moreShow=!this.moreShow;
        if(this.moreShow){
          this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.zgClick("删除项目");
            this.loading=true;
            this.$http.post(this.URL.deleteProject, {user_id:localStorage.user_id,project_id: row.project_id})
              .then(res => {
                this.loading=false;
                this.$tool.success("删除成功");
                this.getRouterData();
                this.filterChangeCurrent(this.currentPage || 1);
              })
              .catch(err => {
                this.loading=false;
                this.$tool.error("删除失败");
                this.$tool.console(err);
              })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }


      },//删除项目

      previewPush(x){
        this.emitPush=x;
      },//项目推送预览隐藏
      closePreview(msg){
        this.previewDisplay=msg;
      },//关闭项目预览
    },
    computed: {

    },
    created () {
      // 组件创建完后获取数据，
      this.getProjectListURL=this.URL.getProjectList;
      this.getRouterData();

      this.loading=true;
      this.getNodeCount();
      this.titleSift();
      this.filterChangeCurrent(this.currentPage || 1);

    },
    watch: {
      /*// 如果路由有变化，会再次执行该方法
      '$route' (to, from) {
        console.log(to);
        console.log(from);

      }*/
    }

  }
</script>

<style type="text/css" lang="less">
  @import '../../../assets/css/myproject';

</style>
