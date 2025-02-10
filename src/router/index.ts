import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecordView from '../views/RecordView.vue'
import ReplayView from '../views/ReplayView.vue'
import ImportExportView from '../views/ImportExportView.vue'
import SettingsView from '../views/SettingsView.vue'

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
      component: RecordView,
    },
    {
      path: '/replay',
      name: 'replay',
      component: ReplayView,
    },
    {
      path: '/import-export',
      name: 'import-export',
      component: ImportExportView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
})

export default router
