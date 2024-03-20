<script setup lang="ts">
const { locales, locale, setLocale } = useI18n()
</script>

<template>
  <div class="hs-dropdown relative inline-flex">
    <button
      id="hs-dropdown-slideup-animation"
      type="button"
      class="flex font-bold text-md p-3 text-gray-700 rounded-full w-10 h-10 items-center justify-center hover:cursor-pointer hover:bg-gray-200 transition-all"
    >
      <i class="fa-solid fa-globe"></i>
    </button>
    <div
      class="hs-dropdown-menu font-semibold hs-dropdown-open:opacity-100 duration opacity-0 hidden z-10 transition-[margin,opacity] duration-300 mt-2 min-w-[5rem] rounded-lg p-2 bg-white border divide-gray-700 w-auto"
      aria-labelledby="hs-dropdown-slideup-animation"
    >
      <button
        v-for="(definedLocal, index) in locales"
        :key="index"
        class="flex items-center gap-x-2 py-2 px-3 rounded-lg text-sm focus:outline-none text-gray-700 hover:bg-gray-100 w-full"
        @click="setLocale(definedLocal.code)"
      >
        <span class="text-lg">
          {{ definedLocal?.flag }}
        </span>
        <span>
          {{ definedLocal?.name }}
          <i v-show="definedLocal.code === locale" class="fa-solid fa-circle-check mr-1"></i>
        </span>
      </button>
    </div>
  </div>
</template>
