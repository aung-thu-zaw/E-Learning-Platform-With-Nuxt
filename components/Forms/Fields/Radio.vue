<script setup>
import { computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:checked'])

const props = defineProps({
  id: {
    type: String,
    default: ''
  },

  name: {
    type: String,
    default: ''
  },

  checked: {
    type: [Boolean, Array, Number, null],
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
    :id="id"
    v-model="proxyChecked"
    :name="name"
    type="radio"
    class="shrink-0 mt-0.5 border-gray-300 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
    :value="value"
  />
</template>
