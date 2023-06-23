import enums from '@/enum';

export const useSeo = () => {
  const route = useRoute();
  const config = useRuntimeConfig();
  const seoStatic = story => {
    const meta = [
      {
        name: 'description',
        content: story.description
      }
    ];
    return useHead({
      title: `${story.name} - ${enums.name}`,
      meta,
      link: [
        {
          rel: 'canonical',
          href: `${config.public.origin}${route.path}`
        }
      ]
    });
  };
  const seoDynamic = story => {
    const image =
      story.image ||
      story.content.file?.filename ||
      story.content.image?.filename ||
      'https://a.storyblok.com/f/106240/4065x1468/5c83c3e7de/noimeageteaser.png';
    const meta = [
      { property: 'og:site_name', content: enums.name },
      { key: 'og:type', property: 'og:type', content: 'website' },
      {
        key: 'description',
        name: 'description',
        content: story.content.intro
      },
      {
        property: 'og:url',
        content: `${config.public.origin}${route.path}`
      },
      {
        property: 'og:title',
        content: story.content.title
      },
      {
        property: 'og:description',
        content: story.content.intro
      },
      {
        property: 'og:image',
        content: image
      },
      { name: 'twitter:site', content: enums.meta.og.twitter },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:url',
        content: `${config.public.origin}${route.path}`
      },
      {
        name: 'twitter:title',
        content: story.content.title
      },
      {
        name: 'twitter:description',
        content: story.content.intro
      },
      {
        name: 'twitter:image',
        content: image
      }
    ];
    return useHead({
      title: story.content.title,
      meta,
      link: [
        {
          rel: 'canonical',
          href: `${config.public.origin}${route.path}`
        }
      ]
    });
  };
  const seoLayout = story => {
    const meta = [
      {
        name: 'google-site-verification',
        content: config.public.verification
      },
      {
        name: 'description',
        content: enums.meta.description
      },
      { property: 'og:site_name', content: config.public.origin },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: config.public.origin
      },
      {
        property: 'og:title',
        content: enums.meta.title
      },
      {
        property: 'og:description',
        content: enums.meta.description
      },
      {
        property: 'og:image',
        content: enums.meta.og.image
      },
      { name: 'twitter:site', content: enums.meta.og.twitter },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:url',
        content: config.public.origin
      },
      {
        name: 'twitter:title',
        content: enums.meta.title
      },
      {
        name: 'twitter:description',
        content: enums.meta.description
      },
      {
        name: 'twitter:image',
        content: enums.meta.og.image
      }
    ];
    return useHead({
      htmlAttrs: { lang: story.language },
      charset: 'utf-8',
      title: enums.meta.title,
      titleTemplate: title => (title !== enums.meta.title ? `${title} - ${enums.name}` : title),
      meta,
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'canonical',
          href: config.public.origin
        }
      ]
    });
  };
  return { seoStatic, seoDynamic, seoLayout };
};
