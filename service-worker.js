
function cacheBackground(url) {
  return fetch(url).then(function(response) {
    return caches.open('offline').then(function(cache) {
      console.log('Cached next background image', response.url)
      return cache.put('background', response)
    })
  })
}


self.addEventListener('install', function(event) {
  event.waitUntil(
    cacheBackground('https://unsplash.it/1920/1200/?random')
  )
})

self.addEventListener('fetch', function(event) {

  var request = event.request;
  if (request.method === 'GET' && request.url.includes('unsplash') ) {
    event.respondWith(
      caches.open('offline').then(function(cache) {
        return cache.match('background')
      })
    )
  }

});

self.addEventListener('message', function(event) {
  if (event.data.width && event.data.height) {
    cacheBackground(`https://unsplash.it/${event.data.width}/${event.data.height}/?random`)
  }
})
