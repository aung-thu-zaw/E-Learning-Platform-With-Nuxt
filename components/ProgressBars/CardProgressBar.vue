<script setup lang="ts"></script>

<template>
  <div
    class="flex w-full h-2 bg-gray-200 overflow-hidden"
    role="progressbar"
    aria-valuenow="25"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      class="flex flex-col justify-center overflow-hidden bg-yellow-600 text-xs text-white text-center whitespace-nowrap transition duration-500"
      style="width: 25%"
    ></div>
  </div>
</template>
