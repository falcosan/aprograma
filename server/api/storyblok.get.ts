import StoryblokClient from 'storyblok-js-client';

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const auth = getResponseHeader(event, 'x-auth');
  const cors = getRequestHeader(event, 'sec-fetch-mode');
  if (auth === config.envXAuth && (cors === undefined || cors === 'cors')) {
    const query = getQuery(event);
    const version: any = config.public.envApiVersion;
    const language: any = query.lang;
    const startsWith: any = query.starts_with;
    const Storyblok = new StoryblokClient({ accessToken: config.envAccessToken });
    return await Storyblok.get(`cdn/stories/${query.slug}`, {
      version,
      language,
      ...(startsWith && { starts_with: startsWith })
    })
      .then(response => response.data)
      .catch(error => console.error(error));
  }
});
