<script setup lang="ts">
import LearningPathCollectionCard from '~/components/Cards/LearningPathCollectionCard.vue'
</script>

<template>
  <section class="py-10">
    <div class="container mx-auto">
      <div class="flex items-start justify-between md:px-0 px-5">
        <div class="space-y-3">
          <h1
            class="font-bold text-gray-800 text-3xl [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
          >
            Recommended Learning Paths
          </h1>
          <p class="text-sm font-medium text-gray-600">
            Reach your learning goals with hand-picked, sequential classes.
          </p>
        </div>

        <button
          class="px-5 py-2.5 border border-gray-400 rounded-md text-xs font-bold text-gray-700 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 duration-200 transition-all active:animate-press"
        >
          View All Learning Paths
          <i class="fa-solid fa-arrow-right ml-3"></i>
        </button>
      </div>

      <div class="py-10 px-5 md:px-0 lg:py-14 mx-auto">
        <div class="grid lg:grid-cols-3 gap-5">
          <LearningPathCollectionCard />
          <LearningPathCollectionCard />
          <LearningPathCollectionCard />
        </div>
      </div>
    </div>
  </section>
</template>
