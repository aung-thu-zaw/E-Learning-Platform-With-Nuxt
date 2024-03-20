import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (from) => {
  const store = useAuthStore()
  const localePath = useLocalePath()

  try {
    await store.getAuthenticatedUser()

    setTimeout(() => {
      if (
        store.isAuthenticated &&
        !store.user?.two_factor_code &&
        store.user?.enabled_two_factor &&
        from.path.endsWith('auth/two-factor')
      ) {
        return navigateTo(localePath('/'))
      } else if (
        store.isAuthenticated &&
        store.user?.enabled_two_factor &&
        store.user?.two_factor_code
      ) {
        return navigateTo(localePath('/auth/two-factor'))
      }
    }, 200)
  } catch (error: any) {
    return abortNavigation(error)
  }
})
