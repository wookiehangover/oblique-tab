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
    sendDimensions()
  } else {
    navigator.serviceWorker.register('service-worker.js')
  }
}

helpers.renderCard()

document.addEventListener('DOMContentLoaded', function() {
  var theme = localStorage.getItem('theme')
  if (theme === 'dark') {
    document.body.classList.toggle('dark')
  }

  document.body.classList.add('ready')

  helpers.updateVersion(version)

  helpers.handleAboutClick()

  helpers.handleThemeClick(function(theme) {
    window.localStorage.setItem('theme', theme)
  })

  var unsplash = JSON.parse(localStorage.getItem('unsplash'))
  helpers.setUnsplash(unsplash, function(checked) {
    window.localStorage.setItem('unsplash', checked)
  })
})
