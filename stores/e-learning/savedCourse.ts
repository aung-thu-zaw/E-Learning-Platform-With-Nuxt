import { defineStore } from 'pinia'
import type { CoursePaginate } from '~/types/browsing'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import type { myCourseQuery } from '~/types/query'

export const useSavedCourseStore = defineStore('saved-course', () => {
  const courses = ref<CoursePaginate | null>(null)

  const { $axiosApi, $toast, $i18n } = useNuxtApp()

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

  const savedCourseToList = async (courseUUID: string) => {
    try {
      const { data } = await $axiosApi.post(`/courses/${courseUUID}/save`)

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

  const removeCourseFromList = async (courseUUID: string) => {
    try {
      const { data } = await $axiosApi.delete(`/courses/${courseUUID}/remove`)

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
    courses,
    getAllSavedCourse,
    savedCourseToList,
    removeCourseFromList
  }
})
