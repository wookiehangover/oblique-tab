var request = require('superagent')
var imagesLoaded = require('imagesloaded')

function appendImage(src) {
  var img = new Image()
  img.src = src
  imagesLoaded(img).on('done', function() {
    var div = document.createElement('div')
    div.className = 'bg fade-in'
    div.style.setProperty('background-image', 'url(' + src + ')')
    document.body.appendChild(div)

    setTimeout(function() {
      div.classList.remove('fade-in')
    }, 100)
  })
}

module.exports = function () {
  appendImage('https://unsplash.it/' + window.outerWidth + '/' + window.outerHeight + '/?random')
}
