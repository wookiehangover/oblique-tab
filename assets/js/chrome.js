var version = require('../../ext/manifest.json').version
var helpers = require('./helpers')

function sendDimensions() {
  navigator.serviceWorker.controller.postMessage({
    width: window.outerWidth,
    height: window.outerHeight
  })
}

if (navigator.serviceWorker) {
  if (navigator.serviceWorker.controller) {
    console.log('SW active')
    sendDimensions()
  } else {
    navigator.serviceWorker.register('service-worker.js')
      .then(function() {
        console.log('SW registration successful')
      })
  }
}

helpers.renderCard()

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get('theme', function(item) {
    if (item.theme === 'dark') {
      document.body.classList.toggle('dark')
    }
    setTimeout(function() {
      document.body.classList.add('ready')
    }, 1000)
  })

  helpers.updateVersion(version)

  helpers.handleAboutClick()

  helpers.handleThemeClick(function(theme) {
    chrome.storage.sync.set({ theme: theme })
  })

  chrome.storage.sync.get('unsplash', function(resp) {
    helpers.setUnsplash(resp.unsplash, function(checked) {
      chrome.storage.sync.set({
        unsplash: checked
      })
    })
  })
})

