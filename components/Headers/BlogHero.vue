<script setup lang="ts">
import type { Blog } from '~/types/blog'

defineProps<{ blog: Blog | null }>()

const localePath = useLocalePath()
</script>

<template>
  <div v-if="blog" class="max-w-[85rem] p-6 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Grid -->
    <div class="grid sm:grid-cols-2 sm:items-center gap-8">
      <div class="sm:order-2">
        <div class="relative pt-[50%] sm:pt-[100%] rounded-lg">
          <img
            class="size-full absolute top-0 start-0 object-cover rounded-lg"
            :src="blog?.thumbnail"
            alt="Blog thumbnail"
          />
        </div>
      </div>
      <!-- End Col -->

      <div class="sm:order-1">
        <p
          class="mb-5 inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-200 text-gray-800"
        >
          {{ blog?.category?.name }}
        </p>

        <h2
          class="text-2xl font-bold md:text-3xl lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight text-gray-800"
        >
          <NuxtLink
            :to="localePath('/blogs/' + blog?.slug)"
            class="hover:text-yellow-500 duration-200"
          >
            {{ blog?.title }}
          </NuxtLink>
        </h2>

        <!-- Avatar -->
        <div class="mt-6 sm:mt-10 flex items-center">
          <div class="flex-shrink-0">
            <img
              class="size-10 sm:h-14 sm:w-14 rounded-full"
              :src="blog?.author?.avatar"
              alt="Author Avatar"
            />
          </div>

          <div class="ms-3 sm:ms-4">
            <p class="sm:mb-1 font-semibold text-gray-800">{{ blog?.author?.display_name }}</p>
            <p class="text-xs text-gray-500">{{ blog?.published_at }}</p>
          </div>
        </div>
        <!-- End Avatar -->

        <div class="mt-5">
          <NuxtLink
            :to="localePath('/blogs/' + blog?.slug)"
            class="inline-flex items-center gap-x-1.5 text-yellow-500 decoration-2 hover:underline font-medium"
          >
            Read more
            <svg
              class="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
      <!-- End Col -->
    </div>
    <!-- End Grid -->
  </div>
</template>
