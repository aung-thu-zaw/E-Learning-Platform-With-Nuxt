<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <th scope="col" class="px-6 py-3">
    <span class="line-clamp-1 capitalize p-1.5">
      {{ label }}
    </span>
  </th>
</template>
