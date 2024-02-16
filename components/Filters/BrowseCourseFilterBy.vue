<script setup lang="ts"></script>

<template>
  <div class="mt-1 mx-1 sm:mt-1 hs-dropdown relative sm:inline-flex z-20 [--auto-close:inside]">
    <button
      id="hs-dropdown-auto-close-inside"
      type="button"
      class="hs-dropdown-toggle py-3.5 px-4 inline-flex items-center gap-x-2 text-sm font-bold rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
    >
      <i class="fa-solid fa-filter"></i>
      Filters
      <svg
        class="hs-dropdown-open:rotate-180 size-2.5"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <div
      class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg p-2 mt-2"
      aria-labelledby="hs-dropdown-auto-close-inside"
    >
      <div class="py-2 first:pt-0 last:pb-0">
        <span class="block py-2 px-3 text-xs font-semibold uppercase text-gray-600"> Level </span>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-item-radio-delete"
              name="hs-dropdown-item-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-item-radio-delete-description"
              checked
            />
          </div>
          <label for="hs-dropdown-item-radio-delete" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Beginner</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-item-radio-delete"
              name="hs-dropdown-item-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-item-radio-delete-description"
              checked
            />
          </div>
          <label for="hs-dropdown-item-radio-delete" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Intermediate</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-item-radio-delete"
              name="hs-dropdown-item-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-item-radio-delete-description"
              checked
            />
          </div>
          <label for="hs-dropdown-item-radio-delete" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Advanced</span>
          </label>
        </div>
      </div>

      <hr class="text-gray-800" />

      <div class="py-2 first:pt-0 last:pb-0">
        <span class="block py-2 px-3 text-xs font-semibold uppercase text-gray-600">
          Duration
        </span>
        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-item-radio-delete"
              name="hs-dropdown-item-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-item-radio-delete-description"
              checked
            />
          </div>
          <label for="hs-dropdown-item-radio-delete" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Short ( Under 1 Hour )</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-item-radio-delete"
              name="hs-dropdown-item-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-item-radio-delete-description"
              checked
            />
          </div>
          <label for="hs-dropdown-item-radio-delete" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Medium ( 1-3 Hours)</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-item-radio-delete"
              name="hs-dropdown-item-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-item-radio-delete-description"
              checked
            />
          </div>
          <label for="hs-dropdown-item-radio-delete" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Long ( Over 3 Hours)</span>
          </label>
        </div>
      </div>

      <hr class="text-gray-800" />

      <div class="py-2 first:pt-0 last:pb-0">
        <span class="block py-2 px-3 text-xs font-semibold uppercase text-gray-600"> Price </span>
        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-item-radio-delete"
              name="hs-dropdown-item-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-item-radio-delete-description"
              checked
            />
          </div>
          <label for="hs-dropdown-item-radio-delete" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Free</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-item-radio-delete"
              name="hs-dropdown-item-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-item-radio-delete-description"
              checked
            />
          </div>
          <label for="hs-dropdown-item-radio-delete" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Paid</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
