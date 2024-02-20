<script setup>
import { computed } from 'vue'

const props = defineProps({
  class: {
    type: String,
    default: 'text-white bg-blue-600 hover:bg-blue-700'
  }
})

const computedClasses = computed(() => props.class)

const navigateBack = () => {
  window.history.back()
}
</script>

<template>
  <button
    type="button"
    class="text-[12.5px] px-4 shadow-md py-3 font-bold rounded-[5px] duration-150 active:animate-press"
    :class="computedClasses"
    @click="navigateBack"
  >
    <i class="fa-solid fa-left-long"></i>
    Go Back
  </button>
</template>
