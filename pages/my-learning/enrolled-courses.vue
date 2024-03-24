<script setup lang="ts">
import EnrolledCourseCard from '~/components/Cards/EnrolledCourseCard.vue'
import Pagination from '~/components/Paginations/AppPagination.vue'
import { useMyLearningStore } from '~/stores/user/myLearning'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { CoursePaginate } from '~/types/browsing'

useHead({ title: 'Enrolled Courses' })

definePageMeta({ layout: 'my-learning-layout', middleware: 'auth' })

const route = useRoute()
const localePath = useLocalePath()
const store = useMyLearningStore()

const { enrolledCourses } = storeToRefs(store)
const { myCourseQueryString } = useURLQueryString()

onMounted(async () => await store.getAllEnrolledCourse({ ...myCourseQueryString.value }))

watch(
  () => route.query,
  async () => {
    await store.getAllEnrolledCourse({ ...myCourseQueryString.value })
  }
)

const handleUpdatedData = (data: any) => {
  store.$patch({ enrolledCourses: data as CoursePaginate })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div>
    <div v-if="enrolledCourses?.data.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <EnrolledCourseCard
          v-for="course in enrolledCourses.data"
          :key="course.id"
          :course="course"
        />
      </div>

      <div v-if="enrolledCourses" class="mt-20">
        <Pagination :data="enrolledCourses" @updated-data="handleUpdatedData" />
      </div>
    </div>

    <div v-else class="text-center py-20 space-y-10">
      <p class="font-bold text-gray-700">{{ $t("You haven't enrolled any courses yet.") }}</p>

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
