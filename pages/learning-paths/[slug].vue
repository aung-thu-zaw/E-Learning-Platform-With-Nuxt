<script setup lang="ts">
import CourseInformationCard from '~/components/Cards/CourseInformationCard.vue'
import CourseTimeline from '~/components/CourseTimeline.vue'
import { useLearningPathStore } from '~/stores/e-learning/learningPath'
// import type { LearningPathPaginate } from '~/types/learningPath'

definePageMeta({ layout: 'app-layout' })

const store = useLearningPathStore()
const route = useRoute()
const { learningPath } = storeToRefs(store)

const slug = route?.params?.slug.toString()

onMounted(async () => {
  await store.getLearningPath(slug)

  if (learningPath.value) {
    useHead({ title: learningPath?.value?.title })
  }
})
</script>

<template>
  <section class="">
    <div
      class="px-5 md:px-28 text-left bg-white py-20 md:py-36 space-y-5"
      :style="{
        'background-image': 'url(' + (learningPath?.image || '') + ')',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'center',
        'background-color': 'rgba(0, 0, 0, 0.6)',
        'background-blend-mode': 'overlay'
      }"
    >
      <h4 class="font-bold text-2xl text-yellow-500">Learning Paths</h4>

      <h1 class="font-bold text-3xl md:text-4xl text-white max-w-[600px]">
        {{ learningPath?.title }}
      </h1>
      <p class="font-medium text-md text-white max-w-[600px] text-left">
        {{ learningPath?.description }}
      </p>
    </div>
    <div class="bg-gray-100 relative">
      <div class="container mx-auto p-5">
        <div
          class="absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full"
        >
          <CourseInformationCard :learning-path="learningPath" />
        </div>

        <div class="pt-52 pb-20 flex items-center justify-center">
          <CourseTimeline />
        </div>
      </div>
    </div>
  </section>
</template>
