'use strict';

var SIMILAR_WIZZARDS_AMOUNT = 4;

var WIZZARD_FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZZARD_LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');
var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');
var fireballColorInput = setupFireballWrap.querySelector('input[name="fireball-color"]');

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getWizzardName = function () {
  return getRandomIntInclusive(0, 1) === 0
    ? WIZZARD_FIRST_NAMES[getRandomIntInclusive(0, WIZZARD_FIRST_NAMES.length - 1)]
    + ' ' + WIZZARD_LAST_NAMES[getRandomIntInclusive(0, WIZZARD_LAST_NAMES.length - 1)]
    : WIZZARD_LAST_NAMES[getRandomIntInclusive(0, WIZZARD_LAST_NAMES.length - 1)]
    + ' ' + WIZZARD_FIRST_NAMES[getRandomIntInclusive(0, WIZZARD_FIRST_NAMES.length - 1)];
};

var getWizzardCoatColor = function () {
  return WIZZARD_COAT_COLORS[getRandomIntInclusive(0, WIZZARD_COAT_COLORS.length - 1)];
};

var getWizzardEyesColor = function () {
  return WIZZARD_EYES_COLORS[getRandomIntInclusive(0, WIZZARD_EYES_COLORS.length - 1)];
};

var getWizzardFireballColor = function () {
  return WIZZARD_FIREBALL_COLORS[getRandomIntInclusive(0, WIZZARD_FIREBALL_COLORS.length - 1)];
};

var getWizzard = function () {
  var wizzard = {};

  wizzard.name = getWizzardName();
  wizzard.coatColor = getWizzardCoatColor();
  wizzard.eyesColor = getWizzardEyesColor();

  return wizzard;
};

var getWizzardsArray = function () {
  var wizzards = [];
  for (var i = 0; i < SIMILAR_WIZZARDS_AMOUNT; i++) {
    wizzards.push(getWizzard());
  }
  return wizzards;
};

var getWizzardElement = function (wizzard, template) {
  var wizzardElement = template.cloneNode(true);
  wizzardElement.querySelector('.setup-similar-label').textContent = wizzard.name;
  wizzardElement.querySelector('.wizard-coat').style = 'fill: ' + wizzard.coatColor;
  wizzardElement.querySelector('.wizard-eyes').style = 'fill: ' + wizzard.eyesColor;
  return wizzardElement;
};

var getWizzardsFragment = function (wizzards) {
  var wizzardsFragment = document.createDocumentFragment();
  var similarWizardTemplate = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');

  for (var i = 0; i < wizzards.length; i++) {
    wizzardsFragment.appendChild(getWizzardElement(wizzards[i], similarWizardTemplate));
  }

  return wizzardsFragment;
};

var renderSetupSimilarBlock = function (wizzards) {
  var setupSimilarList = document.querySelector('.setup-similar-list');

  setupSimilarList.appendChild(getWizzardsFragment(wizzards));
};

var changeWizzardCoatColor = function () {
  var color = getWizzardCoatColor();
  setupWizardCoat.style = 'fill: ' + color + ';';
  coatColorInput.value = color;
};

var changeWizzardEyesColor = function () {
  var color = getWizzardEyesColor();
  setupWizardEyes.style = 'fill: ' + color + ';';
  eyesColorInput.value = color;
};

var changeWizzardFireballColor = function () {
  var color = getWizzardFireballColor();
  setupFireballWrap.style = 'background-color: ' + color + ';';
  fireballColorInput.value = color;
};

var onSetupPressEscape = function (evt) {
  if (evt.key === 'Escape' && evt.target !== setupUserName) {
    closeSetup();
  }
};

var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupPressEscape);
  setupWizardCoat.removeEventListener('click', changeWizzardCoatColor);
  setupWizardEyes.removeEventListener('click', changeWizzardEyesColor);
  setupFireballWrap.removeEventListener('click', changeWizzardFireballColor);
};

var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupPressEscape);
  setupWizardCoat.addEventListener('click', changeWizzardCoatColor);
  setupWizardEyes.addEventListener('click', changeWizzardEyesColor);
  setupFireballWrap.addEventListener('click', changeWizzardFireballColor);
};

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closeSetup();
  }
});

var wizzardsData = getWizzardsArray();
renderSetupSimilarBlock(wizzardsData);
