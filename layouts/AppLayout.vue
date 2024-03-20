<script setup lang="ts">
import AppNavbar from '~/components/Navbars/AppNavbar.vue'
import AppFooter from '~/components/Footers/AppFooter.vue'
import NavTopInviteBanner from '~/components/Banners/NavTopInviteBanner.vue'
import { useAuthStore } from '~/stores/auth'
import { useMyLearningStore } from '~/stores/user/myLearning'
import { useURLQueryString } from '~/composables/useURLQueryString'

const authStore = useAuthStore()
const myLearningStore = useMyLearningStore()

const { myCourseQueryString } = useURLQueryString()

onMounted(async () => {
  await authStore.getAuthenticatedUser()

  if (authStore.isAuthenticated) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    await myLearningStore.getAllSavedCourse({ ...myCourseQueryString.value })
    await myLearningStore.getAllSavedLearningPath({ ...myCourseQueryString.value })
  }
})
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
~/stores/user/myLearning
