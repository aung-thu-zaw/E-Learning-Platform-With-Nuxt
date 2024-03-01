export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image: string
}

export interface Subcategory {
  id: number
  category_id: number
  name: string
  slug: string
}

export interface Tag {
  id: number
  category_id: number
  subcategory_id: number
  name: string
  slug: string
}
