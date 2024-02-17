<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="border-b border-gray-300">
    <nav
      class="flex items-center justify-center space-x-5 overflow-scroll"
      aria-label="Tabs"
      role="tablist"
    >
      <NuxtLink
        to="/my-courses/saved-courses"
        class="hs-tab-active:font-bold hs-tab-active:border-yellow-600 hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm font-semibold whitespace-nowrap text-gray-700 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none active"
        :class="{
          'font-bold border-yellow-600 text-yellow-600':
            route.fullPath === '/my-courses/saved-courses'
        }"
      >
        Saved Courses
      </NuxtLink>
      <NuxtLink
        to="/my-courses/saved-learning-paths"
        class="py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm font-semibold whitespace-nowrap text-gray-700 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none"
        :class="{
          'font-bold border-yellow-600 text-yellow-600':
            route.fullPath === '/my-courses/saved-learning-paths'
        }"
      >
        Saved Learning Paths
      </NuxtLink>
      <NuxtLink
        to="/my-courses/my-lists"
        class="hs-tab-active:font-bold hs-tab-active:border-yellow-600 hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm font-semibold whitespace-nowrap text-gray-700 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none"
        :class="{
          'font-bold border-yellow-600 text-yellow-600': route.fullPath === '/my-courses/my-lists'
        }"
      >
        My Lists
      </NuxtLink>
      <NuxtLink
        to="/my-courses/watch-history"
        class="hs-tab-active:font-bold hs-tab-active:border-yellow-600 hs-tab-active:text-yellow-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm font-semibold whitespace-nowrap text-gray-700 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 disabled:opacity-50 disabled:pointer-events-none"
        :class="{
          'font-bold border-yellow-600 text-yellow-600':
            route.fullPath === '/my-courses/watch-history'
        }"
      >
        Watch History
      </NuxtLink>
    </nav>
  </div>
</template>
