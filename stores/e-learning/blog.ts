import { defineStore } from 'pinia'
import { BlogPaginate, Blog, Category } from '~/types/blog'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

export const useBlogStore = defineStore('blogs', () => {
  const blogs = ref<BlogPaginate | null>(null)
  const relatedBlogs = ref<Blog[] | null>(null)
  const blog = ref<Blog | null>(null)
  const categories = ref<Category[] | null>(null)
  const errors = ref<string | null>(null)
  const { backendApiBaseUrl } = useRuntimeConfig().public

  const getBlogs = async (params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const data: BlogPaginate = await $fetch(
        `${backendApiBaseUrl}/contents?${generateQueryParams(params)}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      blogs.value = data
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const getCategoryBlogs = async (categorySlug: string) => {
    try {
      const data: BlogPaginate = await $fetch(
        `${backendApiBaseUrl}/categories/${categorySlug}/contents`
      )

      if (!data) throw new Error('Response Data Not Found!')

      blogs.value = data
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const getResources = async () => {
    try {
      const data: BlogPaginate = await $fetch(`${backendApiBaseUrl}/content/resources`)

      if (!data) throw new Error('Response Data Not Found!')

      categories.value = data
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const getBlog = async (slug: string) => {
    try {
      const data: Blog = await $fetch(`${backendApiBaseUrl}/contents/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      blog.value = data.content
      relatedBlogs.value = data.relatedContents
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  return {
    blogs,
    relatedBlogs,
    blog,
    categories,
    errors,
    getBlogs,
    getCategoryBlogs,
    getBlog,
    getResources
  }
})
