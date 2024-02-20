<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li class="text-gray-700">
    <div class="flex items-center">
      <i class="fa-solid fa-angle-right text-gray-600"></i>

      <div class="ml-1 text-sm font-semibold text-gray-600 hover:text-gray-700 md:ml-2">
        {{ label }}
      </div>
    </div>
  </li>
</template>
