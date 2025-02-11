<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from '@nutui/nutui'

// 识别设置
const useCloudComputing = ref(true)
const autoDetectStone = ref(true)

// 对局设置
const enableTimeAnnounce = ref(false)
const showAIAnalysis = ref(true)
const gameRuleValue = ref(['chinese'])
const gameRuleText = ref('中国规则')
const gameRuleColumns = ref([
  { text: '中国规则', value: 'chinese' },
  { text: '日本规则', value: 'japanese' },
  { text: '韩国规则', value: 'korean' }
])

function handleCloudComputingChange(value: boolean) {
  if (!value) {
    showToast.text('注意：本地识别可能影响性能', {
      center: false,
      bottom: "10%"
    })
  }
}

const showGameRuleSelector = ref(false)

const handleGameRuleSelectorConfirm = () => {
  for (const rule of gameRuleColumns.value) {
    if (rule.value === gameRuleValue.value[0]) {
      gameRuleText.value = rule.text
      break
    }
  }
  showGameRuleSelector.value = false
}

</script>

<template>
  <div class="settings-view p-4">
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-4 text-gray-700">识别设置</h2>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-3 gap-4">
          <div>
            <div class="text-base font-bold text-gray-800">使用云端算力识别</div>
            <div class="text-sm text-gray-500 mt-1">关闭后将使用本机算力识别，不建议在非旗舰设备上关闭</div>
          </div>
          <nut-switch v-model="useCloudComputing" @change="handleCloudComputingChange" active-color="#ff0000" />
        </div>

        <div class="flex items-center justify-between p-3 gap-4">
          <div>
            <div class="text-base font-bold text-gray-800">落子自动判断</div>
            <div class="text-sm text-gray-500 mt-1">关闭后只有在设备上单击落子按钮后才会触发识别</div>
          </div>
          <nut-switch v-model="autoDetectStone" active-color="#ff0000" />
        </div>
      </div>
    </div>
    <div class="h-px flex-grow bg-gray-200 mb-4"></div>
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-4 text-gray-700">对局设置</h2>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-3 gap-4">
          <div>
            <div class="text-base font-bold text-gray-800">默认对局规则</div>
          </div>
          <span @click="showGameRuleSelector = true">{{ gameRuleText }}</span>
        </div>

        <div class="flex items-center justify-between p-3 gap-4">
          <div>
            <div class="text-base font-bold text-gray-800">启用计时播报</div>
            <div class="text-sm text-gray-500 mt-1">启用后设备会在对应时间播报</div>
          </div>
          <nut-switch v-model="enableTimeAnnounce" active-color="#ff0000" />
        </div>

        <div class="flex items-center justify-between p-3 gap-4">
          <div>
            <div class="text-base font-bold text-gray-800">局内展示AI分析</div>
            <div class="text-sm text-gray-500 mt-1">启用后会在记录界面实时展示AI分析结果</div>
          </div>
          <nut-switch v-model="showAIAnalysis" active-color="#ff0000" />
        </div>
      </div>
    </div>
  </div>

  <nut-popup v-model:visible="showGameRuleSelector" position="bottom">
    <nut-picker v-model="gameRuleValue" :columns="gameRuleColumns" title="选择对局规则" @cancel="showGameRuleSelector = false"
      @confirm="handleGameRuleSelectorConfirm" three-dimensional />
  </nut-popup>
</template>
