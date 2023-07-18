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
      title: story.name,
      meta,
      link: [
        {
          rel: 'canonical',
          href: `${config.public.envDomain}${route.path}`
        }
      ]
    });
  };
  const seoDynamic = story => {
    const image =
      story.image ||
      story.content.file?.filename ||
      story.content.image?.filename ||
      enums.content.image;
    const meta = [
      { property: 'og:site_name', content: enums.name },
      { key: 'og:type', property: 'og:type', content: 'website' },
      {
        name: 'description',
        content: story.content.intro
      },
      story.content.author && {
        name: 'author',
        content: story.content.author
      },
      story.content.date && {
        name: 'publish_date',
        property: 'og:publish_date',
        content: new Date(story.content.date).toISOString()
      },
      {
        property: 'og:url',
        content: `${config.public.envDomain}${route.path}`
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
        content: `${config.public.envDomain}${route.path}`
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
          href: `${config.public.envDomain}${route.path}`
        }
      ]
    });
  };
  const seoLayout = story => {
    const meta = [
      {
        name: 'google-site-verification',
        content: config.public.envGoogleSiteVerification
      },
      {
        name: 'description',
        content: enums.meta.description
      },
      { property: 'og:site_name', content: config.public.envDomain },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: config.public.envDomain
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
        content: config.public.envDomain
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
          href: config.public.envDomain
        }
      ]
    });
  };
  return { seoStatic, seoDynamic, seoLayout };
};
