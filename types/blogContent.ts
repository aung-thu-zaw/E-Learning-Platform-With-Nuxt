export interface BlogContent {
  id: number
  author_id: number
  blog_category_id: number
  thumbnail: string
  title: string
  slug: string
  content: string
  status: string
  published_at: string
  author: {
    display_name: string
    avatar: string
  }
  category: {
    name: string
    slug: string
    count: number
  }
}

export interface BlogCategory {
  name: string
  slug: string
}

export interface BlogContentPaginate {
  data: BlogContent[]
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
  blog_category_id: number | string
  title: string
  status: string
  content: string
  thumbnail: string | File
}

export interface Error {
  blog_category_id: string
  title: string
  status: string
  content: string
  thumbnail: string
  captcha_token: string
}
