<script setup>
const props = defineProps({
  selected: {
    type: [Object, Boolean, String, Number],
    default: () => {}
  },
  options: {
    type: Object,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  name: {
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
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  rounded: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const optionKey = (index) => {
  return `select_option_${index}`
}

const optionValue = (option) => {
  return option.id || option.value
}

const isSelected = (option) => {
  return props.selected == optionValue(option)
}

const optionLabel = (option) => {
  return option.name || option.label
}
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-500"
    >
      <i class="fa-solid" :class="icon"></i>
    </div>

    <select
      :name="name"
      :id="name"
      class="block w-full p-4 font-semibold text-sm text-gray-800 bg-gray-50 transition-all outline-none focus:ring-2 focus:ring-slate-300 border border-gray-300 focus:border-slate-400"
      :class="{
        'rounded-full': rounded,
        'rounded-md': !rounded,
        'pl-12': icon
      }"
      @change="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      :required="required"
    >
      <option value="" :selected="modelValue === ''" disabled>{{ placeholder }}</option>
      <option
        v-for="(option, index) in options"
        :key="optionKey(index)"
        :value="optionValue(option)"
        :selected="isSelected(option)"
      >
        {{ optionLabel(option) }}
      </option>
    </select>
  </div>
</template>
