import { defineStore } from 'pinia'
import { useQueryGenerator } from '~/composables/useQueryGenerator'
import { useToken } from '~/composables/useToken'
import { useURLQueryString } from '~/composables/useURLQueryString'
import type { dashboardQuery } from '~/types/query'

interface Role {
  id: number
  name: string
  slug: string
}

interface RolePaginate {
  data: Role[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

interface Error {
  name: string
  captcha_token: string
}

export const useRoleStore = defineStore('role', () => {
  const roles = ref<RolePaginate | null>(null)
  const role = ref<Role | null>(null)
  const errors = ref<Error | null>(null)

  const { generateCaptchaToken } = useToken()
  const { $axiosApi, $swal, $router, $toast } = useNuxtApp()
  const { dashboardDefaultQueryString: queryString } = useURLQueryString()

  const getAllRole = async (query: dashboardQuery | { page: number }): Promise<void> => {
    try {
      const { generateQueryString } = useQueryGenerator()

      const { data } = await $axiosApi.get(`/admin/roles?${generateQueryString(query)}`)

      if (!data) throw new Error('Response Data Not Found!')

      roles.value = data
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
      const { data } = await $axiosApi.get(`/admin/roles/${slug}`)

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

  const createRole = async (roleName: string, createAnother: boolean): Promise<void> => {
    try {
      const token = await generateCaptchaToken('create_role')

      const response = await $axiosApi.post('/admin/roles', {
        name: roleName,
        captcha_token: token
      })

      if (!response) throw new Error('Response Not Found!')

      if (!createAnother) {
        $router.push({ path: '/admin/manage-authority/roles', query: { ...queryString.value } })

        $swal.fire({ icon: 'success', title: 'Role created successfully!' })
      } else {
        $toast.success('Role created successfully!')
      }
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const updateRole = async (roleName: string, slug: string): Promise<void> => {
    try {
      const token = await generateCaptchaToken('update_role')

      const response = await $axiosApi.patch(`/admin/roles/${slug}`, {
        name: roleName,
        captcha_token: token
      })

      if (!response) throw new Error('Response Not Found!')

      $router.push({ path: '/admin/manage-authority/roles', query: { ...queryString.value } })

      $swal.fire({ icon: 'success', title: 'Role updated successfully!' })
    } catch (error: any) {
      errors.value = error.response?.data?.errors
    }
  }

  const deleteRole = async (slug: string): Promise<void> => {
    try {
      const result = await $swal.fire({
        icon: 'question',
        title: 'Delete Role',
        text: 'Are you sure you would like to do this?',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d52222',
        cancelButtonColor: '#626262',
        timer: 20000,
        timerProgressBar: true,
        reverseButtons: true
      })

      if (result.isConfirmed) {
        const response = await $axiosApi.delete(`/admin/roles/${slug}`)

        if (!response) throw new Error('Response Not Found!')

        const index = roles.value?.data?.findIndex((role) => role.slug === slug)

        if (index !== undefined && index !== -1) {
          const spliceIndex = index ?? 0

          roles.value?.data.splice(spliceIndex, 1)

          if (
            roles.value?.meta?.current_page !== undefined &&
            roles.value?.meta?.per_page !== undefined &&
            index >= (roles.value?.meta?.current_page - 1) * roles.value?.meta?.per_page
          ) {
            await getAllRole({ page: roles.value?.meta?.current_page })
          }
        }

        if (response.status === 204) {
          $swal.fire({ icon: 'success', title: 'Role deleted successfully!' })
        }
      }
    } catch (error: any) {
      showError({
        statusCode: error.response?.status,
        statusMessage: error.response?.statusText,
        message: error.response?.data?.message
      })
    }
  }

  return {
    roles,
    role,
    errors,
    getAllRole,
    getRole,
    createRole,
    updateRole,
    deleteRole
  }
})
