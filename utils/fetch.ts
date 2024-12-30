/* eslint-disable @typescript-eslint/no-explicit-any */
import RSS from 'rss'
import { Readable } from 'stream'
import { Data } from '../schema/enums'
import { markdownToHtml } from './markdown'
import { SitemapStream, streamToPromise } from 'sitemap'
import StoryblokClient, {
  type ISbResponse,
  type ISbStoriesParams
} from 'storyblok-js-client'

export async function fetchStoryblok({
  startsWith,
  language = 'en',
  query = 'cdn/stories/'
}: {
  query?: string
  language?: ISbStoriesParams['language']
  startsWith?: ISbStoriesParams['starts_with']
}): Promise<ISbResponse['data']> {
  const Storyblok = new StoryblokClient({
    accessToken: process.env.NUXT_ENV_ACCESS_TOKEN
  })
  return await Storyblok.get(query, {
    language,
    ...(startsWith && { starts_with: startsWith }),
    version: process.env.NUXT_ENV_API_VERSION as ISbStoriesParams['version']
  })
    .then((response) => response.data)
    .catch((error) => console.error(error))
}

export async function fetchFeed(lang: 'eng' | 'esp' | 'ita'): Promise<string> {
  const feed = new RSS({
    title: Data.rss[lang].title,
    site_url: process.env.NUXT_ENV_DOMAIN!,
    feed_url: `${process.env.NUXT_ENV_DOMAIN}${Data.rss[lang].path}`,
    language: lang,
    description: Data.rss.description,
    generator: `${Data.name} RSS`,
    categories: [Data.rss[lang].category]
  })

  const data = await fetchStoryblok({
    startsWith: Data.rss.route,
    language: Data.rss[lang].language
  })
  const filteredStories = data.stories.filter(
    (story: { name: string }) => story.name.toLowerCase() !== Data.rss.route
  )

  filteredStories.forEach((post: any) => {
    feed.item({
      title: post.content.title,
      guid: post.id,
      author: post.content.author,
      url: `${process.env.NUXT_ENV_DOMAIN}${Data.rss.route}/${post.slug}`,
      description: post.content.intro,
      custom_elements: [
        { 'content:encoded': markdownToHtml(post.content.long_text) }
      ],
      date: new Date(post.content.date),
      enclosure: {
        url: post.content.file?.filename ?? Data.rss.image,
        size: 0,
        type: 'image/jpeg'
      }
    })
  })

  return feed.xml({ indent: true })
}

export async function fetchSitemap(): Promise<string> {
  const stream = new SitemapStream({ hostname: process.env.NUXT_ENV_DOMAIN })
  const data = await fetchStoryblok({ language: 'en', query: 'cdn/links' })

  const urls = Object.values(data.links ?? {}).reduce(
    (acc: any[], link: any) => {
      if (
        link.slug &&
        !link.is_startpage &&
        !new RegExp([...Data.ignore, ...Data.exclude].join('|')).test(
          link.slug.split('/')[0]
        )
      ) {
        let priority = 0.3
        if (/blog/.test(link.slug)) {
          priority = 0.7
        } else if (/portfolio/.test(link.slug)) {
          priority = 0.5
        }
        acc.push({ priority, url: link.slug, changefreq: 'monthly' })
      }
      return acc
    },
    []
  )

  return streamToPromise(Readable.from(urls).pipe(stream)).then((data) =>
    data.toString()
  )
}

export async function fetchStories(): Promise<string[]> {
  const routes: string[] = []
  const data = (await $fetch(
    Data.routes(process.env.NUXT_ENV_ACCESS_TOKEN!)
  )) as Record<string, object>

  Object.values(data.links ?? {}).forEach((link: any) => {
    if (link && !Data.exclude.includes(link.slug) && !link.is_startpage) {
      routes.push(`/${link.slug}`)
    }
  })

  return routes
}
