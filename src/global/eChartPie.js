
import echarts from 'echarts';// echart封装

/**
 * 新建一个饼图
 * **/
function TrendsLine (canvasName, going, hold, reject) {
  this.canvasName = document.getElementById(canvasName);
  lineChart = this.$echart.init(this.canvasName);
  going = going;
  hold = hold;
  reject = reject;
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: 'right',

      top: '30%',
      data: ['推进中', 'Hold', 'Rejcet'],
      textStyle: {
        fontSize: '16'
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        selectedMode: 'single',
        radius: ['70%', '90%'],
        center: ['35%', '55%'],
        label: {
          normal: {
            show: true,
            position: 'center',
            textStyle: {
              fontSize: '16'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold'
            }
          }
        },
        data: [
          {value: going, name: '推进中'},
          {value: hold, name: 'Hold'},
          {value: reject, name: 'Rejcet'}
        ],
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: '{b} : {c}'
            },
            labelLine: {show: true}
          }
        }
      }
    ]
  };
  lineChart.setOption(option);
}
/**
 * 传入going,hold,reject三个参数
 * **/
TrendsLine.prototype.setChartData = function (going, hold, reject) {
  this.going = going;
  this.hold = hold;
  this.reject = reject;
};
export default
{
  TrendsLine
};
