import { useRoute } from 'vue-router'
import { computed } from 'vue'

type QueryString = string | undefined

interface BlogQueryString {
  query?: QueryString
  page?: number
}

interface DashboardQueryString {
  search?: QueryString
  page?: number
  per_page?: number
  sort?: string
  direction?: string
}

export function useURLQueryString() {
  const route = useRoute()

  const blogPageQueryString = computed<BlogQueryString>(() => ({
    query: route.query?.query as QueryString,
    page: parseInt(route.query.page as string) || 1
  }))

  const dashboardQueryString = computed<DashboardQueryString>(() => ({
    search: route.query?.search,
    page: route.query?.page ?? 1,
    per_page: route.query?.per_page ?? 5,
    sort: route.query?.sort ?? 'id',
    direction: route.query?.direction ?? 'desc'
  }))

  const dashboardDefaultQueryString = computed<DashboardQueryString>(() => ({
    page: 1,
    per_page: 5,
    sort: 'id',
    direction: 'desc'
  }))

  return {
    blogPageQueryString,
    dashboardQueryString,
    dashboardDefaultQueryString
  }
}
