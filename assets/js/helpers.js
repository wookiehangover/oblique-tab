var ob = require('oblique-strategies')
var setBackground = require('./unsplash-background')
var qs = document.querySelector.bind(document)

exports.renderCard = function renderCard() {
  var card = ob.draw();
  var elem = document.getElementById('strategy');
  elem.innerHTML = String(card);
}

exports.handleThemeClick = function handleThemeClick(cb) {
  var elem = qs('.controls .theme');
  elem.addEventListener('click', function(e) {
    e.preventDefault();
    var body = document.body;
    body.classList.toggle('dark');

    var theme = body.classList.contains('dark') ? 'dark': 'light';
    if (cb) {
      cb(theme)
    }
  });
}

exports.handleAboutClick = function handleAboutClick() {
  var body = document.body;
  var elem = qs('.controls .about');
  elem.addEventListener('click', function(e) {
    e.preventDefault();
    body.classList.toggle('show-about');
  });

  document.body.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) {
      body.classList.remove('show-about');
    }
  });

  var about = qs('.about-modal');
  about.addEventListener('click', function(e) {
    e.preventDefault();
    body.classList.remove('show-about');
  }, false);

  var aboutInner = qs('.about-modal .inner');
  aboutInner.addEventListener('click', function(e) {
    e.stopPropagation();
  }, false);
}


exports.setUnsplash = function setUnsplash(unsplash, cb) {
  var checkbox = qs('input[name="unsplash"]');

  if (unsplash === true) {
    setBackground()
    checkbox.setAttribute('checked', true);
  }

  checkbox.addEventListener('change', function(e) {
    var bg;
    if (e.currentTarget.checked) {
      setBackground();
    } else if (bg = document.querySelector('.bg')) {
      bg.style.background = null
    }
    if (cb) {
      cb(e.currentTarget.checked)
    }
  }, true);
}

exports.updateVersion = function updateVersion(version) {
  var elem = document.getElementById('ext-version');
  elem.innerText = 'v' + version;
}
