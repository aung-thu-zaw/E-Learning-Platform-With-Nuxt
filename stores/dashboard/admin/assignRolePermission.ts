import { defineStore } from 'pinia'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'

export const useAssignRolePermissionStore = defineStore('blog-category', () => {
  const rolesWithPermissions = ref<any>(null)
  const role = ref<any>(null)
  const permissions = ref<any>(null)
  const permissionGroups = ref<any>(null)
  const errors = ref<Error | null>(null)
  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllRoleWithPermissions = async (params) => {
    try {
      const { generateQueryParams } = useQueryGenerator()

      const { data } = await $axiosApi.get(
        `/admin/assign-role-permissions?${generateQueryParams(params)}`
      )

      if (!data) throw new Error('Response Data Not Found!')

      rolesWithPermissions.value = data
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const getRole = async (slug: string) => {
    try {
      const { data } = await $axiosApi.get(`/admin/assign-role-permissions/${slug}`)

      if (!data) throw new Error('Response Data Not Found!')

      role.value = data
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
      const { data } = await $axiosApi.get(`/admin/assign-role-permissions-resources`)

      if (!data) throw new Error('Response Data Not Found!')

      permissionGroups.value = data.permissionGroups
      permissions.value = data.permissions
    } catch (error) {
      return showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  const updateAssignRolePermission = async (form, slug: string) => {
    try {
      form.captcha_token = await generateCaptchaToken('update_role')

      const { data } = await $axiosApi.patch(`/admin/assign-role-permissions/${slug}`, { ...form })

      if (!data) throw new Error('Response Data Not Found!')

      $router.push({
        path: '/admin/manage-authority/assign-role-permissions',
        query: { ...queryString.value }
      })

      $swal.fire({ icon: 'success', title: 'Role updated successfully!' })
    } catch (error) {
      return showError({
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
