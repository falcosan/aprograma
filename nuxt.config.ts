import { isProduction, isDevelopment } from 'std-env';
import enums from './utils/enums';

export default defineNuxtConfig({
  app: {
    rootId: '__ap',
    rootTag: 'section'
  },
  runtimeConfig: {
    envAccessToken: process.env.NUXT_ENV_ACCESS_TOKEN,
    envPaymentPointer: process.env.NUXT_ENV_PAYMENT_POINTER,
    public: {
      envXAuth: process.env.NUXT_ENV_X_AUTH,
      envDomain: process.env.NUXT_ENV_DOMAIN,
      envGTagId: process.env.NUXT_ENV_GTAG_ID,
      envApiVersion: process.env.NUXT_ENV_API_VERSION,
      envMode: { production: isProduction, development: isDevelopment },
      envGoogleSiteVerification: process.env.NUXT_ENV_GOOGLE_SITE_VERIFICATION,
      envProductionDomain:
        isProduction && !/netlify/gm.test(process.env.NUXT_ENV_DOMAIN || 'netlify')
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
    ...(!process.env.NUXT_ENV_LOCAL_BUILD ? ['nuxt-security'] : [])
  ],
  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a.storyblok.com'
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1366,
      '2xl': 1600,
      '3xl': 1920
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
    detectBrowserLanguage: false
  },
  device: {
    refreshOnResize: true
  },
  pwa: {
    manifest: enums.manifest,
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    injectManifest: {
      globPatterns: ['**/*.{css,png,jpg,jpeg,svg,ico}']
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
    preference: 'light',
    storageKey: 'theme',
    globalName: '__THEME__',
    componentName: 'ThemeScheme'
  },
  ...(!process.env.NUXT_ENV_LOCAL_BUILD && {
    security: {
      headers: {
        xXSSProtection: '1',
        crossOriginEmbedderPolicy: 'unsafe-none',
        contentSecurityPolicy: {
          'base-uri': ["'self'"],
          'object-src': ["'none'"],
          'form-action': ["'self'"],
          'frame-ancestors': ["'self'"],
          'upgrade-insecure-requests': true,
          'font-src': ["'self'", 'https:', 'data:'],
          'img-src': ['*', "'self'", 'https:', 'data:'],
          'style-src': ["'self'", 'https:', "'unsafe-inline'"],
          'script-src': ["'self'", 'https:', "'unsafe-inline'"],
          'script-src-attr': ["'self'", 'https:', "'unsafe-inline'"]
        }
      }
    }
  }),
  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  },
  sourcemap: true,
  nitro: {
    ...(!process.env.NUXT_ENV_LOCAL_BUILD && {
      preset: 'netlify-edge'
    }),
    compressPublicAssets: true,
    prerender: { ignore: enums.ignore.map(path => `/${path}`) }
  },
  hooks: {
    close: nuxt => {
      if (!nuxt.options._prepare) process.exit();
    }
  }
});
