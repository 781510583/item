import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
const routes = [
  {
        path:'/',
    component:() => import('../views/layout'),
    children:[
      {
        path:'home',
        component:() => import('@/views/home')
      },
      {
        path:'user-info',
        component:() => import('@/views/user/userInfo'),
      },
      {
        path:'user-avatar',
        component:() => import('@/views/user/userAvatar')
      },
      {
        path:'user-pwd',
        component:() => import('@/views/user/userPwd')
      },
      {
        path: 'art-cate', // 文章分类
        component: () => import('@/views/articles/classify')
      },
      {
        path: 'art-list', // 文章分类
        component: () => import('@/views/articles/list')
      },
    ]
  },
  {
    path:'/register',
    component:() => import('../views/register')
  },
  {
    path:'/login',
    component:() => import('../views/login')
  }
]
const router = new VueRouter({
  routes
})
let whitelist = ['/login','/register']
router.beforeEach((to,from,next) => {
  const token = store.state.token
  if (token) { 
    if (!store.state.userInfo.username) {
      store.dispatch('getUserInfoActions')
    }
    next()
  }else{
    if (whitelist.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
