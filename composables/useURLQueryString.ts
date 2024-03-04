import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type { BlogPageQuery, BrowseCourseQuery, dashboardQuery } from '~/types/query'

type QueryString = string | undefined

export function useURLQueryString() {
  const route = useRoute()

  const blogPageQueryString = computed<BlogPageQuery>(() => ({
    query: route.query?.query as QueryString,
    page: parseInt(route.query.page as string) || 1
  }))

  const browseCourseQueryString = computed<BrowseCourseQuery>(() => ({
    search: route.query?.search as QueryString,
    tag: route.query?.tag as QueryString,
    sort: route.query?.sort as QueryString,
    level: route.query?.level as QueryString,
    duration: route.query?.duration as QueryString,
    page: parseInt(route.query.page as string) || 1
  }))

  const dashboardQueryString = computed<dashboardQuery>(() => ({
    search: route.query?.search,
    page: route.query?.page ?? 1,
    per_page: route.query?.per_page ?? 5,
    sort: route.query?.sort ?? 'id',
    direction: route.query?.direction ?? 'desc'
  }))

  const dashboardDefaultQueryString = computed<dashboardQuery>(() => ({
    page: 1,
    per_page: 5,
    sort: 'id',
    direction: 'desc'
  }))

  return {
    blogPageQueryString,
    dashboardQueryString,
    browseCourseQueryString,
    dashboardDefaultQueryString
  }
}
