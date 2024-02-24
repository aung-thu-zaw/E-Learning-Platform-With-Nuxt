<script setup lang="ts"></script>

<template>
  <div class="group flex flex-col h-full border border-gray-200 rounded-xl p-5 animate-pulse">
    <div class="aspect-w-16 aspect-h-11 overflow-hidden rounded-xl">
      <div class="w-full h-72 object-cover rounded-xl bg-gray-200"></div>
    </div>
    <div class="my-6">
      <div class="h-5 bg-gray-200 rounded-full w-full mb-2"></div>
      <div class="h-5 bg-gray-200 rounded-full w-56 mb-5"></div>

      <div class="h-3 bg-gray-200 rounded-full w-full mt-5 mb-2"></div>
      <div class="h-3 bg-gray-200 rounded-full w-full mb-2"></div>
      <div class="h-3 bg-gray-200 rounded-full w-32 mb-2"></div>
    </div>

    <div class="flex items-center mt-auto">
      <svg
        class="w-8 h-8 me-3 text-gray-200"
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
  </div>
</template>
