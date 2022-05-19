import { precacheAndRoute/*, createHandlerForURL*/ } from 'workbox-precaching'
//import { NavigationRoute, registerRoute } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST);


self.addEventListener("install", function(event) {
  console.log(`start server worker`)
});
/*
self.addEventListener("fetch", function(event) {
  console.log(`start server worker`)
});*/
/*
self.importScripts('node_modules/sw-toolbox/sw-toolbox.js');

self.toolbox.precache(['/images/logo-small.svg', '/images/web-icons/webicon-twitter.svg', '/images/web-icons/webicon-facebook.svg']);
self.toolbox.router.get('/*', toolbox.networkFirst);
*/

//precacheAndRoute(self.__precacheManifest);
