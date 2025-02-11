<template>
    <div class="relative w-full h-full">
        <video ref="videoRef" class="w-full h-full rounded-lg object-cover" autoplay playsinline></video>
        <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
            <p class="text-red-500 text-sm">{{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const error = ref('')
let stream: MediaStream | null = null

async function initCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment', // 优先使用后置摄像头
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        })

        if (videoRef.value) {
            videoRef.value.srcObject = stream
        }
    } catch (err) {
        error.value = '无法访问摄像头，请确保已授予摄像头权限'
        console.error('Camera error:', err)
    }
}

onMounted(() => {
    initCamera()
})

onUnmounted(() => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop())
    }
})
</script>
