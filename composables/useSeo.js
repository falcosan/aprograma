import enums from '@/enum';

export const useSeo = () => {
  const seo = story => {
    const webDomain = document.location.origin;
    const { path } = useRoute();
    const title = story.name ? `${story.name} - ${enums.name}` : null;
    const meta =
      story.content != null
        ? [
            {
              hid: 'description',
              name: 'description',
              content: `${story.content.title} - ${enums.name}`
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
              content: `${webDomain}${path}`
            },
            {
              hid: 'twitter:url',
              name: 'twitter:url',
              content: webDomain
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
              content: story
            }
          ];
    return {
      title,
      meta,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${webDomain}${path}`
        }
      ]
    };
  };
  return { seo };
};
