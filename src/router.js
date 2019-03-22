import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '警企e通',
      component: Home,
      children: [
        {
          path: 'guide/:title',
          component: () => import('./views/Guide.vue'),
          name: '办事指南'
        },
        {
          path: 'notice',
          component: () => import('./views/Notice.vue'),
          name: '政策宣传'
        }
      ]
    },
    {
      path: '/politic',
      name: '江津政务',
      component: () => import('./views/Politic.vue'),
      children: [
        {
          path: 'contacts',
          component: () => import('./views/Contacts.vue'),
          name: '警企备忘录'
        }
      ]
    },
    {
      path: '/my',
      name: '我的',
      component: () => import('./views/My.vue')
    }
  ]
})
