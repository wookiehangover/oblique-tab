var ob = require('oblique-strategies');
var version = require('../../ext/manifest.json').version;
var setBackground = require('./unsplash-background');
var qs = document.querySelector.bind(document);

function renderCard() {
  var card = ob.draw();
  var elem = document.getElementById('strategy');
  elem.innerHTML = String(card);
}

function handleThemeClick() {
  var elem = qs('.controls .theme');
  elem.addEventListener('click', function(e) {
    e.preventDefault();
    var body = document.body;
    body.classList.toggle('dark');

    var theme = body.classList.contains('dark') ? 'dark': 'light';
    chrome.storage.sync.set({ theme: theme });
  });
}

function handleAboutClick() {
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

function updateVersion() {
  var elem = document.getElementById('ext-version');
  elem.innerText = 'v' + version;
}

function setUnsplash(resp) {
  var unsplash = resp.unsplash;
  var checkbox = document.querySelector('input[name="unsplash"]');

  if (unsplash == true) {
    setBackground();
    checkbox.setAttribute('checked', true);
  }

  checkbox.addEventListener('change', function(e) {
    var bg;
    chrome.storage.sync.set({
      unsplash: e.currentTarget.checked
    });

    if (e.currentTarget.checked) {
      setBackground();
    } else if (bg = document.querySelector('.bg')) {
      bg.remove();
    }
  }, true);
}

var getTheme = new Promise(function(resolve, reject) {
  chrome.storage.sync.get('theme', function(item) {
    resolve(item.theme);
  });
  setTimeout(reject, 3000);
});

getTheme.then(function(theme) {
  if (theme === 'dark') {
    document.body.classList.toggle('dark');
  }
  setTimeout(function() {
    document.body.classList.add('ready');
  }, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
  renderCard();
  updateVersion();
  handleThemeClick();
  handleAboutClick();
  chrome.storage.sync.get('unsplash', setUnsplash);
});
