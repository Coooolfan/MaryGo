<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue'
import type { board_state, GoMatch } from '@/assets/utils/GoMatch'
import GoBoard from '@/components/GoBoard.vue'
import GoMatchCardSlim from '@/components/GoMatchCardSlim.vue'
import { EmptyBoardState, GoMatches } from '@/assets/utils/GoMatch'
import { showToast } from '@nutui/nutui'
// 初始化19路空棋盘
const boardSize = ref(19)
const positions = ref<board_state[]>([structuredClone(EmptyBoardState)])
const currentBoardState = ref(structuredClone(EmptyBoardState))
const currentHand = ref<'b' | 'w'>('b')
const currentPosition = ref(0)
const showMatchSelector = ref(false)

function handleBoardClick(x: number, y: number) {
  if (currentBoardState.value[x][y] === 'x' && currentPosition.value === positions.value.length - 1) {
    // console.log(`Clicked position: (${x}, ${y})`)
    // console.log(currentBoardState.value)
    currentBoardState.value[x][y] = currentHand.value
    currentHand.value = currentHand.value === 'b' ? 'w' : 'b'
    positions.value.push(structuredClone(toRaw(currentBoardState.value)))
    currentPosition.value++
    console.log(currentPosition.value)
  }
}
function handlePre() {
  if (currentPosition.value > 0) {
    console.log(currentPosition.value)
    currentPosition.value--
    currentBoardState.value = structuredClone(toRaw(positions.value[currentPosition.value]))
  }
}
function handleNext() {
  if (currentPosition.value < positions.value.length - 1) {
    currentPosition.value++
    currentBoardState.value = structuredClone(toRaw(positions.value[currentPosition.value]))
  }
}
function handleMatchSelect(match: GoMatch) {
  if (match.positions) {
    showMatchSelector.value = false
    positions.value = match.positions
    currentPosition.value = 0
    currentBoardState.value = structuredClone(toRaw(positions.value[currentPosition.value]))
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

// 添加 onMounted 钩子
onMounted(() => {
  setTimeout(() => {
    showMatchSelector.value = true
  }, 100)
})
</script>
<template>
  <div>
    <GoBoard :size="boardSize" :board-state="currentBoardState" :on-click="handleBoardClick" :key="currentPosition" />
    <nut-button type="primary" @click="handlePre">上一步</nut-button>
    <nut-button type="primary" @click="handleNext">下一步</nut-button>
  </div>
  <nut-popup :visible="showMatchSelector" position="bottom" round closeable @click-close-icon="handleNewMatch"
    :close-on-click-overlay="false" :style="{ maxHeight: '80%', padding: '1.25rem 0.5rem 1rem 0.5rem' }">
    <template #close-icon>
      <i class="pi pi-plus"></i>
    </template>
    <p class="text-lg font-bold mb-4 ml-4">选择棋谱</p>
    <div class="flex flex-col gap-3">
      <GoMatchCardSlim v-for="match in GoMatches" :key="match.id" :match="match" @click="handleMatchSelect(match)" />
    </div>
  </nut-popup>
</template>
