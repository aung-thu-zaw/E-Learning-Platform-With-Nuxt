<script setup lang="ts">
import { useSavedLearningPathStore } from '~/stores/e-learning/savedLearningPath'
import type { LearningPath } from '~/types/learningPath'

const props = defineProps<{ learningPath: LearningPath }>()

const isSaved = ref<boolean>(props.learningPath.is_saved)
const store = useSavedLearningPathStore()

const toggleSavedLearningPath = async () => {
  if (isSaved.value) {
    await store.removeLearningPathFromList(props.learningPath?.slug)
  } else {
    await store.savedLearningPathToList(props.learningPath?.slug)
  }

  isSaved.value = !isSaved.value
}
</script>

<template>
  <div class="flex flex-col bg-white border border-gray-300 shadow-sm rounded-xl overflow-hidden">
    <img
      class="w-full h-64 rounded-t-xl object-cover"
      :src="learningPath?.image"
      alt="Learning Path Background Image"
    />
    <div class="p-4 md:p-5 space-y-5">
      <h3 class="text-lg font-bold text-gray-700 line-clamp-2 mb-5">
        <NuxtLink :to="`/learning-paths/${learningPath.slug}`">
          {{ learningPath?.title }}
        </NuxtLink>
      </h3>

      <p class="text-sm text-gray-600 font-semibold line-clamp-3">
        {{ learningPath?.description }}
      </p>

      <div class="flex items-center justify-between">
        <div>
          <p class="font-bold text-xs text-yellow-500">
            <i class="fa-solid fa-graduation-cap"></i>
            {{ learningPath?.total_course }} courses
            <span class="text-gray-600 ml-3">
              <i class="fa-solid fa-clock"></i>
              {{ learningPath?.total_duration }}
            </span>
          </p>
        </div>
        <div>
          <button type="button" @click="toggleSavedLearningPath">
            <span v-if="isSaved" class="text-yellow-500">
              <i class="fa-solid fa-bookmark"></i>
            </span>
            <span v-else class="text-gray-600">
              <i class="fa-regular fa-bookmark"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
