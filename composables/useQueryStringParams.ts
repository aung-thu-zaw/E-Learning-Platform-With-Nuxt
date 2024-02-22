import { useRoute } from 'vue-router'
import { computed } from 'vue'

type QueryParam = string | undefined

interface BlogQueryParams {
  query?: QueryParam
  page?: number
}

export function useQueryStringParams() {
  const route = useRoute()

  const blogParams = computed<BlogQueryParams>(() => ({
    query: route.query?.query as QueryParam,
    page: parseInt(route.query.page as string) || 1
  }))

  return {
    blogParams
  }
}
