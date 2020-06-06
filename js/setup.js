'use strict';

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

var getWizzard = function () {
  var wizzard = {};

  wizzard.name = getWizzardName();
  wizzard.coatColor = getWizzardCoatColor();
  wizzard.eyesColor = getWizzardEyesColor();

  return wizzard;
};

var getWizzardsArray = function (amount) {
  var wizzards = [];
  for (var i = 0; i < amount; i++) {
    wizzards.push(getWizzard());
  }
  return wizzards;
};

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

var wizzards = getWizzardsArray(4);

