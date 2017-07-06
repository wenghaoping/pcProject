import axios from '../config/api.js'//axios请求配置
import URL from './url.js'//URL请求地址汇总
import global from './global.js'

//设定变量
const data = {
  categoryData:'',
  area: '',
  scale: '',
  stage: '',
  industry: '',
}


//设定函数
var func = {
  getCity(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].area_title;
      obj.value = data[i].area_id;
      arr.push(obj)
    }
    return arr
  },//获取城市列表
  getScale(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].scale_money;
      obj.value = data[i].scale_id;
      arr.push(obj)
    }
    return arr
  },//获取期望融资
  getStage(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].stage_name;
      obj.value = data[i].stage_id;
      arr.push(obj)
    }
    return arr
  },//获取轮次信息
  getIndustry(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].industry_name;
      obj.value = data[i].industry_id;
      arr.push(obj)
    }
    return arr
  },//获取项目领域
  getWxProjectCategory() {
    axios.post(URL.getWxProjectCategory, {user_id: sessionStorage.user_id})
    .then(res => {
      let data = res.data.data;
      global.data.categoryData=data
      global.data.area = global.func.getCity(data.area);//设置城市1列表
      global.data.scale = global.func.getScale(data.scale);//设置期望融资
      global.data.stage = global.func.getStage(data.stage);//设置轮次信息
      global.data.industry = global.func.getIndustry(data.industry);//设置轮次信息
    })
    .catch(err => {
      console.log(err)
      console.log('出现错误')
    })
  },//获取所有下拉框的数据
}


//运行函数
func.getWxProjectCategory();

export default {
  data, func
}
