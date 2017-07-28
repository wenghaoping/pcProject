/**
 * 新建一个动态线状图
 * jsonData示例 [{name:"test",value:88}]
 * **/
function TrendsLine(canvasName,xdata,ydata1,ydata2){
  this.canvasName = document.getElementById(canvasName);
  lineChart = this.$echart.init(this.canvasName);
  xdata=xdata;
  ydata1=ydata1;
  ydata2=ydata2;
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
        res+='尽调公司:　'+e[0].value+'</br>'
        res+='行业平均:　'+e[1].value
        return res;
      }
    },
    legend: {
      data: ['行业平均','尽调公司']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {

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
      name: '尽调公司',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      data: ydata2
    }, {
      name: '行业平均',
      type: 'line',
      symbolSize: 8,
      smooth: true,
      data: ydata1
    }]
  };
  lineChart.setOption(option);

}
/**
 * 传入{name:test,vlaue:99} 这种json对象
 * **/
TrendsLine.prototype.setChartData=function(xdata,ydata1,ydata2){
this.xdata=xdata;
this.ydata1=ydata1;
this.ydata2=ydata2;
}
