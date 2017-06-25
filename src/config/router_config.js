/*路由配置*/
/*===============================首页路由配置=======================================*/
import index from '@/views/index/index.vue'


/*===============================工作台首页路由配置=================================*/
import workBench from '@/views/workBench/index.vue'

//我的项目主页路由
import indexmyProject from '@/views/workBench/myProject/index.vue'
import myProject from '@/views/workBench/myProject/myProject.vue'    //我的项目
import projectDetails from '@/views/workBench/myProject/projectDetails.vue'   //项目详情

import editproject from '@/views/workBench/myProject/editproject.vue'   //编辑项目
import creatproject from '@/views/workBench/myProject/creatproject.vue'   //创建项目


import myContacts from '@/views/workBench/myContacts/mycontacts.vue'//我的人脉

import followUp from '@/views/workBench/followUp/followup.vue'     //跟进记录


/*===============================小程序页面路由配置===============================*/
//小程序页面
import SmallRoutine from '@/views/SmallRoutine/index.vue'



//测试路由
import createForm from '@/test/createForm.vue'
import watch from '@/test/watch.vue'
import jump from '@/test/jump.vue'
import selectbox from '@/test/dialog.vue'
import dialog2 from '@/test/dialog2.vue'
import alertUpload from '@/test/alertUpload.vue'
import upload from '@/test/upload.vue'



/*配置路由*/
export default [

  {
    path: '/workBench',component: workBench,

    children:[
      { path: '', component: indexmyProject},
      { path: '/workBench/myProject', component: indexmyProject,
        children:[
          { path: '', component: myProject, name:"myProject"},
          { path: 'myContacts', component: myContacts, name:"myContacts"},
          { path: 'followup', component: followUp, name:"followUp"}
        ]
      },
      { path: 'projectDetails', component: projectDetails, name:"projectDetails"},
      { path: 'editproject', component: editproject, name:"editproject"},
      { path: 'creatproject', component: creatproject, name:"creatproject"},
    ]
  },
  {
    path: '/index', name: 'index', component: index
  },
  {
    path: '/qr', name: 'SmallRoutine', component: SmallRoutine
  },
  {
    path: '/test', name: 'test', component: projectDetails
  },
  {
    path: '/test2', name: 'test2', component: dialog2
  }
  ]

