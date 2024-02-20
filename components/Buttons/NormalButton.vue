<script setup>
import { computed } from 'vue'

const props = defineProps({
  class: {
    type: String,
    default: 'text-white bg-blue-600 hover:bg-blue-700'
  },

  type: {
    type: String,
    default: 'button'
  }
})

const computedClasses = computed(() => props.class)
</script>

<template>
  <button
    :type="type"
    class="text-[12px] px-4 shadow-md py-3 font-bold rounded-[5px] duration-150 active:animate-press"
    :class="computedClasses"
  >
    <slot />
  </button>
</template>
