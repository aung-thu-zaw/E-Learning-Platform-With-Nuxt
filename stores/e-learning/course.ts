import { defineStore } from 'pinia'
import type { Course } from '~/types/browsing'

export const useCourseStore = defineStore('course-lesson', () => {
  const course = ref<Course | null>(null)

  const { $axiosApi } = useNuxtApp()

  const getCourse = async (uuid: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/course/${uuid}`)

      if (!data) throw new Error('Response Data Not Found!')

      course.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    course,
    getCourse
  }
})
