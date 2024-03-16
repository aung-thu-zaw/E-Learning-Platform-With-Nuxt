<script setup lang="ts">
import type { LearningPath } from '~/types/learningPath'

const props = defineProps<{ learningPath: LearningPath }>()

const isSaved = ref<boolean>(false)
const store = useMyCourseStore()

const { $axiosApi, $toast, $i18n } = useNuxtApp()
const { learningPaths } = storeToRefs(store)

const savedLearningPathToList = async (slug: string) => {
  try {
    const { data } = await $axiosApi.post(`/learning-paths/${slug}/save`)

    isSaved.value = true

    $toast.success($i18n.t(data.message))
  } catch (error: any) {
    if (error.response?.status === 401) {
      return useRouter().push({ path: '/auth/sign-in' })
    } else {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }
}

const removeLearningPathFromList = async (slug: string) => {
  try {
    const { data } = await $axiosApi.delete(`/learning-paths/${slug}/remove`)

    isSaved.value = false

    $toast.success($i18n.t(data.message))
  } catch (error: any) {
    if (error.response?.status === 401) {
      return useRouter().push({ path: '/auth/sign-in' })
    } else {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }
}

const checkLearningPathIsSaved = (learningPathId: number): boolean | void => {
  if (!learningPaths.value?.data?.length) return false

  isSaved.value = learningPaths.value?.data?.some(
    (learningPath) => learningPath.id === learningPathId
  )
}

onMounted(() => checkLearningPathIsSaved(props.learningPath?.id))

watch(
  () => learningPaths.value,
  () => checkLearningPathIsSaved(props.learningPath?.id)
)
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
          <button
            type="button"
            @click="
              isSaved
                ? removeLearningPathFromList(learningPath?.slug)
                : savedLearningPathToList(learningPath?.slug)
            "
          >
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
