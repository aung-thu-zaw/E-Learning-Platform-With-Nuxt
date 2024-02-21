import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const store = useAuthStore()

  try {
    await store.getAuthenticatedUser()

    if (!store?.isAuthenticated) return navigateTo('/auth/sign-in')
  } catch (error) {
    return abortNavigation(error)
  }
})
