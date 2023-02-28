import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Index from '../views/index'
import Profile from '../views/profile'
import Album from '../views/album'
import FindMusic from '../views/findmusic'
import Lyrics from '../views/lyrics'
import Home from '../views/homepage'
import Artist from '../views/artist'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect:'/homepage' },
  { path: '/login', component : Login },
  { 
    path: '/index', 
    component : Index,
    // redirect:'/index',
    children: [
      {path:'/homepage',component: Home},
      {path:'/findmusic',component: FindMusic},
      {path:'/artist',component: Artist},
      {path:'/profile',component : Profile},
      {path:'/album',component : Album},
      {path:'/lyrics',component : Lyrics}
    ]}
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫; 来控制页面访问权限
router.beforeEach((to,from,next)=>{
  // // to 将要访问的路径
  // // from 代表从哪个路径跳转而来
  // // next 是一个函数，表示放行
  // // next() 放行    next('/login') 强制跳转
  // if(to.path === '/login') return next();
  // // 获取cookie
  // const cookieStr = window.sessionStorage.getItem('cookie')
  // if(!cookieStr) return next('/login')
  next()
})

export default router
