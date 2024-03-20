<script setup lang="ts"></script>

<template>
  <div class="max-w-[85rem] p-6 sm:px-6 lg:px-8 lg:py-14 mx-auto animate-pulse">
    <!-- Grid -->
    <div class="grid sm:grid-cols-2 sm:items-center gap-8">
      <div class="sm:order-2">
        <div class="relative pt-[50%] sm:pt-[100%] rounded-lg">
          <div class="size-full absolute top-0 start-0 object-cover rounded-lg bg-gray-200"></div>
        </div>
      </div>
      <!-- End Col -->

      <div class="sm:order-1">
        <p class="mb-8 h-7 w-20 rounded-md items-center bg-gray-200"></p>

        <div class="h-8 bg-gray-200 rounded-full w-full mb-5"></div>
        <div class="h-8 bg-gray-200 rounded-full w-72"></div>

        <!-- Avatar -->
        <div class="flex items-center mt-6 sm:mt-10">
          <svg
            class="w-12 h-12 me-3 text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
            />
          </svg>
          <div>
            <div class="h-3.5 bg-gray-200 rounded-full w-32 mb-2"></div>
            <div class="w-48 h-3 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <span class="sr-only">Loading...</span>

        <!-- End Avatar -->

        <div class="mt-8 h-3.5 bg-gray-200 rounded-full w-32 mb-2"></div>
      </div>
      <!-- End Col -->
    </div>
    <!-- End Grid -->
  </div>
</template>
