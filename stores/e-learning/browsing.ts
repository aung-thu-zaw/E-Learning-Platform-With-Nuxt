import { defineStore } from 'pinia'
import type { Category, Subcategory } from '~/types/browsing'

export const useBrowsingStore = defineStore('browsing', () => {
  const categories = ref<Category[] | null>(null)
  const subcategories = ref<Subcategory[] | null>(null)
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

  return {
    categories,
    subcategories,
    getBrowsingResources
  }
})
