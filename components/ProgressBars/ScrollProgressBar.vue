<script setup lang="ts">
import { useScrollProgress } from '~/composables/useScrollProgress'

const { scrollProgress } = useScrollProgress()
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-[6px] bg-white z-[9999]">
    <div class="h-full bg-yellow-500" :style="{ width: `${scrollProgress}%` }"></div>
  </div>
</template>
