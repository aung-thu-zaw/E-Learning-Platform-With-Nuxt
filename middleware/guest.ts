import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = useAuthStore()
  const localePath = useLocalePath()

  try {
    await store.getAuthenticatedUser()

    setTimeout(() => {
      if (store?.isAuthenticated)
        navigateTo(to.fullPath !== from.fullPath ? from.fullPath : localePath('/'))
    }, 200)
  } catch (error: any) {
    return abortNavigation(error)
  }
})
