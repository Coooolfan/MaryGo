<script setup lang="ts">
// import { Navbar } from '@nutui/nutui'
</script>

<template>
  <div class="app-container w-full min-h-screen max-w-[750px] mx-auto box-border border border-red-500">
    <nut-navbar>
      <template #content>
        <p class="text-2xl font-bold text-black">MaryGo</p>
      </template>
    </nut-navbar>
    <router-view />
  </div>
</template>
