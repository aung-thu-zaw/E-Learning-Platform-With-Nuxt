export interface Reminder {
  id: number
  message: string
  frequency: string
  date: string
  time: string
  google_calendar_synced: boolean
  days: string[] | null
  course: {
    id: number
    title: string
  }
  user: {
    id: number
    name: string
    avatar: string
  }
}

export interface Course {
  id: number
  title: string
}

export interface Form {
  message: string
  frequency: string
  date: string
  time: string | { hours: number; minutes: number; seconds: number }
  google_calendar_synced: boolean
  days: string[]
  course_id: number | null
  captcha_token?: string | null
}

export interface Error {
  message: string
  frequency: string
  date: string
  time: string
  google_calendar_synced: string
  days: string
  course_id: string
  captcha_token: string
}
