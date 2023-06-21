import enums from '@/enum';

export const useSeo = () => {
  const seo = story => {
    const config = useRuntimeConfig();
    const route = { origin: config.public.origin, ...useRoute() };
    useHead({
      link: [
        {
          rel: 'canonical',
          href: `${route.origin}${route.path}`
        }
      ]
    });
    useSeoMeta({
      title: `${story.content?.title ?? story.name} - ${enums.name}`,
      ...(story.content != null
        ? {
            description: story.content.intro,
            ogTitle: story.content.title,
            ogDescription: story.content.intro,
            ogImage: story.content.file?.filename ?? story.content.image?.filename ?? undefined,
            ogUrl: `${route.origin}${route.path}`,
            twitterSite: `${route.origin}${route.path}`,
            twitterTitle: story.content.title,
            twitterImage: story.content.file?.filename ?? story.content.image?.filename ?? undefined
          }
        : {
            description: story.description
          })
    });
  };
  return { seo };
};
