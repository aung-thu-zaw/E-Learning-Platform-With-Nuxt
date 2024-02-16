<script setup lang="ts">
// import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
// import VideoPagination from '~/components/Paginations/VideoPagination.vue'
// import BrowseCourseSearchBox from '~/components/Filters/BrowseCourseSearchBox.vue'
import CourseTypeFilter from '~/components/Filters/CourseTypeFilter.vue'
import CourseSortBy from '~/components/Filters/CourseSortBy.vue'
import LearningPathCollectionCard from '~/components/Cards/LearningPathCollectionCard.vue'
// useHead({ title: 'Home' })
</script>

<template>
  <NuxtLayout name="app-layout">
    <section class="py-12">
      <div class="container mx-auto px-5">
        <div class="flex flex-col items-start">
          <div class="space-y-5 mb-6">
            <h1 class="font-bold text-3xl text-gray-800">Programming</h1>
            <p class="text-sm font-semibold text-gray-700">7 Results</p>
          </div>

          <div class="flex items-center">
            <CourseTypeFilter />

            <CourseSortBy />
          </div>
        </div>

        <div class="max-w-[85rem] py-10 lg:py-14 mx-auto">
          <div class="grid lg:grid-cols-3 gap-5">
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
