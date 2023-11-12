import { clientsClaim } from 'workbox-core'
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope

self.skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

try {
    const handler = createHandlerBoundToURL('/index.html');
    const route = new NavigationRoute(handler);
    registerRoute(route);
} catch (error) {
    console.warn('Error while registering cache route', { error });
}

//Your service-worker code here.