<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  },
  rounded: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const textarea = ref(null)

onMounted(() => {
  if (textarea.value.hasAttribute('autofocus')) {
    textarea.value.focus()
  }
})

defineExpose({ focus: () => textarea.value.focus() })
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-500"
    >
      <i class="fa-solid" :class="icon"></i>
    </div>

    <textarea
      :name="name"
      :id="name"
      rows="7"
      class="block w-full p-4 font-semibold text-sm outline-none text-gray-800 bg-gray-50 transition-all focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
      :class="{
        'rounded-full': rounded,
        'rounded-md': !rounded,
        'pl-12': icon
      }"
      ref="textarea"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
    ></textarea>
  </div>
</template>
