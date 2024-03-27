<script setup lang="ts">
import InstructorDashboardNavbar from '~/components/Navbars/InstructorDashboardNavbar.vue'
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
const collapseShow = ref(true)

onMounted(async () => await store.getAuthenticatedUser())
</script>

<template>
  <div class="font-inter bg-gray-100">
    <!-- Navbar -->
    <InstructorDashboardNavbar @update-collapse-show="collapseShow = !collapseShow" />
    <!-- Navbar -->
    <main class="px-5 py-10 min-h-screen">
      <slot />
    </main>
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

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
