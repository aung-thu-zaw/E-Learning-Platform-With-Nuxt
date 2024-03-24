export interface LearningPath {
  id: number
  image: string
  title: string
  slug: string
  description: string
  materials: string
  final_product: string
  level: string
  creator_id: string
  total_course: string
  total_duration: string
  is_saved: boolean
  creator: {
    name: string
    avatar: string
  }
}

export interface LearningPathPaginate {
  data: LearningPath[]
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
