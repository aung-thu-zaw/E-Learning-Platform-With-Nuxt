<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:checked'])

const props = defineProps({
  label: {
    type: String,
    default: () => ''
  },

  checked: {
    type: Boolean,
    default: () => false
  },

  value: {
    type: Boolean,
    default: () => false
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
  <div class="flex items-center">
    <label v-if="label" for="hs-xs-switch" class="text-xs font-semibold text-white me-3 0">
      {{ label }}
    </label>

    <input
      id="hs-small-switch"
      v-model="proxyChecked"
      type="checkbox"
      class="relative ring-0 focus:ring-0 checked:ring-0 w-11 h-6 p-px bg-gray-200 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:border-0 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-yellow-600 checked:border-yellow-600 focus:checked:border-yellow-600 before:inline-block before:size-5 before:bg-white checked:before:bg-yellow-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
      :value="value"
      :checked="checked"
    />
  </div>
</template>
