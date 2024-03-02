<script setup lang="ts">
import type { Subcategory } from '~/types/browsing'
defineProps<{ subcategory: Subcategory | null }>()
</script>

<template>
  <div
    class="border px-10 py-14 rounded-md space-y-5"
    :style="{
      'background-image': 'url(' + (subcategory?.image || '') + ')',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-position': 'center',
      'background-color': 'rgba(0, 0, 0, 0.4)',
      'background-blend-mode': 'darken'
    }"
  >
    <h1 class="font-bold text-3xl text-white">{{ subcategory?.name }}</h1>

    <p class="text-white font-medium text-md">
      {{ subcategory?.description }}
    </p>

    <button
      class="bg-yellow-600 px-5 py-3 rounded-md text-white text-xs font-semibold hover:bg-yellow-500 duration-200 transition-all"
    >
      <i class="fa-solid fa-crown"></i>
      Get Premium
    </button>

    <!-- <button
      class="bg-yellow-600 px-5 py-3 rounded-md text-white text-xs font-semibold hover:bg-yellow-500 duration-200 transition-all"
    >
      <i class="fa-solid fa-flag"></i>
      Start For Free
    </button> -->
  </div>
</template>
