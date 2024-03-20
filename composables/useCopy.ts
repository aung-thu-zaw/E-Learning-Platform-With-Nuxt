export function useCopy() {
  const { $toast, $i18n } = useNuxtApp()

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)

    $toast.success($i18n.t('Copied to clipboard!'), { autoclose: 500, position: 'bottom-right' })
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)

    $toast.success($i18n.t('Copied to clipboard!'), { autoclose: 500, position: 'bottom-right' })
  }

  return {
    copyShareLink,
    copyText
  }
}
