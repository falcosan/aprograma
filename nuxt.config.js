import axios from 'axios';
import showdown from 'showdown';
import enums from './enum';

export default defineNuxtConfig({
  target: 'static',
  router: {
    trailingSlash: true
  },
  vite: {
    optimizeDeps: { exclude: ['fsevents'] }
  },
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
        content: `${process.env.NUXT_ENV_DOMAIN}/`
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
        content: `${process.env.NUXT_ENV_DOMAIN}/`
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
        href: `${process.env.NUXT_ENV_DOMAIN}/`
      },
      { rel: 'preconnect', href: '//img2.storyblok.com' }
    ]
  },
  loading: '@/storyblok/layout/Loading',
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
    '~/plugins/injects/image-validation.client.js'
  ],
  generate: {
    fallback: true,
    routes(callback) {
      const exclude = ['home', 'layout'];
      const routes = [];
      axios(enums.routes).then(res => {
        Object.keys(res.data.links).forEach(key => {
          if (!exclude.includes(res.data.links[key].slug)) {
            routes.push('/' + res.data.links[key].slug);
          }
        });
        callback(null, routes);
      });
    }
  },
  runtimeConfig: {
    webDomain: process.env.NUXT_ENV_DOMAIN
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/device',
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
  pwa: {
    meta: {
      author: enums.meta.author,
      theme_color: '#212121',
      lang: ''
    },
    manifest: {
      name: enums.name,
      short_name: enums.name,
      description: enums.meta.description,
      start_url: ''
    }
  },
  googleFonts: {
    families: {
      Rubik: [300, 400, 500, 600, 700, 800, 900]
    },
    preconnect: true,
    display: 'swap'
  },
  sitemap: {
    hostname: `${process.env.NUXT_ENV_DOMAIN}/`,
    trailingSlash: true,
    routes: async () => {
      const { data } = await axios(enums.routes);
      return Object.values(data.links)
        .map(link => {
          if (link.is_startpage) return link.slug;
          else return link;
        })
        .filter(Boolean);
    },
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },
  robots: {
    UserAgent: '*'
  },
  feed: (() => {
    const $md = new showdown.Converter();
    const createFeed = lang => {
      return {
        path: enums.rss[lang].path,
        async create(feed) {
          feed.options = {
            title: enums.rss[lang].title,
            link: `${process.env.NUXT_ENV_DOMAIN}${enums.rss[lang].path}`,
            description: enums.rss.description
          };
          feed.addCategory(enums.rss[lang].category);
          feed.addContributor({
            name: enums.rss.name,
            email: enums.rss.email,
            link: `${process.env.NUXT_ENV_DOMAIN}/`
          });
          const data = await axios(enums.rss[lang].data);
          const dataFiltered = dataLang =>
            dataLang.data.stories.filter(
              filteredPost => filteredPost.name.toLowerCase() !== enums.rss.route
            );
          dataFiltered(data).forEach(post => {
            feed.addItem({
              title: post.content.title,
              image: post.content.file.filename ? post.content.file.filename : enums.rss.image,
              id: post.id,
              link: `${process.env.NUXT_ENV_DOMAIN}/${enums.rss.route}/${post.slug}/`,
              description: post.content.intro,
              content: $md.makeHtml(post.content.long_text),
              published: new Date(post.content.date)
            });
          });
        },
        cacheTime: 1000 * 60 * 15,
        type: 'rss2'
      };
    };
    return ['eng', 'esp', 'ita'].map(lang => createFeed(lang));
  })(),
  build: {
    transpile: ['axios'],
    extractCSS: process.env.NODE_ENV !== 'development'
  }
});
