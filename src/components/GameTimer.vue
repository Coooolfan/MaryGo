<template>
  <div class="flex flex-col gap-2 py-2">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-black"></span>
        <span class="font-medium">黑方</span>
        <span class="text-lg font-mono">{{ formatTime(blackTime) }}</span>
        <span v-if="blackTime <= 0" class="text-sm text-red-500">读秒{{ byoyomi.black }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-white border"></span>
        <span class="font-medium">白方</span>
        <span class="text-lg font-mono">{{ formatTime(whiteTime) }}</span>
        <span v-if="whiteTime <= 0" class="text-sm text-red-500">读秒{{ byoyomi.white }}</span>
      </div>
    </div>
    <div class="text-sm text-gray-600">
      当前思考时间: {{ formatTime(currentMoveTime) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, watch } from 'vue'

interface Byoyomi {
  black: number;
  white: number;
}

// Props 定义
interface Props {
  gaming?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  gaming: false
})

// 响应式状态
const blackTime = ref<number>(1800) // 30分钟
const whiteTime = ref<number>(1800)
const currentMoveTime = ref<number>(0)
const isBlackTurn = ref<boolean>(true)
const byoyomi = ref<Byoyomi>({ black: 3, white: 3 })

let timer: NodeJS.Timer | null = null

// 监听游戏状态变化
watch(
  () => [props.gaming, isBlackTurn.value],
  ([newGaming]) => {
    if (newGaming) {
      startTimer()
    } else {
      stopTimer()
    }
  }
)

// 计时器控制
const startTimer = () => {
  if (timer) return

  timer = setInterval(() => {
    currentMoveTime.value++
    if (isBlackTurn.value) {
      blackTime.value--
    } else {
      whiteTime.value--
    }
  }, 1000)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer as NodeJS.Timeout)
    timer = null
  }
}

// 时间格式化
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 组件卸载时清理
onUnmounted(() => {
  stopTimer()
})

// 暴露给父组件的方法
defineExpose({
  isBlackTurn,
  setIsBlackTurn: (value: boolean) => {
    isBlackTurn.value = value
  }
})
</script>
