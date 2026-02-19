
const STATIC_CACHE_NAME = 're-crm-static-v2';
const DYNAMIC_CACHE_NAME = 're-crm-dynamic-v2';

const urlsToCache = [
  '/',
  '/index.html',
  'manifest.json',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Opened static cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;

  // For non-GET requests, we just try the network. 
  // If it fails, the application logic will handle queuing.
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // Use a "stale-while-revalidate" strategy for GET requests.
  // This provides a fast response from cache while updating it in the background.
  event.respondWith(
    caches.open(DYNAMIC_CACHE_NAME).then(cache => {
      return cache.match(request).then(response => {
        const fetchPromise = fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });
        // Return cached version immediately, while the network request runs in the background.
        return response || fetchPromise;
      });
    })
  );
});

// Background Sync listener. This is triggered when the connection is restored.
self.addEventListener('sync', event => {
  if (event.tag === 'sync-leads' || event.tag === 'sync-tasks') {
    console.log(`Service Worker: Sync event triggered for "${event.tag}".`);
    // Notify all open clients that it's time to sync.
    event.waitUntil(
      self.clients.matchAll().then(clients => {
        return Promise.all(clients.map(client => {
          return client.postMessage({ type: 'SYNC_DATA' }); // Generic sync trigger
        }));
      })
    );
  }
});

// Push Notification listener
self.addEventListener('push', event => {
    console.log('[Service Worker] Push Received.');
    const data = event.data ? event.data.json() : { title: 'New Alert', body: 'Something new happened!' };
    
    const options = {
        body: data.body,
        icon: '/icons/icon-192x192.svg',
        badge: '/icons/icon-192x192.svg',
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification Click listener
self.addEventListener('notificationclick', event => {
    console.log('[Service Worker] Notification click Received.');
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});