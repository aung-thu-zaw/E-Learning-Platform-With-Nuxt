import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type {
  BlogPageQuery,
  BrowseCourseQuery,
  dashboardQuery,
  myCourseQuery,
  SearchQuery
} from '~/types/query'

type QueryString = string | undefined

export function useURLQueryString() {
  const route = useRoute()

  const blogPageQueryString = computed<BlogPageQuery>(() => ({
    query: route.query?.query as QueryString,
    page: parseInt(route.query.page as string) || 1
  }))

  const myCourseQueryString = computed<myCourseQuery>(() => ({
    page: parseInt(route.query.page as string) || 1,
    skill: route.query?.skill as QueryString,
    duration: route.query?.duration as QueryString,
    status: route.query?.status as QueryString
  }))

  const searchQueryString = computed<SearchQuery>(() => ({
    query: route.query?.query as QueryString,
    page: parseInt(route.query.page as string) || 1,
    level: route.query?.level as QueryString,
    with: route.query?.with as QueryString,
    published_date: route.query?.published_date as QueryString,
    duration: route.query?.duration as QueryString,
    language: route.query?.language as QueryString,
    rating: route.query?.rating as QueryString
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
    searchQueryString,
    blogPageQueryString,
    dashboardQueryString,
    browseCourseQueryString,
    dashboardDefaultQueryString,
    myCourseQueryString
  }
}
