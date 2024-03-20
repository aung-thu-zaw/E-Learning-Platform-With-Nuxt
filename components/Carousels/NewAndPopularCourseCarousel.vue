<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
import type { Course } from '~/types/browsing'

defineProps<{ courses: Course[] }>()

let defaultTransform = 0

const goNext = () => {
  defaultTransform = defaultTransform - 398
  const videoCarousel = document.getElementById('new-and-popular-carousel')
  if (videoCarousel) {
    if (Math.abs(defaultTransform) >= videoCarousel.scrollWidth / 1.7) defaultTransform = 0
    videoCarousel.style.transform = 'translateX(' + defaultTransform + 'px)'
  }
}

const goPrev = () => {
  const videoCarousel = document.getElementById('new-and-popular-carousel')
  if (videoCarousel) {
    if (Math.abs(defaultTransform) === 0) defaultTransform = 0
    else defaultTransform = defaultTransform + 398
    videoCarousel.style.transform = 'translateX(' + defaultTransform + 'px)'
  }
}
</script>

<template>
  <div class="relative flex items-center justify-center w-full h-full">
    <div class="w-full relative flex items-center justify-center">
      <div class="absolute -top-28 right-0 flex items-center space-x-3">
        <button
          type="button"
          aria-label="slide backward"
          class="border w-10 h-10 rounded-full flex items-center justify-center text-white bg-yellow-500 hover:bg-yellow-600 shadow transition-all focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
          @click="goPrev"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>

        <button
          type="button"
          aria-label="slide forward"
          class="border w-10 h-10 rounded-full flex items-center justify-center text-white bg-yellow-500 hover:bg-yellow-600 shadow transition-all focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
          @click="goNext"
        >
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden rounded-md">
        <div
          id="new-and-popular-carousel"
          class="h-full flex gap-5 items-center justify-start transition ease-out duration-700"
        >
          <div
            v-for="course in courses"
            :key="course?.id"
            class="flex flex-shrink-0 relative rounded-md overflow-hidden"
          >
            <div class="w-[410px]">
              <VideoCourseCard :course="course" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
