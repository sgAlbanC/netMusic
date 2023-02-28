import Vue from 'vue'
import App from './App.vue'  // 根组件
import router from './router'  // 路由
import store from './store'  // 全局状态管理
import './assets/iconfont/iconfont.css' // iconfont 样式
import NProgress from 'nprogress'


import './plugins/element.js'
// 引入全局样式表
import './assets/css/global.css'

// 导入axios 发起ajax请求;这样每一个Vue的组件都可以通过this访问到$http，从而发起ajax请求
import axios from 'axios'
axios.defaults.baseURL = '/api'
// 引入全局组件
import DataList from './components/DataList.vue'

Vue.component('DataList', DataList);


// 发起请求前
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')

  // 给get加时间戳？
  if (config.method == 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }



  // 在最后必须 return config
  return config
})
// 发起请求后，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

// 整个项目入口文件


new Vue({
  store,
  router,   // 将路由挂载到了vue实例
  render: h => h(App)   // 将根组件渲染到了页面
}).$mount('#app')
