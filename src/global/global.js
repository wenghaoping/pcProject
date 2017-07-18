import axios from '../config/api.js'//axios请求配置
import URL from './url.js'//URL请求地址汇总
import global from './global.js'
import $tool from './tool.js'


//设定变量
const data = {
  categoryData:'',
  area: '',
  scale: '',
  stage: '',
  industry: '',
  hotCity:'',
  entrance:'index',// 登录入口页面
  user_id:'',//用户id
  id:'',//用于上传和删除文件的id
}


//设定函数
var func = {
  getCity(data) {
    let arr = [];
    data.forEach((x)=>{
      let obj = {};
      obj.label = x.area_title;
      obj.value = x.area_id;
      arr.push(obj);
    });
    return arr
  },//获取城市列表
  getScale(data) {
    let arr = [];
    data.forEach((x)=>{
      let obj = {};
      obj.label = x.scale_money;
      obj.value = x.scale_id;
      arr.push(obj)
    });
    return arr
  },//获取期望融资
  getStage(data) {
    let arr = [];
    data.forEach((x)=>{
      let obj = {};
      obj.label = x.stage_name;
      obj.value = x.stage_id;
      arr.push(obj)
    });
    return arr
  },//获取轮次信息
  getIndustry(data) {
    let arr = [];
    data.forEach((x)=>{
      let obj = {};
      obj.label = x.industry_name;
      obj.value = x.industry_id;
      arr.push(obj)
    });
    return arr
  },//获取项目领域
  getTags_pro(data){
    let arr = [];
    data.forEach((x)=>{
      let obj = {};
      obj.label = x.tag_name;
      obj.value = x.tag_id;
      arr.push(obj)
    });
    return arr
  },//获取项目/团队/人脉标签
  getResource(data){
    let arr = [];
    data.forEach((x)=>{
      let obj = {};
      obj.label = x.resource_name;
      obj.value = x.resource_id;
      arr.push(obj)
    });
    return arr
  },//获取提供的资源
  getCompanyStatus(data){
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].status_id;
      obj.value = data[i].status_name;
      arr.push(obj)
    }
    arr.push({label: '自定义添加', value: '自定义添加'})
    return arr
  },//获取运营状态
  getCompany_scale(data){
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.label = data[i].comp_scale_value;
      obj.value = data[i].comp_scale_id;
      arr.push(obj);
    }
    return arr
  },//获取公司规模几人
  getWxProjectCategory() {
    axios.post(URL.getWxProjectCategory, {user_id: localStorage.user_id})
    .then(res => {
      let data = res.data.data;
      global.data.categoryData=data;
      global.data.area = global.func.getCity(data.area);//设置城市1列表
      global.data.scale = global.func.getScale(data.scale);//设置期望融资
      global.data.stage = global.func.getStage(data.stage);//设置轮次信息
      global.data.industry = global.func.getIndustry(data.industry);//设置轮次信息
      global.data.hotCity = global.func.getCity(data.hotCity);//设置热门城市
      global.data.tags_pro = global.func.getTags_pro(data.tags_pro);//设置项目标签
      global.data.tags_team = global.func.getTags_pro(data.tags_team);//设置团队标签
      global.data.tags_user = global.func.getTags_pro(data.tags_user);//设置人脉标签
      global.data.pro_source = global.func.getTags_pro(data.pro_source);//设置项目来源
      global.data.resource = global.func.getResource(data.resource);//设置项目来源
      global.data.company_status = global.func.getCompanyStatus(data.company_status);//设置运营状态
      global.data.company_scale = global.func.getCompany_scale(data.company_scale);//设置公司规模几人
    })
    .catch(err => {
      console.log(err);
      console.log('出现错误')
    })
  },//获取所有下拉框的数据

}


//运行函数
func.getWxProjectCategory();

export default {
  data, func
}
