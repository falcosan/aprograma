import enums from './utils/enums';
import { ENV, Mode } from './schema/enums'

export default defineNuxtConfig({
  app: {
    rootId: '__ap',
    rootTag: 'section'
  },

  runtimeConfig: {
    ...ENV.Private,
    public: { ...ENV.Public },
  },

  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css', '~/assets/css/theme.css'],

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    "@nuxt/eslint",
    '@nuxtjs/device',
    '@vite-pwa/nuxt',
    '@nuxtjs/robots',
    '@storyblok/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'nuxt-delay-hydration'
  ],

  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a.storyblok.com'
    }
  },

  i18n: {
    locales: Object.values(enums.rss)
      .map(item => {
        if (item instanceof Object) return item.language;
        else return '';
      })
      .filter(Boolean),
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: 'root',
      cookieKey: 'ap_language'
    }
  },

  device: {
    refreshOnResize: true
  },

  pwa: {
    manifest: enums.manifest,
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    injectManifest: {
      globPatterns: ['**/*.{jpg,jpeg,png,gif,webp}']
    }
  },

  storyblok: {
    accessToken: process.env.NUXT_ENV_DUMMY_TOKEN
  },

  colorMode: {
    classSuffix: '',
    hid: 'theme-script',
    storageKey: 'ap_theme',
    globalName: '__THEME__',
    componentName: 'ThemeScheme'
  },

  delayHydration: {
    mode: 'mount',
    debug: Mode.development
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  },

  sourcemap: true,

  nitro: {
    compressPublicAssets: true,
    ...(!Mode.development && { preset: 'netlify-edge' }),
    prerender: { ignore: enums.ignore.map(path => `/${path}`) }
  },

  hooks: {
    close: nuxt => {
      if (!nuxt.options._prepare) process.exit();
    }
  },

  devtools: {
    enabled: false
  },

  compatibilityDate: '2024-07-03'
});
