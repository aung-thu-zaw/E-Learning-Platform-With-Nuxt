<script setup lang="ts">
import BlogNavbar from '~/components/Navbars/BlogNavbar.vue'
import BlogSearchBox from '~/components/Forms/SearchBoxs/BlogSearchBox.vue'
import AppFooter from '~/components/Footers/AppFooter.vue'
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
const isOpenNavSearchBox = ref(false)

onMounted(async () => await store.getAuthenticatedUser())
</script>

<template>
  <div class="font-poppins w-full min-h-screen bg-gray-50">
    <BlogNavbar
      :is-open-nav-search-box="isOpenNavSearchBox"
      @updated-search="isOpenNavSearchBox = !isOpenNavSearchBox"
    />

    <div
      class="bg-gray-100 border-b-4 border-b-yellow-400 px-20 py-5 transition-transform duration-500 fixed right-0 left-0 z-30"
      :class="{
        'translate-y-0': isOpenNavSearchBox,
        '-translate-y-96': !isOpenNavSearchBox
      }"
    >
      <BlogSearchBox @updated-search="isOpenNavSearchBox = false" />
    </div>

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

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
