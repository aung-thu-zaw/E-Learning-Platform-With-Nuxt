export function useSocialShare() {
  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank')
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  const shareToReddit = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.reddit.com/submit?url=${url}`, '_blank')
  }

  const shareToTelegram = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://t.me/share/url?url=${url}`, '_blank')
  }

  const shareToWhatsApp = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank')
  }

  const shareByEmail = () => {
    const subject = encodeURIComponent('Check out this link')
    const body = encodeURIComponent(window.location.href)
    window.open(`mailto:?subject=${subject}&body=${body}`)
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
