import Vue from 'vue'
import VueRouter from 'vue-router'
//import { component } from 'vue/types/umd'
import Home from '../views/Home.vue'
import Webhook from '../views/WebHook.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/webhook',
    name: 'Webhook',
    component: Webhook
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Edit" */ '@/views/Edit.vue')
  },
  {
    path: '/view/:id',
    name: 'server_view',
    component: () => import(/* webpackChunkName: "View" */ '@/views/Details.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
