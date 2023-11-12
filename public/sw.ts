import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'cache-v1';
const ASSETS = ['/index.html', '/_nuxt/', '/manifest.json'];

registerRoute(({ url }) => ASSETS.some(asset => asset.startsWith(url.pathname)), new CacheFirst());
self.addEventListener('install', (event: ExtendableEvent) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', (event: ExtendableEvent) => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      );
    })
  );
});
self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
