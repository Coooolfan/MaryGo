<script setup lang="ts">
import GoMatchCard from '@/components/GoMatchCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const avatarSrc = 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
// 获取当前时间，用于显示问候语
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 6) return '凌晨好'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 17) return '下午好'
  if (hour < 19) return '傍晚好'
  return '晚上好'
}

function navigateToRecord() {
  router.push('/record')
}

function navigateToReplay() {
  router.push('/replay')
}

function navigateToImportExport() {
  router.push('/import-export')
}

function navigateToSettings() {
  router.push('/settings')
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 bg-gray-50">
    <!-- 问候语和头像 -->
    <div class="flex items-center gap-3 mb-2 pl-2">
      <nut-avatar>
        <img :src="avatarSrc" alt="头像" />
      </nut-avatar>
      <div class="flex flex-col">
        <span class="text-lg font-bold">{{ getGreeting() }}☀️</span>
        <span class="text-sm text-gray-500">今日记录棋局 9 场</span>
      </div>
    </div>

    <!-- 功能卡片网格 -->
    <div class="grid grid-cols-2 gap-4">
      <!-- 棋谱记录 -->
      <div class="rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-102"
        style="background: linear-gradient(135deg, #48BB78 0%, #38A169 100%)" @click="navigateToRecord">
        <div class="p-4 text-white">
          <i class="pi pi-pencil text-xl mb-2"></i>
          <h3 class="text-lg font-bold">棋谱记录</h3>
        </div>
      </div>

      <!-- 棋谱复盘 -->
      <div class="rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-102"
        style="background: linear-gradient(135deg, #4299E1 0%, #3182CE 100%)" @click="navigateToReplay">
        <div class="p-4 text-white">
          <i class="pi pi-replay text-xl mb-2"></i>
          <h3 class="text-lg font-bold">棋谱复盘</h3>
        </div>
      </div>

      <!-- 导入导出 -->
      <div class="rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-102"
        style="background: linear-gradient(135deg, #ED8936 0%, #DD6B20 100%)" @click="navigateToImportExport">
        <div class="p-4 text-white">
          <i class="pi pi-download text-xl mb-2"></i>
          <h3 class="text-lg font-bold">导入导出</h3>
        </div>
      </div>

      <!-- 棋谱设置 -->
      <div class="rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-102"
        style="background: linear-gradient(135deg, #667EEA 0%, #5A67D8 100%)" @click="navigateToSettings">
        <div class="p-4 text-white">
          <i class="pi pi-cog text-xl mb-2"></i>
          <h3 class="text-lg font-bold">系统设置</h3>
        </div>
      </div>
    </div>

    <!-- 分隔提示 -->
    <div class="flex items-center gap-2 mt-2 mb-1">
      <div class="h-px flex-grow bg-gray-200"></div>
      <span class="text-sm text-gray-500">最近对局</span>
      <div class="h-px flex-grow bg-gray-200"></div>
    </div>

    <!-- 棋局卡片列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <GoMatchCard />
      <GoMatchCard />
      <GoMatchCard />
    </div>
  </div>
</template>
