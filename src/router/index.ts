import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import DataView from '../views/DataView/index.vue'
import MineView from '../views/MineView/index.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      component: () => import('../views/ItemView/index.vue'),
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/itemForm',
      name: 'itemForm',
      component: () => import('../views/ItemView/ItemForm.vue'),
      meta: {}
    },
    {
      path: '/focus',
      name: 'focus',
      component: () => import('../views/FocusView/index.vue'),
      meta: {}
    },
    {
      path: '/diary',
      name: 'diary',
      component: () => import('../views/DiaryView/index.vue'),
      meta: {}
    },
    {
      path: '/diaryForm',
      name: 'diaryForm',
      component: () => import('../views/DiaryView/DiaryForm.vue'),
      meta: {}
    },
    {
      path: '/data',
      name: 'data',
      component: DataView,
      meta: {}
    },
    {
      path: '/mine',
      name: 'mine',
      component: MineView,
      meta: {}
    }
  ]
})

export default router
