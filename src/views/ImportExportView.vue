<script setup lang="ts">
import { ref } from 'vue'
import GoMatchCardSlim from '@/components/GoMatchCardSlim.vue'
import { historyRecords } from '@/assets/utils/ImportExport'
import { GoMatches } from '@/assets/utils/GoMatch'
import type { GoMatch } from '@/assets/utils/GoMatch'
const showFormatSelector = ref(false)
const formateSelectorValue = ref(['sgf'])
const columns = ref([
    { text: 'SGF', value: 'sgf' },
    { text: 'MaryGo', value: 'marygo' }
])
function handleImport() {
    const input = document.createElement('input')
    input.type = 'file'
    // 处理文件选择事件
    input.onchange = () => {
        console.log("导入成功")
    }
    // 触发文件选择框
    input.click()
}

function handleExport() {
    formateSelectorValue.value = ['sgf']
    // showPicker.value = true
    showMatchSelector.value = true
}

function handleFormateSelector() {
    showFormatSelector.value = false
    const blob = new Blob([''], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'MaryGo.' + formateSelectorValue.value[0]
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

const selectedMatch = ref<GoMatch | null>(null)

function handleMatchSelect(match: GoMatch) {
    console.log(match)
    selectedMatch.value = match
    showMatchSelector.value = false
    showFormatSelector.value = true
}

const showMatchSelector = ref(false)
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
    <nut-popup v-model:visible="showFormatSelector" position="bottom">
        <nut-picker v-model="formateSelectorValue" :columns="columns" title="选择文件格式"
            @cancel="showFormatSelector = false" @confirm="handleFormateSelector" three-dimensional />
    </nut-popup>
    <nut-popup :visible="showMatchSelector" position="bottom" closeable round
        :style="{ maxHeight: '80%', padding: '1.25rem 0.5rem 1rem 0.5rem' }"
        @click-close-icon="showMatchSelector = false" @click-overlay="showMatchSelector = false">
        <p class="text-lg font-bold mb-4 ml-4">选择棋谱</p>
        <div class="flex flex-col gap-3">
            <GoMatchCardSlim v-for="match in GoMatches" :key="match.id" :match="match"
                @click="handleMatchSelect(match)" />
        </div>
    </nut-popup>
</template>
