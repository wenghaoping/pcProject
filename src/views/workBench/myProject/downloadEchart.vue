<template>
  <div id="downloadEchart">
    <el-tabs v-model="downloadEchartName" @tab-click="handleClick">
      <!--App下载量-->
      <el-tab-pane label="App下载量" name="1"></el-tab-pane>
      <!--活跃用户-->
      <el-tab-pane label="活跃用户" name="2"></el-tab-pane>
      <!--浏览页面-->
      <el-tab-pane label="浏览页面" name="3"></el-tab-pane>
      <!--访问用户-->
      <el-tab-pane label="访问用户" name="4"></el-tab-pane>
      <!--访问时长-->
      <el-tab-pane label="访问时长" name="5"></el-tab-pane>

    </el-tabs>
    <div id="pieBox" style="width:803px;height:432px;"></div>
    <p class="sec"><span>{{title}}：</span>{{main}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
var echarts = require('echarts');
export default {
  data () {
    return {
      downloadEchartName:'1',
      title:"累计下载量",
      main:"综合各大应用市场的历史累计下载量，加权计算后的值。该指标是可以表明App存量用户量的指标。",
      xdata:['20170224', '20170225', '20170226', '20170227', '20170228', '20170229'],
      ydata1:[20000, 40000, 60000, 10000, 80000, 10000],
      ydata2:[10000, 30000, 10000, 11000, 20000, 40000]
    }
  },
  methods: {
    handleClick(tab, event) {
      let index=tab.index
//      console.log(tab.index);
      switch (index){
        case '0':
          this.get0();
          break;
        case '1':
          this.get1();
          break;
        case '2':
          this.get2();
          break;
        case '3':
          this.get3();
          break;
        case '4':
          this.get4();
          break;
        default:
          alert("你瞎按了吧")
          break;
      };
    },
    eChart(xdata,ydata1,ydata2){
        let myChart = echarts.init(document.getElementById('pieBox'));
        this.xdata=xdata
        this.ydata1=ydata1
        this.ydata2=ydata2
      let option = {
          title: {},
          color: ['#28DC41', '#009eff'],
          tooltip: {
            trigger: 'axis',
            backgroundColor:'rgba(31,45,61,0.85);',
            padding: [10],
            transitionDuration:0.5,
            extraCssText:'border-radius:8px;',
            formatter: function(e){
              let res = e[0].axisValue.slice(0,4)+'.'+e[0].axisValue.slice(4,6)+'.'+e[0].axisValue.slice(6,8)+'</br>'
              res+='行业平均:　'+e[1].value/1000+'K'+'</br>'
              res+='环比增长:　'+e[0].value/1000+'K'
              return res;
            }
          },
          legend: {
            data: ['行业平均', '微天使乐投平台']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine:{
              show:true
            },
            data: xdata
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '行业平均',
            type: 'line',
            smooth: true,
            symbolSize: 8,
            data: ydata1
          }, {
            name: '微天使乐投平台',
            type: 'line',
            symbolSize: 8,
            smooth: true,
            data: ydata2
          }]
        };
      myChart.setOption(option);
      },
    get0(){
      this.title="累计下载量",
      this.main="综合各大应用市场的历史累计下载量，加权计算后的值。该指标是可以表明App存量用户量的指标。"
      this.xdata=['20170301', '201703012', '20170303', '20170304', '20170305', '20170306']
      this.ydata1=[70000, 30000, 50000, 70000, 10200, 90060];
      this.ydata2=[30000, 9000,30000, 71000, 50000, 70000];
      this.eChart(this.xdata,this.ydata1,this.ydata2);
    },
    get1(){
      this.title="累计用户",
      this.main="累计用户。"
      this.xdata=['20170401', '201704012', '20170403', '20170404', '20170405', '20170406']
      this.ydata1=[200000, 50000, 90000, 40000, 10201, 40060];
      this.ydata2=[40000, 80000,60000, 21000, 40000, 60000];
      this.eChart(this.xdata,this.ydata1,this.ydata2);
    },
    get2(){
      this.title="浏览页面数(PV)",
      this.main="对目标公司网站在全网的日均访问量加总,并经过加权计算的值,值越高,访问量越大.该指标反映了用户对目标公司官方网站的访问情况,是可以表明目标公司网站内容受访问热度的指标."
      this.xdata=['20170301', '201705012', '20170503', '20170504', '20170505', '20170506']
      this.ydata1=[80000, 40000, 50000, 70000, 10200, 90060];
      this.ydata2=[50000, 60000,70000, 71000, 50000, 70000];
      this.eChart(this.xdata,this.ydata1,this.ydata2);
    },
    get3(){
      this.title="访问用户数(UV)",
      this.main="对目标公司网站在全网的日均独立访问用户量加总,并经过加权计算的值,值越高,访问量越大.该指标反映了木不熬公司官方网站吸引用户的能力,是可以表明目标公司网站的获客能力的指标."
      this.xdata=['20170301', '201703012', '20170303', '20170304', '20170305', '20170306']
      this.ydata1=[10000, 40000, 50000, 80000, 10200, 90060];
      this.ydata2=[50000, 50000,80000, 71000, 50000, 70000];
      this.eChart(this.xdata,this.ydata1,this.ydata2);
    },
    get4(){
      this.title="访问时长",
      this.main="所有访问用户在统计时间段内,从进入到离开该网站的时长平均值,是可以表现公司网站用户粘性的指标."
      this.xdata=['20170301', '201703012', '20170303', '20170304', '20170305', '20170306']
      this.ydata1=[10000, 80000, 50000, 70000, 10200, 90060];
      this.ydata2=[50000, 40000,30000, 71000, 70000, 40000];
      this.eChart(this.xdata,this.ydata1,this.ydata2);
    }

  },
  //Echart组件
  mounted(){
      this.eChart(this.xdata,this.ydata1,this.ydata2);
  }
}
</script>

<style lang="less">
  .sec{
    font-size:13px;
    color:#5e6d82;
    margin-top:48px;
    span{
      color:#475669;
      font-weight: bolder;

    }
  }
</style>
