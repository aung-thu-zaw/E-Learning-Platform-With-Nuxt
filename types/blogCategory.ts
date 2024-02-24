export interface BlogCategory {
  id: number
  name: string
  slug: string
  description: string | undefined
  status: boolean
}

export interface BlogCategoryPaginate {
  data: BlogCategory[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

export interface Form {
  name: string
  description: string
  status: boolean | string
}

export interface Error {
  name: string
  description: string
  status: string
  captcha_token: string
}
