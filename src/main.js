import Vue from 'vue'
import App from './App.vue'  // 根组件
import router from './router'  // 路由
import './plugins/element.js'

Vue.config.productionTip = false

// 整个项目入口文件

new Vue({
  router,   // 将路由挂载到了vue实例
  render: h => h(App)   // 将根组件渲染到了页面
}).$mount('#app')
