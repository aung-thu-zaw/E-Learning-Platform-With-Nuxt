<script setup lang="ts"></script>

<template>
  <div class="group sm:flex rounded-xl animate-pulse">
    <div
      class="flex-shrink-0 relative rounded-xl overflow-hidden w-full h-[200px] sm:w-[250px] sm:h-[350px]"
    >
      <div class="size-full absolute top-0 start-0 bg-gray-200"></div>
    </div>

    <div class="grow">
      <div class="p-4 flex flex-col h-full sm:p-6">
        <div class="mb-3">
          <p class="h-6 w-20 rounded-md items-center bg-gray-200"></p>
          <!-- <p
            class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-300 text-gray-800"
          >
            {{ blog?.category?.name }}
          </p> -->
        </div>

        <div class="h-5 bg-gray-200 rounded-full w-full mb-2"></div>
        <div class="h-5 bg-gray-200 rounded-full w-56 mb-3"></div>

        <div class="h-3 bg-gray-200 rounded-full w-full mt-2 mb-2"></div>
        <div class="h-3 bg-gray-200 rounded-full w-full mb-2"></div>
        <div class="h-3 bg-gray-200 rounded-full w-32 mb-2"></div>

        <div class="mt-5 sm:mt-auto">
          <!-- Avatar -->

          <div class="flex items-center mt-auto">
            <svg
              class="w-10 h-10 me-3 text-gray-200"
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
              <div class="h-3 bg-gray-200 rounded-full w-40 mb-2"></div>
              <div class="w-28 h-3 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <span class="sr-only">Loading...</span>
          <!-- End Avatar -->
        </div>
      </div>
    </div>
  </div>
</template>
