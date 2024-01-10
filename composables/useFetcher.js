export const useFetcher = async options => {
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const { slug, startsWith } = options;
  const { data } = await useAsyncData(
    slug,
    async () => {
      const data = await $fetch('/api/storyblok', {
        headers: { 'x-auth': config.public.envXAuth },
        params: {
          lang: locale.value,
          ...(startsWith ? { startsWith } : { slug })
        }
      });
      return data.story ?? data.stories;
    },
    { watch: [locale] }
  );
  return {
    data
  };
};
