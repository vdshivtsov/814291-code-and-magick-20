'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_HEIGHT = 16;

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderClouds = function (ctx) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
};

var renderTitle = function (ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px "PT Mono"';
  ctx.textBaseline = 'hanging';

  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2 + FONT_GAP);
};

var renderName = function (ctx, player, index) {
  ctx.fillText(player, CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * index, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - TEXT_HEIGHT);
};

var renderScore = function (ctx, time, maxTime, index) {
  ctx.fillText(Math.round(time), CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * index, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - TEXT_HEIGHT - FONT_GAP - BAR_HEIGHT * time / maxTime - FONT_GAP);
};

var renderBar = function (ctx, time, maxTime, index) {
  ctx.fillRect(CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * index, CLOUD_Y + CLOUD_HEIGHT - GAP * 2 - TEXT_HEIGHT - FONT_GAP - BAR_HEIGHT * time / maxTime, BAR_WIDTH, (BAR_HEIGHT * time) / maxTime);
};

var renderResult = function (ctx, players, times) {
  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    renderName(ctx, players[i], i);
    renderScore(ctx, times[i], i);
    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    renderBar(ctx, times[i], maxTime, i);
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderClouds(ctx);
  renderTitle(ctx);
  renderResult(ctx, players, times);
};

