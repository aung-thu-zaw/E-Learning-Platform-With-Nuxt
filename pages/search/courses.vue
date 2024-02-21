<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
import CourseTypeFilter from '~/components/Filters/CourseTypeFilter.vue'
import CourseSortBy from '~/components/Filters/CourseSortBy.vue'
import CourseFilterSidebar from '~/components/Filters/CourseFilterSidebar.vue'

// useHead({ title: 'Home' })
definePageMeta({ layout: 'app-layout' })
</script>

<template>
  <section class="py-12">
    <div class="container mx-auto px-5 mb-10">
      <div class="flex flex-col items-start">
        <div class="space-y-5 mb-6">
          <h1 class="font-bold text-3xl text-gray-800">Programming</h1>
          <p class="text-sm font-semibold text-gray-700">28,802 Results</p>
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard />
        </div>
      </div>
    </div>
  </section>
</template>
