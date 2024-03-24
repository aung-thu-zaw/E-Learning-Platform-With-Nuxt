import { defineStore } from 'pinia'
import type { LearningPathPaginate } from '~/types/learningPath'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import type { myCourseQuery } from '~/types/query'

export const useSavedLearningPathStore = defineStore('saved-learning-path', () => {
  const learningPaths = ref<LearningPathPaginate | null>(null)

  const { $axiosApi, $toast, $i18n } = useNuxtApp()

  const getAllSavedLearningPath = async (query: myCourseQuery): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(
        `/user/learning-paths/saved?${generateQueryString(query)}`
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

  const savedLearningPathToList = async (slug: string) => {
    try {
      const { data } = await $axiosApi.post(`/learning-paths/${slug}/save`)

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

  return {
    learningPaths,
    getAllSavedLearningPath,
    savedLearningPathToList,
    removeLearningPathFromList
  }
})
