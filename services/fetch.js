import RSS from 'rss';
import axios from 'axios';
import showdown from 'showdown';
import enums from '../enum';

export async function fetchFeed(lang) {
  const $md = new showdown.Converter();
  const feed = new RSS({
    title: enums.rss[lang].title,
    site_url: process.env.NUXT_ENV_DOMAIN,
    feed_url: `${process.env.NUXT_ENV_DOMAIN}${enums.rss[lang].path}`,
    language: lang,
    description: enums.rss.description,
    generator: `${enums.name} RSS`,
    category: enums.rss[lang].category
  });
  const data = await axios(enums.rss[lang].data);
  const dataFiltered = dataLang =>
    dataLang.data.stories.filter(
      filteredPost => filteredPost.name.toLowerCase() !== enums.rss.route
    );
  dataFiltered(data).forEach(post => {
    feed.item({
      title: post.content.title,
      image: post.content.file.filename ? post.content.file.filename : enums.rss.image,
      guid: post.id,
      author: post.content.author,
      url: `${process.env.NUXT_ENV_DOMAIN}/${enums.rss.route}/${post.slug}`,
      description: post.content.intro,
      custom_elements: [{ 'content:encoded': $md.makeHtml(post.content.long_text) }],
      date: new Date(post.content.date),
      enclosure: {
        url: post.content.file.filename ? post.content.file.filename : enums.rss.image,
        length: 0,
        type: 'image/jpeg'
      }
    });
  });
  return feed.xml({ indent: true });
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
