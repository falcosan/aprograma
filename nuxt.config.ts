import { isProduction, isDevelopment } from 'std-env';
import enums from './utils/enums';

const mode = {
  production: isProduction && !/netlify/gm.test(process.env.NUXT_ENV_DOMAIN || 'netlify'),
  development: !!(
    isDevelopment ||
    /netlify/gm.test(process.env.NUXT_ENV_DOMAIN || 'netlify') ||
    process.env.NUXT_ENV_LOCAL_BUILD
  )
};

export default defineNuxtConfig({
  app: {
    rootId: '__ap',
    rootTag: 'section'
  },

  runtimeConfig: {
    envAccessToken: process.env.NUXT_ENV_ACCESS_TOKEN,
    envPaymentPointer: process.env.NUXT_ENV_PAYMENT_POINTER,
    public: {
      envProductionDomain: mode.production,
      envXAuth: process.env.NUXT_ENV_X_AUTH,
      envDomain: process.env.NUXT_ENV_DOMAIN,
      envApiVersion: process.env.NUXT_ENV_API_VERSION,
      envMode: { production: isProduction, development: isDevelopment },
      envGoogleSiteVerification: process.env.NUXT_ENV_GOOGLE_SITE_VERIFICATION
    }
  },

  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css', '~/assets/css/theme.css'],

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
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

  robots: {
    rules: [
      { UserAgent: '*' },
      { Disallow: '' },
      { Sitemap: `${process.env.NUXT_ENV_DOMAIN}${enums.sitemap}` }
    ]
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
    debug: mode.development
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  },

  sourcemap: true,

  nitro: {
    compressPublicAssets: true,
    ...(!mode.development && { preset: 'netlify-edge' }),
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
