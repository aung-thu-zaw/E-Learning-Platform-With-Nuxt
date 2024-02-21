import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (permission: string) => {
  const store = useAuthStore()

  try {
    await store.getAuthenticatedUser()

    if (!store?.user?.permissions.includes(permission)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden'
      })
    }
  } catch (error) {
    return abortNavigation(error)
  }
})
