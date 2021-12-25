import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import Playlistdetail from '../components/Playlistdetail.vue'
import FindMusic from '../components/FindMusic.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect:'/login' },
  { path: '/login', component : Login },
  { path: '/register', component : Register },
  { 
    path: '/home', 
    component: Home,
    // redirect:'/index',
    children: [
      {path:'/findmusic',component:FindMusic},
      {path:'/profile',component : Profile},
      {path:'/playlistdetail',component : Playlistdetail}
    ]}
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫; 来控制页面访问权限
router.beforeEach((to,from,next)=>{
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行    next('/login') 强制跳转
  if(to.path === '/login') return next();
  // 获取cookie
  const cookieStr = window.sessionStorage.getItem('cookie')
  if(!cookieStr) return next('/login')
  next()
})

export default router
