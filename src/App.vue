<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const handleBack = () => {
  router.back()
}
</script>

<template>
  <div class="app-container w-full min-h-screen max-w-[750px] mx-auto box-border border border-red-500">
    <nut-navbar>
      <template #left>
        <i v-if="route.path !== '/'" class="pi pi-angle-left cursor-pointer text-2xl" @click="handleBack" />
      </template>
      <template #content>
        <p class="text-2xl font-bold text-black">MaryGo</p>
      </template>
    </nut-navbar>
    <router-view />
  </div>
</template>
