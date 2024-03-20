export interface NavBanner {
  id: number
  description: string
  url: string
  button: string
  countdown: string | null
  start_date_time: string
  end_date_time: string
  is_active: boolean
}

export interface NavBannerPaginate {
  data: NavBanner[]
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
  description: string
  url: string
  button: string
  countdown: string | null
  start_date_time: string
  end_date_time: string
  captcha_token?: string | null
}

export interface Error {
  description: string
  url: string
  button: string
  countdown: string
  start_date_time: string
  end_date_time: string
  captcha_token: string
}
