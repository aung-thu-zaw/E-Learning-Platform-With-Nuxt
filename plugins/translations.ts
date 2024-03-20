import { Translations } from '~/mixins/translations'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Translations)
})
