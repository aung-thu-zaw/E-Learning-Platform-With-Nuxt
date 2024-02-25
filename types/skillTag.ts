export interface SkillTag {
  id: number
  category_id: number
  subcategory_id: number
  name: string
  slug: string
  category: {
    name: string
  }
  subcategory: {
    name: string
  }
}

export interface Category {
  id: number
  name: string
}

export interface Subcategory {
  id: number
  category_id: number
  name: string
}

export interface SkillTagPaginate {
  data: SkillTag[]
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
  subcategory_id: number | string
  name: string
}

export interface Error {
  category_id: string
  subcategory_id: string
  name: string
  captcha_token: string
}
