<script setup>
defineProps({
  message: {
    type: String,
    default: () => ''
  }
})
</script>

<template>
  <div v-show="message">
    <p class="text-sm text-red-600 mt-3 font-semibold font-lato">
      {{ message }}
    </p>
  </div>
</template>
