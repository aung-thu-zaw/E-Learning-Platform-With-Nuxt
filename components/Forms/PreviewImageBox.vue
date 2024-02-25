<script setup lang="ts">
import image from '@/assets/images/no-image.jpeg'
import { computed } from 'vue'

const props = defineProps({
  class: {
    type: String,
    default: () => 'w-32 h-32 overflow-hidden'
  },

  src: {
    type: String,
    default: () => image
  }
})

const computedClasses = computed(() => props.class)
</script>

<template>
  <div :class="computedClasses">
    <img :src="src" :alt="src" class="w-full h-full object-cover border rounded-md" />
  </div>
</template>
