/**
 * Created by WengHaoping on 2017/6/5.
 */
import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'https://dev.weitianshi.cn';


//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  alert("网络异常");
  return Promise.reject(error);
});

//code状态码200判断
axios.interceptors.response.use((res) =>{
  if(res.status=== 200){
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  alert("网络异常");
  return Promise.reject(error);
});


export default axios;
