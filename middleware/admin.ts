import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const store = useAuthStore()

  try {
    await store.getAuthenticatedUser()

    if (store?.user?.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })
    }
  } catch (error) {
    return abortNavigation(error)
  }
})
