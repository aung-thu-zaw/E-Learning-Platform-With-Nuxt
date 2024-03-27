<script setup lang="ts">
import type { Section } from '~/types/browsing'

defineProps<{ section: Section }>()
</script>

<template>
  <div class="hs-accordion-group w-full">
    <div id="hs-basic-with-arrow-heading-one" class="hs-accordion">
      <button
        class="hs-accordion-toggle hs-accordion-active:bg-yellow-500 hs-accordion-active:text-white p-5 rounded-md inline-flex flex-col items-start justify-between w-full font-semibold text-start text-gray-700 disabled:opacity-50 disabled:pointer-events-none bg-gray-200"
        aria-controls="hs-basic-with-arrow-collapse-one"
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
        id="hs-basic-with-arrow-collapse-one"
        class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-with-arrow-heading-one"
        :data-hs-accordion-always-open="false"
      >
        <div v-for="(lesson, index) in section.lessons" :key="index" class="text-gray-10">
          <div class="p-3 rounded-md flex items-start space-x-3 transition-all">
            <div
              class="min-w-10 min-h-10 rounded-full flex items-center justify-center bg-gray-200 text-xs text-gray-600 border border-gray-300"
            >
              <i class="fa-solid fa-lock"></i>
            </div>
            <div>
              <a
                href="#"
                class="line-clamp-2 font-semibold text-sm hover:text-yellow-500 transition-all"
              >
                {{ lesson?.title }}
              </a>
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
