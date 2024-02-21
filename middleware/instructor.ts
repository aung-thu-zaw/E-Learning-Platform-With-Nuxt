import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  const store = useAuthStore()

  try {
    await store.getAuthenticatedUser()

    // await new Promise((resolve) => setTimeout(resolve, 1000))

    if (store?.isAuthenticated && store?.user?.role !== 'instructor') {
      console.log(store.user.role)
      // throw createError({
      //   statusCode: 403,
      //   statusMessage: 'Forbidden'
      // })
    }
  } catch (error) {
    return abortNavigation(error)
  }
})
