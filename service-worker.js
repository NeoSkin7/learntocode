importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js')

workbox.core.setCacheNameDetails({
    prefix: '',
    suffix: '',
    precache: 'precache'
});

workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
        cacheName: 'pages',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'font-stylesheets',
    })
);

workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
        cacheName: 'fonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: null },
    { url: '/404.html', revision: null },
    { url: '/stylesheet.css', revision: null },
    { url: '/code.css', revision: null },
    { url: '/service-worker.js', revision: null },
    { url: '/manifest.json', revision: null },
    { url: '/wip/index.html', revision: null },
    { url: '/archive/index.html', revision: null },
    { url: '/courses/index.html', revision: null },
    { url: '/updates/index.html', revision: null },
    { url: '/updates/join/index.html', revision: null },
    { url: '/updates/join/success/index.html', revision: null },
    { url: '/web-dev/index.html', revision: null },
    { url: '/_icons/favicon-196.png', revision: null },
    { url: '/_icons/manifest-icon-192.png', revision: null },
    { url: '/mages/archive.png', revision: null },
    { url: '/images/courses.png', revision: null },
    { url: '/images/home.png', revision: null },
    { url: '/images/logo.png', revision: null },
    { url: '/images/updates.png', revision: null },
    { url: '/images/archive.svg', revision: null },
    { url: '/images/cone.svg', revision: null },
    { url: '/images/courses.svg', revision: null },
    { url: '/images/home.svg', revision: null },
    { url: '/images/info.svg', revision: null },
    { url: '/images/logo.svg', revision: null },
    { url: '/images/note.svg', revision: null },
    { url: '/images/updates.svg', revision: null },
    { url: '/images/warning.svg', revision: null },
]);