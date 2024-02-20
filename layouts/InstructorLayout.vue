<script setup lang="ts">
import InstructorDashboardNavbar from '~/components/Navbars/InstructorDashboardNavbar.vue'
import { ref } from 'vue'

const collapseShow = ref(true)
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
  transition: opacity 0.3s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
