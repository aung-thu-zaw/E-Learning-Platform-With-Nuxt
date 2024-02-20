import { useReCaptcha } from 'vue-recaptcha-v3'

export function useToken() {
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
  const { $axios } = useNuxtApp()

  async function generateCsrfToken(): Promise<void> {
    try {
      await $axios.get('/sanctum/csrf-cookie')
    } catch (error) {
      console.error('Failed to get CSRF cookie:', error)
    }
  }

  async function generateCaptchaToken(action: string): Promise<string> {
    await recaptchaLoaded()
    return executeRecaptcha(action)
  }

  return { generateCsrfToken, generateCaptchaToken }
}
