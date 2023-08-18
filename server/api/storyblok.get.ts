import { ISbStoriesParams } from 'storyblok-js-client';
import { fetchStoryblok } from '@/services/fetch';

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const auth = getResponseHeader(event, 'x-auth');
  const cors = getRequestHeader(event, 'sec-fetch-mode');
  if (auth === config.envXAuth && (cors === undefined || cors === 'cors')) {
    const query = getQuery(event);
    const slug = query.slug ?? '';
    const language = query.lang as ISbStoriesParams['language'];
    const startsWith = query.starts_with as ISbStoriesParams['starts_with'];
    const version = config.public.envApiVersion as ISbStoriesParams['version'];
    return await fetchStoryblok(language, startsWith, `cdn/stories/${slug}`, false, version);
  }
});
