export function useCopy() {
  const { $toast } = useNuxtApp()

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)

    $toast.success('Copied to clipboard!', { autoclose: 500, position: 'bottom-right' })
  }

  return {
    copyShareLink
  }
}
