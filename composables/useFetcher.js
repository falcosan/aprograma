export const useFetcher = async options => {
  const app = useNuxtApp();
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
    {
      ...(!!watching && { watch: [locale] }),
      ...(!!!startsWith && {
        transform: res => ({ ...res, fetching_date: new Date() }),
        getCachedData(key) {
          const data = app.payload.data[key] || app.static.data[key]
          if (!data) return
          const expirationDate = new Date(data.fetching_date)
          expirationDate.setTime(expirationDate.getTime() + 10 * 1000)
          const isExpired = expirationDate.getTime() < Date.now()
          if (isExpired) return
          return data
        }
      })
    }
  );
  return { data };
};
