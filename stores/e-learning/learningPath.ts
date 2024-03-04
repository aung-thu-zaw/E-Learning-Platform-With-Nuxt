import { defineStore } from 'pinia'
import type { LearningPathPaginate, LearningPath } from '~/types/learningPath'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

export const useLearningPathStore = defineStore('learning-paths', () => {
  const learningPaths = ref<LearningPathPaginate | null>(null)
  const learningPath = ref<LearningPath | null>(null)

  const { backendApiBaseUrl } = useRuntimeConfig().public

  const getAllLearningPath = async (query: { page: number }): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const data: LearningPathPaginate = await $fetch(
        `${backendApiBaseUrl}/learning-paths?${generateQueryString(query)}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      learningPaths.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getLearningPath = async (slug: string): Promise<void> => {
    try {
      const data: LearningPath = await $fetch(`${backendApiBaseUrl}/learning-paths/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      learningPath.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    learningPaths,
    learningPath,
    getAllLearningPath,
    getLearningPath
  }
})
