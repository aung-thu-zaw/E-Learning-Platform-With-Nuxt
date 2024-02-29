<script setup lang="ts">
import NormalButton from '~/components/Buttons/NormalButton.vue'

defineProps({
  course: Object
})
</script>

<template>
  <div class="group overflow-hidden block bg-white rounded-lg border">
    <div class="sm:flex">
      <div class="flex-shrink-0 relative overflow-hidden w-full h-52 sm:w-72">
        <img
          class="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 start-0 object-cover"
          :src="course?.thumbnail"
          alt="Course Thumbnail"
        />
      </div>

      <div class="grow mt-4 sm:mt-0 px-6 py-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-800 line-clamp-2">
            {{ course?.title }}
          </h3>

          <div class="min-w-[100px]">
            <NormalButton>
              <i class="fa-solid fa-edit"></i>
              Edit
            </NormalButton>
          </div>
        </div>

        <div class="flex items-center space-x-5 font-medium">
          <span class="mt-5 text-xs text-gray-600">
            <i class="fa-solid fa-user mr-1.5"></i> 58 Students
          </span>
          <span class="mt-5 text-xs text-gray-600">
            <i class="fa-solid fa-list mr-1.5"></i>
            Creative
          </span>
          <span class="mt-5 text-xs text-gray-600">
            <i class="fa-solid fa-circle-check mr-1.5"></i>
            Published
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
