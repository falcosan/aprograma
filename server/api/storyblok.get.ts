import StoryblokClient from 'storyblok-js-client';

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const version: any = config.public.envApiVersion;
  const language: any = query.lang;
  const Storyblok = new StoryblokClient({ accessToken: config.envAccessToken });
  return await Storyblok.get(`cdn/stories/${query.slug}`, { version, language })
    .then(response => response.data)
    .catch(error => console.error(error));
});
