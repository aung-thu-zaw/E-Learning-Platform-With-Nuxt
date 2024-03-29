<script setup lang="ts">
import type { Section, Course } from '~/types/browsing'

defineProps<{
  course: Course
  section: Section
  isEnrolled: boolean
}>()

const localePath = useLocalePath()
</script>

<template>
  <div class="hs-accordion-group w-full">
    <div :id="'hs-outline-' + section.id" class="hs-accordion">
      <button
        class="hs-accordion-toggle hs-accordion-active:bg-yellow-500 hs-accordion-active:text-white p-5 rounded-md inline-flex flex-col items-start justify-between w-full font-semibold text-start text-gray-700 disabled:opacity-50 disabled:pointer-events-none bg-gray-200"
        :aria-controls="'hs-accordion-outline' + section.id"
      >
        <div class="w-full flex items-start justify-between">
          <div class="line-clamp-1 font-semibold text-sm max-w-[450px]">
            {{ section?.title }}
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
      </button>
      <div
        :id="'hs-accordion-outline-' + section.id"
        class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
        :aria-labelled:by="'hs-outline-' + section.id"
      >
        <div>
          <div v-for="(lesson, index) in section.lessons" :key="index">
            <div class="p-3 rounded-md flex items-start space-x-3 transition-all">
              <div
                v-if="!isEnrolled && !lesson?.is_completed"
                class="min-w-10 min-h-10 rounded-full flex items-center justify-center bg-gray-200 text-sm font-bold text-gray-600"
              >
                <i class="fa-solid fa-lock"></i>
              </div>

              <div
                v-if="isEnrolled && !lesson.is_completed"
                class="min-w-10 min-h-10 rounded-full flex items-center justify-center bg-gray-200 text-sm font-bold text-gray-600"
              >
                {{ index + 1 }}
              </div>

              <div
                v-if="isEnrolled && lesson.is_completed"
                class="min-w-10 min-h-10 rounded-full flex items-center justify-center bg-yellow-500 text-xs text-white font-bold"
              >
                <i class="fa-solid fa-check"></i>
              </div>

              <div>
                <div>
                  <button
                    v-if="!isEnrolled"
                    type="button"
                    class="line-clamp-2 font-semibold text-sm hover:text-yellow-500 transition-all disabled:cursor-not-allowed"
                    disabled
                  >
                    {{ lesson?.title }}
                  </button>

                  <NuxtLink
                    v-else
                    :to="localePath(`/courses/${course.slug}/${section.slug}/${lesson.uuid}`)"
                    class="line-clamp-2 font-semibold text-sm hover:text-yellow-500 transition-all"
                  >
                    {{ lesson?.title }}
                  </NuxtLink>
                </div>
                <span class="text-[.7rem] my-1 font-normal text-gray-600">
                  <i class="fa-solid fa-clock mr-2"> </i>
                  {{ lesson?.duration }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
