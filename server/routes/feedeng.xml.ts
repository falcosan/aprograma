import { fetchFeed } from '@/utils/fetch';
export default defineEventHandler(async event => {
  const feed = await fetchFeed('eng');
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feed);
});
