<script setup lang="ts">
import CourseCardProgressBar from '~/components/ProgressBars/CourseCardProgressBar.vue'
import EnrolledCourseDropdown from '~/components/Dropdowns/EnrolledCourseDropdown.vue'
import type { Course } from '~/types/browsing'

defineProps<{ course: Course }>()

const localePath = useLocalePath()
</script>

<template>
  <div
    class="relative flex flex-col bg-white border border-gray-300 shadow-sm rounded-xl p-5 overflow-hidden"
  >
    <img class="w-full h-auto rounded-xl" :src="course?.thumbnail" alt="Course Thumbnail" />

    <div class="p-4 md:p-5 space-y-8">
      <div class="space-y-6">
        <h3 class="text-md font-bold text-gray-700 line-clamp-2">
          {{ course?.title }}
        </h3>

        <div class="flex items-center justify-between">
          <NuxtLink :to="localePath(`/`)" class="space-x-2">
            <img
              class="inline-block h-[2.375rem] w-[2.375rem] rounded-full object-cover"
              :src="course?.instructor?.avatar"
              alt="Instructor Avatar"
            />
            <span class="text-xs font-semibold text-gray-600">
              {{ course?.instructor?.name }}
            </span>
          </NuxtLink>

          <button
            type="button"
            class="text-xs font-semibold text-yellow-500 hover:text-yellow-600 duration-150"
          >
            <i class="fa-solid fa-star"></i>
            Leave a rating
          </button>

          <div class="absolute top-8 right-8">
            <EnrolledCourseDropdown :course="course" />
          </div>
        </div>

        <div class="flex items-center justify-between font-medium">
          <span class="mt-5 text-xs text-gray-500">
            <i class="fa-solid fa-film"></i>
            {{ course?.total_lesson }} Lessons
          </span>
          <span class="mt-5 text-xs text-gray-500">
            <i class="fa-solid fa-clock"></i>
            {{ course?.duration }}
          </span>
          <span class="mt-5 text-xs text-gray-500 capitalize">
            <i class="fa-solid fa-chart-simple"></i>
            {{ course?.level === 'all_levels' ? 'All Levels' : course?.level }}
          </span>
        </div>
      </div>

      <div>
        <CourseCardProgressBar :enrollment="course?.enrollment ?? null" />
      </div>
    </div>
  </div>
</template>
