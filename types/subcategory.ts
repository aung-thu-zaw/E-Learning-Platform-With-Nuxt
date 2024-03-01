export interface Subcategory {
  id: number
  category_id: number
  name: string
  slug: string
  status: boolean
  image: string
  description: string | undefined
}

export interface Category {
  id: number
  name: string
}

export interface SubcategoryPaginate {
  data: Subcategory[]
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
  category_id: number | string
  name: string
  status: boolean | string
  image: string
  description: string
}

export interface Error {
  category_id: string
  name: string
  status: string
  image: string
  description: string
  captcha_token: string
}
