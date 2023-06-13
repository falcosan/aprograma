import axios from 'axios';
import showdown from 'showdown';
import enums from '../enum';

export function fetchFeed() {
  const $md = new showdown.Converter();
  const createFeed = lang => {
    return {
      path: enums.rss[lang].path,
      async create(feed) {
        feed.options = {
          title: enums.rss[lang].title,
          link: `${process.env.NUXT_ENV_DOMAIN}${enums.rss[lang].path}`,
          description: enums.rss.description
        };
        feed.addCategory(enums.rss[lang].category);
        feed.addContributor({
          name: enums.rss.name,
          email: enums.rss.email,
          link: process.env.NUXT_ENV_DOMAIN
        });
        const data = await axios(enums.rss[lang].data);
        const dataFiltered = dataLang =>
          dataLang.data.stories.filter(
            filteredPost => filteredPost.name.toLowerCase() !== enums.rss.route
          );
        dataFiltered(data).forEach(post => {
          feed.addItem({
            title: post.content.title,
            image: post.content.file.filename ? post.content.file.filename : enums.rss.image,
            id: post.id,
            link: `${process.env.NUXT_ENV_DOMAIN}/${enums.rss.route}/${post.slug}`,
            description: post.content.intro,
            content: $md.makeHtml(post.content.long_text),
            published: new Date(post.content.date)
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    };
  };
  return ['eng', 'esp', 'ita'].map(lang => createFeed(lang));
}

export async function fetchSitemap() {
  const { data } = await axios(enums.routes);
  return Object.values(data.links)
    .map(link => {
      if (link.is_startpage) return link.slug;
      else return link;
    })
    .filter(Boolean);
}

export async function fetchStories(routes, page = 1) {
  const perPage = 100;
  const exclude = ['home', 'layout'];
  try {
    const res = await fetch(`${enums.routes}&per_page=${perPage}&page=${page}`);
    const data = await res.json();
    Object.values(data.links).forEach(link => {
      if (!exclude.includes(link.slug)) routes.push('/' + link.slug);
    });
    const total = res.headers.get('total');
    const maxPage = Math.ceil(total / perPage);
    if (maxPage > page) await fetchStories(routes, ++page);
  } catch (err) {
    console.error(err);
  }
}
