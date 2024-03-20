<script setup lang="ts">
import ShareDropdown from '~/components/Dropdowns/ShareDropdown.vue'
import type { LearningPath } from '~/types/learningPath'

defineProps<{ learningPath: LearningPath }>()
</script>

<template>
  <div class="max-w-[60rem] mx-auto bg-white border rounded-md p-5">
    <div class="flex items-center justify-between">
      <div class="mt-auto flex items-center gap-x-3">
        <img
          class="size-10 rounded-full"
          :src="learningPath?.creator?.avatar"
          alt="Creator Avatar"
        />

        <div>
          <h5 class="text-sm font-bold text-gray-800">
            Curated By {{ learningPath?.creator?.name }}
          </h5>
          <p class="text-xs font-medium text-gray-600 capitalize">
            {{ learningPath?.total_course }} Classes ( {{ learningPath?.total_duration }} )
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-5">
        <button
          class="border border-gray-300 hover:bg-gray-200 duration-200 px-5 py-2.5 rounded-md text-sm font-semibold text-gray-700"
        >
          <i class="fa-solid fa-heart"></i>
          Save
        </button>

        <ShareDropdown />
      </div>
    </div>

    <hr class="my-5" />

    <div class="flex flex-col items-start space-y-5">
      <div>
        <span class="font-bold text-xs">
          <i class="fa-solid fa-pen-ruler mr-3"></i>
          MATERIALS -
        </span>
        <span class="text-sm font-medium text-gray-700">
          {{ learningPath?.materials }}
        </span>
      </div>
      <div>
        <span class="font-bold text-xs">
          <i class="fa-solid fa-image mr-3"></i>
          FINAL PRODUCT -
        </span>
        <span class="text-sm font-medium text-gray-700">
          {{ learningPath?.final_product }}
        </span>
      </div>
      <div>
        <span class="font-bold text-xs">
          <i class="fa-solid fa-chart-simple mr-3"></i>
          LEVEL -
        </span>
        <span class="text-sm font-medium text-gray-700 capitalize">
          {{ learningPath?.level }}
        </span>
      </div>
    </div>
  </div>
</template>
