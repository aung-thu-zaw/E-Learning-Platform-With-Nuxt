<script setup>
import { computed } from 'vue'

const props = defineProps({
  class: {
    type: String,
    default: () => 'min-w-[100px]'
  }
})

const computedClasses = computed(() => props.class)
</script>

<template>
  <td class="px-6 py-4">
    <div
      class="space-x-3 flex items-center min-w-[200px] w-auto max-w-[500px]"
      :class="computedClasses"
    >
      <slot />
    </div>
  </td>
</template>
