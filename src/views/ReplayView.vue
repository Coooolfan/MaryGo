<script setup lang="ts">
import { ref, toRaw, onMounted, computed } from 'vue'
import type { board_state, GoMatch } from '@/assets/utils/GoMatch'
import GoBoard from '@/components/GoBoard.vue'
import GoMatchCardSlim from '@/components/GoMatchCardSlim.vue'
import { EmptyBoardState, GoMatches } from '@/assets/utils/GoMatch'
import { showToast } from '@nutui/nutui'
import { DEFAULT_MATCH } from '@/assets/utils/SGFParse'
const GoMatchList = ref<GoMatch[]>([...GoMatches, DEFAULT_MATCH])
// 初始化19路空棋盘
const boardSize = ref(19)
const positions = ref<board_state[]>([structuredClone(EmptyBoardState)])
const currentBoardState = ref(structuredClone(EmptyBoardState))
const currentHand = ref<'b' | 'w'>('b')
const currentPosition = ref(0)
const currentTryMovePosition = ref(0)
const showMatchSelector = ref(false)

// 新增状态
const isTryingMove = ref(false)
const tryMovePositions = ref<board_state[]>([])
const currentMatchInfo = ref<GoMatch | null>(null)
const aiAnalysis = computed(() => {
  // 模拟AI分析结果
  const blackWinRate = Math.random() * 100 + currentPosition.value * 0 + currentTryMovePosition.value * 0
  return {
    blackWinRate: blackWinRate.toFixed(1),
    whiteWinRate: (100 - blackWinRate).toFixed(1),
    suggestion: Math.random() > 0.5 ? '黑优势' : '白优势'
  }
})
// 进度计算
const progress = computed(() => {
  if (positions.value.length <= 1) return 0
  return (currentPosition.value / (positions.value.length - 1)) * 100
})

function handleBoardClick(x: number, y: number) {
  if (currentBoardState.value[x][y] === 'x' && isTryingMove.value) {
    const currentPositions = isTryingMove.value ? tryMovePositions : positions
    currentBoardState.value[x][y] = currentHand.value
    currentHand.value = currentHand.value === 'b' ? 'w' : 'b'
    // currentPositions.value.push(structuredClone(toRaw(currentBoardState.value)))
    currentTryMovePosition.value++
    currentPositions.value[currentTryMovePosition.value] = structuredClone(toRaw(currentBoardState.value))
  }
}

function handlePre() {
  if (currentPosition.value > 0) {
    console.log(currentPosition.value)
    currentPosition.value--
    currentBoardState.value = structuredClone(toRaw(positions.value[currentPosition.value]))
    currentHand.value = currentHand.value === 'b' ? 'w' : 'b'
  }
}
function handleNext() {
  if (currentPosition.value < positions.value.length - 1) {
    currentPosition.value++
    currentBoardState.value = structuredClone(toRaw(positions.value[currentPosition.value]))
    currentHand.value = currentHand.value === 'b' ? 'w' : 'b'
  }
}
function handleNextEnd() {
  currentPosition.value = positions.value.length - 1
  currentBoardState.value = structuredClone(toRaw(positions.value[currentPosition.value]))
}
function handlePreFirst() {
  currentPosition.value = 0
  currentBoardState.value = structuredClone(toRaw(positions.value[currentPosition.value]))
}
function handleTryMovePre() {
  if (currentTryMovePosition.value > 0) {
    currentTryMovePosition.value--
    currentBoardState.value = structuredClone(toRaw(tryMovePositions.value[currentTryMovePosition.value]))
    currentHand.value = currentHand.value === 'b' ? 'w' : 'b'
  }
}
function handleTryMoveNext() {
  if (currentTryMovePosition.value < tryMovePositions.value.length - 1) {
    currentTryMovePosition.value++
    currentBoardState.value = structuredClone(toRaw(tryMovePositions.value[currentTryMovePosition.value]))
    currentHand.value = currentHand.value === 'b' ? 'w' : 'b'
  }
}

function handleMatchSelect(match: GoMatch) {
  if (match.positions) {
    showMatchSelector.value = false
    positions.value = match.positions
    currentPosition.value = 0
    currentBoardState.value = structuredClone(toRaw(positions.value[currentPosition.value]))
    currentMatchInfo.value = match
    isTryingMove.value = false
  } else {
    showToast.text('棋盘数据无效，请选择其他棋谱', {
      center: false,
      bottom: "10%"
    })
  }
}
function handleNewMatch() {
  positions.value = [structuredClone(EmptyBoardState)]
  currentPosition.value = 0
  currentBoardState.value = structuredClone(EmptyBoardState)
  showMatchSelector.value = false
}

// 试下模式处理
function handleTryMove() {
  if (!isTryingMove.value) {
    // 进入试下模式
    isTryingMove.value = true
    tryMovePositions.value = [structuredClone(toRaw(currentBoardState.value))]
    currentTryMovePosition.value = 0
    currentHand.value = currentPosition.value % 2 === 0 ? 'b' : 'w'
  } else {
    // 退出试下模式
    isTryingMove.value = false
    currentBoardState.value = structuredClone(toRaw(positions.value[currentPosition.value]))
    currentHand.value = currentPosition.value % 2 === 0 ? 'b' : 'w'
  }
}

