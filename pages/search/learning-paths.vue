<script setup lang="ts">
import CourseTypeFilter from '~/components/Filters/CourseTypeFilter.vue'
import CourseSortBy from '~/components/Filters/CourseSortBy.vue'
import LearningPathCollectionCard from '~/components/Cards/LearningPathCollectionCard.vue'
import { useSearchStore } from '~/stores/e-learning/search'
import Pagination from '~/components/Paginations/AppPagination.vue'
import type { LearningPathPaginate } from '~/types/learningPath'
import { useURLQueryString } from '~/composables/useURLQueryString'

useHead({ title: 'Search' })

definePageMeta({ layout: 'app-layout' })

const store = useSearchStore()
const route = useRoute()

const query = ref<string>(route?.query?.query?.toString() ?? '')

const { learningPaths } = storeToRefs(store)
const { searchQueryString } = useURLQueryString()

onMounted(async () => await store.getSearchResult({ ...searchQueryString.value }))

watch(
  () => route.query,
  async () => {
    await store.getSearchResult({ ...searchQueryString.value })
    query.value = route.query?.query?.toString() ?? ''
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
  <section class="py-12">
    <div class="container mx-auto px-5">
      <div class="flex flex-col items-start">
        <div class="space-y-5 mb-6">
          <h1 class="font-bold text-3xl text-gray-800">{{ query }}</h1>
          <p class="text-sm font-semibold text-gray-700">
            {{ learningPaths?.meta?.total }} Results
          </p>
        </div>

        <div class="flex items-center">
          <CourseTypeFilter />

          <CourseSortBy />
        </div>
      </div>

      <div class="max-w-[85rem] py-10 lg:py-14 mx-auto">
        <div v-if="learningPaths?.data?.length" class="grid lg:grid-cols-3 gap-5">
          <LearningPathCollectionCard
            v-for="learningPath in learningPaths?.data"
            :key="learningPath?.id"
            :learning-path="learningPath"
          />
        </div>

        <div v-else class="py-16 my-20">
          <p class="text-center font-bold text-md">
            Your search for "
            <span class="text-yellow-500"> {{ query }} </span> " didn't return any learning paths.
          </p>
        </div>

        <div v-if="learningPaths" class="mt-20">
          <Pagination :data="learningPaths" @updated-data="handleUpdatedData" />
        </div>
      </div>
    </div>
  </section>
</template>
