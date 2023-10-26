export default defineEventHandler(async event => {
  const feed = await fetchFeed('ita');
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feed);
});
