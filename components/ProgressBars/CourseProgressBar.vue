<script setup lang="ts"></script>

<template>
  <div class="w-full px-3 my-5">
    <div class="mb-2 flex justify-between items-center">
      <h3 class="text-sm font-semibold text-white">Progress</h3>
      <span class="text-sm text-white">25%</span>
    </div>
    <div
      class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500"
        style="width: 25%"
      ></div>
    </div>

    <span class="block text-xs text-right ml-auto mt-3"> Time left in the course: 1 h 04 min </span>
  </div>
</template>
