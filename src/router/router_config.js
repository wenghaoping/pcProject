/*路由配置*/
/*===============================首页路由配置=======================================*/
import index from '@/components/index/index.vue'


/*===============================工作台首页路由配置=================================*/
import workBench from '@/components/workBench/index.vue'

//我的项目主页路由
import indexmyProject from '@/components/workBench/myProject/index.vue'
import myProject from '@/components/workBench/myProject/myProject.vue'    //我的项目
import myContacts from '@/components/workBench/myContacts/mycontacts.vue'//我的人脉
import followUp from '@/components/workBench/followUp/followup.vue'     //跟进记录

/*===============================小程序页面路由配置===============================*/
//小程序页面
import SmallRoutine from '@/components/SmallRoutine/index.vue'



//测试路由
import test from '@/test/upload.vue'
import test2 from '@/test/test2.vue'
import create from '@/test/watch.vue'
import createForm from '@/test/createForm.vue'



/*配置路由*/
export default [

  {
    path: '/workBench', name: 'workBench', component: workBench, name:"workBench",

    children:[
      { path: '', component: indexmyProject},
      { path: '/workBench/myProject', component: indexmyProject, name:"indexmyProject",
        children:[
          { path: '', component: myProject, name:"myProject"},
          { path: '/workBench/myContacts', component: myContacts, name:"myContacts"},
          { path: '/workBench/followup', component: followUp, name:"followUp"}
        ]
      },
    ]
  },
  {
    path: '/index', name: 'index', component: index, name:"index"
  },
  {
    path: '/SmallRoutine', name: 'SmallRoutine', component: SmallRoutine, name:"SmallRoutine"
  },
  {
    path: '/test', name: 'test', component: createForm, name:"test"
  }
  ]

