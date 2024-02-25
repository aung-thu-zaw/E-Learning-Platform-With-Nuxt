import { defineStore } from 'pinia'
import { useQueryGenerator } from '~/composables/useQueryGenerator'

export const usePermissionStore = defineStore('permission', () => {
  const permissions = ref<CouponPaginate | null>(null)
  const { $axiosApi } = useNuxtApp()

  const getAllPermission = async (params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/permissions?${generateQueryParams(params)}`)

      if (!data) throw new Error('Response Data Not Found!')

      permissions.value = data
    } catch (error) {
      return showError({
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
