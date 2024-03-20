import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollProgress() {
  const scrollProgress = ref(0)

  const calculateScrollProgress = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight
    scrollProgress.value = (scrollTop / scrollHeight) * 100
  }

  onMounted(() => {
    window.addEventListener('scroll', calculateScrollProgress)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', calculateScrollProgress)
  })

  return {
    scrollProgress
  }
}
