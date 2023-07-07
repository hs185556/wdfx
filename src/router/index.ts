import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import DataView from '../views/DataView/index.vue'
import MineView from '../views/MineView/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/item',
      name: 'item',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ItemView/index.vue')
    },
    {
      path: '/itemForm',
      name: 'itemForm',
      component: () => import('../views/ItemView/ItemForm.vue')
    },
    {
      path: '/data',
      name: 'data',
      component: DataView
    },
    {
      path: '/mine',
      name: 'mine',
      component: MineView
    },
  ]
})

export default router
