import { defineStore } from 'pinia'
import type { SubcategoryPaginate, Subcategory, Category, Form, Error } from '~/types/subcategory'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'

export const useSubcategoryStore = defineStore('subcategory', () => {
  const subcategories = ref<SubcategoryPaginate | null>(null)
  const subcategory = ref<Subcategory | null>(null)
  const categories = ref<Category[] | null>(null)
  const errors = ref<Error | null>(null)
  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllSubcategory = async (params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/subcategories?${generateQueryParams(params)}`)

      if (!data) throw new Error('Response Data Not Found!')

      subcategories.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getSubcategory = async (slug: string) => {
    try {
      const { data } = await $axiosApi.get(`/admin/subcategories/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      subcategory.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getResources = async () => {
    try {
      const { data } = await $axiosApi.get(`/admin/subcategory-resources`)

      if (!data) throw new Error('Response Data Not Found!')

      categories.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createSubcategory = async (form: Form, createAnother: boolean) => {
    try {
      form.captcha_token = await generateCaptchaToken('create_subcategory')

      const response = await $axiosApi.post(
        '/admin/subcategories',
        { ...form },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push({ path: '/admin/catalogues/subcategories', query: { ...queryString.value } })

        $swal.fire({ icon: 'success', title: 'Subcategory created successfully!' })
      } else {
        $toast.success('Subcategory created successfully!')
      }
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateSubcategory = async (form: Form, slug: string) => {
    try {
      form.captcha_token = await generateCaptchaToken('update_subcategory')
      form._method = 'PATCH'

      const response = await $axiosApi.post(
        `/admin/subcategories/${slug}`,
        { ...form },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/admin/catalogues/subcategories', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Subcategory updated successfully!' })
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const changeStatus = async (status: boolean, slug: string) => {
    try {
      const response = await $axiosApi.put(`/admin/subcategories/${slug}/change-status`, {
        status
      })

      if (!response) throw new Error('Response Not Found!')

      const index = subcategories.value.data.findIndex((subcategory) => subcategory.slug === slug)

      subcategories.value.data[index] = { ...response.data }

      $toast.success('Subcategory status changed successfully!')
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const deleteSubcategory = async (slug: string) => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Subcategory',
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
        const response = await $axiosApi.delete(`/admin/subcategories/${slug}`)

        if (!response) throw new Error('Response Not Found!')

        const index = subcategories.value?.data?.findIndex(
          (subcategory) => subcategory.slug === slug
        )

        if (index !== -1) {
          subcategories.value?.data.splice(index, 1)

          if (
            index >=
            subcategories.value?.meta?.current_page - 1 * subcategories.value?.meta?.per_page
          ) {
            await getAllSubcategory({ page: subcategories.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Subcategory deleted successfully!' })
        }
      }
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    subcategories,
    subcategory,
    categories,
    errors,
    getAllSubcategory,
    getSubcategory,
    getResources,
    createSubcategory,
    updateSubcategory,
    changeStatus,
    deleteSubcategory
  }
})
