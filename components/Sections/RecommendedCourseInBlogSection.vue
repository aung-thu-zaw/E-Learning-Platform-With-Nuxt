<script setup lang="ts">
import RecommendedCourseCard from '~/components/Cards/RecommendedCourseCard.vue'
</script>

<template>
  <section id="recommended-courses" class="py-10">
    <h1 class="text-2xl md:text-4xl font-bold text-gray-700 px-5 md:px-20 mb-5">
      {{ $t('Recommended Courses') }}
    </h1>

    <hr />

    <div class="max-w-[85rem] mx-auto px-4 py-8">
      <div class="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
        <RecommendedCourseCard />
        <RecommendedCourseCard />
        <RecommendedCourseCard />
        <RecommendedCourseCard />
      </div>
    </div>
  </section>
</template>
