<script setup>
const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  selected: {
    type: [String, Boolean],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  }
})

defineEmits(['update:modelValue'])

const optionLabel = (option) => {
  return option.name || option.label
}

const optionValue = (option) => {
  return option.id || option.value
}

const isSelected = (option) => {
  return props.selected === optionValue(option)
}
</script>

<template>
  <td class="px-6 py-4">
    <div class="w-[120px]">
      <select
        class="rounded-md p-2.5 w-full text-sm text-gray-700 font-medium border border-gray-300 focus:ring-2 transition-all focus:ring-slate-300 focus:border-gray-400 outline-none"
      >
        <option value="" :selected="modelValue === ''" disabled>{{ placeholder }}</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="optionValue(option)"
          :selected="isSelected(option)"
          @input="$emit('update:modelValue', $event.target.value)"
        >
          {{ optionLabel(option) }}
        </option>
      </select>
    </div>
  </td>
</template>
