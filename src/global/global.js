import axios from '../config/api.js'//axios请求配置
import URL from './url.js'//URL请求地址汇总

function getCity(data){
  let arr = [];
  for(let i=0; i<data.length; i++){
    let obj={};
    obj.label=data[i].area_title;
    obj.value=data[i].area_id;
    arr.push(obj)
  }
  return arr
}//获取城市列表
function getScale(data){
  let arr = [];
  for(let i=0; i<data.length; i++){
    let obj={};
    obj.label=data[i].scale_money;
    obj.value=data[i].scale_id;
    arr.push(obj)
  }
  return arr
}//获取期望融资
function getStage(data){
  let arr = [];
  for(let i=0; i<data.length; i++){
    let obj={};
    obj.label=data[i].stage_name;
    obj.value=data[i].stage_id;
    arr.push(obj)
  }
  return arr
}//获取轮次信息
function getIndustry(data){
  let arr = [];
  for(let i=0; i<data.length; i++){
    let obj={};
    obj.label=data[i].industry_name;
    obj.value=data[i].industry_id;
    arr.push(obj)
  }
  return arr
}//获取项目领域
const getData= function getData(){
  axios.post(URL.getWxProjectCategory,{user_id: sessionStorage.user_id})
  .then(res=>{
    let data = res.data.data;
    console.log(data)
    var area=this.getCity(data.area);//设置城市1列表
    var scale=this.getScale(data.scale);//设置期望融资
    var stage=this.getStage(data.stage);//设置轮次信息
    var industry=this.getIndustry(data.industry);//设置轮次信息

  })
  .catch(err=>{
    // this.$tool.console(err)
    console.log('出现错误')
  })

}//获取所有下拉框的数据

export default {
  getData
}
