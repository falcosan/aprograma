import { Readable } from 'stream';
import RSS from 'rss';
import StoryblokClient from 'storyblok-js-client';
import { SitemapStream, streamToPromise } from 'sitemap';
import enums from './enums';
import { markdownToHtml } from './markdown';

export async function fetchStoryblok(
  language = 'en',
  startsWith,
  query = 'cdn/stories/',
  lastCache = false,
  version = process.env.NUXT_ENV_API_VERSION
) {
  const Storyblok = new StoryblokClient({ accessToken: process.env.NUXT_ENV_ACCESS_TOKEN });
  return await Storyblok.get(query, {
    version,
    language,
    ...(lastCache && { cv: 'CURRENT_TIMESTAMP' }),
    ...(startsWith && { starts_with: startsWith })
  })
    .then(response => response.data)
    .catch(error => console.error(error));
}

export async function fetchFeed(lang) {
  const feed = new RSS({
    title: enums.rss[lang].title,
    site_url: process.env.NUXT_ENV_DOMAIN,
    feed_url: `${process.env.NUXT_ENV_DOMAIN}${enums.rss[lang].path}`,
    language: lang,
    description: enums.rss.description,
    generator: `${enums.name} RSS`,
    category: enums.rss[lang].category
  });
  const language = enums.rss[lang].language;
  const data = await fetchStoryblok(language, enums.rss.route, 'cdn/stories/', true);
  const dataFiltered = dataLang =>
    dataLang.stories.filter(filteredPost => filteredPost.name.toLowerCase() !== enums.rss.route);
  dataFiltered(data).forEach(post => {
    feed.item({
      title: post.content.title,
      image: post.content.file?.filename ?? enums.rss.image,
      guid: post.id,
      author: post.content.author,
      url: `${process.env.NUXT_ENV_DOMAIN}${enums.rss.route}/${post.slug}`,
      description: post.content.intro,
      custom_elements: [{ 'content:encoded': markdownToHtml(post.content.long_text) }],
      date: new Date(post.content.date),
      enclosure: {
        url: post.content.file?.filename ?? enums.rss.image,
        length: 0,
        type: 'image/jpeg'
      }
    });
  });
  return feed.xml({ indent: true });
}

export async function fetchSitemap() {
  const links = [];
  const stream = new SitemapStream({ hostname: process.env.NUXT_ENV_DOMAIN });
  const data = await fetchStoryblok('en', null, 'cdn/links');
  const urls = Object.values(data.links)
    .map(link => {
      if (!link.is_folder && !link.is_startpage && link.slug.includes('/')) {
        return link.slug;
      } else if (link.path != null && link.path !== '/') {
        return link.path.substring(0, link.path.lastIndexOf('/'));
      } else {
        return false;
      }
    })
    .filter(link => link && !new RegExp(enums.ignore.join('|')).test(link.split('/')[0]));
  for (const url of urls) {
    let priority = 0.3;
    if (/blog/.test(url)) priority = 0.7;
    else if (/portfolio/.test(url)) priority = 0.5;
    links.push({ url, changefreq: 'monthly', priority });
  }
  return streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());
}

export async function fetchStories() {
  const routes = [];
  const exclude = ['home', 'layout'];
  const res = await fetch(enums.routes(process.env.NUXT_ENV_ACCESS_TOKEN));
  const data = await res.json();
  Object.values(data.links).forEach(link => {
    if (link && !exclude.includes(link.slug) && !link.is_startpage) routes.push(`/${link.slug}`);
  });
  return routes;
}
