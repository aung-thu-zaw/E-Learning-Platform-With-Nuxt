<script setup lang="ts">
import image from '@/assets/images/no-image.jpeg'
import { computed } from 'vue'

const props = defineProps({
  class: {
    type: String,
    default: 'w-full h-full object-cover border rounded-md'
  },

  src: {
    type: String,
    default: () => image
  }
})

const computedClasses = computed(() => props.class)
</script>

<template>
  <div class="w-32 h-32 overflow-hidden">
    <img :src="src" :alt="src" :class="computedClasses" />
  </div>
</template>
