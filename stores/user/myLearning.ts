import { defineStore } from 'pinia'
import type { LearningPathPaginate } from '~/types/learningPath'
import type { CoursePaginate } from '~/types/browsing'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import type { myCourseQuery } from '~/types/query'

export const useMyLearningStore = defineStore('my-learning', () => {
  const courses = ref<CoursePaginate | null>(null)
  const learningPaths = ref<LearningPathPaginate | null>(null)

  const { $axiosApi } = useNuxtApp()

  const getAllSavedCourse = async (query: myCourseQuery): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/user/courses/saved?${generateQueryString(query)}`)

      if (!data) throw new Error('Response Data Not Found!')

      courses.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

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

  return {
    learningPaths,
    courses,
    getAllSavedCourse,
    getAllSavedLearningPath
  }
})
