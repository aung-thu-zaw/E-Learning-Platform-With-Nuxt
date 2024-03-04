import { defineStore } from 'pinia'
import type { BlogCategoryPaginate, BlogCategory, Form, Error } from '~/types/blogCategory'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { dashboardQuery } from '~/types/query'

export const useBlogCategoryStore = defineStore('blog-category', () => {
  const blogCategories = ref<BlogCategoryPaginate | null>(null)
  const blogCategory = ref<BlogCategory | null>(null)
  const errors = ref<Error | null>(null)

  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllBlogCategory = async (query: dashboardQuery | { page: number }): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/blog-categories?${generateQueryString(query)}`)

      if (!data) throw new Error('Response Data Not Found!')

      blogCategories.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getBlogCategory = async (slug: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/admin/blog-categories/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      blogCategory.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createBlogCategory = async (form: Form, createAnother: boolean): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('create_blog_category')

      const response = await $axiosApi.post('/admin/blog-categories', { ...form })

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push({ path: '/admin/manage-blog/categories', query: { ...queryString.value } })

        $swal.fire({ icon: 'success', title: 'Blog category created successfully!' })
      } else {
        $toast.success('Blog category created successfully!')
      }
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateBlogCategory = async (form: Form, slug: string): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('update_blog_category')

      const response = await $axiosApi.patch(`/admin/blog-categories/${slug}`, { ...form })

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/admin/manage-blog/categories', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Blog category updated successfully!' })
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const changeStatus = async (status: boolean, slug: string): Promise<void> => {
    try {
      const response = await $axiosApi.put(`/admin/blog-categories/${slug}/change-status`, {
        status
      })

      if (!response) throw new Error('Response Not Found!')

      if (blogCategories.value) {
        const index = blogCategories.value.data.findIndex((category) => category.slug === slug)

        blogCategories.value.data[index] = { ...response.data }
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

  const deleteBlogCategory = async (slug: string): Promise<void> => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Blog Category',
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
        const response = await $axiosApi.delete(`/admin/blog-categories/${slug}`)

        if (!response) throw new Error('Response Not Found!')

        const index = blogCategories.value?.data?.findIndex(
          (blogCategory) => blogCategory.slug === slug
        )

        if (index !== undefined && index !== -1) {
          const spliceIndex = index ?? 0

          blogCategories.value?.data.splice(spliceIndex, 1)

          if (
            blogCategories.value?.meta?.current_page !== undefined &&
            blogCategories.value?.meta?.per_page !== undefined &&
            index >=
              (blogCategories.value?.meta?.current_page - 1) * blogCategories.value?.meta?.per_page
          ) {
            await getAllBlogCategory({ page: blogCategories.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Blog category deleted successfully!' })
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
    blogCategories,
    blogCategory,
    errors,
    getAllBlogCategory,
    getBlogCategory,
    createBlogCategory,
    updateBlogCategory,
    changeStatus,
    deleteBlogCategory
  }
})
