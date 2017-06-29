/**
 * Created by WengHaoping on 2017/5/18.
 */
/**
 * 总的工具类
 */
const tool={

  bindFormData (data) {
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
  }, //*数组封装将对象中无用的参数去除

  getToObject (data) {
    let object={};
    for(let key in data){
      object[key]=data[key]
    }
    return object;
  }, //对象封装 将数组中无用的参数去除

  getToArrObject(data) {
    let newArr = new Array;
    for(let i=0;i<data.length; i++){
      newArr[i]=tool.getToObject(data[i])
    }
    return newArr;
  },

  fileChange(target) {
  let isIE = /msie/i.test(navigator.userAgent) && !window.opera;
  let fileSize = 0;
  const filetypes =[".jpg","why.png",".rar",".txt",".zip",".doc",".ppt",".xls",".pdf",".docx",".xlsx"];
  const filepath = target.value;
  const filemaxsize = 1024*2;//2M
  if(filepath){
    var isnext = false;
    var fileend = filepath.substring(filepath.indexOf("."));
    if(filetypes && filetypes.length>0){
      for(var i =0; i<filetypes.length;i++){
        if(filetypes[i]==fileend){
          isnext = true;
          break;
        }
      }
    }
    if(!isnext){
      alert("不接受此文件类型！");
      target.value ="";
      return false;
    }
  }else{
    return false;
  }
  if (isIE && !target.files) {
    var filePath = target.value;
    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
    if(!fileSystem.FileExists(filePath)){
      alert("附件不存在，请重新输入！");
      return false;
    }
    var file = fileSystem.GetFile (filePath);
    fileSize = file.Size;
  } else {
    fileSize = target.files[0].size;
  }

  var size = fileSize / 1024;
  if(size>filemaxsize){
    alert("附件大小不能大于"+filemaxsize/1024+"M！");
    target.value ="";
    return false;
  }
  if(size<=0){
    alert("附件大小不能为0M！");
    target.value ="";
    return false;
  }
},/*设置上传文件大小以及类型fileChange(this)*/

  getTitleSift(data){
    let arr = [];
    for(let key in data){
      let obj=new Object;
      obj.text=data[key]
      obj.value=key
      arr.push(obj)
    }
    return arr
  },//设置表格表头的筛选内容======表格页都用的到

  getSelectValue(data){
    let arr = [];
    for(let key in data){
      let obj=new Object;
      obj.label=data[key]
      obj.value=key
      arr.push(obj)
    }
    return arr
  }//设置选择器的内容=====选择器远程设置内容用的到
}

export default{
  install(Vue){
    Vue.prototype.$tool = tool;
  }
}
