import { defineStore } from 'pinia'
import type { BlogPaginate, Blog, Category } from '~/types/blog'
import type { BlogPageQuery } from '~/types/query'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

export const useBlogStore = defineStore('blog', () => {
  const blogs = ref<BlogPaginate | null>(null)
  const relatedBlogs = ref<Blog[] | null>(null)
  const blog = ref<Blog | null>(null)
  const categories = ref<Category[] | null>(null)

  const { backendApiBaseUrl } = useRuntimeConfig().public

  const getBlogs = async (query: BlogPageQuery): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const data: BlogPaginate = await $fetch(
        `${backendApiBaseUrl}/contents?${generateQueryString(query)}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      blogs.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getCategoryBlogs = async (categorySlug: string): Promise<void> => {
    try {
      const data: BlogPaginate = await $fetch(
        `${backendApiBaseUrl}/categories/${categorySlug}/contents`
      )

      if (!data) throw new Error('Response Data Not Found!')

      blogs.value = data
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
      const data: Category[] = await $fetch(`${backendApiBaseUrl}/content/resources`)

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

  const getBlog = async (slug: string): Promise<void> => {
    try {
      const data: { content: Blog; relatedContents: any } = await $fetch(
        `${backendApiBaseUrl}/contents/${slug}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      blog.value = data.content
      relatedBlogs.value = data.relatedContents
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    blogs,
    relatedBlogs,
    blog,
    categories,
    getBlogs,
    getCategoryBlogs,
    getBlog,
    getResources
  }
})
