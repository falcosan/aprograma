import enums from './utils/enum';

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page' },
    rootId: '__dd',
    rootTag: 'section'
  },
  runtimeConfig: {
    envXAuth: process.env.NUXT_ENV_X_AUTH,
    envAccessToken: process.env.NUXT_ENV_ACCESS_TOKEN,
    envPaymentPointer: process.env.NUXT_ENV_PAYMENT_POINTER,
    public: {
      envDomain: process.env.NUXT_ENV_DOMAIN,
      envApiVersion: process.env.NUXT_ENV_API_VERSION,
      envGoogleSiteVerification: process.env.NUXT_ENV_GOOGLE_SITE_VERIFICATION
    }
  },
  vite: {
    optimizeDeps: { exclude: ['fsevents'] }
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
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
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    workbox: {
      navigateFallback: null,
      globPatterns: ['**/*.{js,css}'],
      globIgnores: ['sw.js', 'workbox-*.js']
    },
    manifest: enums.manifest
  },
  storyblok: {
    accessToken: process.env.NUXT_ENV_DUMMY_TOKEN
  },
  webpack: {
    extractCSS: process.env.NODE_ENV !== 'development'
  },
  nitro: {
    routeRules: {
      '/**': { headers: { 'x-auth': process.env.NUXT_ENV_X_AUTH } }
    },
    prerender: {
      routes: ['/feedeng.xml', '/feedesp.xml', '/feedita.xml', '/sitemap.xml']
    },
    compressPublicAssets: { gzip: true, brotli: true }
  },
  experimental: {
    watcher: 'chokidar'
  }
});
