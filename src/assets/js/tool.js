/**
 * Created by WengHaoping on 2017/5/18.
 */
/**
 * 获取页面数据
 */
const tool={
  getFormData : function (){
    var rtn = new Object();
    // input元素的值
    $("input[type=text]").each(function(){
      var element=$(this);
      if ((element.attr("id")!=null)&&(element.attr("id")!="")){
        rtn[element.attr("id")]=element.val();
      }
    });
    $("input[type=hidden]").each(function(){
      var element=$(this);
      if ((element.attr("id")!=null)&&(element.attr("id")!="")){
        rtn[element.attr("id")]=element.val();
      }
    });
    // input元素的值
    $("input[type=password]").each(function(){
      var element=$(this);
      if ((element.attr("id")!=null)&&(element.attr("id")!="")){
        rtn[element.attr("id")]=element.val();
      }
    });
    // 获取checkbox的值
    $('input[type=checkbox]').each(function(){
      var element=$(this);
      if (element.attr("checked")==true){
        if ((element.attr("id")!=null)&&(element.attr("id")!="")){
          rtn[element.attr("id")]=element.val();

        }
      }
    });
    // 获取textarea的值
    $("textarea").each(function(){
      var element=$(this);
      if ((element.attr("id")!=null)&&(element.attr("id")!="")){
        rtn[element.attr("id")]=element.val();
      }
    });
    // 获取select值
    $("select").each(function(){
      var element=$(this);
      if ((element.attr("id")!=null)&&(element.attr("id")!="")){
        rtn[element.attr("id")]=element.val();
      }
    });
    return rtn;
  },
  /**
   * 绑定数据
   *
   * @param data
   */
  bindFormData: function (data) {
    if ((data == null) || (data == "") || (data == undefined)) {
      return;
    }
    if (typeof (data) != "object") {
      return;
    }
    for ( var key in data) {
      var element=$("#"+key) ;

      if (element.length==0) {
        continue ;
      }
      if (element.attr("type")=="checkbox"){
        element.attr("checked",true);
        continue;
      }
      element.val(data[key]);
    }
  }

}

