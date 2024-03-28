import { defineStore } from 'pinia'
import type { NavigationFailure } from 'vue-router'
import type { Course, Lesson } from '~/types/browsing'

export const useCourseStore = defineStore('course-lesson', () => {
  const course = ref<Course | null>(null)
  const lesson = ref<Lesson | null>(null)
  const introVideo = ref<string | null>(null)
  const lessonVideo = ref<string | null>(null)

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

  const getCourseIntroVideo = async (
    introVideoFileName: string
  ): Promise<void | NavigationFailure> => {
    try {
      const { data } = await $axiosApi.get(`course/intro-video/${introVideoFileName}`, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([data], { type: 'video/mp4' }))

      introVideo.value = url
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

  const getLessonVideo = async (
    courseUUID: string,
    sectionSlug: string,
    lessonUUId: string
  ): Promise<void | NavigationFailure> => {
    try {
      const { data } = await $axiosApi.get(
        `courses/${courseUUID}/sections/${sectionSlug}/lessons/${lessonUUId}`,
        {
          responseType: 'blob'
        }
      )

      const url = window.URL.createObjectURL(new Blob([data], { type: 'video/mp4' }))

      lessonVideo.value = url
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

  const getLessonMetaData = async (lessonUUID: string): Promise<void | NavigationFailure> => {
    try {
      const { data } = await $axiosApi.get(`/lessons/${lessonUUID}/metadata`)

      if (!data) throw new Error('Response Data Not Found!')

      lesson.value = data
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
    lesson,
    introVideo,
    lessonVideo,
    getCourse,
    enrollCourse,
    getCourseIntroVideo,
    getLessonVideo,
    getLessonMetaData
  }
})
