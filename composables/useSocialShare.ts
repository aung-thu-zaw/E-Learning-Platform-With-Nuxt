export function useSocialShare() {
  const openNewTab = (url: string) => {
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.target = '_blank'
    anchor.click()
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    openNewTab(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
  }

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    openNewTab(`https://twitter.com/intent/tweet?url=${url}`)
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    openNewTab(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
  }

  const shareToReddit = () => {
    const url = encodeURIComponent(window.location.href)
    openNewTab(`https://www.reddit.com/submit?url=${url}`)
  }

  const shareToTelegram = () => {
    const url = encodeURIComponent(window.location.href)
    openNewTab(`https://t.me/share/url?url=${url}`)
  }

  const shareToWhatsApp = () => {
    const url = encodeURIComponent(window.location.href)
    openNewTab(`https://api.whatsapp.com/send?text=${url}`)
  }

  const shareByEmail = () => {
    const subject = encodeURIComponent('Check out this link')
    const body = encodeURIComponent(window.location.href)
    openNewTab(`mailto:?subject=${subject}&body=${body}`)
  }

  return {
    shareToFacebook,
    shareToTwitter,
    shareToLinkedIn,
    shareToReddit,
    shareToTelegram,
    shareToWhatsApp,
    shareByEmail
  }
}
