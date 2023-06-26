import enums from './enum';

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page' },
    rootId: '__dd',
    rootTag: 'section'
  },
  runtimeConfig: {
    envXAuth: process.env.NUXT_ENV_X_AUTH,
    envAccessToken: process.env.NUXT_ENV_ACCESS_TOKEN,
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
  device: {
    refreshOnResize: true
  },
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    manifest: {
      name: enums.name,
      short_name: enums.name,
      description: enums.meta.description,
      icons: [
        {
          src: 'icons/icon_96x96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'icons/icon_192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon_512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,ico,png}']
    }
  },
  storyblok: {
    accessToken: process.env.NUXT_ENV_ACCESS_TOKEN
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
    }
  }
});
