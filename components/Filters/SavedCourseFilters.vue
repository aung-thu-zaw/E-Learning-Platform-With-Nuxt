<script setup lang="ts">
import Checkbox from '~/components/Forms/Fields/Checkbox.vue'
</script>

<template>
  <div class="flex items-center justify-between flex-wrap px-10 bg-white py-5 rounded-md border">
    <div class="space-y-3 my-5">
      <h1 class="text-xs font-extrabold text-gray-700 uppercase">Skills</h1>

      <div class="mt-1 mx-1 sm:mt-1 hs-dropdown relative sm:inline-flex z-20 [--auto-close:inside]">
        <button
          id="hs-dropdown-auto-close-inside"
          type="button"
          class="hs-dropdown-toggle inline-flex items-center gap-x-2 disabled:opacity-50 disabled:pointer-events-none text-xs font-semibold text-gray-800"
        >
          All Skills
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
          class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 bg-white shadow-md rounded-lg p-2"
          aria-labelledby="hs-dropdown-auto-close-inside"
        >
          <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
            <Checkbox />
            <label for="hs-dropdown-item-checkbox-delete" class="ms-3.5">
              <span class="block text-sm font-semibold text-gray-800">English Learning</span>
            </label>
          </div>
          <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
            <Checkbox />
            <label for="hs-dropdown-item-checkbox-archive" class="ms-3.5">
              <span class="block text-sm font-semibold text-gray-800">Web Development</span>
            </label>
          </div>
          <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
            <Checkbox />
            <label for="hs-dropdown-item-checkbox-archive" class="ms-3.5">
              <span class="block text-sm font-semibold text-gray-800">Spoken English</span>
            </label>
          </div>
          <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
            <Checkbox />
            <label for="hs-dropdown-item-checkbox-archive" class="ms-3.5">
              <span class="block text-sm font-semibold text-gray-800">SLA</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3 my-5">
      <h1 class="text-xs font-extrabold text-gray-700 uppercase">Course Duration</h1>

      <div class="flex items-center space-x-3">
        <div>
          <Checkbox />

          <span class="ml-1.5 text-xs font-semibold text-gray-800"> Under 1 hour</span>
        </div>
        <div>
          <Checkbox />

          <span class="ml-1.5 text-xs font-semibold text-gray-800"> 1 to 3 hours</span>
        </div>
        <div>
          <Checkbox />

          <span class="ml-1.5 text-xs font-semibold text-gray-800"> 3 to 5 hours</span>
        </div>
        <div>
          <Checkbox />

          <span class="ml-1.5 text-xs font-semibold text-gray-800">Over 5 hours </span>
        </div>
      </div>
    </div>

    <div class="space-y-3 my-5">
      <h1 class="text-xs font-extrabold text-gray-700 uppercase">Course Status</h1>

      <div class="flex items-center space-x-3">
        <div>
          <Checkbox />

          <span class="ml-1.5 text-xs font-semibold text-gray-800">Not yet started</span>
        </div>
        <div>
          <Checkbox />

          <span class="ml-1.5 text-xs font-semibold text-gray-800">In progress</span>
        </div>
        <div>
          <Checkbox />

          <span class="ml-1.5 text-xs font-semibold text-gray-800">Completed</span>
        </div>
      </div>
    </div>
  </div>
</template>
