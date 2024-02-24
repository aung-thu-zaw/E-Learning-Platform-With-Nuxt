import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useSorting() {
  const route = useRoute()
  const router = useRouter()

  const params = computed(() => {
    return {
      sort: route.query?.sort,
      direction: route.query?.direction
    }
  })

  const updateSorting = (sort = 'id') => {
    params.value.sort = sort
    params.value.direction = params.value.direction === 'asc' ? 'desc' : 'asc'

    router.push({
      query: { ...route.query, sort: params.value.sort, direction: params.value.direction }
    })
  }

  return {
    params,
    updateSorting
  }
}
