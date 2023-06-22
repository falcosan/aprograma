export default defineNuxtConfig({
  vite: {
    optimizeDeps: { exclude: ['fsevents'] }
  },
  app: {
    pageTransition: { name: 'page' }
  },
  runtimeConfig: {
    public: {
      origin: process.env.NUXT_ENV_DOMAIN,
      apiVersion: process.env.NUXT_ENV_API_VERSION === 'preview' ? 'draft' : 'published'
    }
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxtjs/robots',
    '@nuxtjs/tailwindcss',
    [
      '@storyblok/nuxt',
      {
        accessToken:
          process.env.NUXT_ENV_API_VERSION === 'preview'
            ? process.env.NUXT_ENV_PREVIEW_TOKEN
            : process.env.NUXT_ENV_PUBLIC_TOKEN
      }
    ]
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
  robots: {
    rules: {
      UserAgent: '*'
    }
  },
  nitro: {
    prerender: {
      routes: ['/feedeng.xml', '/feedesp.xml', '/feedita.xml']
    }
  },
  webpack: {
    extractCSS: process.env.NODE_ENV !== 'development'
  }
});
