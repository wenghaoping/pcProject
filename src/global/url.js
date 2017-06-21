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
  deleteCoreTeam:"project/deleteCoreTeam",  //删除核心成员
  deleteFinance:"project/deleteFinance",  //删除历史融资
  deleteDevelop:"project/deleteDevelop",  //删除里程碑
  editProject:"project/editProject",  //项目编辑、新建

  getOneCompany:"api/crawler/getOneCompany",  //获取公司信息
  setFileType:"project/setFileType",  //文件分组设置

  getWxProjectCategory:"api/category/getWxProjectCategory",  //编辑项目各种标签接口
  getArea:"api/category/getArea",  //二级城市接口
  createStatusPro:"api/category/createStatusPro",  //添加自定义运营状态
  createCustomTag:"api/category/createCustomTag",  //添加自定义标签/个人,团队
  selectCompany:"api/crawler/selectCompany",  //公司名称提示
  getFileType:"api/category/getFileType",  //文件分组设置选项
  createFileType:"api/category/createFileType",  //添加文件分组设置



  getCrawlerCompany:"api/crawler/getCrawlerCompany",  //一键尽调-公司
  getCrawlerLeader:"api/crawler/getCrawlerLeader",  //一键尽调-公司高管
  getCrawlerBrand:"api/crawler/getCrawlerBrand",  //一键尽调-商标
  getCrawlerTeam:"api/crawler/getCrawlerTeam",  //一键尽调-核心成员
  getCrawlerHistoryFinance:"api/crawler/getCrawlerHistoryFinance",  //一键尽调-历史融资
  getCrawlerMilestone:"api/crawler/getCrawlerMilestone",  //一键尽调-里程碑
  getCrawlerNews:"api/crawler/getCrawlerNews",  //一键尽调-新闻
  getCrawlerCompeting:"api/crawler/getCrawlerCompeting",  //一键尽调-竞品
  getCrawlerProject:"api/crawler/getCrawlerProject",  //一键尽调-项目


}
