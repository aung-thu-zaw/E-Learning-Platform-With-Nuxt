<script setup lang="ts">
defineProps<{
  message: string | null | undefined
}>()
</script>

<template>
  <div v-show="message !== undefined && message !== null">
    <p class="text-sm text-red-600 mt-3 font-semibold font-lato">
      {{ message }}
    </p>
  </div>
</template>
