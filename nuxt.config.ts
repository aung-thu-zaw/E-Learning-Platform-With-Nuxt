// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/i18n'
  ],
  i18n: {
    lazy: true,
    langDir: 'lang',
    strategy: 'prefix_except_default',
    locales: [
      { flag: '🇺🇸', code: 'en', iso: 'en', name: 'English', file: 'en.json' },
      { flag: '🇲🇲', code: 'mm', iso: 'mm', name: 'မြန်မာ', file: 'mm.json' },
      { flag: '🇪🇸', code: 'es', iso: 'es', name: 'Española', file: 'es.json' },
      { flag: '🇸🇦', code: 'ar', iso: 'ar', name: 'عربي', file: 'ar.json' },
      { flag: '🇫🇷', code: 'fr', iso: 'fr', name: 'Français', file: 'fr.json' }
    ],
    // switchLocalePath: '/:lang/:route',
    defaultLocale: 'en',
    vueI18n: './config/nuxt-i18n.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    }
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  css: ['plyr/dist/plyr.css'],
  plugins: [
    // '~/plugins/preline.client.ts',
    '~/plugins/axios.ts',
    '~/plugins/toastify.ts',
    '~/plugins/sweetalert.ts',
    '~/plugins/recaptcha.ts',
    '~/plugins/can.ts',
    '~/plugins/translations.ts',
    '~/plugins/network.client.ts'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      titleTemplate: '%s - Online Learning Platform',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Discover the power of our CMS Blog System – your ultimate platform for effortless content creation. With a sleek interface and robust features, publish, manage, and customize your blog with ease. Seamlessly responsive and equipped with SEO tools, reach your audience effectively. Unleash your creativity today.'
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.plyr.io/3.7.8/plyr.css'
        }
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/18c274e5f3.js',
          crossorigin: 'anonymous'
        },
        {
          src: 'https://cdn.plyr.io/3.7.8/plyr.js'
        }
      ]
    }
  },

  runtimeConfig: {
    private: {
      stripe: {
        STRIPE_SECRET: process.env.STRIPE_SECRET
      }
    },
    public: {
      backendBaseUrl: process.env.BACKEND_BASEURL,
      backendApiBaseUrl: process.env.BACKEND_API_BASEURL,
      recaptcha: {
        siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY
      },
      stripe: {
        STRIPE_KEY: process.env.STRIPE_KEY
      }
    }
  }
})
