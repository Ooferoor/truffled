importScripts('/active/uv.bundle.js');
importScripts('/active/uv.config.js');
importScripts('/active/uv.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));
