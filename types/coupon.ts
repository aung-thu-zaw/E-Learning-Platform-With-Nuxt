export interface Coupon {
  id: number
  code: string
  description: string
  type: string
  value: number
  max_uses: number | null
  uses: number
  expiry_date: string | null
  is_redeemable: boolean
  free_trial_days: string | null
}

export interface CouponPaginate {
  data: Coupon[]
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
  code: string
  description: string
  type: string
  value: number | string
  max_uses: number | string
  expiry_date: string | null
  is_redeemable: boolean | string
  free_trial_days: string | number
  captcha_token?: string | null
}

export interface Error {
  code: string
  description: string
  type: string
  value: string
  max_uses: string
  expiry_date: string
  is_redeemable: string
  free_trial_days: string
  captcha_token: string
}
