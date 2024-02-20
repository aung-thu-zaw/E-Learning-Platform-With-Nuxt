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
  pinia: {
    storesDirs: ['./stores/**']
  },
  css: ['plyr/dist/plyr.css'],
  plugins: [
    '~/plugins/preline.client.ts',
    '~/plugins/axios.ts',
    '~/plugins/toastify.ts',
    '~/plugins/sweetalert.ts',
    '~/plugins/recaptcha.ts',
    '~/plugins/can.ts',
    '~/plugins/translations.ts',
    '~/plugins/translations.script.ts'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
        }
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/18c274e5f3.js',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      backendBaseUrl: process.env.BACKEND_BASEURL,
      backendApiBaseUrl: process.env.BACKEND_API_BASEURL,
      recaptcha: {
        siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY
      }
    }
  }
})
