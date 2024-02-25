<script setup>
import SwitchCheckbox from '~/components/Forms/Fields/SwitchCheckbox.vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: () => false
  },
  class: {
    type: String,
    default: () => 'min-w-[100px]'
  },
  disabled: {
    type: Boolean,
    default: () => false
  }
})

const computedClasses = computed(() => props.class)
</script>
<template>
  <td class="px-6 py-4">
    <div :class="computedClasses">
      <SwitchCheckbox :value="value" :checked="value" :disabled="disabled" />
    </div>
  </td>
</template>
