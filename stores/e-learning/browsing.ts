import { defineStore } from 'pinia'
import type { Category, Subcategory, CoursePaginate } from '~/types/browsing'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

export const useBrowsingStore = defineStore('browsing', () => {
  const categories = ref<Category[] | null>(null)
  const subcategories = ref<Subcategory[] | null>(null)
  const courses = ref<CoursePaginate | null>(null)
  const tags = ref<Tag[] | null>(null)

  const { backendApiBaseUrl } = useRuntimeConfig().public

  const getBrowsingResources = async () => {
    try {
      const data = await $fetch(`${backendApiBaseUrl}/resources-for-browsing-course`)

      if (!data) throw new Error('Response Data Not Found!')

      categories.value = data?.categories
      subcategories.value = data?.subcategories
      tags.value = data?.tags
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getCourses = async (subCategoryId: number, params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const data: CoursePaginate = await $fetch(
        `${backendApiBaseUrl}/browse/${subCategoryId}/courses?${generateQueryParams(params)}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      courses.value = data
    } catch (error) {
      return showError({
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
