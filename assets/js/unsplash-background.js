var imagesLoaded = require('imagesloaded')

function appendImage(src) {
  var img = new Image()
  img.src = src
  imagesLoaded(img).on('done', function() {
    var bg = document.querySelector('.bg')
    bg.style.setProperty('background-image', 'url(' + src + ')')
    bg.classList.remove('fade-in')
  })
}

module.exports = function () {
  appendImage('https://unsplash.it/' + window.outerWidth + '/' + window.outerHeight + '/?random')
}
