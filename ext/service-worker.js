
function cacheBackground(url) {
  return fetch(url).then(function(response) {
    return caches.open('offline').then(function(cache) {
      return cache.put('http://unsplash.it/1920/1200/?random', response)
    })
  })
}


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('offline').then(function(cache) {
      return cache.add('http://unsplash.it/1920/1200/?random')
    })
  )
})

self.addEventListener('fetch', function(event) {

  var request = event.request;
  if (request.method === 'GET' && request.url.includes('unsplash') ) {
    event.respondWith(
      caches.open('offline').then(function(cache) {
        return cache.match('http://unsplash.it/1920/1200/?random')
      })
    )
  }

});

self.addEventListener('message', function(event) {
  if (event.data.width && event.data.height) {
    cacheBackground(`http://unsplash.it/${event.data.width}/${event.data.height}/?random`)
  }
})
