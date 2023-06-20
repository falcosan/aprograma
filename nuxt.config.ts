import enums from './enum';
import { fetchStories } from './services/fetch.js';

export default defineNuxtConfig({
  vite: {
    optimizeDeps: { exclude: ['fsevents'] }
  },
  app: {
    head: {
      title: enums.meta.title,
      meta: [
        {
          name: 'google-site-verification',
          content: process.env.GOOGLE_SITE_VERIFICATION
        },
        {
          hid: 'description',
          name: 'description',
          content: enums.meta.description
        },
        { property: 'og:site_name', content: enums.name },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.NUXT_ENV_DOMAIN
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: enums.meta.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: enums.meta.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: enums.meta.og.image
        },
        { name: 'twitter:site', content: enums.meta.og.twitter },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: process.env.NUXT_ENV_DOMAIN
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: enums.meta.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: enums.meta.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: enums.meta.og.image
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.NUXT_ENV_DOMAIN
        },
        { rel: 'preconnect', href: '//img2.storyblok.com' }
      ]
    },
    pageTransition: { name: 'page' }
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  plugins: [
    '~/plugins/directives.js',
    '~/plugins/injects/go-back.client.js',
    '~/plugins/injects/no-scroll.client.js',
    '~/plugins/injects/range-items.client.js',
    '~/plugins/injects/theme-color.client.js',
    '~/plugins/injects/language-case.client.js',
    '~/plugins/injects/binary-control.client.js',
    '~/plugins/injects/content-by-name.client.js',
    '~/plugins/injects/image-validation.client.js',
    '~/plugins/injects/scroll-to-smoothly.client.js'
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxtjs/robots',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    [
      '@storyblok/nuxt',
      {
        accessToken:
          process.env.NODE_ENV === 'production'
            ? process.env.NUXT_ENV_PUBLIC_TOKEN
            : process.env.NUXT_ENV_PREVIEW_TOKEN
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
  googleFonts: {
    families: {
      Rubik: [300, 400, 500, 600, 700, 800, 900]
    },
    preconnect: true,
    display: 'swap'
  },
  robots: {
    rules: {
      UserAgent: '*'
    }
  },
  webpack: {
    extractCSS: process.env.NODE_ENV !== 'development'
  },
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!nitroConfig.prerender?.routes || nitroConfig.dev) return;
      const routes = ['/'];
      try {
        await fetchStories(routes);
        nitroConfig.prerender.routes.push(...routes);
      } catch (err) {
        console.error(err);
      } finally {
        nitroConfig.prerender.routes.push(...['/feedeng.xml', '/feedesp.xml', '/feedita.xml']);
      }
    }
  }
});
