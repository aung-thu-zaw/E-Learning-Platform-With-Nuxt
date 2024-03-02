<script setup lang="ts">
import type { Course } from '~/types/browsing'

defineProps<{ course: Course }>()
</script>

<template>
  <div
    class="relative flex flex-col bg-white border border-gray-300 shadow-sm rounded-xl p-5 overflow-hidden"
  >
    <img class="w-full h-auto rounded-xl" :src="course?.thumbnail" alt="Course Thumbnail" />
    <div class="p-4 md:p-5">
      <h3 class="text-md font-bold text-gray-700 line-clamp-2">
        {{ course?.title }}
      </h3>

      <div class="flex items-center justify-between my-5">
        <div class="space-x-2">
          <img
            class="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
            :src="course?.instructor?.avatar"
            alt="Instructor Avatar"
          />
          <span class="text-xs font-semibold text-gray-500">
            {{ course?.instructor?.name }}
          </span>
        </div>
        <div>
          <span class="cursor-pointer">
            <i class="fa-regular fa-bookmark"></i>
          </span>
        </div>
      </div>

      <div class="flex items-center justify-between font-medium">
        <span class="mt-5 text-xs text-gray-500">
          <i class="fa-solid fa-film"></i>
          {{ course?.total_lesson }} Lessons
        </span>
        <span class="mt-5 text-xs text-gray-500">
          <i class="fa-solid fa-clock"></i>
          {{ course?.duration_seconds }}
        </span>
        <span class="mt-5 text-xs text-gray-500 capitalize">
          <i class="fa-solid fa-chart-simple"></i>
          {{ course?.level === 'all_levels' ? 'All Levels' : course?.level }}
        </span>
      </div>
    </div>
  </div>
</template>
