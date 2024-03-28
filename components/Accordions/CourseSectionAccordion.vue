<script setup lang="ts">
import type { Section } from '~/types/browsing'

defineProps<{ section: Section }>()
</script>

<template>
  <div class="hs-accordion-group">
    <div :id="'hs-section-' + section.id" class="hs-accordion">
      <button
        class="hs-accordion-toggle hs-accordion-active:text-yellow-600 py-3 inline-flex flex-col items-start justify-between gap-x-3 w-full font-semibold text-start text-gray-700 disabled:opacity-50 disabled:pointer-events-none"
        :aria-controls="'hs-accordion-section' + section.id"
      >
        <div class="w-full flex items-start justify-between">
          <div class="line-clamp-1 font-bold text-sm max-w-[310px]">
            Section - {{ section?.title }}
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
        :id="'hs-accordion-section-' + section.id"
        class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
        :aria-labelled:by="'hs-section-' + section.id"
      >
        <div class="text-gray-10">
          <div
            v-for="(lesson, index) in section?.lessons"
            :key="index"
            class="p-3 rounded-md flex items-start space-x-3 transition-all"
          >
            <div class="flex">
              <input
                id="hs-checked-checkbox"
                type="checkbox"
                class="shrink-0 mt-0.5 border-gray-200 rounded text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
                :checked="lesson?.is_completed"
              />
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
