export interface Slider {
  id: number
  title: string
  description: string
  button: string
  url: string
  image: string
  status: boolean
}

export interface SliderPaginate {
  data: Slider[]
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
  title: string
  description: string
  button: string
  url: string
  image: string
  status: boolean | string
}

export interface Error {
  title: string
  description: string
  button: string
  url: string
  image: string
  status: string
  captcha_token: string
}
