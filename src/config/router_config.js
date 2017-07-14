/*路由配置*/
/*===============================首页路由配置=======================================*/
const index = r => require.ensure([], () => r(require('@/views/index/index.vue')), 'index');
/*===============================登录相关页面路由配置=======================================*/
const login = r => require.ensure([], () => r(require('@/views/login/login.vue')), 'login');
const forgetPassword = r => require.ensure([], () => r(require('@/views/login/forgetPassword.vue')), 'forgetPassword');
const bindTelephone = r => require.ensure([], () => r(require('@/views/login/bindTelephone.vue')), 'bindTelephone');
const telephoneLogin = r => require.ensure([], () => r(require('@/views/login/telephoneLogin.vue')), 'telephoneLogin');
const codeLogin = r => require.ensure([], () => r(require('@/views/login/codeLogin.vue')), 'codeLogin');
const loginReady = r => require.ensure([], () => r(require('@/views/login/loginReady.vue')), 'loginReady');

/*===============================用户身份路由配置=================================*/
const identityChoose = r => require.ensure([], () => r(require('@/views/identity/identityChoose.vue')), 'identityChoose');
const identityDetail = r => require.ensure([], () => r(require('@/views/identity/identityDetail.vue')), 'identityDetail');

/*===============================工作台首页路由配置=================================*/
const workBench = r => require.ensure([], () => r(require('@/views/workBench/index.vue')), 'workBench');

//我的项目主页路由
const indexmyProject = r => require.ensure([], () => r(require('@/views/workBench/myProject/index.vue')), 'indexmyProject');
const myProject = r => require.ensure([], () => r(require('@/views/workBench/myProject/myProject.vue')), 'myProject');
const projectDetails = r => require.ensure([], () => r(require('@/views/workBench/myProject/projectDetails.vue')), 'projectDetails');

const editproject = r => require.ensure([], () => r(require('@/views/workBench/myProject/editproject.vue')), 'editproject');

const creatproject = r => require.ensure([], () => r(require('@/views/workBench/myProject/creatproject.vue')), 'creatproject');


/*===============================人脉路由配置=================================*/
const myContacts = r => require.ensure([], () => r(require('@/views/workBench/myContacts/mycontacts.vue')), 'myContacts');//人脉列表
const createContacts = r => require.ensure([], () => r(require('@/views/workBench/myContacts/createcontacts.vue')), 'createContacts');//创建人脉
const contactsDetails = r => require.ensure([], () => r(require('@/views/workBench/myContacts/contactsDetails.vue')), 'contactsDetails');//人脉详情


/*===============================跟进记录首页路由配置=================================*/
const followUp = r => require.ensure([], () => r(require('@/views/workBench/followUp/followup.vue')), 'followUp');  //跟进记录


/*===============================小程序页面路由配置===============================*/
//小程序页面
const SmallRoutine = r => require.ensure([], () => r(require('@/views/SmallRoutine/index.vue')), 'SmallRoutine');


//测试路由
// import createForm from '@/test/createForm.vue'
// import watch from '@/test/watch.vue'
// import jump from '@/test/jump.vue'
// import selectbox from '@/test/dialog.vue'
import dialog2 from '@/test/dialog2.vue'
// import alertUpload from '@/test/alertUpload.vue'
// import upload from '@/test/upload.vue'
// import open from '@/test/open.vue'

const checkone = r => require.ensure([], () => r(require('@/test/checkone.vue')), 'checkone')
const checkArray = r => require.ensure([], () => r(require('@/test/checkArray.vue')), 'checkArray')


/*配置路由*/
export default [

  {
    path: '/workBench',component: workBench,
    children:[
      // { path: '', component: indexmyProject},
      { path: '/workBench', component: indexmyProject,name:"indexmyProject",
        children:[
          { path: '', component: myProject, name:"myProject"},
          { path: 'myContacts', component: myContacts, name:"myContacts"},
          { path: 'followup', component: followUp, name:"followUp"}
        ]
      },
      { path: 'projectDetails', component: projectDetails, name:"projectDetails"},//项目详情
      { path: 'editproject', component: editproject, name:"editproject"},//编辑项目
      { path: 'creatproject', component: creatproject, name:"creatproject"},//创建项目
      { path: 'createContacts', component: createContacts, name:"createContacts"},//创建人脉
      { path: 'contactsDetails', component: contactsDetails, name:"contactsDetails"},//人脉详情
    ]
  },
  {
    path: '/', name: 'index', component: index,
  },
  {
    path: '/qr', name: 'SmallRoutine', component: SmallRoutine
  },
  {
    path: '/login', component:login,
    children:[
      { path:'',name:'telephoneLogin',component:telephoneLogin},
      { path:'codeLogin',name:'codeLogin',component:codeLogin},
    ]
  },
  {
    path: '/loginReady', name: 'loginReady', component:loginReady
  },
  {
    path: '/forgetPassword', name: 'forgetPassword', component:forgetPassword
  },
  {
    path: '/bindTelephone', name: 'bindTelephone', component:bindTelephone
  },
  {
    path: '/identityChoose', name: 'identityChoose', component:identityChoose
  },
  {
    path: '/identityDetail', name: 'identityDetail', component:identityDetail
  },
  {
    path: '/test', name: 'test', component: checkone
  },
  {
    path: '/test2', name: 'test2', component: dialog2
  }
  ]

