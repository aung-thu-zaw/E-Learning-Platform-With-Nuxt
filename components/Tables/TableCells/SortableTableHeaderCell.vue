<script setup>
import SortingArrow from '@/components/Tables/SortingArrows.vue'
import { useSorting } from '@/composables/useSorting.js'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  sort: {
    type: String,
    default: 'desc'
  }
})

const { params, updateSorting } = useSorting()
</script>

<template>
  <th scope="col" class="px-6 py-3" @click="updateSorting(props.sort)">
    {{ label }}
    <SortingArrow :params="params" :sort="sort" />
  </th>
</template>
