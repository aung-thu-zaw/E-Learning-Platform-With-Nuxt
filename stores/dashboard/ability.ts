import { defineStore } from 'pinia'

export const useAbilityStore = defineStore('ability', () => {
  const permissions = ref<string[] | null>(null)
  const { $axiosApi } = useNuxtApp()

  const getUserAbilities = async (): Promise<void> => {
    try {
      const { data } = await $axiosApi.get('/user/abilities')

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

  return { permissions, getUserAbilities }
})
