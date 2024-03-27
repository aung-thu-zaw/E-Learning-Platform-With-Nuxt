import { defineStore } from 'pinia'
import type { NavigationFailure } from 'vue-router'
import type { Course } from '~/types/browsing'

export const useCourseStore = defineStore('course-lesson', () => {
  const course = ref<Course | null>(null)

  const { $axiosApi, $toast } = useNuxtApp()

  const getCourse = async (slug: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/courses/${slug}`)

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

  const enrollCourse = async (slug: string): Promise<void | NavigationFailure> => {
    try {
      const { data } = await $axiosApi.post(`/courses/${slug}/enroll`)

      if (!data) throw new Error('Response Data Not Found!')

      await getCourse(slug)

      $toast.success(data.message)
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
    course,
    getCourse,
    enrollCourse
  }
})
