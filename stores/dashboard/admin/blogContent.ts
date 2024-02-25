import { defineStore } from 'pinia'
import type { BlogContentPaginate, BlogContent, Form, Error } from '~/types/blogContent'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'

export const useBlogContentStore = defineStore('blog-content', () => {
  const blogContents = ref<BlogContentPaginate | null>(null)
  const blogContent = ref<BlogContent | null>(null)
  const blogCategories = ref<BlogCategory[] | null>(null)
  const errors = ref<Error | null>(null)
  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllBlogContent = async (params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/blog-contents?${generateQueryParams(params)}`)

      if (!data) throw new Error('Response Data Not Found!')

      blogContents.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getBlogContent = async (slug: string) => {
    try {
      const { data } = await $axiosApi.get(`/admin/blog-contents/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      blogContent.value = data
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
      const { data } = await $axiosApi.get(`/admin/blog-content-resources`)

      if (!data) throw new Error('Response Data Not Found!')

      blogCategories.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const createBlogContent = async (form: Form, createAnother: boolean) => {
    try {
      form.captcha_token = await generateCaptchaToken('create_blog_content')

      const response = await $axiosApi.post(
        '/admin/blog-contents',
        { ...form },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push({ path: '/admin/manage-blog/contents', query: { ...queryString.value } })

        $swal.fire({ icon: 'success', title: 'Blog content created successfully!' })
      } else {
        $toast.success('Blog content created successfully!')
      }
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateBlogContent = async (form: Form, slug: string) => {
    try {
      form.captcha_token = await generateCaptchaToken('update_blog_content')
      form._method = 'PATCH'

      const response = await $axiosApi.post(
        `/admin/blog-contents/${slug}`,
        { ...form },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/admin/manage-blog/contents', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Blog content updated successfully!' })
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const changeStatus = async (status: string, slug: string) => {
    try {
      const response = await $axiosApi.put(`/admin/blog-contents/${slug}/change-status`, {
        status
      })

      if (!response) throw new Error('Response Not Found!')

      const index = blogContents.value.data.findIndex((category) => category.slug === slug)

      blogContents.value.data[index] = { ...response.data }

      $toast.success('Content status changed successfully!')
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const deleteBlogContent = async (slug: string) => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Blog Content',
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
        const response = await $axiosApi.delete(`/admin/blog-contents/${slug}`)

        if (!response) throw new Error('Response Not Found!')

        const index = blogContents.value?.data?.findIndex(
          (blogContent) => blogContent.slug === slug
        )

        if (index !== -1) {
          blogContents.value?.data.splice(index, 1)

          if (
            index >=
            blogContents.value?.meta?.current_page - 1 * blogContents.value?.meta?.per_page
          ) {
            await getAllBlogContent({ page: blogContents.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Blog content deleted successfully!' })
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
    blogContents,
    blogContent,
    blogCategories,
    errors,
    getAllBlogContent,
    getBlogContent,
    getResources,
    createBlogContent,
    updateBlogContent,
    changeStatus,
    deleteBlogContent
  }
})
