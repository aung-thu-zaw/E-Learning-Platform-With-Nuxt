<script setup lang="ts">
import type { Blog } from '~/types/blog'

defineProps<{ blog: Blog }>()
</script>

<template>
  <a class="group sm:flex rounded-xl" href="#">
    <div
      class="flex-shrink-0 relative rounded-xl overflow-hidden w-full h-[200px] sm:w-[250px] sm:h-[350px]"
    >
      <img
        class="size-full absolute top-0 start-0 object-cover group-hover:scale-105 duration-200"
        :src="blog?.thumbnail"
        alt="Blog thumbnail"
      />
    </div>

    <div class="grow">
      <div class="p-4 flex flex-col h-full sm:p-6">
        <div class="mb-3">
          <p
            class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-300 text-gray-800"
          >
            {{ blog?.category?.name }}
          </p>
        </div>
        <h3
          class="text-lg sm:text-2xl font-semibold text-gray-800 group-hover:text-yellow-500 line-clamp-3"
        >
          {{ blog?.title }}
        </h3>
        <p class="mt-2 text-gray-600 line-clamp-3">
          {{ blog?.content }}
        </p>

        <div class="mt-5 sm:mt-auto">
          <!-- Avatar -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="size-[46px] rounded-full"
                :src="blog?.author?.avatar"
                alt="Author Avatar"
              />
            </div>
            <div class="ms-2.5 sm:ms-4">
              <h4 class="font-semibold text-gray-800">{{ blog?.author?.display_name }}</h4>
              <p class="text-xs text-gray-500">{{ blog?.published_at }}</p>
            </div>
          </div>
          <!-- End Avatar -->
        </div>
      </div>
    </div>
  </a>
</template>
