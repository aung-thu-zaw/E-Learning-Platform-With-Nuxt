import { defineStore } from 'pinia'
import type {
  SkillTagPaginate,
  SkillTag,
  Category,
  Subcategory,
  Form,
  Error
} from '~/types/skillTag'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { dashboardQuery } from '~/types/query'

export const useSkillTagStore = defineStore('skill-tag', () => {
  const tags = ref<SkillTagPaginate | null>(null)
  const tag = ref<SkillTag | null>(null)
  const categories = ref<Category[] | null>(null)
  const subcategories = ref<Subcategory[] | null>(null)
  const errors = ref<Error | null>(null)

  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllTag = async (query: dashboardQuery | { page: number }): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/tags?${generateQueryString(query)}`)

      if (!data) throw new Error('Response Data Not Found!')

      tags.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getTag = async (slug: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/admin/tags/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      tag.value = data
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
      const { data } = await $axiosApi.get(`/admin/tag-resources`)

      if (!data) throw new Error('Response Data Not Found!')

      categories.value = data?.categories
      subcategories.value = data?.subcategories
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createTag = async (form: Form, createAnother: boolean): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('create_tag')

      const response = await $axiosApi.post('/admin/tags', { ...form })

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push({ path: '/admin/skill-tags', query: { ...queryString.value } })

        $swal.fire({ icon: 'success', title: 'Skill tag created successfully!' })
      } else {
        $toast.success('Skill tag created successfully!')
      }
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateTag = async (form: Form, slug: string): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('update_tag')

      const response = await $axiosApi.patch(`/admin/tags/${slug}`, { ...form })

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/admin/skill-tags', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Skill tag updated successfully!' })
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const deleteTag = async (slug: string): Promise<void> => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Skill Tag',
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
        const response = await $axiosApi.delete(`/admin/tags/${slug}`)

        if (!response) throw new Error('Response Not Found!')

        const index = tags.value?.data?.findIndex((tag) => tag.slug === slug)

        if (index !== undefined && index !== -1) {
          const spliceIndex = index ?? 0

          tags.value?.data.splice(spliceIndex, 1)

          if (
            tags.value?.meta?.current_page !== undefined &&
            tags.value?.meta?.per_page !== undefined &&
            index >= (tags.value?.meta?.current_page - 1) * tags.value?.meta?.per_page
          ) {
            await getAllTag({ page: tags.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Skill tag deleted successfully!' })
        }
      }
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    tags,
    tag,
    categories,
    subcategories,
    errors,
    getAllTag,
    getTag,
    getResources,
    createTag,
    updateTag,
    deleteTag
  }
})
