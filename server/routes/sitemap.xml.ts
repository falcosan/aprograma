import { fetchSitemap } from '@/services/fetch';

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const sitemap = await fetchSitemap(config.public.origin);
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(sitemap);
});
