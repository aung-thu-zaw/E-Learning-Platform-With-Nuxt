<script setup lang="ts">
import AdminDashboardNavbar from '~/components/Navbars/AdminDashboardNavbar.vue'
import AdminDashboardSidebar from '~/components/Sidebars/AdminDashboardSidebar.vue'
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
const collapseShow = ref<boolean>(true)

onMounted(async () => await store.getAuthenticatedUser())
</script>

<template>
  <div class="relative font-inter bg-gray-100 overflow-y-scroll h-screen">
    <!-- Navbar -->
    <AdminDashboardNavbar @update-collapse-show="collapseShow = !collapseShow" />
    <!-- Navbar -->

    <div class="flex items-start">
      <AdminDashboardSidebar :collapse="collapseShow" />

      <div
        :class="{ '-ml-64 pl-0': !collapseShow, 'pl-64': collapseShow }"
        class="w-full min-h-screen transition-all duration-500 overflow-scroll"
      >
        <main class="px-5 pt-28 pb-24">
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

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
