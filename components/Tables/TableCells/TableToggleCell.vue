<script setup>
import SwitchCheckbox from '~/components/Forms/Fields/SwitchCheckbox.vue'

defineProps({
  value: {
    type: Boolean,
    default: () => false
  }
})
</script>
<template>
  <td class="px-6 py-4">
    <SwitchCheckbox :value="value" :checked="value" />
  </td>
</template>
