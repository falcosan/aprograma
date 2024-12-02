import { ENV } from './schema/enums'

export default defineNuxtConfig({
  app: { rootId: 'aprograma' },
  runtimeConfig: { ...ENV.Private, public: { ...ENV.Public } },

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
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss'
  ],
  image: {
    provider: 'storyblok',
    storyblok: { baseURL: 'https://a.storyblok.com' }
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'it'],
    detectBrowserLanguage: { useCookie: false }
  },
  storyblok: { accessToken: process.env.NUXT_ENV_DUMMY_TOKEN },
  colorMode: {
    classSuffix: '',
    storageKey: 'ap_mode',
    storage: 'localStorage',
    hid: 'ap-color-mode-script'
  },

  sourcemap: true,
  vite: { build: { chunkSizeWarningLimit: 1000 } },
  nitro: { compressPublicAssets: true, prerender: { crawlLinks: true } },

  experimental: { sharedPrerenderData: true },

  devtools: { enabled: false },
  telemetry: { enabled: false },
  compatibilityDate: '2024-11-26'
})
