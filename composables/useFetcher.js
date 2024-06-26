export const useFetcher = async options => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const { slug, startsWith, watching } = options;
  const { data } = await useAsyncData(
    `${slug}-${locale.value}`,
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
    { ...(!!watching && { watch: [locale] }) }
  );
  return { data };
};
