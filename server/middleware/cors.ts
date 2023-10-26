export default defineEventHandler(event => {
  const config = useRuntimeConfig();
  const headers = {
    'X-XSS-Protection': 1,
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Access-Control-Allow-Origin': [
      config.public.envDomain,
      config.public.envDomain.replace(/\/$/, '')
    ],
    'Content-Security-Policy':
      "base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests; font-src 'self' https: data:; img-src * 'self' https: data:; style-src 'self' https: 'unsafe-inline'; script-src 'self' https: 'unsafe-inline'; script-src-attr 'self' https: 'unsafe-inline';"
  };
  setHeaders(event, headers);
});
