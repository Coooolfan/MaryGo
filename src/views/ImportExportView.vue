<script setup lang="ts">
import { ref } from 'vue'

// 模拟历史记录数据
interface HistoryRecord {
  type: 'import' | 'export'
  filename: string
  date: string
  size: string
}

const historyRecords = ref<HistoryRecord[]>([
  {
    type: 'import',
    filename: '围棋棋谱集.sgf',
    date: '2024-03-19 10:15',
    size: '156KB'
  },
  {
    type: 'export',
    filename: '业余比赛记录.sgf',
    date: '2024-03-18 09:45',
    size: '45KB'
  },
  {
    type: 'import',
    filename: '职业棋手对局.sgf',
    date: '2024-03-17 14:30',
    size: '210KB'
  },
  {
    type: 'import',
    filename: '定式练习.sgf',
    date: '2024-03-16 11:20',
    size: '32KB'
  },
  {
    type: 'import',
    filename: '古谱研究.sgf',
    date: '2024-03-15 08:50',
    size: '120KB'
  },
  {
    type: 'import',
    filename: '比赛复盘.sgf',
    date: '2024-03-14 16:10',
    size: '78KB'
  },
  {
    type: 'import',
    filename: '棋谱分析.sgf',
    date: '2024-03-13 13:40',
    size: '95KB'
  },
  {
    type: 'export',
    filename: '个人对局记录.sgf',
    date: '2024-03-12 10:05',
    size: '50KB'
  },
  {
    type: 'import',
    filename: '围棋教程.sgf',
    date: '2024-03-11 09:15',
    size: '300KB'
  },
  {
    type: 'import',
    filename: '比赛总结.sgf',
    date: '2024-03-10 17:30',
    size: '65KB'
  },
  {
    type: 'import',
    filename: '棋谱合集.sgf',
    date: '2024-03-09 12:25',
    size: '250KB'
  },
  {
    type: 'import',
    filename: '对局分析.sgf',
    date: '2024-03-08 15:55',
    size: '88KB'
  },
  {
    type: 'import',
    filename: '围棋经典对局.sgf',
    date: '2024-03-07 07:45',
    size: '180KB'
  },
  {
    type: 'import',
    filename: '练习棋谱.sgf',
    date: '2024-03-06 18:20',
    size: '40KB'
  },
  {
    type: 'import',
    filename: '围棋战术.sgf',
    date: '2024-03-05 14:10',
    size: '110KB'
  },
  {
    type: 'import',
    filename: '比赛记录.sgf',
    date: '2024-03-04 10:35',
    size: '70KB'
  },
  {
    type: 'import',
    filename: '围棋技巧.sgf',
    date: '2024-03-03 09:00',
    size: '90KB'
  },
  {
    type: 'export',
    filename: '对局总结.sgf',
    date: '2024-03-02 16:45',
    size: '55KB'
  },
  {
    type: 'import',
    filename: '围棋策略.sgf',
    date: '2024-03-01 11:50',
    size: '200KB'
  },
  {
    type: 'import',
    filename: '比赛分析.sgf',
    date: '2024-02-29 13:15',
    size: '85KB'
  }
]);

const showPicker = ref(false)
const pickerValue = ref(['sgf'])
const pickerType = ref<'import' | 'export'>('import')
const columns = ref([
  { text: 'SGF', value: 'sgf' },
  { text: 'MaryGo', value: 'marygo' }
])
function handleImport() {
  pickerValue.value = ['sgf']
  pickerType.value = 'import'
  showPicker.value = true
}

function handleExport() {
  pickerValue.value = ['sgf']
  pickerType.value = 'export'
  showPicker.value = true
}

function handleConfirm() {
  showPicker.value = false
  if (pickerType.value === 'import') {
    // TODO: 实现导入功能
    const input = document.createElement('input')
    input.type = 'file'

    // 处理文件选择事件
    input.onchange = () => {
      console.log("导入成功")
    }

    // 触发文件选择框
    input.click()
  } else {
    // TODO: 实现导出功能
    // 创建并下载空文件
    const blob = new Blob([''], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    // 创建下载链接
    const link = document.createElement('a')
    link.href = url
    link.download = 'MaryGo.' + pickerValue.value[0]

    // 触发下载
    document.body.appendChild(link)
    link.click()

    // 清理
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
    <!-- 导入导出按钮区域 -->
    <div class="grid grid-cols-2 gap-4">
      <!-- 导入按钮 -->
      <div class="rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-102"
        style="background: linear-gradient(135deg, #48BB78 0%, #38A169 100%)" @click="handleImport">
        <div class="p-4 text-white">
          <i class="pi pi-download text-xl mb-2"></i>
          <h3 class="text-lg font-bold">导入棋谱</h3>
          <p class="text-sm opacity-80">支持 SGF / MaryGo 格式</p>
        </div>
      </div>

      <!-- 导出按钮 -->
      <div class="rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-102"
        style="background: linear-gradient(135deg, #4299E1 0%, #3182CE 100%)" @click="handleExport">
        <div class="p-4 text-white">
          <i class="pi pi-upload text-xl mb-2"></i>
          <h3 class="text-lg font-bold">导出棋谱</h3>
          <p class="text-sm opacity-80">导出为 SGF / MaryGo 文件</p>
        </div>
      </div>
    </div>

    <!-- 分隔提示 -->
    <div class="flex items-center gap-2 mt-2 mb-1">
      <div class="h-px flex-grow bg-gray-200"></div>
      <span class="text-sm text-gray-500">历史记录</span>
      <div class="h-px flex-grow bg-gray-200"></div>
    </div>

    <!-- 历史记录列表 -->
    <div class="flex flex-col gap-3">
      <div v-for="record in historyRecords" :key="record.filename"
        class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <i :class="[
            'pi',
            record.type === 'import' ? 'pi-download text-green-600' : 'pi-upload text-blue-600',
            'text-xl'
          ]"></i>
          <div class="flex flex-col">
            <span class="font-medium">{{ record.filename }}</span>
            <span class="text-sm text-gray-500">{{ record.date }}</span>
          </div>
        </div>
        <div class="text-sm text-gray-500">
          {{ record.size }}
        </div>
      </div>
    </div>
  </div>
  <nut-popup v-model:visible="showPicker" position="bottom">
    <nut-picker v-model="pickerValue" :columns="columns" title="选择文件格式" @cancel="showPicker = false"
      @confirm="handleConfirm" three-dimensional />
  </nut-popup>
</template>
