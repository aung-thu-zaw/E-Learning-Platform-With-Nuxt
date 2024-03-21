<script setup lang="ts">
import SavedCourseCard from '~/components/Cards/SavedCourseCard.vue'
import { useMyLearningStore } from '~/stores/user/myLearning'
import Pagination from '~/components/Paginations/AppPagination.vue'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { CoursePaginate } from '~/types/browsing'

useHead({ title: 'Saved Courses' })

definePageMeta({ layout: 'my-learning-layout', middleware: 'auth' })

const route = useRoute()
const localePath = useLocalePath()
const store = useMyLearningStore()

const { courses } = storeToRefs(store)
const { myCourseQueryString } = useURLQueryString()

watch(
  () => route.query,
  async () => {
    await store.getAllSavedCourse({ ...myCourseQueryString.value })
  }
)

const handleUpdatedData = (data: any) => {
  store.$patch({ courses: data.courses as CoursePaginate })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div>
    <div v-if="courses?.data.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SavedCourseCard v-for="course in courses.data" :key="course.id" :course="course" />
      </div>

      <div v-if="courses" class="mt-20">
        <Pagination :data="courses" @updated-data="handleUpdatedData" />
      </div>
    </div>
    <div v-else class="text-center py-20 space-y-10">
      <p class="font-bold text-gray-700">{{ $t("You haven't saved any courses yet.") }}</p>

      <NuxtLink
        :to="localePath('/browse')"
        class="px-5 py-3 inline-block text-xs font-semibold bg-yellow-500 rounded-md hover:bg-yellow-600 text-white active:animate-press duration-150"
      >
        {{ $t('Browse Courses') }}
        <i class="fa-solid fa-arrow-right ml-3"></i>
      </NuxtLink>
    </div>
  </div>
</template>
