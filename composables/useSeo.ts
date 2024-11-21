import { Data } from '@/schema/enums'

type Story = {
  description?: string
  name?: string
  image?: string
  content?: {
    file?: { filename: string }
    image?: { filename: string }
    intro: string
    title: string
    author?: string
    date?: string | number | Date
  }
  language?: string
}

export const useSeo = () => {
  const route = useRoute()
  const config = useRuntimeConfig()
  const routeName = route.path.replace('/', '')

  const seoStatic = (story: Story) => {
    const meta = [{ name: 'description', content: story.description || '' }]
    if (config.public.envProductionDomain) {
      useHeadSafe({
        title: story.name || '',
        meta,
        link: [
          { rel: 'canonical', href: `${config.public.envDomain}${routeName}` }
        ]
      })
    }
  }

  const seoDynamic = (story: Story) => {
    const defaultImage = Data.content.image
    const storyImage =
      story.image ||
      story.content?.file?.filename ||
      story.content?.image?.filename
    const image = storyImage ? `${storyImage}/m/472x290` : defaultImage

    const meta: Record<string, string>[] = [
      { property: 'og:site_name', content: Data.name },
      { key: 'og:type', property: 'og:type', content: 'website' },
      { name: 'description', content: story.content?.intro || '' },
      { property: 'og:url', content: `${config.public.envDomain}${routeName}` },
      { property: 'og:title', content: story.content?.title || '' },
      { property: 'og:description', content: story.content?.intro || '' },
      { property: 'og:image', itemprop: 'image', content: image },
      { name: 'twitter:site', content: Data.meta.og.twitter },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:url',
        content: `${config.public.envDomain}${routeName}`
      },
      { name: 'twitter:title', content: story.content?.title || '' },
      { name: 'twitter:description', content: story.content?.intro || '' },
      { name: 'twitter:image', content: image }
    ]

    if (story.content?.author) {
      meta.push({ name: 'author', content: story.content.author })
    }
    if (story.content?.date) {
      meta.push({
        name: 'publish_date',
        property: 'og:publish_date',
        content: new Date(story.content.date).toISOString()
      })
    }

    if (config.public.envProductionDomain) {
      useHeadSafe({
        title: story.content?.title || '',
        meta,
        link: [
          { rel: 'canonical', href: `${config.public.envDomain}${routeName}` }
        ]
      })
    }
  }

  const seoLayout = (story: Story) => {
    const meta = [
      {
        name: 'google-site-verification',
        content: config.public.envGoogleSiteVerification
      },
      { name: 'description', content: Data.meta.description },
      { property: 'og:site_name', content: config.public.envDomain },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: config.public.envDomain },
      { property: 'og:title', content: Data.meta.title },
      { property: 'og:description', content: Data.meta.description },
      { property: 'og:image', itemprop: 'image', content: Data.meta.og.image },
      { name: 'twitter:site', content: Data.meta.og.twitter },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: config.public.envDomain },
      { name: 'twitter:title', content: Data.meta.title },
      { name: 'twitter:description', content: Data.meta.description },
      { name: 'twitter:image', content: Data.meta.og.image },
      { name: 'monetization', content: config.public.envPaymentPointer }
    ]

    if (config.public.envProductionDomain) {
      useHeadSafe({
        htmlAttrs: { lang: story.language || 'en' },
        title: Data.meta.title,
        titleTemplate: (title) =>
          title !== Data.meta.title ? `${title} - ${Data.name}` : title,
        meta,
        link: [
          { rel: 'canonical', href: config.public.envDomain },
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
      })
    }
  }

  return { seoStatic, seoDynamic, seoLayout }
}
