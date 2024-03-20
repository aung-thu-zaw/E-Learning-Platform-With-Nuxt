import { defineStore } from 'pinia'
import type { Category, Subcategory, CoursePaginate, Tag } from '~/types/browsing'
import type { BrowseCourseQuery } from '~/types/query'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

export const useBrowsingStore = defineStore('browsing', () => {
  const categories = ref<Category[] | null>(null)
  const subcategories = ref<Subcategory[] | null>(null)
  const courses = ref<CoursePaginate | null>(null)
  const tags = ref<Tag[] | null>(null)

  const { backendApiBaseUrl } = useRuntimeConfig().public

  const getBrowsingResources = async (): Promise<void> => {
    try {
      const data: { categories: Category[]; subcategories: Subcategory[]; tags: Tag[] } =
        await $fetch(`${backendApiBaseUrl}/resources-for-browsing-course`)

      if (!data) throw new Error('Response Data Not Found!')

      categories.value = data?.categories
      subcategories.value = data?.subcategories
      tags.value = data?.tags
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getCourses = async (subCategoryId: number, query: BrowseCourseQuery): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const data: CoursePaginate = await $fetch(
        `${backendApiBaseUrl}/browse/${subCategoryId}/courses?${generateQueryString(query)}`
      )

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

  return {
    categories,
    subcategories,
    tags,
    courses,
    getBrowsingResources,
    getCourses
  }
})
