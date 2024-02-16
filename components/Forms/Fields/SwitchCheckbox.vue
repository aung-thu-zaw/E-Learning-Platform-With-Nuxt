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
    default: false
  },

  value: {
    type: String,
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
  <div class="flex items-center">
    <label v-if="label" for="hs-xs-switch" class="text-xs font-semibold text-white me-3 0">
      {{ label }}
    </label>

    <input
      id="hs-xs-switch"
      v-model="proxyChecked"
      type="checkbox"
      class="relative w-[35px] h-[21px] bg-gray-200 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 before:inline-block before:w-4 before:h-4 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
      :value="value"
      :checked="checked"
    />
  </div>
</template>
