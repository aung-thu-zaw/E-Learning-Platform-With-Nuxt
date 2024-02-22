import { defineStore } from 'pinia'
import { BlogPaginate, Blog, Category } from '~/types/blog'

export const useBlogStore = defineStore('blogs', () => {
  const blogs = ref<BlogPaginate | null>(null)
  const blog = ref<Blog | null>(null)
  const categories = ref<Category[] | null>(null)
  const errors = ref<string | null>(null)
  const { backendApiBaseUrl } = useRuntimeConfig().public

  const getBlogs = async () => {
    try {
      const data: BlogPaginate = await $fetch(`${backendApiBaseUrl}/contents`)

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

      blog.value = data
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  return { blogs, blog, categories, errors, getBlogs, getBlog, getResources }
})
