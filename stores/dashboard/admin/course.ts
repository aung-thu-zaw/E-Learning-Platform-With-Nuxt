import { defineStore } from 'pinia'
import type { CoursePaginate, Course, Form, Error } from '~/types/course'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { dashboardQuery } from '~/types/query'

export const useCourseStore = defineStore('course', () => {
  const courses = ref<CoursePaginate | null>(null)
  const course = ref<Course | null>(null)
  const errors = ref<Error | null>(null)
  const categories = ref<Category[] | null>(null)
  const subcategories = ref<Subcategory[] | null>(null)
  const instructors = ref<Subcategory[] | null>(null)
  const skillTags = ref<SkillTag[] | null>(null)

  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllCourse = async (query: dashboardQuery | { page: number }): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/courses?${generateQueryString(query)}`)

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

  const getCourse = async (slug: string) => {
    try {
      const { data } = await $axiosApi.get(`/admin/courses/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      course.value = data
    } catch (error: any) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getResources = async () => {
    try {
      const { data } = await $axiosApi.get(`/admin/course-resources`)

      if (!data) throw new Error('Response Data Not Found!')

      categories.value = data.categories
      subcategories.value = data.subcategories
      skillTags.value = data.tags
      instructors.value = data.instructors
    } catch (error: any) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createCourse = async (form: Form, createAnother: boolean) => {
    try {
      form.captcha_token = await generateCaptchaToken('create_course')

      const response = await $axiosApi.post(
        '/admin/courses',
        { ...form },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push({ path: '/admin/courses', query: { ...queryString.value } })

        $swal.fire({ icon: 'success', title: 'Course created successfully!' })
      } else {
        $toast.success('Course created successfully!')
      }
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateCourse = async (form: Form, slug: string) => {
    try {
      form.captcha_token = await generateCaptchaToken('update_course')
      form._method = 'PATCH'

      const response = await $axiosApi.post(
        `/admin/courses/${slug}`,
        { ...form },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/admin/courses', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Course updated successfully!' })
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const changeStatus = async (status: string, slug: string) => {
    try {
      const response = await $axiosApi.put(`/admin/courses/${slug}/change-status`, {
        status
      })

      if (!response) throw new Error('Response Not Found!')

      const index = courses.value.data.findIndex((course) => course.slug === slug)

      courses.value.data[index] = { ...response.data }

      $toast.success('Course status changed successfully!')
    } catch (error: any) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const deleteCourse = async (slug: string) => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Course',
        text: 'Are you sure you would like to do this?',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d52222',
        cancelButtonColor: '#626262',
        timer: 20000,
        timerProgressBar: true,
        reverseButtons: true
      })

      if (result.isConfirmed) {
        const response = await $axiosApi.delete(`/admin/courses/${slug}`)

        if (!response) throw new Error('Response Not Found!')

        const index = courses.value?.data?.findIndex((course) => course.slug === slug)

        if (index !== -1) {
          courses.value?.data.splice(index, 1)

          if (index >= courses.value?.meta?.current_page - 1 * courses.value?.meta?.per_page) {
            await getAllCourse({ page: courses.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Course deleted successfully!' })
        }
      }
    } catch (error: any) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    courses,
    course,
    errors,
    categories,
    subcategories,
    instructors,
    skillTags,
    getAllCourse,
    getCourse,
    getResources,
    createCourse,
    updateCourse,
    changeStatus,
    deleteCourse
  }
})
