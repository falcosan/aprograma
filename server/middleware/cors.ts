export default defineEventHandler(event => {
  const config = useRuntimeConfig();
  setResponseHeaders(event, {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': config.public.envDomain,
    'Access-Control-Allow-Methods': 'GET,HEAD'
  });
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = 'No Content.';
    return 'OK';
  }
});
