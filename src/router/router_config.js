/*路由配置*/
/*===============================首页路由配置=======================================*/
import index from '@/components/index/index.vue'


/*===============================工作台首页路由配置=================================*/
import workBench from '@/components/workBench/index.vue'

//我的项目主页路由
import indexmyProject from '@/components/workBench/myProject/index.vue'
import myProject from '@/components/workBench/myProject/myProject.vue'    //我的项目
import projectDetails from '@/components/workBench/myProject/projectDetails.vue'   //项目详情


import myContacts from '@/components/workBench/myContacts/mycontacts.vue'//我的人脉

import followUp from '@/components/workBench/followUp/followup.vue'     //跟进记录

/*===============================小程序页面路由配置===============================*/
//小程序页面
import SmallRoutine from '@/components/SmallRoutine/index.vue'



//测试路由
import createForm from '@/test/createForm.vue'
import watch from '@/test/watch.vue'
import jump from '@/test/jump.vue'
import selectbox from '@/test/selectbox.vue'
import alertUpload from '@/test/alertUpload.vue'
import upload from '@/test/upload.vue'



/*配置路由*/
export default [

  {
    path: '/workBench', name: 'workBench', component: workBench, name:"workBench",

    children:[
      { path: '', component: indexmyProject},
      { path: '/workBench/myProject', component: indexmyProject, name:"indexmyProject",
        children:[
          { path: '', component: myProject, name:"myProject"},

          { path: 'myContacts', component: myContacts, name:"myContacts"},
          { path: 'followup', component: followUp, name:"followUp"}
        ]
      },
      { path: 'projectDetails', component: projectDetails, name:"projectDetails"},
    ]
  },
  {
    path: '/index', name: 'index', component: index, name:"index"
  },
  {
    path: '/SmallRoutine', name: 'SmallRoutine', component: SmallRoutine, name:"SmallRoutine"
  },
  {
    path: '/test', name: 'test', component: alertUpload
  },
  {
    path: '/test2', name: 'test2', component: upload
  }
  ]

