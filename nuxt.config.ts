export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page' }
  },
  runtimeConfig: {
    envAccessToken: process.env.NUXT_ENV_ACCESS_TOKEN,
    public: {
      envDomain: process.env.NUXT_ENV_DOMAIN,
      envGoogleSiteVerification: process.env.NUXT_ENV_GOOGLE_SITE_VERIFICATION,
      envApiVersion: process.env.NUXT_ENV_API_VERSION
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
  webpack: {
    extractCSS: process.env.NODE_ENV !== 'development'
  },
  nitro: {
    prerender: {
      routes: ['/feedeng.xml', '/feedesp.xml', '/feedita.xml', '/sitemap.xml']
    }
  }
});
