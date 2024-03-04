export interface BlogPageQuery {
  query?: string | undefined
  page?: number
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
