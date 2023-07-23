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
      component: HomeView,
      meta: { tabIndex: 0 }
    },
    {
      path: '/item',
      name: 'item',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ItemView/index.vue'),
      meta: {
        keepAlive: true, // 需要缓存
        tabIndex: 0
      }
    },
    {
      path: '/itemForm',
      name: 'itemForm',
      component: () => import('../views/ItemView/ItemForm.vue'),
      meta: { tabIndex: 0 }
    },
    {
      path: '/focus',
      name: 'focus',
      component: () => import('../views/FocusView/index.vue'),
      meta: { tabIndex: 0, keepAlive: true }
    },
    {
      path: '/diary',
      name: 'diary',
      component: () => import('../views/DiaryView/index.vue'),
      meta: { tabIndex: 0 }
    },
    {
      path: '/diaryForm',
      name: 'diaryForm',
      component: () => import('../views/DiaryView/diaryForm.vue'),
      meta: { tabIndex: 0 }
    },
    {
      path: '/desire',
      name: 'desire',
      component: () => import('../views/DesireView/index.vue'),
      meta: { tabIndex: 0 }
    },
    {
      path: '/data',
      name: 'data',
      component: DataView,
      meta: { tabIndex: 1 }
    },
    {
      path: '/mine',
      name: 'mine',
      component: MineView,
      meta: { tabIndex: 2 }
    }
  ]
})

export default router
