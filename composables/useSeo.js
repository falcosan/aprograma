import enums from '@/enum';

export const useSeo = () => {
  const seo = story => {
    const config = useRuntimeConfig();
    const route = { origin: config.public.origin, ...useRoute() };
    const title = `${story.content?.title ?? story.name} - ${enums.name}`;
    const meta =
      story.content != null
        ? [
            {
              hid: 'description',
              name: 'description',
              content: story.content.intro
            },
            {
              hid: 'og:title',
              name: 'og:title',
              content: story.content.title
            },
            {
              hid: 'og:description',
              property: 'og:description',
              content: story.content.intro
            },
            {
              hid: 'og:image',
              property: 'og:image',
              content: story.content.file ? story.content.file.filename : false
            },
            {
              hid: 'og:url',
              property: 'og:url',
              content: `${route.origin}${route.path}`
            },
            {
              hid: 'twitter:url',
              name: 'twitter:url',
              content: `${route.origin}${route.path}`
            },
            {
              hid: 'twitter:title',
              name: 'twitter:title',
              content: story.content.title
            },
            {
              hid: 'twitter:description',
              name: 'twitter:description',
              content: story.content.intro
            },
            {
              hid: 'twitter:image',
              name: 'twitter:image',
              content: story.content.file ? story.content.file.filename : false
            }
          ]
        : [
            {
              hid: 'description',
              name: 'description',
              content: story.description
            }
          ];
    return {
      title,
      meta,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${route.origin}${route.path}`
        }
      ]
    };
  };
  return { seo };
};
