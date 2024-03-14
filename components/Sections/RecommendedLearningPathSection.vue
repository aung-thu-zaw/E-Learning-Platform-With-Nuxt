<script setup lang="ts">
import LearningPathCollectionCard from '~/components/Cards/LearningPathCollectionCard.vue'
import type { LearningPath } from '~/types/learningPath'
import { useAuthStore } from '~/stores/auth'

const learningPaths = ref<LearningPath[] | null>(null)
const localePath = useLocalePath()

const { $axiosApi } = useNuxtApp()
const { isAuthenticated } = storeToRefs(useAuthStore())

const getRecommendedLearningPaths = async () => {
  try {
    const { data } = await $axiosApi.get(`/learning-paths/recommended`)

    learningPaths.value = data
  } catch (error: any) {
    showError({
      statusCode: error.response?.status,
      statusMessage: error.response?.statusText,
      message: error.response?.data?.message
    })
  }
}

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (isAuthenticated.value) await getRecommendedLearningPaths()
})
</script>

<template>
  <section v-if="learningPaths?.length" class="py-10">
    <div class="container mx-auto">
      <div class="flex items-start justify-between md:px-0 px-5">
        <div class="space-y-3">
          <h1
            class="font-bold text-gray-800 text-3xl [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
          >
            {{ $t('Recommended Learning Paths') }}
          </h1>
          <p class="text-sm font-medium text-gray-600">
            {{ $t('Reach your learning goals with hand-picked, sequential classes.') }}
          </p>
        </div>

        <NuxtLink
          :to="localePath('/learning-paths')"
          class="px-5 py-2.5 border border-gray-400 rounded-md text-xs font-bold text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all active:animate-press"
        >
          {{ $t('View All Learning Paths') }}
          <i class="fa-solid fa-arrow-right ml-3"></i>
        </NuxtLink>
      </div>

      <div class="py-10 px-5 md:px-0 lg:py-14 mx-auto">
        <div class="grid lg:grid-cols-3 gap-5">
          <LearningPathCollectionCard
            v-for="learningPath in learningPaths"
            :key="learningPath?.id"
            :learning-path="learningPath"
          />
        </div>
      </div>
    </div>
  </section>
</template>
