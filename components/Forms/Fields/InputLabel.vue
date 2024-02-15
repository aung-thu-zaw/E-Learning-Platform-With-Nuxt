<script setup>
defineProps({
  label: {
    type: String,
    default: 'Label Name'
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <label :for="label" class="block mb-2 text-sm font-bold text-gray-900">
    {{ label }}
    <span v-show="required" class="text-red-600">*</span>
  </label>
</template>
