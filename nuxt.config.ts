import { Data, ENV } from './schema/enums'

export default defineNuxtConfig({
  app: {
    rootId: 'aprograma'
  },

  runtimeConfig: {
    ...ENV.Private,
    public: { ...ENV.Public }
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css',
    '~/assets/css/theme.css'
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/device',
    '@nuxtjs/robots',
    '@storyblok/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a.storyblok.com'
    }
  },

  i18n: {
    locales: Object.values(Data.rss)
      .map((item) => {
        if (item instanceof Object) return item.language
        return ''
      })
      .filter((item) => typeof item === 'string'),
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
      cookieKey: 'ap_language'
    }
  },

  storyblok: {
    accessToken: process.env.NUXT_ENV_DUMMY_TOKEN
  },

  sourcemap: true,

  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  },

  nitro: {
    compressPublicAssets: true,
    future: { nativeSWR: true }
  },

  routeRules: {
    '/**': { isr: 60 }
  },

  hooks: {
    close: (nuxt) => {
      if (!nuxt.options._prepare) process.exit()
    }
  },

  devtools: {
    enabled: false
  },

  compatibilityDate: '2024-07-03'
})