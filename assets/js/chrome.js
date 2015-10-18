var version = require('../../ext/manifest.json').version
var helpers = require('./helpers')

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get('theme', function(item) {
    if (item.theme === 'dark') {
      document.body.classList.toggle('dark')
    }
    setTimeout(function() {
      document.body.classList.add('ready')
    }, 1000)
  })

  helpers.renderCard()

  helpers.updateVersion(version)

  helpers.handleAboutClick()

  helpers.handleThemeClick(function(theme) {
    chrome.storage.sync.set({ theme: theme })
  })

  chrome.storage.sync.get('unsplash', function(resp) {
    console.log(resp)
    helpers.setUnsplash(resp.unsplash, function(checked) {
      chrome.storage.sync.set({
        unsplash: checked
      })
    })
  })

  chrome.storage.sync.get('bighead', function(resp) {
    helpers.setUnsplash(resp.bighead, function(checked) {
      chrome.storage.sync.set({
        bighead: checked
      })
    })
  })

})
