import { defineStore } from 'pinia'
import type { CategoryPaginate, Category, Form, Error } from '~/types/category'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { dashboardQuery } from '~/types/query'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<CategoryPaginate | null>(null)
  const category = ref<Category | null>(null)
  const errors = ref<Error | null>(null)

  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllCategory = async (query: dashboardQuery | { page: number }): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/categories?${generateQueryString(query)}`)
      console.log(data)

      if (!data) throw new Error('Response Data Not Found!')

      categories.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getCategory = async (slug: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/admin/categories/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      category.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createCategory = async (form: Form, createAnother: boolean): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('create_category')

      const response = await $axiosApi.post('/admin/categories', { ...form })

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push({ path: '/admin/catalogues/categories', query: { ...queryString.value } })

        $swal.fire({ icon: 'success', title: 'Category created successfully!' })
      } else {
        $toast.success('Category created successfully!')
      }
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateCategory = async (form: Form, slug: string): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('update_category')

      const response = await $axiosApi.patch(`/admin/categories/${slug}`, { ...form })

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/admin/catalogues/categories', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Category updated successfully!' })
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const changeStatus = async (status: boolean, slug: string): Promise<void> => {
    try {
      const response = await $axiosApi.put(`/admin/categories/${slug}/change-status`, {
        status
      })

      if (!response) throw new Error('Response Not Found!')

      if (categories.value) {
        const index = categories.value.data.findIndex((category) => category.slug === slug)

        categories.value.data[index] = { ...response.data }
      }

      $toast.success('Category status changed successfully!')
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const deleteCategory = async (slug: string): Promise<void> => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Category',
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
        const response = await $axiosApi.delete(`/admin/categories/${slug}`)

        if (!response) throw new Error('Response Not Found!')

        const index = categories.value?.data?.findIndex((category) => category.slug === slug)

        if (index !== undefined && index !== -1) {
          const spliceIndex = index ?? 0

          categories.value?.data.splice(spliceIndex, 1)

          if (
            categories.value?.meta?.current_page !== undefined &&
            categories.value?.meta?.per_page !== undefined &&
            index >= (categories.value?.meta?.current_page - 1) * categories.value?.meta?.per_page
          ) {
            await getAllCategory({ page: categories.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Category deleted successfully!' })
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
    categories,
    category,
    errors,
    getAllCategory,
    getCategory,
    createCategory,
    updateCategory,
    changeStatus,
    deleteCategory
  }
})
