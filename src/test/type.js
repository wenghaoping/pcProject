/**
 * Created by WengHaoping on 2017/6/2.
 */
var   gettype=Object.prototype.toString

var    utility={

  isObj:function(o){

    return    gettype.call(o)=="[object Object]";

  },

  isArray:function(o){

    return    gettype.call(o)=="[object Array]";

  },

  isNULL:function(o){

    return    gettype.call(o)=="[object Null]";

  }
}
