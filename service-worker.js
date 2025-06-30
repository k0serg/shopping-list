const CACHE_NAME = 'shopping-list-cache-v2';
const ASSETS_TO_CACHE = [
  '/shopping-list',
  '/shopping-list/index.html',
  '/shopping-list/offline.html',
  '/shopping-list/manifest.json',
  '/shopping-list/idb.js',
  '/shopping-list/service-worker.js',
  '/shopping-list/icons/icon-192x192.png',
  '/shopping-list/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.headers.get('Accept').includes('text/html')) {
    // HTML-запросы
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/offline.html');
      })
    );
  } else {
    // Другие запросы
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).catch(() => {
          return caches.match('/offline.html');
        });
      })
    );
  }
});
