import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

interface RegisterForm {
  display_name: string
  email: string
  password: string
  password_confirmation: string
}

interface LoginForm {
  email: string
  password: string
  remember: boolean
}

interface ChangePasswordForm {
  current_password: string
  password: string
  password_confirmation: string
}

interface ResetPasswordForm {
  token: string
  email: string
  password: string
  password_confirmation: string
}

interface User {
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

interface ErrorResponse {
  display_name: string | null
  username: string | null
  password: string | null
  email: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const { $axios } = useNuxtApp()
  const user = ref<User | null>(null)
  const errors = ref<ErrorResponse | null>(null)
  const status = ref<string>(null)

  const getCsrfCookie = async (): void => {
    try {
      await $axios.get('/sanctum/csrf-cookie')
    } catch (error) {
      console.error('Failed to get CSRF cookie:', error)
    }
  }

  const forgotPassword = async (email: string): void => {
    try {
      await getCsrfCookie()

      const response = await $axios.post('/forgot-password', { email })

      if (!response) throw new Error('Response Not Found!')

      status.value = response.data.status
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const resetPassword = async (form: ResetPasswordForm): void => {
    try {
      const response = await $axios.post('/reset-password', { ...form })

      if (!response) throw new Error('Response Not Found!')

      status.value = response.data.status

      router.push({ path: '/auth/sign-in' })
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const changePassword = async (form: ChangePasswordForm): void => {
    try {
      const response = await $axios.put('/password', { ...form })

      if (!response) throw new Error('Response Not Found!')

      toast.success(response.data?.message, { autoClose: 2000 })
    } catch (error) {
      if (error?.response?.status === 422) {
        errors.value = error.response?.data?.errors
      }
    }
  }

  const sendVerificationEmail = async (): void => {
    try {
      const response = await $axios.post('/email/verification-notification')

      if (!response) throw new Error('Response Not Found!')

      status.value = response.data.status
    } catch (error) {
      if (error?.response?.status === 422) {
        errors.value = error.response?.data?.errors
      }
    }
  }

  const getAuthenticatedUser = async (): void => {
    try {
      await getCsrfCookie()
      const { data } = await $axios.get('api/v1/user')

      if (data.permissions.length > 0) {
        const permissionNames = data.permissions.map((permission) => permission.name)

        user.value = { ...data, permissions: permissionNames }
      } else {
        user.value = data
      }
    } catch (error) {
      console.error('Failed to get authenticated user:', error)
    }
  }

  const performAuthAction = async (
    action: string,
    endpoint: string,
    form: RegisterForm | LoginForm
  ): void => {
    try {
      await getCsrfCookie()

      const { data } = await $axios[action](endpoint, { ...form })

      if (!data) throw new Error('Response Data Not Found!')

      router.push({ path: '/' })
    } catch (error) {
      errors.value = error.response?.data?.errors
    }
  }

  const register = async (form: RegisterForm): void => {
    await performAuthAction('post', '/register', { ...form })
  }

  const login = async (form: LoginForm): void => {
    await performAuthAction('post', '/login', { ...form })
  }

  const logout = async (): void => {
    await performAuthAction('post', '/logout')
    user.value = null
    router.push({ path: '/' })
  }

  return {
    user,
    errors,
    status,
    getCsrfCookie,
    forgotPassword,
    resetPassword,
    changePassword,
    sendVerificationEmail,
    getAuthenticatedUser,
    register,
    login,
    logout
  }
})
