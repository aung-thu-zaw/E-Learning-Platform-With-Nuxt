<script setup lang="ts">
import VideoCourseCard from '~/components/Cards/VideoCourseCard.vue'
</script>

<template>
  <section class="py-10">
    <div class="container mx-auto">
      <div class="flex items-start justify-between md:px-0 px-5">
        <div class="space-y-3">
          <h1
            class="font-bold text-gray-800 text-3xl [text-shadow:_1.5px_0.5px_1.5px_rgb(0_0_0_/_40%)]"
          >
            {{ $t('Recommended Courses For You') }}
          </h1>
          <p class="text-sm font-medium text-gray-600">
            {{
              $t(
                'Advance towards your learning objectives with expertly selected, step-by-step courses.'
              )
            }}
          </p>
        </div>
      </div>

      <div class="py-10 px-5 md:px-0 lg:py-14 mx-auto">
        <div class="grid lg:grid-cols-3 gap-5">
          <!-- <VideoCourseCard />
          <VideoCourseCard />
          <VideoCourseCard /> -->
        </div>
      </div>
    </div>
  </section>
</template>
