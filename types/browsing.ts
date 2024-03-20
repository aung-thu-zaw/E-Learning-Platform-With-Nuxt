export interface Category {
  id: number
  name: string
  slug: string
}

export interface Subcategory {
  id: number
  category_id: number
  name: string
  slug: string
  description: string
  image: string
}

export interface Tag {
  id: number
  category_id: number
  subcategory_id: number
  name: string
  slug: string
}

export interface Course {
  id: number
  uuid: string
  instructor_id: number
  category_id: number
  subcategory_id: number
  thumbnail: string
  title: string
  slug: string
  course_description: string
  project_description: string
  level: string
  status: string
  language: string
  published_at: string
  instructor: {
    username: string
    name: string
    avatar: string
  }
  total_lesson: string
  duration: string
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
