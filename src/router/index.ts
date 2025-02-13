import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('@/views/RecordView.vue'),
      meta: {
        title: '棋谱记录',
      },
    },
    {
      path: '/replay',
      name: 'replay',
      component: () => import('@/views/ReplayView.vue'),
      meta: {
        title: '棋谱复盘',
      },
    },
    {
      path: '/import-export',
      name: 'import-export',
      component: () => import('@/views/ImportExportView.vue'),
      meta: {
        title: '导入导出',
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: {
        title: '系统设置',
      },
    },
  ],
})

export default router
