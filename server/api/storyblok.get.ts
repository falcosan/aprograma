import { fetchStoryblok } from '@/utils/fetch'
import type { ISbStoriesParams } from 'storyblok-js-client'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const slug = query.slug ?? ''
  const language = query.lang as ISbStoriesParams['language']
  const startsWith = query.startsWith as ISbStoriesParams['starts_with']
  return await fetchStoryblok({
    language,
    startsWith,
    query: `cdn/stories/${slug}`
  })
})
