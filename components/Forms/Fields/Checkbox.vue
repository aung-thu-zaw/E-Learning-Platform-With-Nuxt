<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:checked'])

const props = defineProps({
  checked: {
    type: [Boolean, Array],
    default: false
  },

  value: {
    type: [String, Number],
    default: ''
  }
})

const proxyChecked = computed({
  get() {
    return props.checked
  },

  set(val) {
    emit('update:checked', val)
  }
})
</script>

<template>
  <input
    type="checkbox"
    class="shrink-0 mt-0.5 border-gray-200 rounded text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
    :value="value"
    v-model="proxyChecked"
  />
</template>
