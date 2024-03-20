<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
import CourseTypeFilter from '~/components/Filters/CourseTypeFilter.vue'
import CourseSortBy from '~/components/Filters/CourseSortBy.vue'
import CourseFilterSidebar from '~/components/Filters/CourseFilterSidebar.vue'
import { useSearchStore } from '~/stores/e-learning/search'
import Pagination from '~/components/Paginations/AppPagination.vue'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { CoursePaginate } from '~/types/browsing'

useHead({ title: 'Search' })

definePageMeta({ layout: 'app-layout' })

const store = useSearchStore()
const route = useRoute()
const query = ref<string>(route?.query?.query?.toString() ?? '')

const { courses } = storeToRefs(store)
const { searchQueryString } = useURLQueryString()

onMounted(async () => {
  await store.getSearchResult({ ...searchQueryString.value })
})

watch(
  () => route.query,
  async () => {
    await store.getSearchResult({ ...searchQueryString.value })
    query.value = route.query?.query?.toString() ?? ''
  }
)

const handleUpdatedData = (data: any) => {
  store.$patch({ courses: data?.courses as CoursePaginate })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5 mb-10">
      <div class="flex flex-col items-start">
        <div class="space-y-5 mb-6">
          <h1 class="font-bold text-3xl text-gray-800">{{ query }}</h1>
          <p class="text-sm font-semibold text-gray-700">
            {{ courses?.meta?.total }} {{ $t('Results') }}
          </p>
        </div>

        <div class="flex items-center">
          <CourseTypeFilter />

          <CourseSortBy />
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row items-start container mx-auto md:space-x-5">
      <div class="w-full md:w-3/12 p-5">
        <CourseFilterSidebar />
      </div>

      <div class="w-full md:w-9/12 p-5 space-y-10">
        <div v-if="courses?.data?.length" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <VideoCourseCard v-for="course in courses?.data" :key="course?.id" :course="course" />
        </div>

        <div v-else class="py-16 my-20">
          <p class="text-center font-bold text-md">
            Your search for "
            <span class="text-yellow-500"> {{ query }} </span> " didn't return any courses.
          </p>
        </div>

        <div v-if="courses" class="mt-20">
          <Pagination :data="courses" @updated-data="handleUpdatedData" />
        </div>
      </div>
    </div>
  </section>
</template>
