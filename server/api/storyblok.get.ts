import type { ISbStoriesParams } from 'storyblok-js-client';
import { fetchStoryblok } from '@/services/fetch';

export default defineEventHandler(async event => {
  const query = getQuery(event);
  const config = useRuntimeConfig();
  const host = getRequestHeader(event, 'host');
  const auth = getResponseHeader(event, 'x-auth');
  const cors = getResponseHeader(event, 'access-control-allow-origin');
  if (auth === config.envXAuth && Array.isArray(cors) && new RegExp(host || '').test(cors[0])) {
    const slug = query.slug ?? '';
    const language = query.lang as ISbStoriesParams['language'];
    const startsWith = query.starts_with as ISbStoriesParams['starts_with'];
    const version = config.public.envApiVersion as ISbStoriesParams['version'];
    return await fetchStoryblok(language, startsWith, `cdn/stories/${slug}`, false, version);
  }
});
