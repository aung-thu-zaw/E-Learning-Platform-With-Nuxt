import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const store = useAuthStore()

  try {
    await store.getAuthenticatedUser()

    setTimeout(() => {
      if (!store.isAuthenticated) navigateTo('/auth/sign-in')
    }, 200)
  } catch (error: any) {
    return abortNavigation(error)
  }
})
