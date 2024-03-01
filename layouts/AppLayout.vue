<script setup lang="ts">
import AppNavbar from '~/components/Navbars/AppNavbar.vue'
import AppFooter from '~/components/Footers/AppFooter.vue'
import NavTopInviteBanner from '~/components/Banners/NavTopInviteBanner.vue'
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()

onMounted(async () => await store.getAuthenticatedUser())
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

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
