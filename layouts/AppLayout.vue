<script setup lang="ts">
import AppNavbar from '~/components/Navbars/AppNavbar.vue'
import AppFooter from '~/components/Footers/AppFooter.vue'
import NavTopInviteBanner from '~/components/Banners/NavTopInviteBanner.vue'
</script>

<template>
  <div class="font-inter w-full min-h-screen bg-gray-50">
    <NavTopInviteBanner />

    <AppNavbar />

    <main>
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
