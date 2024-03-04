import { defineStore } from 'pinia'
import type {
  CoursePaginate,
  Course,
  Form,
  Error,
  Category,
  Subcategory,
  SkillTag
} from '~/types/course'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { dashboardQuery } from '~/types/query'

export const useCourseStore = defineStore('instructor-course', () => {
  const courses = ref<CoursePaginate | null>(null)
  const course = ref<Course | null>(null)
  const errors = ref<Error | null>(null)
  const categories = ref<Category[] | null>(null)
  const subcategories = ref<Subcategory[] | null>(null)
  const skillTags = ref<SkillTag[] | null>(null)

  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllCourse = async (query: dashboardQuery): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/instructor/courses?${generateQueryString(query)}`)

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

  const getCourse = async (slug: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/instructor/courses/${slug}`)

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

  const getResources = async (): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/instructor/course-resources`)

      if (!data) throw new Error('Response Data Not Found!')

      categories.value = data.categories
      subcategories.value = data.subcategories
      skillTags.value = data.tags
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createCourse = async (form: Form): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('create_course')

      const response = await $axiosApi.post(
        '/instructor/courses',
        { ...form },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/instructor/courses', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Course created successfully!' })
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateCourse = async (form: Form, slug: string): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('update_course')

      const response = await $axiosApi.post(
        `/instructor/courses/${slug}`,
        { ...form, _method: 'PATCH' },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/instructor/courses', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Course updated successfully!' })
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }
  return {
    courses,
    course,
    errors,
    categories,
    subcategories,
    skillTags,
    getAllCourse,
    getCourse,
    getResources,
    createCourse,
    updateCourse
  }
})
