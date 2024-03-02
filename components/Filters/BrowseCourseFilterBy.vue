<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const level = ref<string | undefined>(
  route.query?.level ? (route.query?.level as string | undefined) : 'none'
)
const duration = ref<string | undefined>(
  route.query?.duration ? (route.query?.duration as string | undefined) : 'none'
)

watch(
  () => level.value,
  () => {
    router.push({ query: { ...route.query, level: level.value } })
  }
)

watch(
  () => duration.value,
  () => {
    router.push({ query: { ...route.query, duration: duration.value } })
  }
)
</script>

<template>
  <div class="mt-1 mx-1 sm:mt-1 hs-dropdown relative sm:inline-flex z-20 [--auto-close:inside]">
    <button
      id="hs-dropdown-auto-close-inside"
      type="button"
      class="hs-dropdown-toggle py-3.5 px-4 inline-flex items-center gap-x-2 text-[0.8rem] font-semibold rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
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
              id="hs-dropdown-none-level"
              v-model="level"
              name="hs-dropdown-level-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-none-level-description"
              value="none"
              x
            />
          </div>
          <label for="hs-dropdown-none-level" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">None</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-beginner"
              v-model="level"
              name="hs-dropdown-level-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-beginner-description"
              value="all_levels"
            />
          </div>
          <label for="hs-dropdown-beginner" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">All Level</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-beginner"
              v-model="level"
              name="hs-dropdown-level-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-beginner-description"
              value="beginner"
            />
          </div>
          <label for="hs-dropdown-beginner" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Beginner</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-intermediate"
              v-model="level"
              name="hs-dropdown-level-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-intermediate-description"
              value="intermediate"
            />
          </div>
          <label for="hs-dropdown-intermediate" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Intermediate</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-advanced"
              v-model="level"
              name="hs-dropdown-level-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-advanced-description"
              value="advanced"
            />
          </div>
          <label for="hs-dropdown-advanced" class="ms-3.5">
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
              id="hs-dropdown-none"
              v-model="duration"
              name="hs-dropdown-duration-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-none-description"
              value="none"
            />
          </div>
          <label for="hs-dropdown-none" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">None</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-short-duration"
              v-model="duration"
              name="hs-dropdown-duration-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-short-duration-description"
              value="short"
            />
          </div>
          <label for="hs-dropdown-short-duration" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Short ( Under 1 Hour )</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-medium-duration"
              v-model="duration"
              name="hs-dropdown-duration-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-medium-duration-description"
              value="medium"
            />
          </div>
          <label for="hs-dropdown-medium-duration" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Medium ( 1-3 Hours)</span>
          </label>
        </div>

        <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100">
          <div class="flex items-center h-5 mt-1">
            <input
              id="hs-dropdown-long-duration"
              v-model="duration"
              name="hs-dropdown-duration-radio"
              type="radio"
              class="shrink-0 rounded-full text-yellow-600 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none border-gray-300 checked:bg-yellow-500 checked:border-yellow-500 focus:ring-offset-yellow-500"
              aria-describedby="hs-dropdown-long-duration-description"
              value="long"
            />
          </div>
          <label for="hs-dropdown-long-duration" class="ms-3.5">
            <span class="block text-sm font-semibold text-gray-600">Long ( Over 3 Hours)</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
