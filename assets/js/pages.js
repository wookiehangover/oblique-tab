var ob = require('oblique-strategies');
var version = require('../../ext/manifest.json').version;
var setBackground = require('./unsplash-background');

function renderCard() {
  var card = ob.draw();
  var elem = document.getElementById('strategy');
  elem.innerHTML = String(card);
}

function handleThemeClick() {
  var elem = document.querySelector('.controls .theme');
  elem.addEventListener('click', function(e) {
    e.preventDefault();
    var body = document.body;
    body.classList.toggle('dark');

    var theme = body.classList.contains('dark') ? 'dark': 'light';
    localStorage.setItem('theme', theme);
  });
}

function handleAboutClick() {
  var body = document.body;
  var elem = document.querySelector('.controls .about');
  elem.addEventListener('click', function(e) {
    e.preventDefault();
    body.classList.toggle('show-about');
  });

  document.body.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) {
      body.classList.remove('show-about');
    }
  });

  var about = document.querySelector('.about-modal');
  about.addEventListener('click', function(e) {
    e.preventDefault();
    body.classList.remove('show-about');
  }, false);

  var aboutInner = document.querySelector('.about-modal .inner');
  aboutInner.addEventListener('click', function(e) {
    e.stopPropagation();
  }, false);
}

function updateVersion() {
  var elem = document.getElementById('ext-version');
  elem.innerText = 'v' + version;
}

function setUnsplash() {
  var unsplash = localStorage.getItem('unsplash');
  var checkbox = document.querySelector('input[name="unsplash"]');

  if (unsplash == 'true') {
    setBackground();
    checkbox.setAttribute('checked', true);
  }

  checkbox.addEventListener('change', function(e) {
    var bg;
    localStorage.setItem('unsplash', e.currentTarget.checked);

    if (e.currentTarget.checked) {
      setBackground();
    } else if (bg = document.querySelector('.bg')) {
      bg.remove();
    }
  }, true);
}

document.addEventListener('DOMContentLoaded', function() {
  var theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.toggle('dark');
  }
  setTimeout(function() {
    document.body.classList.add('ready');
  }, 1000);
  renderCard();
  updateVersion();
  setUnsplash();
  handleThemeClick();
  handleAboutClick();
});
