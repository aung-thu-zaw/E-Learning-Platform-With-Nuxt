<script setup lang="ts">
const localePath = useLocalePath()
const query = useRoute().query?.query?.toString()
</script>

<template>
  <div class="mt-1 mx-1 sm:mt-1 hs-dropdown relative sm:inline-flex z-20 [--auto-close:inside]">
    <button
      id="hs-dropdown-auto-close-inside"
      type="button"
      class="hs-dropdown-toggle py-3 px-6 inline-flex items-center gap-x-2 text-sm font-semibold text-white disabled:opacity-50 disabled:pointer-events-none border bg-yellow-500 border-yellow-500 rounded-full"
    >
      {{ $t('Type') }}
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
      <NuxtLink
        :to="localePath(`/search?query=${query}`)"
        class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100"
      >
        <span class="mt-1 block text-sm font-semibold text-gray-800"> {{ $t('All') }} </span>
      </NuxtLink>

      <NuxtLink
        :to="localePath(`/search/courses?query=${query}`)"
        class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100"
      >
        <span class="mt-1 block text-sm font-semibold text-gray-800"> {{ $t('Courses') }} </span>
      </NuxtLink>

      <NuxtLink
        :to="localePath(`/search/learning-paths?query=${query}`)"
        class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100"
      >
        <span class="mt-1 block text-sm font-semibold text-gray-800">
          {{ $t('Learning Paths') }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
