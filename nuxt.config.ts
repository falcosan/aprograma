import { isProduction, isDevelopment } from 'std-env';
import enums from './utils/enums';

export default defineNuxtConfig({
  app: {
    rootId: '__dd',
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
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    'nuxt-security',
    '@nuxtjs/device',
    '@vite-pwa/nuxt',
    '@nuxtjs/robots',
    '@storyblok/nuxt',
    '@nuxtjs/tailwindcss'
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
  },
  device: {
    refreshOnResize: true
  },
  pwa: {
    filename: 'ap-sw.ts',
    manifest: enums.manifest,
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    injectManifest: {
      globIgnores: ['**/node_modules/**/*', '**/*.{js}']
    }
  },
  robots: {
    rules: [
      { UserAgent: '*' },
      { Disallow: '' },
      { Sitemap: `${process.env.NUXT_ENV_DOMAIN}sitemap.xml` }
    ]
  },
  storyblok: {
    accessToken: process.env.NUXT_ENV_DUMMY_TOKEN
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  },
  sourcemap: {
    server: true,
    client: true
  },
  nitro: {
    preset: 'netlify-edge',
    compressPublicAssets: true
  },
  hooks: {
    close: nuxt => {
      if (!nuxt.options._prepare) process.exit();
    }
  }
});
