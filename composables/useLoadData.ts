import { ref } from 'vue'
import type { Ref } from 'vue'

// interface DataWithLinks {
//   data: []
//   links: {
//     next: string
//   }
// }

export function useLoadData<T>() {
  const allData: Ref<T[]> = ref([])
  const newPaginatedData: Ref<T | null> = ref(null)
  const loading: Ref<boolean> = ref(false)
  const nextPageUrl: Ref<string> = ref('')
  const { $axiosApi } = useNuxtApp()

  const loadMoreData = async (paginatedData: T) => {
    nextPageUrl.value = !newPaginatedData.value
      ? paginatedData.links.next
      : newPaginatedData.value.links.next

    if (loading.value || !nextPageUrl.value) return

    loading.value = true

    const { data: responseData } = await $axiosApi.get(nextPageUrl.value)

    allData.value = Array.from(
      new Set([...paginatedData.data, ...allData.value, ...responseData.data])
    )

    console.log(allData.value)

    loading.value = false
    newPaginatedData.value = responseData
  }

  const observeScroll = (
    paginatedData: T,
    element: HTMLElement | null,
    options = { rootMargin: '0px 0px 150px 0px' }
  ) => {
    if (!element || !paginatedData) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading.value) loadMoreData(paginatedData)
        })
      },
      {
        ...options
      }
    )

    observer.observe(element)
  }

  return { allData, newPaginatedData, loading, loadMoreData, observeScroll }
}
