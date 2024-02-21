<script setup lang="ts">
import AdminDashboardNavbar from '~/components/Navbars/AdminDashboardNavbar.vue'
import AdminDashboardSidebar from '~/components/Sidebars/AdminDashboardSidebar.vue'
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
const collapseShow = ref<boolean>(true)

onMounted(async () => await store.getAuthenticatedUser())
</script>

<template>
  <div class="font-inter bg-gray-100">
    <!-- Navbar -->
    <AdminDashboardNavbar @update-collapse-show="collapseShow = !collapseShow" />
    <!-- Navbar -->

    <div class="flex items-start">
      <AdminDashboardSidebar :collapse="collapseShow" />

      <div
        :class="{ '-ml-80': !collapseShow }"
        class="w-full min-h-screen transition-margin duration-500"
      >
        <main class="px-5 py-10">
          <slot />
        </main>
      </div>
    </div>
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
