import { ref } from 'vue'

export function useNetworkStatus() {
  const isOnline = ref(navigator?.onLine)
  const { $toast } = useNuxtApp()
  const { t } = useNuxtApp().$i18n

  function updateOnlineStatus() {
    isOnline.value = navigator?.onLine
    if (!isOnline.value) {
      showOfflineNotification()
    } else {
      testNetworkSpeed()
    }
  }

  function testNetworkSpeed() {
    if ((navigator as any)?.connection) {
      const connection = (navigator as any).connection

      // Calculate speed based on effectiveType
      const speedMbps = calculateSpeed(connection.effectiveType)

      if (speedMbps < 2) {
        showSlowConnectionNotification()
      } else if (speedMbps < 5) {
        showModerateConnectionNotification()
      }
    }
  }

  // Function to calculate network speed based on effectiveType
  function calculateSpeed(effectiveType: string) {
    switch (effectiveType) {
      case 'slow-2g':
        return 0.1 // Speed in Mbps for slow-2g
      case '2g':
        return 0.5 // Speed in Mbps for 2g
      case '3g':
        return 2 // Speed in Mbps for 3g
      case '4g':
        return 10 // Speed in Mbps for 4g
      default:
        return 10 // Default speed for unknown effectiveType
    }
  }

  function showOfflineNotification() {
    $toast.error(t('You are currently offline. Please check your internet connection.'), {
      autoClose: 10000,
      transition: 'flip'
    })
  }

  function showSlowConnectionNotification() {
    $toast.warning(
      t('Your internet connection is too slow. Please consider connecting to a faster network.'),
      { autoClose: 10000, transition: 'flip' }
    )
  }

  function showModerateConnectionNotification() {
    $toast.warning(
      t(
        'Your internet connection is slow. Please consider connecting to a faster network for optimal performance.'
      ),
      { autoClose: 10000, transition: 'flip' }
    )
  }

  return { isOnline, updateOnlineStatus }
}
