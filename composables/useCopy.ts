export function useCopy() {
  const { $toast } = useNuxtApp()

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)

    $toast.success('Copied to clipboard!', { autoclose: 500, position: 'bottom-right' })
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)

    $toast.success('Copied to clipboard!', { autoclose: 500, position: 'bottom-right' })
  }

  return {
    copyShareLink,
    copyText
  }
}
