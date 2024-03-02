<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
</script>

<template>
  <section class="py-10">
    <div class="container mx-auto">
      <div class="flex items-start justify-between md:px-0 px-5 mb-10">
        <div class="space-y-3">
          <h1
            class="font-bold text-gray-800 text-3xl [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
          >
            {{ $t('Explore Your Creative Interests') }}
          </h1>
          <p class="text-sm font-medium text-gray-600">
            {{
              $t(
                'Discover and customize your learning journey by adding tags that reflect your creative interests.'
              )
            }}
          </p>
        </div>

        <button
          class="px-5 py-2.5 border border-gray-400 rounded-md text-xs font-bold text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all active:animate-press"
        >
          <i class="fa-solid fa-plus mr-1"></i>
          {{ $t('Add More') }}
        </button>
      </div>

      <div class="bg-gray-200 border px-10 pt-10 rounded-md">
        <div class="py-5 px-5 md:px-0 mx-auto flex items-center overflow-scroll space-x-2 mb-6">
          <button
            class="text-xs font-semibold px-5 py-3 rounded-full mb-2 bg-yellow-500 text-white border border-yellow-500 duration-200 transition-all"
          >
            Productivity
          </button>
          <button
            class="text-xs font-semibold border border-gray-400 px-5 py-3 rounded-full mb-2 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all"
          >
            Productivity
          </button>
          <button
            class="text-xs font-semibold border border-gray-400 px-5 py-3 rounded-full mb-2 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all"
          >
            Productivity
          </button>
          <button
            class="text-xs font-semibold border border-gray-400 px-5 py-3 rounded-full mb-2 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all"
          >
            Productivity
          </button>
          <button
            class="text-xs font-semibold border border-gray-400 px-5 py-3 rounded-full mb-2 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all"
          >
            Productivity
          </button>
          <button
            class="text-xs font-semibold border border-gray-400 px-5 py-3 rounded-full mb-2 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all"
          >
            Productivity
          </button>
          <button
            class="text-xs font-semibold border border-gray-400 px-5 py-3 rounded-full mb-2 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all"
          >
            Productivity
          </button>
          <button
            class="text-xs font-semibold border border-gray-400 px-5 py-3 rounded-full mb-2 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all"
          >
            Productivity
          </button>
        </div>

        <div class="space-y-3">
          <h1 class="font-bold text-2xl text-gray-800">Get Started in UI/UX Design</h1>

          <p class="text-gray-700 text-sm font-medium">
            Check out these great beginner classes or
            <a href="#" class="text-yellow-600 underline">view more UI/UX Design classes</a>
          </p>
        </div>

        <div class="py-10 px-5 md:px-0 lg:py-14 mx-auto">
          <div class="grid lg:grid-cols-3 gap-5">
            <!-- <VideoCourseCard />
            <VideoCourseCard />
            <VideoCourseCard /> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
