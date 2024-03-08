import { defineStore } from 'pinia'
import type { LearningPathPaginate } from '~/types/learningPath'
import type { CoursePaginate } from '~/types/browsing'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import type { SearchQuery } from '~/types/query'

export const useSearchStore = defineStore('search', () => {
  const courses = ref<CoursePaginate | null>(null)
  const learningPaths = ref<LearningPathPaginate | null>(null)

  const { backendApiBaseUrl } = useRuntimeConfig().public

  const getSearchResult = async (query: SearchQuery): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const data: any = await $fetch(`${backendApiBaseUrl}/search?${generateQueryString(query)}`)

      if (!data) throw new Error('Response Data Not Found!')

      courses.value = data?.courses as CoursePaginate
      learningPaths.value = data?.learningPaths as LearningPathPaginate
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
    courses,
    getSearchResult
  }
})
