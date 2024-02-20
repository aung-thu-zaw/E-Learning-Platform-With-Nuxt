<script setup lang="ts">
import UserDropdown from '~/components/Dropdowns/UserDropdown.vue'
import LanguageDropdown from '~/components/Dropdowns/LanguageDropdown.vue'

const emit = defineEmits(['updateCollapseShow'])

const toggle = () => emit('updateCollapseShow')
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-white border-b w-full py-2 flex items-center justify-between pl-5 pr-8"
  >
    <div class="flex items-center space-x-10 w-full">
      <NuxtLink
        to="/"
        class="md:block text-gray-700 mr-0 inline-block whitespace-nowrap px-0 py-1.5 text-center font-extrabold text-lg"
      >
        E-Learning Platform
      </NuxtLink>

      <button
        type="button"
        class="bg-yellow-400 text-white font-bold px-3 py-2 rounded-md hover:bg-yellow-500 duration-200 transition-all mx-10"
        @click="toggle"
      >
        <i class="fa-solid fa-bars-staggered"></i>
      </button>

      <div class="">
        <form class="md:flex hidden flex-row flex-wrap items-center lg:mr-auto mr-3 w-[300px]">
          <div class="relative flex w-full flex-wrap items-stretch">
            <span
              class="z-10 h-full leading-snug font-normal absolute text-center text-slate-500 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
            >
              <i class="fas fa-search" />
            </span>
            <input
              type="text"
              placeholder="Search ( ctrl + k )"
              class="p-3.5 placeholder-gray-400 text-gray-800 relative bg-gray-200 rounded-md text-xs focus:border-none focus:ring-0 focus:outline-none border-none font-semibold w-full pl-10"
            />
          </div>
        </form>
      </div>
    </div>

    <div class="hidden md:flex items-center space-x-5 w-full justify-end">
      <button
        class="flex font-bold p-3 text-gray-700 rounded-full w-10 h-10 items-center justify-center hover:cursor-pointer hover:bg-gray-200 transition-all"
      >
        <i class="fa-solid fa-bell"></i>
      </button>

      <button
        class="flex font-bold p-3 text-gray-700 rounded-full w-10 h-10 items-center justify-center hover:cursor-pointer hover:bg-gray-200 transition-all"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>

      <LanguageDropdown />

      <UserDropdown />
    </div>
  </nav>
</template>
