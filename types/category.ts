export interface Category {
  id: number
  name: string
  slug: string
  status: boolean
}

export interface CategoryPaginate {
  data: Category[]
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
  status: boolean | string
}

export interface Error {
  name: string
  status: string
  captcha_token: string
}
