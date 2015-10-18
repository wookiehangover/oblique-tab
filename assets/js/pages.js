var version = require('../../ext/manifest.json').version
var helpers = require('./helpers')

document.addEventListener('DOMContentLoaded', function() {
  var theme = localStorage.getItem('theme')
  if (theme === 'dark') {
    document.body.classList.toggle('dark')
  }

  setTimeout(function() {
    helpers.renderCard()
    document.body.classList.add('ready')
  }, 1000)

  helpers.updateVersion(version)

  helpers.handleAboutClick()

  helpers.handleThemeClick(function(theme) {
    window.localStorage.setItem('theme', theme)
  })

  var bighead = JSON.parse(localStorage.getItem('big-head'))
  helpers.setBigHead(bighead, function(checked) {
    window.localStorage.setItem('big-head', checked)
  })

  var unsplash = JSON.parse(localStorage.getItem('unsplash'))
  helpers.setUnsplash(unsplash, function(checked) {
    window.localStorage.setItem('unsplash', checked)
  })
})
