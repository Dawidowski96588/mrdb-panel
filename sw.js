// Only this public offline page is cached. API responses, documents and sessions are never cached.
const PREFIX='mrdb-public-'+self.registration.scope;
const CACHE=PREFIX+'v1';
const OFFLINE=new URL('offline.html',self.registration.scope).href;
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.add(new Request(OFFLINE,{cache:'reload'})))));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||event.request.mode!=='navigate'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith(fetch(event.request,{cache:'no-cache'}).catch(()=>caches.match(OFFLINE).then(page=>page||Response.error())));
});

// Build: index-B8_5yRHE.js
