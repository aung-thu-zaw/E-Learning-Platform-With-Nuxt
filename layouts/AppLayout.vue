<script setup lang="ts">
import AppNavbar from '~/components/Navbars/AppNavbar.vue'
import AppFooter from '~/components/Footers/AppFooter.vue'
import NavTopInviteBanner from '~/components/Banners/NavTopInviteBanner.vue'
import { useAuthStore } from '~/stores/auth'
import { useSavedCourseStore } from '~/stores/e-learning/savedCourse'
import { useSavedLearningPathStore } from '~/stores/e-learning/savedLearningPath'
import { useURLQueryString } from '~/composables/useURLQueryString'

const authStore = useAuthStore()
const savedCourseStore = useSavedCourseStore()
const savedLearningPathStore = useSavedLearningPathStore()

const { myCourseQueryString } = useURLQueryString()

onMounted(async () => {
  await authStore.getAuthenticatedUser()

  if (authStore.isAuthenticated) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    await savedCourseStore.getAllSavedCourse({ ...myCourseQueryString.value })
    await savedLearningPathStore.getAllSavedLearningPath({ ...myCourseQueryString.value })
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

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
