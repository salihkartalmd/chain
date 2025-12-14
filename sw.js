const CACHE_NAME = 'zincir-static-v4';
const DYNAMIC_CACHE = 'zincir-dynamic-v4';

// App Shell assets (Critical for startup)
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com' // Cache external CSS framework
];

// Install Event
self.addEventListener('install', (evt) => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event
self.addEventListener('activate', (evt) => {
  self.clients.claim();
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
        .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (evt) => {
  const url = new URL(evt.request.url);

  // Strategy for Tailwind CDN and static assets: Cache First, then Network
  if (url.hostname === 'cdn.tailwindcss.com' || url.pathname.endsWith('.png') || url.pathname.endsWith('.ico')) {
    evt.respondWith(
      caches.match(evt.request).then((cacheRes) => {
        return cacheRes || fetch(evt.request).then((fetchRes) => {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        });
      })
    );
    return;
  }

  // Strategy for Main App Logic (JS/HTML): Network First, fall back to Cache
  // This ensures updates are seen immediately if online, but works if offline.
  evt.respondWith(
    fetch(evt.request)
      .then((fetchRes) => {
        return caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        });
      })
      .catch(() => {
        // If offline, return from cache
        return caches.match(evt.request).then((cacheRes) => {
          if (cacheRes) return cacheRes;
          // Fallback to index.html for SPA navigation
          if (evt.request.url.indexOf('.html') > -1 || evt.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});