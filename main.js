(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ob = require('oblique-strategies');
var version = require('../../ext/manifest.json').version;

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

},{"../../ext/manifest.json":2,"oblique-strategies":3}],2:[function(require,module,exports){
module.exports={
  "name": "Oblique Strategies Tab",
  "version": "1.0.0",
  "manifest_version": 2,
  "description": "A tab replacement based on Oblique Strategies by Brian Eno and Peter Schmidt",
  "homepage_url": "https://github.com/wookiehangover/oblique-tab",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "chrome_url_overrides": {
    "newtab": "src/newtab.html"
  },
  "permissions": [
    "storage"
  ]
}

},{}],3:[function(require,module,exports){
var strategies =
[
    '(Organic) machinery',
    'A line has two sides',
    'A very small object         Its center',
    'Abandon desire',
    'Abandon normal instructions',
    'Abandon normal instruments',
    'Accept advice',
    'Accretion',
    'Adding on',
    'Allow an easement (an easement is the abandonment of a stricture)',
    'Always first steps',
    'Always give yourself credit for having more than personality (given by Arto Lindsay)',
    'Are there sections?  Consider transitions',
    'Ask people to work against their better judgement',
    'Ask your body',
    'Assemble some of the elements in a group and treat the group',
    'Balance the consistency principle with the inconsistency principle',
    'Be dirty',
    'Be extravagant',
    'Be less critical',
    'Breathe more deeply',
    'Bridges\n--build\n--burn',
    'Cascades',
    'Change ambiguities to specifics',
    'Change instrument roles',
    'Change nothing and continue with immaculate consistency',
    'Change specifics to ambiguities',
    'Children\n--speaking\n--singing',
    'Cluster analysis',
    'Consider different fading systems',
    'Consider transitions',
    'Consult other sources\n--promising\n--unpromising',
    'Convert a melodic element into a rhythmic element',
    'Courage!',
    'Cut a vital connection',
    'Decorate, decorate',
    'Define an area as `safe\' and use it as an anchor',
    'Destroy\n-nothing\n-the most important thing',
    'Discard an axiom',
    'Disciplined self-indulgence',
    'Disconnect from desire',
    'Discover the recipes you are using and abandon them',
    'Display your talent',
    'Distort time',
    'Do nothing for as long as possible',
    'Do something boring',
    'Do the last thing first',
    'Do the washing up',
    'Do the words need changing?',
    'Do we need holes?',
    'Don\'t avoid what is easy',
    'Don\'t be frightened of cliches',
    'Don\'t break the silence',
    'Don\'t stress one thing more than another',
    'Dont be afraid of things because they\'re easy to do',
    'Dont be frightened to display your talents',
    'Emphasize differences',
    'Emphasize repetitions',
    'Emphasize the flaws',
    'Faced with a choice, do both (given by Dieter Rot)',
    'Feed the recording back out of the medium',
    'Fill every beat with something',
    'Find a safe part and use it as an anchor',
    'Get your neck massaged',
    'Ghost echoes',
    'Give the game away',
    'Give way to your worst impulse',
    'Go outside. Shut the door.',
    'Go slowly all the way round the outside',
    'Go to an extreme, come part way back',
    'Honor thy mistake as a hidden intention',
    'How would someone else do it?',
    'How would you have done it?',
    'Humanize something free of error',
    'Idiot glee (?)',
    'Imagine the piece as a set of disconnected events',
    'In total darkness, or in a very large room, very quietly',
    'Infinitesimal gradations',
    'Intentions\n--nobility of\n--humility of\n--credibility of',
    'Into the impossible',
    'Is it finished?',
    'Is something missing?',
    'Is the information correct?',
    'Is the style right?',
    'Is there something missing',
    'It is quite possible (after all)',
    'It is simply a matter of work',
    'Just carry on',
    'Left channel, right channel, center channel',
    'Listen to the quiet voice',
    'Look at the order in which you do things',
    'Look closely at the most embarrassing details & amplify them',
    'Lost in useless territory',
    'Lowest common denominator',
    'Magnify the most difficult details',
    'Make a blank valuable by putting it in an exquisite frame',
    'Make a sudden, destructive unpredictable action; incorporate',
    'Make an exhaustive list of everything you might do & do the last thing on the list',
    'Make it more sensual',
    'Make what\'s perfect more human',
    'Mechanicalize something idiosyncratic',
    'Move towards the unimportant',
    'Mute and continue',
    'Not building a wall but making a brick',
    'Once the search has begun, something will be found',
    'Only a part, not the whole',
    'Only one element of each kind',
    'Overtly resist change',
    'Pae White\'s non-blank graphic metacard',
    'Put in earplugs',
    'Question the heroic',
    'Reevaluation (a warm feeling)',
    'Remember those quiet evenings',
    'Remove a restriction',
    'Remove ambiguities and convert to specifics',
    'Remove specifics and convert to ambiguities',
    'Repetition is a form of change',
    'Retrace your steps',
    'Reverse',
    'Short circuit (example; a man eating peas with the idea that they will improve  his virility shovels them straight into his lap)',
    'Simple subtraction',
    'Simply a matter of work',
    'Slow preparation, fast execution',
    'Spectrum analysis',
    'State the problem as clearly as possible',
    'Take a break',
    'Take away the elements in order of apparent non-importance',
    'Take away the important parts',
    'Tape your mouth (given by Ritva Saarikko)',
    'The inconsistency principle',
    'The most important thing is the thing most easily forgotten',
    'The tape is now the music',
    'Think\n--inside the work\n--outside the work',
    'Think of the radio',
    'Tidy up',
    'Towards the insignificant',
    'Trust in the you of now',
    'Try faking it (from Stewart Brand)',
    'Turn it upside down',
    'Twist the spine',
    'Use \'unqualified\' people',
    'Use an old idea',
    'Use an unacceptable color',
    'Use cliches',
    'Use fewer notes',
    'Use filters',
    'Use something nearby as a model',
    'Use your own ideas',
    'Voice your suspicions',
    'Water',
    'What are the sections sections of?    Imagine a caterpillar moving',
    'What are you really thinking about just now?',
    'What context would look right?',
    'What is the reality of the situation?',
    'What is the simplest solution?',
    'What mistakes did you make last time?',
    'What to increase? What to reduce? What to maintain?',
    'What would your closest friend do?',
    'What wouldn\'t you do?',
    'When is it for?',
    'Where is the edge?',
    'Which parts can be grouped?',
    'Work at a different speed',
    'Would anyone want it?',
    'You are an engineer',
    'You can only make one dot at a time',
    'You don\'t have to be ashamed of using your own ideas',
    '[blank white card]',
];



exports.strategies = strategies;

exports.draw = function draw()
{
	var random = Math.floor(Math.random() * (strategies.length + 1));
    return strategies[random];
};

},{}]},{},[1]);
