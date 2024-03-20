<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  items: {
    id: string
    label: string
  }[]
  selectedTab: string
}>()

const emit = defineEmits(['update:selectedTab'])

const handleTabClick = (tabId: string) => {
  emit('update:selectedTab', tabId)
}
</script>

<template>
  <div class="border w-auto px-10 py-1 bg-white rounded-lg">
    <nav class="flex justify-center space-x-6" aria-label="Tabs" role="tablist">
      <button
        v-for="item in items"
        :key="item.id"
        :class="{ 'text-yellow-500 hover:text-yellow-600': item.id === selectedTab }"
        type="button"
        class="py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-[13px] font-semibold whitespace-nowrap text-gray-700 hover:text-gray-600 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active"
        :data-hs-tab="'#' + item.id"
        :aria-controls="item.id"
        role="tab"
        @click="handleTabClick(item.id)"
      >
        {{ item.label }}
      </button>
    </nav>
  </div>
</template>
