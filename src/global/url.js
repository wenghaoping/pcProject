/**
 * Created by WengHaoping on 2017/6/5.
 */

/*const URL ='https://dev.weitianshi.cn/'*/

/*项目详情URL*/



export default
{
  /*项目列表页*/
  getNodeCount:"project/getNodeCount", //项目节点数量
  deleteUpload:"project/deleteUpload",  //删除批量上传的文件
  saveUpload:"project/saveUpload",  //修改批量上传文件的绑定
  titleSift:"project/titleSift", //项目列表表头数据
  getProjectList:"project/getProjectList",  //获取項目列表

  /*项目详情页*/
  getOneProject:"project/getOneProject",  //获取項目詳情
  deleteAtUpload:"project/deleteAtUpload",  //bp文件软删除
  deleteAtFile:"project/deleteAtFile",  //项目文件软删除
  download:"project/download",  //文件下载
  uploadFile:"project/uploadFile",  //文件下载


  getWxProjectCategory:"api/category/getWxProjectCategory",  //编辑项目各种标签接口
  getArea:"api/category/getArea",  //二级城市接口


}
