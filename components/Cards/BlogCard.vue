<script setup lang="ts">
import type { Blog } from '~/types/blog'

defineProps<{ blog: Blog }>()
</script>

<template>
  <a
    class="group flex flex-col h-full border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-xl p-5"
    href="#"
  >
    <div class="aspect-w-16 aspect-h-11 overflow-hidden rounded-xl">
      <img
        class="w-full object-cover rounded-xl group-hover:scale-105 duration-200"
        :src="blog?.thumbnail"
        alt="Blog thumbnail"
      />
    </div>
    <div class="my-6">
      <h3 class="text-xl font-semibold text-gray-800 group-hover:text-yellow-500">
        {{ blog?.title }}
      </h3>
      <p class="mt-5 text-gray-600">
        {{ blog?.content }}
      </p>
    </div>

    <div class="mt-auto flex items-center gap-x-3">
      <img class="size-8 rounded-full" :src="blog?.author?.avatar" alt="Author Avatar" />

      <div>
        <h5 class="text-sm font-semibold text-gray-800">By {{ blog?.author?.display_name }}</h5>
        <p class="text-xs text-gray-600">{{ blog?.published_at }}</p>
      </div>
    </div>
  </a>
</template>
