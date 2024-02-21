<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  type: {
    type: [String, Number],
    default: 'text'
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
    type: [String, Number],
    default: ''
  },
  rounded: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const input = ref(null)

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value.focus() })
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-500"
    >
      <i class="fa-solid" :class="icon"></i>
    </div>

    <input
      :id="name"
      ref="input"
      :type="type"
      :name="name"
      class="block w-full p-4 font-semibold text-sm text-gray-800 bg-gray-50 outline-none transition-all focus:ring-2 focus:ring-yellow-200 border border-gray-300 focus:border-yellow-400"
      :class="{
        'rounded-full': rounded,
        'rounded-md': !rounded,
        'pl-12': icon
      }"
      :value="modelValue"
      :placeholder="$t(placeholder)"
      :disabled="disabled"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
