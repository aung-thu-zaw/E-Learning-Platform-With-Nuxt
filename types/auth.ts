export interface RegisterForm {
  display_name: string
  email: string
  password: string
  password_confirmation: string
  captcha_token?: string | null
}

export interface LoginForm {
  email: string
  password: string
  remember: boolean
  captcha_token?: string | null
}

export interface ChangePasswordForm {
  current_password: string
  password: string
  password_confirmation: string
  captcha_token?: string | null
}

export interface ResetPasswordForm {
  token: string
  email: string
  password: string
  password_confirmation: string
  captcha_token?: string | 
  
}

export interface User {
  id: number
  google_id: string | null
  facebook_id: string | null
  avatar: string
  username: string
  display_name: string
  headline: string | null
  about_me: string | null
  role: string
  status: string
  email: string
  email_verified_at: string | null
  facebook_url: string | null
  twitter_url: string | null
  instagram_url: string | null
  pinterest_url: string | null
  youtube_url: string | null
  github_url: string | null
  personal_website_url: string | null
  created_at: string
  updated_at: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  permissions: any[]
}

export interface Error {
  display_name: string
  username: string
  password: string
  email: string
  captcha_token: string
}
