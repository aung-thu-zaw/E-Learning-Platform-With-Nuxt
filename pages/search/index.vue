<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
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
      <div class="container mx-auto px-5 space-y-10">
        <div class="flex flex-col items-start">
          <h1 class="font-bold text-3xl text-gray-800 mb-10">Programming</h1>

          <div class="flex items-center space-x-3">
            <p class="font-bold text-sm text-gray-800">Filter By &nbsp; :</p>

            <button
              class="px-5 py-2.5 text-sm rounded-full font-semibold border border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white duration-200 transition-all hover:border-yellow-500"
            >
              Learning Paths
            </button>

            <button
              class="px-5 py-2.5 text-sm rounded-full font-semibold border border-gray-400 text-gray-700 hover:bg-yellow-500 hover:text-white duration-200 transition-all hover:border-yellow-500"
            >
              Classes
            </button>
          </div>
        </div>

        <div class="space-y-10">
          <div class="flex items-start justify-between md:px-0 px-5">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <h1 class="font-bold text-gray-800 text-2xl">Learning Paths</h1>
                <p class="font-semibold text-gray-700 text-sm">(12 Results)</p>
              </div>
            </div>

            <button
              class="px-5 py-2.5 border border-gray-400 rounded-md text-xs font-bold text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all active:animate-press"
            >
              View All Learning Paths
              <i class="fa-solid fa-arrow-right ml-3"></i>
            </button>
          </div>

          <div class="max-w-[85rem] mx-auto">
            <div class="grid lg:grid-cols-3 gap-5">
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
              <LearningPathCollectionCard />
            </div>
          </div>
        </div>

        <hr />

        <div class="space-y-10">
          <div class="flex items-start justify-between md:px-0 px-5">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <h1 class="font-bold text-gray-800 text-2xl">Classes</h1>
                <p class="font-semibold text-gray-700 text-sm">(28,802 Results)</p>
              </div>
              <p class="text-sm font-medium text-gray-600">
                Learn skills, tools, and techniques from industry experts and creative pros.
              </p>
            </div>

            <button
              class="px-5 py-2.5 border border-gray-400 rounded-md text-xs font-bold text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all active:animate-press"
            >
              View All Classes
              <i class="fa-solid fa-arrow-right ml-3"></i>
            </button>
          </div>

          <div class="max-w-[85rem] mx-auto">
            <div class="grid lg:grid-cols-3 gap-5">
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
              <VideoCourseCard />
              <VideoCourseCard />
              <VideoCourseCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
