/*路由配置
* 引入页面
* */
//工作台首页路由
import Workbench from '@/components/Workbench'
import myProject from '@/components/Workbench/myProject/myProject.vue'

/*配置路由*/
export default [

    {
      path: '/', name: 'Workbench', component: Workbench,
      children:[
        { path: '/myProject', component: myProject}
      ]
    }
  ]

