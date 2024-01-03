export const useFetcher = options => {
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const fetcher = async () => {
    const data = await $fetch('/api/storyblok', {
      headers: { 'x-auth': config.public.envXAuth },
      params: { ...options, lang: locale.value }
    });
    return data.story ?? data.stories;
  };
  return {
    fetcher
  };
};
