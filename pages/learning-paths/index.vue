<script setup lang="ts">
import LearningPathCollectionCard from '~/components/Cards/LearningPathCollectionCard.vue'
import { useLearningPathStore } from '~/stores/e-learning/learningPath'
import { useLoadData } from '~/composables/useLoadData'
import type { LearningPathPaginate } from '~/types/learningPath'

useHead({ title: 'Learning Paths' })

definePageMeta({ layout: 'app-layout' })

const landmark = ref<HTMLElement | null>(null)
const store = useLearningPathStore()
const route = useRoute()

const { learningPaths } = storeToRefs(store)

onMounted(async () => {
  await store.getAllLearningPath({ page: parseInt(route.query.page as string) || 1 })
  observeScroll(learningPaths.value, landmark.value)
  store.$patch({ learningPaths: newPaginatedData.value as LearningPathPaginate })
})

const { allData, newPaginatedData, observeScroll } = useLoadData()
</script>

<template>
  <section>
    <div class="px-5 md:px-28 text-left bg-white py-10 md:py-16 space-y-5">
      <h4 class="font-bold text-xl text-yellow-500">{{ $t('Learning Paths') }}</h4>

      <h1 class="font-bold text-2xl md:text-4xl text-gray-800 max-w-[600px]">
        {{ $t('Reach Your Learning Goals With Hand-Picked, Sequential Courses') }}
      </h1>
      <p class="font-semibold text-sm text-gray-700 mx-auto">
        {{
          $t(
            'Focus your creative journey with our platform Learning Paths. Deepen your skillset with a set of curated courses that build on one another, reinforcing lessons. Available in a range of experience levels from beginner to advanced.'
          )
        }}
      </p>
    </div>

    <div class="bg-gray-100">
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="grid lg:grid-cols-3 gap-5">
          <LearningPathCollectionCard
            v-for="learningPath in allData"
            :key="learningPath?.id"
            :learning-path="learningPath"
          />
        </div>

        <div v-if="!learningPaths?.links?.next" class="mt-14">
          <p class="text-slate-700 text-sm font-semibold text-center">
            You have reached the end of the page.
          </p>
        </div>
        <div ref="landmark"></div>
      </div>
    </div>
  </section>
</template>
