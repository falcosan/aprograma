import { fetchSitemap } from '@/utils/fetch';
export default defineEventHandler(async event => {
  const sitemap = await fetchSitemap();
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(sitemap);
});
