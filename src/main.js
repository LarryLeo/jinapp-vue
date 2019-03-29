/**
|--------------------------------------------------
| // todo 重新设计路由，解决fixed布局导致子页面会出现父页面滚动条的问题
  // todo 重新设计路由，更好的实现多个入口调至同一页面的功能
  // todo vant 的 tab切换开启动画后，会导致每个tab内容的高度自动会共享高度最高的那个页面的高度
|--------------------------------------------------
*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/styles/index.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
