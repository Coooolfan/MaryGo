<script setup lang="ts">
import { ref } from 'vue'
import CameraView from '@/components/CameraView.vue'
import GameTimer from '@/components/GameTimer.vue'
import { showToast } from '@nutui/nutui'
interface Move {
  id: number
  number: number
  player: string
  position: string
}

interface BoardPosition {
  x: number
  y: number
  stone: 'black' | 'white' | null
}

const gaming = ref(false)
const showCamera = ref(false)
// 棋盘状态数据
const boardState = ref<BoardPosition[][]>(
  Array(19).fill(null).map(() =>
    Array(19).fill(null).map(() => ({
      stone: null,
      x: 0,
      y: 0
    }))
  )
)

// 初始化一些示例棋子
const initializeBoard = () => {
  boardState.value[3][3].stone = 'black'
  boardState.value[3][15].stone = 'white'
  boardState.value[15][3].stone = 'white'
  boardState.value[15][15].stone = 'black'
  boardState.value[9][9].stone = 'black'
}

initializeBoard()

// 获取棋盘格子的样式类

// 示例棋谱记录 - 为了演示滚动效果，增加更多记录
const moves = ref<Move[]>([
  { id: 1, number: 1, player: '黑', position: 'D4' },
  { id: 2, number: 2, player: '白', position: 'Q16' },
  { id: 3, number: 3, player: '黑', position: 'D16' },
  { id: 4, number: 4, player: '白', position: 'Q4' },
  { id: 5, number: 5, player: '黑', position: 'K10' },
  { id: 6, number: 6, player: '白', position: 'D10' },
  { id: 7, number: 7, player: '黑', position: 'Q10' },
  { id: 8, number: 8, player: '白', position: 'K16' },
  { id: 9, number: 9, player: '黑', position: 'K4' },
  { id: 10, number: 10, player: '白', position: 'D13' },
  // ... 可以继续添加更多记录
])

const handleStop = () => {
  gaming.value = false
  showToast.text('对局已保存-请在棋谱复盘中查看', {
    center: false,
    bottom: "10%"
  })
}
</script>

<template>
  <div class="flex flex-col px-4">
    <!-- 功能选择区 -->
    <section class="flex gap-4 py-2 justify-between">
      <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
        <i class="pi pi-check-circle"></i>
        中国规则
      </div>
      <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
        <i class="pi pi-chart-bar"></i>
        19路棋盘
      </div>
      <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
        <i class="pi pi-clock"></i>
        快棋
      </div>
    </section>

    <!-- 棋盘展示区 -->
    <section class="flex-shrink-0 p-2 bg-[#e6d5ac] rounded-lg shadow-md aspect-square"
      @click="showCamera = !showCamera">
      <CameraView v-if="showCamera" />
      <img src="@/assets/GoBoard.jpg" alt="棋盘" class="w-full h-full rounded-lg object-cover" v-else>
    </section>

    <!-- 状态信息区 -->
    <section class="flex-shrink-0 py-4">
      <div class="flex items-center gap-2 py-1 text-gray-600 text-sm">
        <i class="pi pi-cloud"></i>
        正在使用云端算力识别
        <span class="text-green-500" v-show="!gaming">已就绪</span>
        <span class="text-green-500" v-show="gaming">识别中</span>
      </div>
      <div class="flex items-center gap-2 py-1 text-gray-600 text-sm">
        <i class="pi pi-cog"></i>
        落子判断模式：自动
      </div>
      <div class="flex items-center gap-2 py-1 text-gray-600 text-sm">
        <i class="pi pi-info-circle"></i>
        等待黑方落子 • 回合数 {{ moves.length }}
      </div>
      <GameTimer v-if="gaming" />
    </section>
    <!-- 棋谱记录区 -->
    <section class="relative h-42 bg-gray-100 rounded-lg">
      <!-- 固定的渐变遮罩 -->
      <div class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-100 to-transparent z-10"></div>
      <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 to-transparent z-10"></div>

      <!-- 可滚动的内容区 -->
      <div class="absolute inset-0 overflow-y-auto p-4" v-show="gaming">
        <div class="space-y-3">
          <div v-for="move in moves" :key="move.id" class="flex gap-4 items-center text-sm">
            <span class="min-w-[30px] font-medium">{{ move.number }}</span>
            <span class="min-w-[30px] text-gray-600">{{ move.player }}</span>
            <span>{{ move.position }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 操作区 -->
    <section class="flex-shrink-0 py-4 flex justify-center gap-4">
      <nut-button v-show="gaming" type="default">
        <template #icon>
          <i class="pi pi-refresh"></i>
        </template>
        触发识别/落子
      </nut-button>
      <nut-button v-show="gaming" type="danger" @click="handleStop" color="#ff0000">
        <template #icon>
          <i class="pi pi-stop-circle"></i>
        </template>
        停止识别
      </nut-button>
      <nut-button v-show="!gaming" type="success" @click="gaming = true" color="#00c950">
        <template #icon>
          <i class="pi pi-power-off"></i>
        </template>
        开始识别</nut-button>
    </section>
  </div>
</template>
