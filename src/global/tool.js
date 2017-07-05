/**
 * Created by WengHaoping on 2017/5/18.
 */
/**
 * 总的工具类
 */
import { Notification } from 'element-ui';
const tool={

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
  },//*数组封装将对象中无用的参数去除

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

  getNull(data) {
    let reg=/\S/;
    if (!reg.test(data))
    {
      return true;
    }else{
      return false;
    }

  },//判断是不是空(空字符串也算是空)

  checkNumber(data) {
    let reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(data)) {
      return true;
    }
    return false;
  },//判断是不是数字

  checkEmail(data){
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (reg.test(data)) {
      return true;
    }
    return false;
  },//邮箱验证

  error(text) {
    Notification.error({
      message: text,
      offset: 300,
      duration:1000
    })
  },//错误弹窗(所有的错误调用,红色叉)
  success(text) {
    Notification.success({
      message: text,
      offset: 300,
      duration:1000
    })
  },//成功弹窗(绿钩)
  warning(text) {
    Notification.warning({
      message: text,
      offset: 300,
      duration:1000
    })
  },//警告弹窗,(黄色叹号)

  console(text) {
    let type=true;//true代表开发环境,false代表上线环境
    if(type) console.log(text);
  },//console控制

}

export default{
  install(Vue){
    Vue.prototype.$tool = tool;
  }
}
