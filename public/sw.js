const cache = 'cache_V1'
const assets = ['/']

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cache).then((cache) => {
            return Promise.all(assets.map(async (url) => {
                const response = await fetch(url);
                return await cache.put(url, response);
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
