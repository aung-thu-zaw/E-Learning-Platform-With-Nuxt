import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAuthStore()

  try {
    await store.getAuthenticatedUser()

    if (store?.isAuthenticated) {
      return navigateTo(to.fullPath !== from.fullPath ? from.fullPath : '/')
    }
  } catch (error: any) {
    return abortNavigation(error)
  }
})
