<template>
  <div id="projectDetails" class="clearfix">
<!--    {{ this.$route.query.address }}-->
    <div class="contain-grid contain-center">
      <span class="back-tag" @click="goBack"><i class="el-icon-arrow-left"></i>返回</span>
      <div class="main-box clearfix">
        <div class="item-lists item-lists-top clearfix">
          <div class="item-lists-inner-left fl">
            <div class="item">
              <span class="small-tag">私密</span>
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">1. 私密项目仅自己/团队成员可见,项目数据安全不泄露　<br/>2. 公开项目投资人可申请查看,并参与市场融资对接</div>
              <span class="icon"><img src="../../../assets/logo/why.png"/></span>
              </el-tooltip>
              <span class="title">微天使乐投平台</span>
              <span class="company">杭州投着乐网络科技有限公司</span>
            </div>
            <div class="item" style="margin-top: 14px;">
              <div class="doc">这里是这个项目的一句话介绍，字数在40字以内，要全部显示这里是这个项目的一句话介。</div>
            </div>
            <div class="item" style="margin-top:18px;">
              <span class="mid-tag">教育培训</span>
              <span class="mid-tag">社交通讯</span>
              <span class="mid-tag">大数据</span>
              <span class="mid-tag">sass</span>
            </div>
            <div class="item" style="margin-top:18px;">
              <span class="big-tag">100-300万</span><span class="split">｜</span>
              <span class="big-tag">杭州</span><span class="split">｜</span>
              <span class="big-tag">10%</span><span class="split">｜</span>
              <span class="big-tag">天使轮</span>
              <span class="flower">跟进人 : 金牛</span>
              <span class="flower">来源 : 真格基金　</span>
            </div>
            <div class="item" style="margin-top:18px;">
            <span class="project">
              <span class="title">项目完整度:</span>
              <span class="number">100%</span>
              <span class="more">超过60%的项目更易被投资人关注</span>
            </span>
              <span class="project" style="width: 291px;">
              <div class="item progress">
                <div class="txt begin">项目线索</div>
                <div class="progress-bar">
                  <span class="circle circle-s"></span>
                  <span class="bar-bg1">&nbsp;</span>
                  <span class="bar-bg2">&nbsp;</span>
                  <span  class="txt state">签约</span>
                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="txt end">佣金收讫</div>
              </div>
            </span>
            </div>
            <div class="onlyone">
              <img src="../../../assets/logo/onlyonedark.png"/>
