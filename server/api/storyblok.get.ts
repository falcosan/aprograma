import type { ISbStoriesParams } from 'storyblok-js-client';
import { fetchStoryblok } from '@/services/fetch';

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const config = useRuntimeConfig();
  const host = getRequestHeader(event, 'host');
  const auth = getResponseHeader(event, 'x-auth');
  if (auth === config.envXAuth && host && new RegExp(host).test(config.public.envDomain)) {
    const slug = query.slug ?? '';
    const language = query.lang as ISbStoriesParams['language'];
    const startsWith = query.starts_with as ISbStoriesParams['starts_with'];
    const version = config.public.envApiVersion as ISbStoriesParams['version'];
    return await fetchStoryblok(language, startsWith, `cdn/stories/${slug}`, false, version);
  }
});
