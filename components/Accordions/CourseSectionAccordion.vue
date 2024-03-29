<script setup lang="ts">
import type { Lesson, Section, Course } from '~/types/browsing'

defineProps<{
  course: Course
  section: Section
  currentLesson: Lesson | null
  lessonProgress: number
}>()

const localePath = useLocalePath()
</script>

<template>
  <div class="hs-accordion-group">
    <div :id="'hs-' + section.slug" class="hs-accordion">
      <button
        class="hs-accordion-toggle hs-accordion-active:text-yellow-500 py-3 inline-flex flex-col items-start justify-between gap-x-3 w-full font-semibold text-start text-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        :aria-controls="'hs-accordion-' + section.slug"
      >
        <div class="w-full flex items-start justify-between">
          <div class="line-clamp-1 font-bold text-sm max-w-[310px]">
            <span class="capitalize">{{ section?.slug }}</span> : <span>{{ section?.title }}</span>
          </div>

          <svg
            class="hs-accordion-active:hidden block w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          <svg
            class="hs-accordion-active:block hidden w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </div>

        <span class="text-[.7rem] my-1 font-semibold text-gray-500">
          {{ section?.total_completed_lessons_count }} / {{ section?.lessons?.length }} |
          {{ section?.duration }}
        </span>
      </button>
      <div
        :id="'hs-accordion-' + section.slug"
        class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
        :class="{ hidden: section?.id !== currentLesson?.section_id }"
        :aria-labelled:by="'hs-' + section.slug"
      >
        <div class="text-gray-10">
          <div v-for="(lesson, index) in section?.lessons" :key="index">
            <NuxtLink
              :to="localePath(`/courses/${course.slug}/${section.slug}/${lesson.uuid}`)"
              class="p-3 rounded-md flex items-start space-x-3 transition-all"
              :class="{ 'bg-gray-200': lesson.uuid === currentLesson?.uuid }"
            >
              <div>
                <div
                  v-if="lesson?.is_completed && lesson.uuid !== currentLesson?.uuid"
                  class="min-w-10 min-h-10 rounded-full flex items-center justify-center bg-yellow-500 text-xs text-white font-bold"
                >
                  <i class="fa-solid fa-check"></i>
                </div>

                <div v-if="lesson.uuid === currentLesson?.uuid" class="relative size-10">
                  <svg
                    class="size-full"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <!-- Background Circle -->
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      class="stroke-current text-gray-200"
                      stroke-width="3"
                    ></circle>
                    <!-- Progress Circle inside a group with rotation -->
                    <g class="origin-center -rotate-90 transform">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        class="stroke-current text-yellow-500"
                        stroke-width="3"
                        stroke-dasharray="100"
                        :stroke-dashoffset="lessonProgress === 0 ? 100 : lessonProgress"
                      ></circle>
                    </g>
                  </svg>
                  <!-- Percentage Text -->
                  <div
                    class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2"
                  >
                    <span class="text-center text-xs font-bold text-yellow-500">
                      <i class="fa-solid fa-play"></i>
                    </span>
                  </div>
                </div>

                <div
                  v-if="!lesson?.is_completed && lesson.uuid !== currentLesson?.uuid"
                  class="min-w-10 min-h-10 rounded-full flex items-center justify-center bg-gray-200 text-sm font-bold text-gray-600"
                >
                  {{ index + 1 }}
                </div>
              </div>

              <div>
                <p
                  class="text-[0.8rem] line-clamp-2 font-semibold text-sm hover:text-yellow-500 transition-all"
                >
                  {{ lesson?.title }}
                </p>
                <span class="text-[.7rem] my-1 font-normal text-gray-600">
                  <i class="fa-solid fa-clock mr-2"> </i>
                  {{ lesson?.duration }}
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
