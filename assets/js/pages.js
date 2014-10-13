var ob = require('oblique-strategies');
var version = require('../../ext/manifest.json').version;

function renderCard() {
  var card = ob.draw();
  var elem = document.getElementById('strategy');
  elem.innerText = String(card);
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
}

function updateVersion() {
  var elem = document.getElementById('ext-version');
  elem.innerText = 'v' + version;
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
  handleThemeClick();
  handleAboutClick();
});
