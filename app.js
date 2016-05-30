var _ = require('underscore');
// var prompt = require('prompt');
//
// prompt.start();
//
// console.log('What size board would you like?');
// prompt.get(['Board Width', 'Board Height', 'Mine Count'], function (err, result) {
//   if (err) { return onErr(err); }
//   // console.log(result);
//   // console.log('  Width: ' + result['Board Width']);
//   // console.log('  Height: ' + result['Board Height']);
//   startGame(result['Board Width'], result['Board Height'], result['Mine Count']);
// });
//
// function onErr(err) {
//   console.log(err);
//   return 1;
// }

function startGame(width, height, mineCount) {
  var gameBoard = setMines(createBoard(width, height, 0), mineCount);

}

function createBoard(width, height, val) {
  var arr = new Array();
  _.times(height, function(h) {
    var widthArr = new Array();
    _.times(width, function(w) {
      widthArr.push(val);
    });
    arr.push(widthArr);
  })
  return arr;
}

function setMines(board, mineCount) {
  console.log(board);

  var height = board.length;
  var width = board[0].length;

  _.times(mineCount, function(mine) {
    var minePosX = parseInt(Math.random(height) * height);
    var minePosY = parseInt(Math.random(width) * width);
    while(board[minePosY][minePosX] == 1) {
      minePosX = parseInt(Math.random(height) * height);
      minePosY = parseInt(Math.random(width) * width);
      if(board[minePosY][minePosX] === 0) {
        console.log("break");
        break;
      }
    }
    board[minePosY][minePosX] = 1;
  });

  console.log(board);
  return board;
}
