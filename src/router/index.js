import Vue from 'vue'
import Router from 'vue-router'
import Headers from '@/components/header.vue'


Vue.use(Router)
const routes = [{
    path: '*',
    redirect: '/daily'
  },

  {
    path: '/daily',
    name: 'daily',
    component: (resolve) => require(['@/pages/daily'], resolve)
  },
  {
    path: '/description',
    name: 'description',
    component: (resolve) => require(['@/pages/description'], resolve)
  },
  {
    path: '/themes',
    name: 'themes',
    component: (resolve) => require(['@/pages/themes'], resolve)
  },

];


export default new Router({
  routes
})
