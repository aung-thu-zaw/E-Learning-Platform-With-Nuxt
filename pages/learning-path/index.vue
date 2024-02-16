<script setup lang="ts">
import LearningPathCollectionCard from '~/components/Cards/LearningPathCollectionCard.vue'

// useHead({ title: 'Home' })
</script>

<template>
  <NuxtLayout name="app-layout">
    <section>
      <div class="px-5 md:px-28 text-left bg-white py-10 md:py-16 space-y-5">
        <h4 class="font-bold text-xl text-yellow-500">Learning Paths</h4>

        <h1 class="font-bold text-2xl md:text-4xl text-gray-800 max-w-[600px]">
          Reach Your Learning Goals With Hand-Picked, Sequential Classes
        </h1>
        <p class="font-semibold text-sm text-gray-700 mx-auto">
          Focus your creative journey with our platform Learning Paths. Deepen your skillset with a
          set of curated courses that build on one another, reinforcing lessons. Available in a
          range of experience levels from beginner to advanced.
        </p>
      </div>

      <div class="bg-gray-100">
        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div class="grid lg:grid-cols-3 gap-5">
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
            <LearningPathCollectionCard />
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
