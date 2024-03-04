import { defineStore } from 'pinia'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import type { dashboardQuery } from '~/types/query'

interface Permission {
  id: number
  name: string
  group: string
}

export const usePermissionStore = defineStore('permission', () => {
  const permissions = ref<Permission | null>(null)

  const { $axiosApi } = useNuxtApp()

  const getAllPermission = async (query: dashboardQuery): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/permissions?${generateQueryString(query)}`)

      if (!data) throw new Error('Response Data Not Found!')

      permissions.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    permissions,
    getAllPermission
  }
})
