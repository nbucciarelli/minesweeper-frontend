var _ = require('underscore');
var gameBoard = [];

function startGame(width, height, mineCount) {
  gameBoard = setMines(createBoard(width, height, 0), mineCount);
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
  // console.log(board);
  var height = board.length;
  var width = board[0].length;

  _.times(mineCount, function(mine) {
    var minePosX = parseInt(Math.random(height) * height);
    var minePosY = parseInt(Math.random(width) * width);
    while(board[minePosY][minePosX] == 1) {
      minePosX = parseInt(Math.random(height) * height);
      minePosY = parseInt(Math.random(width) * width);
      if(board[minePosY][minePosX] === 0) {
        break;
      }
    }
    board[minePosY][minePosX] = 1;
  });

  // console.log(board);
  return board;
}

function setDifficulty(difficulty) {
  return {
    'beginner': {
      'boardWidth': 9,
      'boardHeight': 9,
      'mineCount': 10
    },
    'intermediate': {
      'boardWidth': 16,
      'boardHeight': 16,
      'mineCount': 40
    },
    'advanced': {
      'boardWidth': 16,
      'boardHeight': 30,
      'mineCount': 99
    }
  }[difficulty]
}

import React from "react";
import ReactDOM from "react-dom";
import autobind from "autobind-decorator";

@autobind
class GameBoard extends React.Component {
  renderCell(cell) {
    return (
      <span>X</span>
    )
  }

  renderRow(row) {
    console.log(row);
    return (
      <span className="row">{row.map(this.renderCell)}</span>
    )
  }

  render() {
    console.log(gameBoard);
    return (
      <div>
        {gameBoard.map(this.renderRow)}
      </div>
    )
  }
}

$("#difficulty").on("change", function() {
  var difficulty = setDifficulty($(this).val());
  startGame(difficulty.boardWidth, difficulty.boardHeight, difficulty.mineCount);
  console.log($(this).val());
});
$("#difficulty").change();

ReactDOM.render(<GameBoard />,  document.getElementById('app'));
