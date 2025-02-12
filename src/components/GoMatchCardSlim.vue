<script setup lang="ts">
import type { PropType } from 'vue';
import type { GoMatch } from '@/assets/utils/GoMatch';

const props = defineProps({
    match: {
        type: Object as PropType<GoMatch>,
        required: true
    }
})

// 定义要触发的事件
const emit = defineEmits<{
    (e: 'click', match: GoMatch): void
}>()

const handleClick = () => {
    emit('click', props.match)
}
</script>

<template>
    <div class="flex flex-col bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-200"
        @click="handleClick">
        <div class="flex justify-between items-center mb-2">
            <div class="text-sm text-gray-600">
                {{ match.date }} {{ match.time }}
            </div>
            <div class="text-xs text-gray-500">
                {{ match.ruleType }}
            </div>
        </div>

        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <div class="flex items-center">
                    <div
                        :class="`w-3 h-3 rounded-full ${match.result.winner === 'black' ? 'bg-black' : 'bg-white border border-black'}`">
                    </div>
                    <span class="ml-1 text-sm font-medium">
                        {{ match.result.method }} {{ match.result.points }}
                    </span>
                </div>
            </div>
            <div class="text-xs text-gray-500">
                {{ match.moves }}手
            </div>
        </div>
    </div>
</template>
