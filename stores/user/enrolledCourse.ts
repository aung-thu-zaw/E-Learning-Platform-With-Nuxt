import { defineStore } from 'pinia'
import type { CoursePaginate } from '~/types/browsing'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import type { myCourseQuery } from '~/types/query'

export const useEnrolledCourse = defineStore('enrolled-course', () => {
  const courses = ref<CoursePaginate | null>(null)

  const { $axiosApi, $toast, $i18n } = useNuxtApp()

  const getAllEnrolledCourse = async (query: myCourseQuery): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/user/enrolled-courses?${generateQueryString(query)}`)

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

  const markAsComplete = async (uuid: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.post(`/user/enrolled-courses/${uuid}/mark-as-complete`)

      if (!data) throw new Error('Response Data Not Found!')

      await getAllEnrolledCourse({ page: 1 })

      $toast.success($i18n.t(data.message))
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const unMarkAsComplete = async (uuid: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.post(`/user/enrolled-courses/${uuid}/unmark-as-complete`)

      if (!data) throw new Error('Response Data Not Found!')

      await getAllEnrolledCourse({ page: 1 })

      $toast.success($i18n.t(data.message))
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const removeEnrolledCourse = async (uuid: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.delete(`/user/enrolled-courses/${uuid}/unenroll`)

      if (!data) throw new Error('Response Data Not Found!')

      await getAllEnrolledCourse({ page: 1 })

      $toast.success($i18n.t(data.message))
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    courses,
    getAllEnrolledCourse,
    markAsComplete,
    unMarkAsComplete,
    removeEnrolledCourse
  }
})