<!--              <img src="../../../assets/logo/onlyonelight.png"/>-->
            </div>
          </div>
          <div class="item-lists-inner-right fl">
            <div class="text">
              <img src="../../../assets/logo/text.png"/>
            </div>
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">根据项目公司名称检索微天使数据库,快速了解企业的<br/>工商、核心团队、产品数据、历史融资、新闻谬论等全方面信息</div>
              <span class="icon icon2" style="cursor: pointer"><img src="../../../assets/logo/why.png"/></span>
            </el-tooltip>
            <div class="button-float" @click="dialogVisible = true" style="cursor:pointer" >
            一键尽调
          </div>
          </div>

          <!--===========================================一键尽调弹窗=============================================-->
          <research :dialog-visible="dialogVisible" v-on:changeall="dialogVisiblechange">

          </research>

        </div>
        <div style="background-color: #eff2f7;height: 17px;width: 850px;"></div>
        <div class="item-lists clearfix">
          <el-tabs v-model="show" @tab-click="handleClick">
            <el-tab-pane label="项目详情" name="detail"></el-tab-pane>
            <el-tab-pane label="跟进记录" name="flow"></el-tab-pane>
            <el-tab-pane label="文件管理" name="files"></el-tab-pane>
          </el-tabs>
          <div class="ul-lists">
            <div class="item">
              <span class="title"><img class="img" src="../../../assets/logo/projectIntroduce.png">项目介绍</span>
              <div class="person-info">
                <span>项目联系人 : </span>
                <span>张三</span>
                <span>15823457890</span>
              </div>
            </div>
            <div class="item" style="margin-top:33px;">
              <span class="person-tag">90后创业者</span>
              <span class="person-tag">80后创业者</span>
            </div>
            <div class="item" style="margin-top:24px;">
              <div class="paper">
                <img class="img" style="padding-right: 16px;" src="../../../assets/logo/paper.png">
                <span class="pt">杭州投着乐网络科技有限公司杭州投着乐网络科技有限公司杭州投着乐网络科技有限公司杭州投着乐网络科技有限公司</span>
                <el-button type="text" size="mini">查看</el-button>
                <el-button type="text" size="mini">下载</el-button>
              </div>
              <div class="paper">
                <img class="img" style="padding-right: 16px;" src="../../../assets/logo/paper.png">
                <span class="pt">杭州投着乐网络科技有限公司杭州投着乐网络科技有限公司杭州投着乐网络科技有限公司杭州投着乐网络科技有限公司</span>
                <el-button type="text" size="mini">查看</el-button>
                <el-button type="text" size="mini">下载</el-button>
              </div>
            </div>
            <div class="item" style="margin-top:24px;height: 49px;">
              <div class="bot-det">
                <span class="det-title">运营状态：</span>
                <span class="del-info">已上线</span>
              </div>
              <div class="bot-det" style="margin-left:170px;">
                <span class="det-title">产品链接：</span>
                <span class="del-info"><a href="">www.baidu.com</a></span>
              </div>
              <div class="bot-det" style="float:right;">
                <span class="det-title">公司规模：</span>
                <span class="del-info">5-20人</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="ul-lists" style="margin-top:16px;padding: 0">
              <div class="item">
                <span class="title" style="font-size: 16px;">项目亮点</span>
                <div class="prod-doc" style="font-size: 13px;">我们重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，小册子本身还会根据用户的人数以及特征进行调整。 2.行中：管家确保出现在用户出行过程中每一个重要和紧急的环节。 我们的管家分为线上的总部管家和线下的目的地管家。目前，我们在全球7个国家建立了分公司、办事处。飞机落地之后，对接当地管家。此外，用户在任何时候都可以通过微信公众号或者 24 小时待机的国内电话联系到总部管家，并得到总部管家的帮助。</div>
              </div>
            </div>
          </div>

          <div class="ul-lists" style="margin-top:16px;">
            <div class="item">
              <span class="title"><img class="img" src="../../../assets/logo/team.png">核心团队</span>
            </div>
            <div class="item" style="margin-top:33px;">
              <span class="person-tag">90后创业者</span>
              <span class="person-tag">80后创业者</span>
            </div>
            <div class="item" style="margin-top:32px;">
              <span class="p-name">顾嘉</span>
              <span class="p-mg">创始人</span>
              <div class="p-gf">占股比例 : <span>12%</span></div>
              <div class="p-doc">13年开发经验，这里是一段话，这里是一段他的个人介绍，字数</div>
            </div>
            <div class="line"></div>
            <div class="item" style="margin-top:10px;">
              <span class="p-name">顾嘉加</span>
              <span class="p-mg">创始人</span>
              <div class="p-gf">占股比例 : <span>12%</span></div>
              <div class="p-doc">我们重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。</div>
            </div>
          </div>
          <div class="ul-lists" style="margin-top:16px;">
            <div class="item">
              <span class="title"><img class="img" src="../../../assets/logo/money.png">融资信息</span>
              <div class="rz-details">
                <div class="rz-detail">
                  <p class="det-title">期望融资</p>
                  <p class="det-info">1000万-3000万</p>
                </div>
                <div class="rz-detail">
                  <p class="det-title">投后股份</p>
                  <p class="det-info">10%</p>
                </div>
                <div class="rz-detail">
                  <p class="det-title">估值</p>
                  <p class="det-info">2000万</p>
                </div>
              </div>
            </div>
            <div class="item" style="margin-top:35px;">
              <span class="sec-title">资金用途</span>
              <div class="yt-doc">
                我们重点解决的是行中问题，同时兼顾行前和行后。 1.行前：定制个性化的用户攻略 发现旅行行前环节最大的特色是为用户定制专属的用户攻略，内部称“小册子”。小册子不仅对每个订单用户而言都不一样，
              </div>
            </div>
            <div class="item" style="margin-top:6px;">
              <div>
                <div class="v-progress" style="height: 121px;">
                  <span class="circle circle-s">&nbsp;</span>
                  <span class="v-line v-line-1">&nbsp;</span>
                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="v-progress-table" style="height: 121px;">
                  <div class="v-progress-txt">
                    <span class="pro-txt-1">2017.05.04</span>
                    <span class="pro-txt-2">100-500万</span>
                    <span class="pro-txt-3">A轮</span>
                    <span class="pro-txt-4">天使投资</span>
                  </div>
                  <div class="line"></div>
                  <div class="v-progress-txt">
                    <span class="pro-txt-1">2017.05.04</span>
                    <span class="pro-txt-2">1000-5000万</span>
                    <span class="pro-txt-3">天使轮</span>
                    <span class="pro-txt-4">天使投资、华兴资本、微天使</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ul-lists" style="margin-top:16px;">
            <div class="item">
              <span class="title"><img class="img" src="../../../assets/logo/Milepost.png">里程碑</span>
            </div>
            <div class="item" style="margin-top:6px;">
              <div>
                <div class="v-progress" style="height: 182px;">
                  <span class="circle circle-s">&nbsp;</span>

                  <span class="v-line v-line-1">&nbsp;</span>
                  <span class="circle circle-c">&nbsp;</span>
                  <span class="v-line v-line-2">&nbsp;</span>

                  <span class="circle circle-e">&nbsp;</span>
                </div>
                <div class="v-progress-table" style="height: 182px;">
                  <div class="v-progress-txt">
                    <span class="pro-txt-1">2017.05.04</span>
                    <span class="pro-txt-2"  style="color:#5e6d82;">App的下载量突破100万</span>
                  </div>
                  <div class="line"></div>
                  <div class="v-progress-txt">
                    <span class="pro-txt-1">2017.05.04</span>
                    <span class="pro-txt-2"  style="color:#5e6d82;">获汉鼎宇佑集团和盛大亿元投资 P2P行业再掀波澜，获得1.5亿B轮融资</span>
                  </div>
                  <div class="line"></div>
                  <div class="v-progress-txt">
                    <span class="pro-txt-1">2017.05.04</span>
                    <span class="pro-txt-2"  style="color:#5e6d82;">获汉鼎宇佑集团和盛大亿元投资 P2P行业再掀波澜，获得1.5亿B轮融资</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
          <div class="ul-lists" style="margin-top:16px;margin-bottom: 100px;">
            <div class="item">
              <span class="title"><img class="img" src="../../../assets/logo/money.png">FA签约协议</span>
              <div class="rz-details" >
                <div class="rz-detail" style="width: 25%">
                  <p class="det-title">签约佣金</p>
                  <p class="det-info">10%</p>
                </div>
                <div class="rz-detail" style="width: 25%">
                  <p class="det-title">股权赠与</p>
                  <p class="det-info">10%</p>
                </div>
                <div class="rz-detail" style="width: 25%">
                  <p class="det-title">其他权益</p>
                  <p class="det-info">100%</p>
                </div>
                <div class="rz-detail" style="width: 25%">
                  <p class="det-title">跟投权</p>
                  <p class="det-info">-</p>
                </div>
              </div>
            </div>
          </div>
          <div class="toButton">
            <el-button type="primary" size="large" style="margin:0 auto;display: block;width: 88px;">编辑</el-button>
          </div>
        </div>

      </div>
    </div>
    <div class="contain-grid contain-right-1">
      <div class="main-box">
        <el-tabs v-model="show" @tab-click="handleClick">
          <el-tab-pane label="潜在买家" name="detail"></el-tab-pane>
          <el-tab-pane label="人脉匹配" name="flow"></el-tab-pane>
          <el-tab-pane label="全网人脉匹配" name="files"></el-tab-pane>
        </el-tabs>
        <div class="item-lists" style="height:290px;">
          <div id="pieBox" style="width:392px;height:290px;"></div>
        </div>
        <div class="item-lists">
          <div class="item">
            <div class="card-title">
              <span class="card-tag">匹配度：</span>
              <span class="card-val">90%</span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  目标线索<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>目标线索1</el-dropdown-item>
                  <el-dropdown-item>目标线索2</el-dropdown-item>
                  <el-dropdown-item>目标线索3</el-dropdown-item>
                  <el-dropdown-item>目标线索4</el-dropdown-item>
                  <el-dropdown-item>目标线索5</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card-container">
              <div class="card-person">
                <span class="name">张三</span>
                <span class="manger">总监</span>
                <span class="flag"><img src="../../../assets/flag.png" />买方FA </span>
              </div>
              <div class="head-img"><img src="../../../assets/header.png" alt="" /></div>
              <div class="card-txt">杭州投着乐网络科技有限公司</div>
              <div class="card-doc doc1">投资领域：<span>智能服务、电商</span></div>
              <div class="card-doc doc2">投资轮次：<span>种子轮、天使轮、A轮、B轮</span></div>
              <div class="line">&nbsp;</div>
              <div class="card-bottom">我跟进的用户：<span>感兴趣</span>
                <span class="handler"><img src="../../../assets/slice.png" alt="" />移除</span>
              </div>
            </div>
          </div>

          <div class="item">
            <div class="card-title">
              <span class="card-tag">匹配度：</span>
              <span class="card-val">90%</span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  佣金收讫<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>目标线索1</el-dropdown-item>
                  <el-dropdown-item>目标线索2</el-dropdown-item>
                  <el-dropdown-item>目标线索3</el-dropdown-item>
                  <el-dropdown-item>目标线索4</el-dropdown-item>
                  <el-dropdown-item>目标线索5</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card-container">
              <div class="card-person">
                <span class="name">张三</span>
                <span class="manger">总监</span>
                <span class="flag"><img src="../../../assets/flag.png" />买方FA </span>
              </div>
              <div class="head-img"><img src="../../../assets/header.png" alt="" /></div>
              <div class="card-txt">杭州投着乐网络科技有限公司</div>
              <div class="card-doc doc1">投资领域：<span>智能服务、电商</span></div>
              <div class="card-doc doc2">投资轮次：<span>种子轮、天使轮、A轮、B轮</span></div>
              <div class="line">&nbsp;</div>
              <div class="card-bottom">我跟进的用户：<span>感兴趣</span>
                <span class="handler"><img src="../../../assets/slice.png" alt="" />移除</span>
              </div>
            </div>
          </div>

          <div class="item">
            <div class="card-title">
              <span class="card-tag">匹配度：</span>
              <span class="card-val">90%</span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  FA签约<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>目标线索1</el-dropdown-item>
                  <el-dropdown-item>目标线索2</el-dropdown-item>
                  <el-dropdown-item>目标线索3</el-dropdown-item>
                  <el-dropdown-item>目标线索4</el-dropdown-item>
                  <el-dropdown-item>目标线索5</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card-container">
              <div class="card-person">
                <span class="name">张三</span>
                <span class="manger">总监</span>
                <span class="flag"><img src="../../../assets/flag.png" />买方FA </span>
              </div>
              <div class="head-img"><img src="../../../assets/header.png" alt="" /></div>
              <div class="card-txt">杭州投着乐网络科技有限公司</div>
              <div class="card-doc doc1">投资领域：<span>智能服务、电商</span></div>
              <div class="card-doc doc2">投资轮次：<span>种子轮、天使轮、A轮、B轮</span></div>
              <div class="line">&nbsp;</div>
              <div class="card-bottom">我跟进的用户：<span>感兴趣</span>
                <span class="handler"><img src="../../../assets/slice.png" alt="" />移除</span>
              </div>
            </div>
          </div>

          <div class="item">
            <div class="card-title">
              <span class="card-tag">匹配度：</span>
              <span class="card-val">90%</span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  FA买方<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>目标线索1</el-dropdown-item>
                  <el-dropdown-item>目标线索2</el-dropdown-item>
                  <el-dropdown-item>目标线索3</el-dropdown-item>
                  <el-dropdown-item>目标线索4</el-dropdown-item>
                  <el-dropdown-item>目标线索5</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card-container">
              <div class="card-person">
                <span class="name">张三</span>
                <span class="manger">总监</span>
                <span class="flag"><img src="../../../assets/flag.png" />买方FA </span>
              </div>
              <div class="head-img"><img src="../../../assets/header.png" alt="" /></div>
              <div class="card-txt">杭州投着乐网络科技有限公司</div>
              <div class="card-doc doc1">投资领域：<span>智能服务、电商</span></div>
              <div class="card-doc doc2">投资轮次：<span>种子轮、天使轮、A轮、B轮</span></div>
              <div class="line">&nbsp;</div>
              <div class="card-bottom">我跟进的用户：<span>感兴趣</span>
                <span class="handler"><img src="../../../assets/slice.png" alt="" />移除</span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="pagenav">
              <el-pagination small layout="prev, pager, next"
                             :total="50">
              </el-pagination>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="contain-grid contain-right-2 clearfix">
      <div class="main-box">
        <div class="title-box">
          <span class="lit-line"></span>
          <span class="title">动态记录</span>
          <span class="lit-line"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import research from './research.vue'
  var echarts = require('echarts');
  export default {
    data(){
      return {
        show:"detail",
        dialogVisible: false,
        form:{
          name:'',
          region:''
        }
      }
    },
    computed:{

    },
    components: {
      research
    },
    mounted:function(){
      var myPie = echarts.init(document.getElementById('pieBox'));
      var colors = ["#13ce66","#f7ba2a","#20a0ff"];
      var option = {
        legend: {
          orient: 'horizontal',
          bottom: '5',
          data: ['佣金收讫','FA签约','项目线索'],
          // formatter:function(e){
          //   return e
          // }
        },
        series : [
          {
            name: '',
            type: 'pie',
            radius : '72%',
            startAngle:0,
            legendHoverLink:"false",
            markPoint:"",
            center: ['50%', '45%'],
            data:[
              {
                value:315,
                name:'佣金收讫',
                label:{
                  normal:{
                    show:false
                  }
                },
                labelLine:{
                  normal:{
                    show:false
                  },
                  emphasis:{
                    show:false
                  }
                },
                itemStyle:{
                  normal:{
                    color:'#20a0ff'
                  }
                }
              },
              {
                value:95,
                name:'FA签约',
                label:{
                  normal:{
                    show:false
                  }
                },
                labelLine:{
                  normal:{
                    show:false
                  },
                  emphasis:{
                    show:false
                  }
                },
                itemStyle:{
                  normal:{
                    color:'#13ce66'
                  }
                }
              },
              {
                value:55,
                name:'项目线索',
                label:{
                  normal:{
                    show:false
                  }
                },
                labelLine:{
                  normal:{
                    show:false
                  },
                  emphasis:{
                    show:false
                  }
                },
                itemStyle:{
                  normal:{
                    color:'#f7ba2a'
                  }
                }
              },

            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myPie.setOption(option);
    },
    methods:{
      handleClick:function(tab, event){
        this.show = tab.name ;
      },
      goBack(){//返回上一层
        this.$router.go(-1);
      },
      dialogVisiblechange(msg){
        this.dialogVisible=msg;
        console.log(msg)
      }
    }
  }
</script>

<style scoped lang="less">

</style>
