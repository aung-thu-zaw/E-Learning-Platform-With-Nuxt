<script setup lang="ts">
import AppNavbar from '~/components/Navbars/AppNavbar.vue'
import AppFooter from '~/components/Footers/AppFooter.vue'
</script>

<template>
  <div class="font-inter w-full min-h-screen bg-gray-50">
    <AppNavbar />

    <main>
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
