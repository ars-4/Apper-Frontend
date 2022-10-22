import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from '../views/ims/OrderView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/apps',
    name: 'store',
    component: () => import(/* webpackChunkName: "store" */ '../views/StoreView.vue')
  },
  {
    path: '/ims',
    name: 'ims',
    component: () => import(/* webpackChunkName: "ims" */ '../views/InventoryView.vue')
  },
  {
    path: '/ims/order/',
    name: 'order',
    component: OrderView
  },
  {
    path: "/cm",
    name: "cm",
    component: () => import(/* webpackChunkName: "cm" */ '../views/ComplaintView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
