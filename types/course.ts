export interface Category {
  id: number
  name: string
}

export interface Subcategory {
  id: number
  category_id: number
  name: string
}

export interface SkillTag {
  id: number
  category_id: number
  subcategory_id: number
  name: string
}

export interface Course {
  id: number
  thumbnail: string
  title: string
  slug: string
  level: string
  status: string
  category: {
    name: string
  }
  subcategory: {
    name: string
  }
}

export interface CoursePaginate {
  data: Course[]
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
  thumbnail: string
  title: string
  course_description: string
  project_description: string
  level: string
  language: string
  tags: number[]
  videos: string[]
  resources: string[]
  status: string
  captcha_token?: string | null
}

export interface Error {
  category_id: string
  subcategory_id: string
  thumbnail: string
  title: string
  course_description: string
  project_description: string
  level: string
  language: string
  tags: string
  videos: string
  resources: string
  status: string
  captcha_token: string
}
