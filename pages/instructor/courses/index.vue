<script setup lang="ts">
import NuxtLinkButton from '~/components/Buttons/NuxtLinkButton.vue'
import InstructorCourseCard from '~/components/Cards/InstructorCourseCard.vue'
import { useCourseStore } from '~/stores/dashboard/instructor/course'
import { useURLQueryString } from '~/composables/useURLQueryString'
import { useLoadData } from '~/composables/useLoadData'
import { storeToRefs } from 'pinia'
import type { CoursePaginate, Course } from '~/types/course'

useHead({ title: 'Courses' })

definePageMeta({ layout: 'instructor-layout' })

const landmark = ref<HTMLElement | null>(null)
const allCourse = ref<Course[]>([])
const store = useCourseStore()

const { courses } = storeToRefs(store)
const { allData, newPaginatedData, observeScroll } = useLoadData()
const { dashboardQueryString: queryString } = useURLQueryString()

onMounted(async () => {
  await store.getAllCourse(queryString.value)
  observeScroll(courses.value, landmark.value)
  store.$patch({
    courses: newPaginatedData.value as CoursePaginate
  })
})

watch(allData, (newValue) => (allCourse.value = newValue as Course[]))
</script>

<template>
  <div class="space-y-5 container mx-auto md:px-20">
    <div class="flex items-center justify-between mb-10">
      <h1 class="font-bold text-2xl text-gray-800">Your Teaching Courses</h1>

      <NuxtLinkButton
        to="/instructor/courses/form"
        class="bg-yellow-500 hover:bg-yellow-600 text-white"
      >
        <i class="fas fa-plus-circle"></i>
        Add New Course
      </NuxtLinkButton>
    </div>

    <div v-if="allCourse?.length" class="space-y-5">
      <InstructorCourseCard v-for="course in allCourse" :key="course.id" :course="course" />
    </div>
    <div v-else class="py-10 bg-gray-200 px-10 rounded-md border border-gray-300">
      <p class="text-center font-semibold text-sm">
        Welcome to your instructor dashboard! It looks like you haven't created any courses yet. Get
        started by clicking the 'Add New Course' button to share your knowledge and expertise with
        students.
      </p>
    </div>
    <div ref="landmark"></div>
  </div>
</template>
