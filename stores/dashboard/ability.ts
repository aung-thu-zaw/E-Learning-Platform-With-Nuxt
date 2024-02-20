import { defineStore } from 'pinia'

export const useAbilityStore = defineStore('abilities', () => {
  const permissions = ref(null)
  const errors = ref(null)
  const { $axiosApi } = useNuxtApp()

  const getUserAbilities = async () => {
    try {
      const { data } = await $axiosApi.get('/user/abilities')

      if (!data) throw new Error('Response Data Not Found!')

      permissions.value = data
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  return { permissions, errors, getUserAbilities }
})
