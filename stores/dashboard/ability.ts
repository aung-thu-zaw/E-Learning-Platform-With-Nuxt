import { defineStore } from 'pinia'

export const useAbilityStore = defineStore('ability', () => {
  const permissions = ref(null)
  const { $axiosApi } = useNuxtApp()

  const getUserAbilities = async () => {
    try {
      const { data } = await $axiosApi.get('/user/abilities')

      if (!data) throw new Error('Response Data Not Found!')

      permissions.value = data
    } catch (error) {
      // return showError({
      //   statusCode: error.response?.status,
      //   statusMessage: error.response?.statusText,
      //   message: error.response?.data?.message
      // })
    }
  }

  return { permissions, getUserAbilities }
})