// 添加 onMounted 钩子
onMounted(() => {
  setTimeout(() => {
    showMatchSelector.value = true
  }, 100)
})
</script>
<template>
  <div class="flex flex-col h-full">
    <!-- 对局信息 -->
    <div v-if="currentMatchInfo" class="bg-white p-4 shadow-sm">
      <div class="max-w-3xl mx-auto">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">{{ currentMatchInfo.date }}</span>
            <span class="text-sm text-gray-400">{{ currentMatchInfo.time }}</span>
          </div>
          <div class="flex items-center gap-2">
            <nut-tag plain size="small">{{ currentMatchInfo.ruleType }}</nut-tag>
            <nut-tag plain size="small">让子: {{ currentMatchInfo.handicap }}</nut-tag>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-black"></div>
              <span class="font-medium" :class="{
                'text-black font-bold': currentMatchInfo.result.winner === 'black',
                'text-gray-600': currentMatchInfo.result.winner !== 'black'
              }">黑方</span>
            </div>
            <div class="text-lg font-bold text-gray-300">vs</div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-white border-2 border-black"></div>
              <span class="font-medium" :class="{
                'text-black font-bold': currentMatchInfo.result.winner === 'white',
                'text-gray-600': currentMatchInfo.result.winner !== 'white'
              }">白方</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <i class="pi pi-flag text-gray-600"></i>
            <span class="font-bold text-gray-900">
              {{ currentMatchInfo.result.winner === 'black' ? '黑胜' : '白胜' }}
              {{ currentMatchInfo.result.points }}
            </span>
          </div>
        </div>

        <div class="flex gap-4 mt-3 text-sm text-gray-500 border-t pt-3">
          <div class="flex items-center gap-1">
            <i class="pi pi-clock"></i>
            <span>用时: {{ currentMatchInfo.timeUsed.black }}/{{ currentMatchInfo.timeUsed.white }}</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-th-large"></i>
            <span>{{ currentMatchInfo.size }}路棋盘</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="pi pi-chart-line"></i>
            <span>共{{ currentMatchInfo.moves }}手</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="flex-1 overflow-auto p-4">
      <div class="max-w-3xl mx-auto">
        <!-- 棋盘区域 -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-4">
          <GoBoard :size="boardSize" :board-state="currentBoardState" :on-click="handleBoardClick"
            :key="currentPosition" />
        </div>

        <!-- 控制区域 -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <!-- 进度条 -->
          <div class="flex items-center justify-between gap-4 mb-2">
            <nut-progress :percentage="progress" :size="'small'" :is-show-percentage="false" text-inside>
              <i class="pi pi-pause-circle w-4 h-4 -translate-x-2 bg-gray-50 rounded-full" v-if="isTryingMove"></i>
            </nut-progress>
            <span>{{ currentPosition + 1 }}/{{ positions.length }}</span>
          </div>


          <!-- 操作按钮 -->
          <div class="flex justify-between items-center mb-4">
            <nut-button type="primary" @click="handlePreFirst" size="small"
              :disabled="currentPosition === 0 || isTryingMove">
              <i class="pi pi-fast-backward"></i>
            </nut-button>
            <nut-button type="primary" @click="handlePre" size="small"
              :disabled="currentPosition === 0 || isTryingMove">
              <i class="pi pi-chevron-left mr-1"></i>上一步
            </nut-button>
            <nut-button type="primary" @click="handleTryMove" size="small">
              {{ isTryingMove ? '退出试下' : '试下' }}
            </nut-button>
            <nut-button type="primary" @click="handleNext" size="small"
              :disabled="currentPosition === positions.length - 1 || isTryingMove">
              下一步<i class="pi pi-chevron-right ml-1"></i>
            </nut-button>
            <nut-button type="primary" @click="handleNextEnd" size="small"
              :disabled="currentPosition === positions.length - 1 || isTryingMove">
              <i class="pi pi-fast-forward"></i>
            </nut-button>
          </div>

          <div class="bg-gray-50 rounded transition-all duration-300"
            :class="{ 'mb-0 p-0 scale-0 h-0': !isTryingMove, 'mb-4 p-3 scale-100 h-auto': isTryingMove }">
            <h3 class="text-sm font-bold mb-2">试下操作</h3>
            <div class="flex justify-between text-sm">
              <nut-button type="primary" size="small" @click="handleTryMovePre"
                :disabled="currentTryMovePosition === 0">
                <i class="pi pi-chevron-left mr-1"></i>上一步
              </nut-button>
              <nut-button type="primary" size="small" @click="handleTryMoveNext"
                :disabled="currentTryMovePosition === tryMovePositions.length - 1">
                下一步<i class="pi pi-chevron-right ml-1"></i>
              </nut-button>
            </div>
          </div>

          <!-- AI分析 -->
          <div class="bg-gray-50 rounded p-3">
            <h3 class="text-sm font-bold mb-2">AI分析</h3>
            <div class="flex justify-between text-sm">
              <span>黑胜率: {{ aiAnalysis.blackWinRate }}%</span>
              <span>白胜率: {{ aiAnalysis.whiteWinRate }}%</span>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              建议: {{ aiAnalysis.suggestion }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <nut-popup :visible="showMatchSelector" position="bottom" round closeable @click-close-icon="handleNewMatch"
    :close-on-click-overlay="false" :style="{ maxHeight: '80%', padding: '1.25rem 0.5rem 1rem 0.5rem' }">
    <template #close-icon>
      <i class="pi pi-plus"></i>
    </template>
    <p class="text-lg font-bold mb-4 ml-4">选择棋谱</p>
    <div class="flex flex-col gap-3">
      <GoMatchCardSlim v-for="match in GoMatchList" :key="match.id" :match="match" @click="handleMatchSelect(match)" />
    </div>
  </nut-popup>
</template>
