<script setup lang="ts">

// 定义props
defineProps({
  matchTime: {
    type: String,
    default: '2024-03-15 14:30'
  },
  ruleType: {
    type: String,
    default: '中国规则'
  },
  compensation: {
    type: String,
    default: '3又3/4子 (7.5目)'
  },
  winner: {
    type: String,
    default: '白胜'
  },
  winMethod: {
    type: String,
    default: '点胜'
  },
  winPoints: {
    type: String,
    default: '1.5目'
  },
  totalMoves: {
    type: [String, Number],
    default: 285
  },
  blackTime: {
    type: String,
    default: '2小时15分钟'
  },
  whiteTime: {
    type: String,
    default: '2小时20分钟'
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden w-full">
    <div class="p-4 space-y-3">
      <!-- 头部信息 -->
      <div class="flex items-center space-x-2 text-gray-600">
        <i class="pi pi-calendar"></i>
        <span class="text-xs">{{ matchTime }}</span>
      </div>

      <!-- 主要信息 -->
      <div class="space-y-2">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600">规则类型</span>
          <span class="font-medium">{{ ruleType }}</span>
        </div>

        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600">贴目</span>
          <span class="font-medium">{{ compensation }}</span>
        </div>

        <div class="bg-blue-50 p-2 rounded-lg">
          <div class="flex justify-between items-center text-sm">
            <span class="text-gray-600">胜负</span>
            <span class="font-semibold text-blue-600">{{ winner }}</span>
          </div>
          <div class="flex justify-between items-center mt-1 text-sm">
            <span class="text-gray-600">方式</span>
            <span class="font-medium">{{ winMethod }} {{ winPoints }}</span>
          </div>
        </div>
      </div>

      <!-- 用时信息 -->
      <div class="space-y-1.5 pt-2 border-t text-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="pi pi-clock"></i>
            <span class="text-gray-600">总手数</span>
          </div>
          <span class="font-medium">{{ totalMoves }}手</span>
        </div>

        <div class="flex justify-between text-xs">
          <span class="text-gray-600">黑方用时</span>
          <span>{{ blackTime }}</span>
        </div>

        <div class="flex justify-between text-xs">
          <span class="text-gray-600">白方用时</span>
          <span>{{ whiteTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
