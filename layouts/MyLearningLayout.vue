<script setup lang="ts">
import AppNavbar from '~/components/Navbars/AppNavbar.vue'
import AppFooter from '~/components/Footers/AppFooter.vue'
import NavTopInviteBanner from '~/components/Banners/NavTopInviteBanner.vue'
import { useAuthStore } from '~/stores/auth'
import { useMyLearningStore } from '~/stores/user/myLearning'
import { useURLQueryString } from '~/composables/useURLQueryString'

const route = useRoute()
const localePath = useLocalePath()
const authStore = useAuthStore()
const myCourseStore = useMyLearningStore()

const { myCourseQueryString } = useURLQueryString()

onMounted(async () => {
  await authStore.getAuthenticatedUser()

  if (authStore.isAuthenticated) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    await myCourseStore.getAllSavedCourse({ ...myCourseQueryString.value })
    await myCourseStore.getAllSavedLearningPath({ ...myCourseQueryString.value })
  }
})
</script>

<template>
  <div class="font-inter w-full min-h-screen bg-gray-50">
    <NavTopInviteBanner />

    <AppNavbar />

    <main>
      <section>
        <div class="bg-white pt-16">
          <div class="">
            <h1 class="font-bold text-center mb-16">
              <span
                class="text-3xl md:text-5xl text-gray-700 [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
              >
                {{ $t('My Learning') }}
              </span>
              <span class="text-yellow-500"> </span>
            </h1>

            <div class="flex items-center justify-center space-x-5">
              <NuxtLink
                :to="localePath('/my-learning/enrolled-courses')"
                class="border-b-4 text-gray-800 font-semibold text-sm pb-3 duration-150 transition-all"
                :class="{
                  'border-b-yellow-400': route.path.endsWith('/my-learning/enrolled-courses'),
                  'border-b-transparent': !route.path.endsWith('/my-learning/enrolled-courses')
                }"
              >
                {{ $t('Enrolled Courses') }}
              </NuxtLink>

              <NuxtLink
                :to="localePath('/my-learning/saved-courses')"
                class="border-b-4 text-gray-800 font-semibold text-sm pb-3 duration-150 transition-all"
                :class="{
                  'border-b-yellow-400': route.path.endsWith('/my-learning/saved-courses'),
                  'border-b-transparent': !route.path.endsWith('/my-learning/saved-courses')
                }"
              >
                {{ $t('Saved Courses') }}
              </NuxtLink>

              <NuxtLink
                :to="localePath('/my-learning/saved-learning-paths')"
                class="border-b-4 text-gray-800 font-semibold text-sm pb-3 duration-150 transition-all"
                :class="{
                  'border-b-yellow-400': route.path.endsWith('/my-learning/saved-learning-paths'),
                  'border-b-transparent': !route.path.endsWith('/my-learning/saved-learning-paths')
                }"
              >
                {{ $t('Saved Learning Paths') }}
              </NuxtLink>

              <NuxtLink
                :to="localePath('/my-learning/my-lists')"
                class="border-b-4 text-gray-800 font-semibold text-sm pb-3 duration-150 transition-all"
                :class="{
                  'border-b-yellow-400': route.path.endsWith('/my-learning/my-lists'),
                  'border-b-transparent': !route.path.endsWith('/my-learning/my-lists')
                }"
              >
                {{ $t('My Lists') }}
              </NuxtLink>

              <NuxtLink
                :to="localePath('/my-learning/learning-reminders')"
                class="border-b-4 text-gray-800 font-semibold text-sm pb-3 duration-150 transition-all"
                :class="{
                  'border-b-yellow-400': route.path.endsWith('/my-learning/learning-reminders'),
                  'border-b-transparent': !route.path.endsWith('/my-learning/learning-reminders')
                }"
              >
                {{ $t('Learning Reminders') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="bg-gray-100">
          <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <slot />
          </div>
        </div>
      </section>
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
