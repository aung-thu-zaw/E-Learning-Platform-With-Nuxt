import type { App } from 'vue'

declare global {
  interface Window {
    _translations: Record<string, string>
  }
}

export const Translations = {
  install: (app: App) => {
    const __ = (key: string, replacements: Record<string, string> = {}) => {
      let translations = window._translations[key] || key

      Object.keys(replacements).forEach((replacement) => {
        translations = translations.replace(`:${replacement}`, replacements[replacement])
      })
      return translations
    }

    app.mixin({ methods: { __ } })
  }
}
