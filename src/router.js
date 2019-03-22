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
      name: 'home',
      component: Home,
      children: [
        {
          path: 'guide',
          component: () => import('./views/Guide.vue')
        },
        {
          path: 'notice',
          component: () => import('./views/Notice.vue')
        }
      ]
    },
    {
      path: '/politic',
      name: 'politic',
      component: () => import('./views/Politic.vue'),
      children: [
        {
          path: 'contacts',
          component: () => import('./views/Contacts.vue')
        }
      ]
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('./views/My.vue')
    }
  ]
})
