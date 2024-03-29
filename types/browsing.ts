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

export interface Lesson {
  section_id: number
  title: string
  uuid: string
  video_file_name: string
  duration: string
  description: string
  is_completed: boolean
}

export interface Section {
  id: number
  title: string
  slug: string
  duration: string
  total_completed_lessons_count: number
  lessons: Lesson[]
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
  is_saved: boolean
  is_enrolled: boolean
  total_student: number
  intro_video_name: string
  instructor: {
    username: string
    name: string
    avatar: string
  }
  total_lesson: string
  sections: Section[]
  duration: string
  enrollment: {
    id: number
    enrolled_at: string
    completed_at: string
    progress: number
    last_watched_lesson_uuid: string
    last_watched_section_slug: string
  } | null
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
