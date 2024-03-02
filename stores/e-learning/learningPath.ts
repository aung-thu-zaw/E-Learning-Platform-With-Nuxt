import { defineStore } from 'pinia'
import type { LearningPathPaginate, LearningPath } from '~/types/LearningPath'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

export const useLearningPathStore = defineStore('learning-paths', () => {
  const learningPaths = ref<LearningPathPaginate | null>(null)
  const learningPath = ref<LearningPath | null>(null)

  const { backendApiBaseUrl } = useRuntimeConfig().public

  const getAllLearningPath = async (params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const data: LearningPathPaginate = await $fetch(
        `${backendApiBaseUrl}/learning-paths?${generateQueryParams(params)}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      learningPaths.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getLearningPath = async (slug: string) => {
    try {
      const data: LearningPath = await $fetch(`${backendApiBaseUrl}/learning-paths/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      learningPath.value = data
    } catch (error) {
      return showError({
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
