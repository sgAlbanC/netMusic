import Vue from 'vue'
import App from './App.vue'  // 根组件
import router from './router'  // 路由
import NProgress from 'nprogress'


import './plugins/element.js'
// 引入全局样式表
import './assets/css/global.css'

// 导入axios 发起ajax请求;这样每一个Vue的组件都可以通过this访问到$http，从而发起ajax请求
import axios from 'axios'
// 配置axios请求的根路径


axios.defaults.baseURL = 'http://124.220.201.234:3000/'

// axios.interceptors.request.use(config => {
//   // console.log(config)
//   NProgress.start()
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 在最后必须 return config
//   return config
// })
// // 在 response 拦截器中，隐藏进度条 NProgress.done()
// axios.interceptors.response.use(config => {
//   NProgress.done()
//   return config
// })


Vue.prototype.$http = axios

Vue.config.productionTip = false

// 整个项目入口文件

new Vue({
  router,   // 将路由挂载到了vue实例
  render: h => h(App)   // 将根组件渲染到了页面
}).$mount('#app')
