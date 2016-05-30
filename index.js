var _ = require('underscore');
var prompt = require('prompt');

prompt.start();

console.log('What size board would you like?');
prompt.get(['Board Width', 'Board Height', 'Mine Count'], function (err, result) {
  if (err) { return onErr(err); }
  // console.log(result);
  // console.log('  Width: ' + result['Board Width']);
  // console.log('  Height: ' + result['Board Height']);
  startGame(result['Board Width'], result['Board Height'], result['Mine Count']);
});

function onErr(err) {
  console.log(err);
  return 1;
}

function startGame(width, height, mineCount) {
  var dood = createBoard(width, height, 0);
  setMines(dood, mineCount);
}

function createBoard(width, height, val) {
  var widthArr = [];
  var arr = [];

  _.times(width, function(x) { widthArr.push(val); })
  _.times(height, function(w) { arr.push(widthArr); })
  return arr;
}

function setMines(board, mineCount) {
  console.log(board);
  var height = board.length;
  var width = board[0].length;
  // I'm not sure why it won't let me change 2d array variables
  // var flattenedBoard = _.flatten(board)
  _.times(mineCount, function(mine) {
    // console.log(mine);
    var minePosX = parseInt(Math.random(height) * height);
    var minePosY = parseInt(Math.random(width) * width);
    console.log("X: ", minePosX, " Y: ", minePosY);
    // console.log(flattenedBoard);
    // console.log("Position: ", (minePosY * minePosY) - 1);
    // flattenedBoard[(minePosY * minePosY) - 1] = 1;

    // This won't work for some reason...
    // console.log(board[minePosY][minePosX]);
    board[minePosY][minePosX] = 1;
  });

  // _.times(height, function(x) {
  //   _.times(width, function(y) {
  //     board[x][y] = flattenedBoard[(y*height) + x];
  //   });
  // });
  console.log(board);
  return board;
}
