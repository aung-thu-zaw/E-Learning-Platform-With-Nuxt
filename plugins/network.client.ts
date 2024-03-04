import { useNetworkStatus } from '~/composables/useNetworkStatus'

export default defineNuxtPlugin((nuxtApp) => {
  const { updateOnlineStatus } = useNetworkStatus()
  const { t } = useNuxtApp().$i18n

  const showOnlineNotification = () => {
    ;(nuxtApp.$toast as any).success(t('Your internet connection is restored. Welcome back!'), {
      autoClose: 10000,
      transition: 'flip'
    })
  }

  nuxtApp.hook('page:finish', () => {
    updateOnlineStatus()
    window.addEventListener('online', showOnlineNotification)
    window.addEventListener('offline', updateOnlineStatus)
  })
})
