export default {}
declare let self: ServiceWorkerGlobalScope

const cache = 'cache_V1'
const assets = ['/']

self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(cache).then((cache: Cache) => {
            return Promise.all(assets.map(async (url) => {
                const response = await fetch(url);
                return await cache.put(url, response);
            }));
        })
    );
});

self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        caches.match(event.request).then((response: Response | undefined) => {
            return response || fetch(event.request);
        })
    );
});
