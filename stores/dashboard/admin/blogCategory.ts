import { defineStore } from 'pinia'
import type { BlogCategoryPaginate, BlogCategory, Form, Error } from '~/types/blogCategory'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

export const useBlogCategoryStore = defineStore('blog-category', () => {
  const blogCategories = ref<BlogCategoryPaginate | null>(null)
  const blogCategory = ref<BlogCategory | null>(null)
  const errors = ref<Error | null>(null)
  const loading = ref<boolean>(false)
  const { backendApiBaseUrl } = useRuntimeConfig().public
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()

  const getAllBlogCategory = async (params) => {
    try {
      loading.value = true

      const { generateQueryParams } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/blog-categories?${generateQueryParams(params)}`)

      if (!data) throw new Error('Response Data Not Found!')

      blogCategories.value = data

      loading.value = false
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getBlogCategory = async (slug: string) => {
    try {
      loading.value = true

      const data: BlogCategory = await $fetch(`${backendApiBaseUrl}/admin/blog-categories/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      blogCategory.value = data

      loading.value = true
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createBlogCategory = async (form: Form, createAnother: boolean) => {
    try {
      loading.value = true

      const response = await $axiosApi.post('/admin/blog-categories', { ...form })

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push('/admin/manage-blog/categories')
        $swal({ icon: 'success', title: 'Blog category created successfully!' })
      } else {
        $toast.success('Blog category created successfully!')
      }

      loading.value = false

      // this.$reset()
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateBlogCategory = async (form: Form, slug: string) => {
    try {
      loading.value = true

      const response = await $axiosApi.patch(`/admin/blog-categories/${slug}`, { ...form })

      if (!response) throw new Error('Response Not Found!')

      $router.push('/admin/manage-blog/categories')
      $swal({ icon: 'success', title: 'Blog category updated successfully!' })

      loading.value = false

      // this.$reset()
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const deleteBlogCategory = async (slug: string) => {
    try {
      const response = await $axiosApi.delete(`/admin/blog-categories/${slug}`)

      if (!response) throw new Error('Response Not Found!')

      const index = blogCategories.value?.data?.findIndex(
        (blogCategory) => blogCategory.slug === slug
      )

      if (index !== -1) {
        blogCategories.value?.data.splice(index, 1)

        if (index >= blogCategories.value?.current_page - 1 * blogCategories.value?.per_page) {
          await getAllBlogCategory({ page: blogCategories.value?.current_page })
        }
      }

      if (response.status === 204) {
        $swal({ icon: 'success', title: 'Blog category deleted successfully!' })
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
    blogCategories,
    blogCategory,
    errors,
    loading,
    getAllBlogCategory,
    getBlogCategory,
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory
  }
})
