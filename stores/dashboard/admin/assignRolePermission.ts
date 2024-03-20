import { defineStore } from 'pinia'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { dashboardQuery } from '~/types/query'

export const useAssignRolePermissionStore = defineStore('blog-category', () => {
  const rolesWithPermissions = ref<any>(null)
  const role = ref<any>(null)
  const permissions = ref<any>(null)
  const permissionGroups = ref<any>(null)
  const errors = ref<Error | null>(null)

  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllRoleWithPermissions = async (query: dashboardQuery): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(
        `/admin/assign-role-permissions?${generateQueryString(query)}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      rolesWithPermissions.value = data
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getRole = async (slug: string): Promise<void> => {
    try {
      const { data } = await $axiosApi.get(`/admin/assign-role-permissions/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      role.value = data
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
      const { data } = await $axiosApi.get(`/admin/assign-role-permissions-resources`)

      if (!data) throw new Error('Response Data Not Found!')

      permissionGroups.value = data.permissionGroups
      permissions.value = data.permissions
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const updateAssignRolePermission = async (
    form: { role_id: number; permission_id: number; captcha_token?: string | null },
    slug: string
  ): Promise<void> => {
    try {
      form.captcha_token = await generateCaptchaToken('update_role')

      const { data } = await $axiosApi.patch(`/admin/assign-role-permissions/${slug}`, { ...form })

      if (!data) throw new Error('Response Data Not Found!')

      $router.push({
        path: '/admin/manage-authority/assign-role-permissions',
        query: { ...queryString.value }
      })

      $swal.fire({ icon: 'success', title: 'Role updated successfully!' })
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    rolesWithPermissions,
    role,
    permissions,
    permissionGroups,
    errors,
    getAllRoleWithPermissions,
    getResources,
    getRole,
    updateAssignRolePermission
  }
})
