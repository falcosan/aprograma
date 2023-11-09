const name = 'Aprograma';
const description = `Coding can be defined in many ways, sometimes even stressful. The goal of ${name} is to change this`;

export default {
  name,
  routes: token =>
    `https://api.storyblok.com/v2/cdn/links?token=${token}&cv=CURRENT_TIMESTAMP&version=published`,
  meta: {
    title: `${name} - A break from stressful coding`,
    description,
    author: 'Daniele Falchetti - danielefalche@gmail.com',
    og: {
      image: 'https://a.storyblok.com/f/106240/2786x1530/1c3ed37e59/web.png/m/472x290',
      twitter: '@danielefalche'
    }
  },
  editor: {
    host: 'https://aprograma-editor.netlify.app/'
  },
  content: {
    image: 'https://a.storyblok.com/f/106240/4065x1468/5c83c3e7de/noimeageteaser.png'
  },
  manifest: {
    name,
    short_name: name,
    description,
    theme_color: '#eeeeee',
    start_url: '/',
    icons: [
      {
        src: 'icon-48x48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: 'icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: 'icon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'icon-128x128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: 'icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  sitemap: 'sitemap.xml',
  rss: {
    description: "Aprograma's blog RSS",
    name: 'Daniele Falchetti',
    email: 'danielefalche@gmail.com',
    image: 'https://img2.storyblok.com/1240x0/f/106240/4067x2440/49d9d1a222/noimagedetail.png',
    route: 'blog',
    eng: {
      path: 'feedeng.xml',
      title: 'Aprograma Blog ENG',
      category: 'Blog ENG',
      language: 'en'
    },
    esp: {
      path: 'feedesp.xml',
      title: 'Aprograma Blog ESP',
      category: 'Blog ESP',
      language: 'es'
    },
    ita: {
      path: 'feedita.xml',
      title: 'Aprograma Blog ITA',
      category: 'Blog ITA',
      language: 'it'
    }
  }
};
