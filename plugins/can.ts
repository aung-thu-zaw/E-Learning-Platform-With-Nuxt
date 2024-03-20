import { Can } from '~/mixins/check.permissions'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Can)
})
