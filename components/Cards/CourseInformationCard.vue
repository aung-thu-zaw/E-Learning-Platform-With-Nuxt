<script setup lang="ts">
import ShareDropdown from '~/components/Dropdowns/ShareDropdown.vue'
</script>

<template>
  <div class="max-w-[60rem] mx-auto bg-white border rounded-md p-5">
    <div class="flex items-center justify-between">
      <div class="mt-auto flex items-center gap-x-3">
        <img
          class="size-10 rounded-full"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
          alt="Image Description"
        />

        <div>
          <h5 class="text-sm font-bold text-gray-800">Curated By Aung Thu Zaw</h5>
          <p class="text-xs font-medium text-gray-600">5 Classes (2 hours 36 minutes)</p>
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
          Video editing software of choice, Pen and paper for note taking, Computer
        </span>
      </div>
      <div>
        <span class="font-bold text-xs">
          <i class="fa-solid fa-image mr-3"></i>
          FINAL PRODUCT -
        </span>
        <span class="text-sm font-medium text-gray-700">
          Footage organization system, Editing portfolio, Client project template
        </span>
      </div>
      <div>
        <span class="font-bold text-xs">
          <i class="fa-solid fa-chart-simple mr-3"></i>
          LEVEL -
        </span>
        <span class="text-sm font-medium text-gray-700"> Beginner </span>
      </div>
    </div>
  </div>
</template>
