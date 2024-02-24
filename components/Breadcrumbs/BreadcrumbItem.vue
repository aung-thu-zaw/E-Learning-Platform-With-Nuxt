<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li class="text-gray-800">
    <div class="flex items-center">
      <i class="fa-solid fa-angle-right"></i>

      <div class="ml-1 text-sm font-semibold hover:text-gray-700 md:ml-2">
        {{ label }}
      </div>
    </div>
  </li>
</template>
