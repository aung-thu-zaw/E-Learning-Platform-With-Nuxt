export interface Author {
  display_name: string
  avatar: string
}

export interface Category {
  name: string
  slug: string
  description: string | undefined
}

export interface Blog {
  id: number
  title: string
  slug: string
  thumbnail: string
  content: string
  published_at: string
  author: Author
  category: Category
}

export interface BlogPaginate {
  data: Blog[]
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
    path: string
    per_page: number
    to: number
    total: number
  }
}
