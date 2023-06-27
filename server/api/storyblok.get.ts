import { ISbStoriesParams } from 'storyblok-js-client';
import { fetchStoryblok } from '@/services/fetch';

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const auth = getResponseHeader(event, 'x-auth');
  const cors = getRequestHeader(event, 'sec-fetch-mode');
  if (auth === config.envXAuth && (cors === undefined || cors === 'cors')) {
    const query = getQuery(event);
    const version = config.public.envApiVersion as ISbStoriesParams['version'];
    const language = query.lang as ISbStoriesParams['language'];
    const startsWith = query.starts_with as ISbStoriesParams['starts_with'];
    return await fetchStoryblok(language, startsWith, `cdn/stories/${query.slug}`, false, version);
  }
});
