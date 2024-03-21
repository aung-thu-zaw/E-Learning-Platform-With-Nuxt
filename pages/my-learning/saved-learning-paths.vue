<script setup lang="ts">
import LearningPathCollectionCard from '~/components/Cards/LearningPathCollectionCard.vue'
import { useMyLearningStore } from '~/stores/user/myLearning'
import Pagination from '~/components/Paginations/AppPagination.vue'
import type { LearningPathPaginate } from '~/types/learningPath'
import { useURLQueryString } from '~/composables/useURLQueryString'

useHead({ title: 'Saved Learning Paths' })

definePageMeta({ layout: 'my-learning-layout', middleware: 'auth' })

const route = useRoute()
const localePath = useLocalePath()
const store = useMyLearningStore()

const { learningPaths } = storeToRefs(store)
const { myCourseQueryString } = useURLQueryString()

watch(
  () => route.query,
  async () => {
    await store.getAllSavedLearningPath({ ...myCourseQueryString.value })
  }
)

const handleUpdatedData = (data: any) => {
  store.$patch({ learningPaths: data.learningPaths as LearningPathPaginate })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div>
    <div v-if="learningPaths?.data.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <LearningPathCollectionCard
          v-for="learningPath in learningPaths.data"
          :key="learningPath.id"
          :learning-path="learningPath"
        />
      </div>

      <div v-if="learningPaths" class="mt-20">
        <Pagination :data="learningPaths" @updated-data="handleUpdatedData" />
      </div>
    </div>
    <div v-else class="text-center py-20 space-y-10">
      <p class="font-bold text-gray-700">{{ $t("You haven't saved any Learning Paths yet.") }}</p>

      <NuxtLink
        :to="localePath('/learning-paths')"
        class="px-5 py-3 inline-block text-xs font-semibold bg-yellow-500 rounded-md hover:bg-yellow-600 text-white active:animate-press duration-150"
      >
        {{ $t('View All Learning Paths') }}
        <i class="fa-solid fa-arrow-right ml-3"></i>
      </NuxtLink>
    </div>
  </div>
</template>
