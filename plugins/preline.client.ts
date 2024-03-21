import 'preline'

import { type IStaticMethods } from 'preline'
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    window.HSStaticMethods.autoInit()
  })
})
