import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
  const { siteKey } = useRuntimeConfig().public.recaptcha

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: siteKey
  })
})
