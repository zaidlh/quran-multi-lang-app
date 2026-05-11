// Enhanced Service Worker for Sakinah Quran App
const CACHE_NAME = "sakinah-v2";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
];

// Runtime caching for different resource types
const CACHE_STRATEGIES = {
  // Static assets - cache first
  static: {
    origin: "self",
    cachePattern: /\.(js|css|png|jpg|svg|ico|woff2?)$/,
    strategy: "cacheFirst",
    maxEntries: 50,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // API data - network first with cache fallback
  api: {
    origin: "api",
    cachePattern: /\/api\//,
    strategy: "networkFirst",
    maxEntries: 100,
    maxAge: 24 * 60 * 60, // 1 day
  },
  // Quran text - cache first for offline
  quran: {
    origin: "quran",
    cachePattern: /(everyayah|quranicaudio|cdn)\.com/,
    strategy: "cacheFirst",
    maxEntries: 200,
    maxAge: 365 * 24 * 60 * 60, // 1 year (offline Quran access)
  },
  // Fonts - cache first
  fonts: {
    origin: "fonts",
    cachePattern: /(fonts\.google|fontshare|gstatic)\.com/,
    strategy: "cacheFirst",
    maxEntries: 10,
    maxAge: 365 * 24 * 60 * 60,
  },
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Precache essential pages
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch event with strategy-based handling
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  // Skip non-http requests
  if (!request.url.startsWith("http")) return;

  const url = new URL(request.url);

  // Determine strategy based on URL
  let strategy = "networkFirst";

  for (const [, config] of Object.entries(CACHE_STRATEGIES)) {
    if (config.cachePattern.test(request.url)) {
      strategy = config.strategy;
      break;
    }
  }

  // Navigation requests - network first
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  // Strategy implementation
  switch (strategy) {
    case "cacheFirst":
      event.respondWith(cacheFirst(request));
      break;
    case "networkFirst":
    default:
      event.respondWith(networkFirst(request));
      break;
  }
});

// Cache-first strategy
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response("Offline", { status: 503 });
  }
}

// Network-first strategy with cache fallback
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;

    // Return offline page for navigation
    if (request.mode === "navigate") {
      return caches.match("/");
    }

    return new Response("Offline", { status: 503 });
  }
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-bookmarks") {
    event.waitUntil(syncBookmarks());
  }
  if (event.tag === "sync-progress") {
    event.waitUntil(syncProgress());
  }
});

async function syncBookmarks() {
  // Would sync bookmarks to server when online
  console.log("Syncing bookmarks...");
}

async function syncProgress() {
  // Would sync reading progress to server
  console.log("Syncing progress...");
}

// Push notifications for reminders
self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/icon-96.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/",
    },
    actions: [
      { action: "open", title: "Open" },
      { action: "dismiss", title: "Dismiss" },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Sakinah", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || "/")
    );
  }
});
