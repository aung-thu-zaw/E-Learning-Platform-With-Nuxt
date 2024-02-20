<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: true
  },

  class: {
    type: String,
    default: 'text-white bg-blue-600 hover:bg-blue-700'
  },

  targetIdentifier: {
    type: String,
    required: false,
    default: () => ''
  },

  disabled: {
    type: Boolean,
    default: false
  }
})

const computedClasses = computed(() => props.class)
</script>

<template>
  <NuxtLink v-slot="{ navigate }" :to="targetIdentifier ? `${to}/${targetIdentifier}` : to">
    <button
      type="button"
      class="text-[12px] px-4 shadow-md py-3 font-bold rounded-[5px] duration-150 active:animate-press"
      :class="computedClasses"
      :disabled="disabled"
      @click="navigate"
    >
      <slot />
    </button>
  </NuxtLink>
</template>
