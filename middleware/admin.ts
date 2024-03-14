import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const store = useAuthStore()

  try {
    await store.getAuthenticatedUser()

    setTimeout(() => {
      if (store.user && store.user.role !== 'admin') {
        showError({
          statusCode: 403,
          statusMessage: 'Forbidden'
        })
      }
    }, 200)
  } catch (error: any) {
    return abortNavigation(error)
  }
})
