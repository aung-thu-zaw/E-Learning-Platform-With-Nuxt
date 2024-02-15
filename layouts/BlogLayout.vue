<script setup lang="ts">
import BlogNavbar from '~/components/Navbars/BlogNavbar.vue'
import AppFooter from '~/components/Footers/AppFooter.vue'
</script>

<template>
  <div class="font-poppins w-full min-h-screen bg-gray-50">
    <BlogNavbar />

    <main>
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
