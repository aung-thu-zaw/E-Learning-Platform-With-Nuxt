export interface BlogPageQuery {
  query?: string | undefined
  page?: number
}

export interface SearchQuery {
  query?: string | undefined
  page?: number
  level?: string | undefined
  with?: string | undefined
  published_date?: string | undefined
  duration?: string | undefined
  language?: string | undefined
  rating?: string | undefined
}

export interface myCourseQuery {
  page?: number
  skill?: string | undefined
  duration?: string | undefined
  status?: string | undefined
}

export interface BrowseCourseQuery {
  search?: string | undefined
  page?: number
}

export interface dashboardQuery {
  search?: string | undefined
  page?: number
  per_page?: number
  sort?: string
  direction?: string
}
