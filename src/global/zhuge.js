/**
 * Created by Administrator on 2017/7/25.
 */
(function(){
  window.zhuge = window.zhuge || [];
  window.zhuge.methods = "_init identify track getDid getSid getKey setSuperProperty setUserProperties setPlatform".split(" ");
  window.zhuge.factory = function(b) {
    return function() {
      var a = Array.prototype.slice.call(arguments);
      a.unshift(b);
      window.zhuge.push(a);
      return window.zhuge;
    }
  };
  for (var i = 0; i < window.zhuge.methods.length; i++) {
    var key = window.zhuge.methods[i];
    window.zhuge[key] = window.zhuge.factory(key);
  }
  window.zhuge.load = function(b, x) {
    if (!document.getElementById("zhuge-js")) {
      var a = document.createElement("script");
      var verDate = new Date();
      var verStr = verDate.getFullYear().toString()
        + verDate.getMonth().toString() + verDate.getDate().toString();

      a.type = "text/javascript";
      a.id = "zhuge-js";
      a.async = !0;
      a.src = (location.protocol == 'http:' ? "http://sdk.zhugeio.com/zhuge.min.js?v=" : 'https://zgsdk.zhugeio.com/zhuge.min.js?v=') + verStr;
      a.onerror = function(){
        window.zhuge.identify = window.zhuge.track = function(ename, props, callback){
          if(callback && Object.prototype.toString.call(callback) === '[object Function]')callback();
        };
      };
      var c = document.getElementsByTagName("script")[0];
      c.parentNode.insertBefore(a, c);
      window.zhuge._init(b, x)
    }
  };
  window.zhuge.load('此处填写您在诸葛申请的APP KEY', {
    superProperty: {//全局的事件属性(选填)
      '应用名称': '诸葛io'
    },
    autoTrack: false, //启用全埋点采集（选填，默认false）
    visualizer: false, //启用可视化埋点（选填，默认false）
    singlePage: false //是否是单页面应用（SPA），启用autoTrack后生效（选填，默认false）
  });
})();
