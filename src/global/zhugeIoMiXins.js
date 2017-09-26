/**
 * Created by Admin on 2017/9/25.
 */
import Vue from 'vue';

let int = null;//时间设置
let time = "";

// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  methods:{
    /*点击事件
    # name 事件   例:创建项目 String
    # event 参数  例:{'手机' : '小米4','价格' : 1799,'运营商' : '移动'}  Object
    //属性名称不能超过255个字符，属性值不能超过200个字符
    */
    zgClick(name,event = {}) {
      zhuge.track(name, event);
    },

    /*识别用户
    # userId 用户Id
     # event 参数  例:name: '翁浩平',
     //预定义属性
     avatar: '头像地址',
     //预定义属性
     '行业': '互联⽹网' //⾃自定义属性  Object
    */
    zgIdentify(userId,event = {}) {
      zhuge.identify(userId, event);
    },

    //路由进入计时
    zgTimeIn() {
      int = setInterval(() => {time = this.$tool.getIntervalTime();/*console.log(time)*/;},2000);
    },

    //路由出去时停止计时
    zgTimeOut(name) {
      clearInterval(int);
      this.zgClick(name,{time:time});
      time = "";
      this.$tool.srtIntervalClearTime();
    }
  }
})


