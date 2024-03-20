<script setup lang="ts"></script>

<template>
  <div>
    <div
      class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="flex flex-col rounded-full justify-center overflow-hidden bg-yellow-500 text-xs text-white text-center whitespace-nowrap transition duration-500"
        style="width: 25%"
      ></div>
    </div>

    <div class="flex items-center justify-between text-xs font-medium text-gray-700 mt-1.5">
      <span>Progress</span>
      <span>10% Complete</span>
    </div>
  </div>
</template>
