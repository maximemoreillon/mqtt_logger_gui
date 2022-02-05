import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/sources',
    name: 'sources',
    component: () => import('../views/Sources.vue'),
    alias: '/'
  },
  {
    path: '/sources/:_id',
    name: 'source',
    component: () => import('../views/Source.vue'),
    alias: '/'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
