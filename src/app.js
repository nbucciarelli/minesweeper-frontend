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
  console.log("Height:", height)
  var width = board[0].length;
  console.log("Width:", width)
  // console.log(board);

  _.times(mineCount, function(mine) {
    var minePosY = parseInt(Math.random(height) * height);
    var minePosX = parseInt(Math.random(width) * width);
    while(board[minePosY][minePosX] == 1) {
      minePosY = parseInt(Math.random(height) * height);
      minePosX = parseInt(Math.random(width) * width);
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
      'boardWidth': 30,
      'boardHeight': 16,
      'mineCount': 99
    }
  }[difficulty]
}

import React from "react";
import ReactDOM from "react-dom";
import autobind from "autobind-decorator";

require("./app.css");

@autobind
class GameBoard extends React.Component {
  checkMine(row, cell) {
    console.log(this.props.gameBoard[row][cell]);
    if(this.props.gameBoard[row][cell] == 0) {
      // show box
    }
  }

  checkMineCount(cellProps) {
    cellProps.cellIndex
    cellProps.rowIndex;
    this.checkMine(cellProps.rowIndex, cellProps.cellIndex);
    //above
    this.checkMine(cellProps.rowIndex+1, cellProps.cellIndex);
    //below
    this.checkMine(cellProps.rowIndex-1, cellProps.cellIndex);
    //left
    this.checkMine(cellProps.rowIndex, cellProps.cellIndex-1);
    //right
    this.checkMine(cellProps.rowIndex, cellProps.cellIndex+1);
    //diagonal up right
    this.checkMine(cellProps.rowIndex-1, cellProps.cellIndex+1);
    //diagonal up left
    this.checkMine(cellProps.rowIndex-1, cellProps.cellIndex-1);
    //diagonal down left
    this.checkMine(cellProps.rowIndex+1, cellProps.cellIndex-1);
    //diagonal down right
    this.checkMine(cellProps.rowIndex+1, cellProps.cellIndex+1);

  }
  renderRow(row, index) {
    return(
      <GameRow
        row={row}
        key={index}
        rowIndex={index}
        onClick={this.checkMineCount}/>
    )
  }
  render() {
    var board = this.props.gameBoard
    return (
      <span>
        {board.map(this.renderRow)}
      </span>
    )
  }
}

@autobind
class GameRow extends React.Component {
  propTypes: {
    onClick: React.PropTypes.func
  }

  clickCell(cellProps) {
    this.props.onClick(cellProps)
  }
  renderCell(cell, index) {
    return (
      <GameCell
        isMine={cell}
        key={index}
        cellIndex={index}
        rowIndex={this.props.rowIndex}
        onClick={this.clickCell}/>
    )
  }
  render () {
    var row = this.props.row;
    return (
      <span >
        <br />
        {row.map(this.renderCell)}
      </span>
    )
  }
}

@autobind
class GameCell extends React.Component {
  propTypes: {
    onClick: React.PropTypes.func
  }
  clickCell(e) {
    this.setState({opened  : true})
    this.props.onClick(this.props);
    // if(!this.props.isMine) {
    //   console.log(this.props.actions)
    //   GameBoard.checkMineCount()
    // } else {
    //   console.log("Game Over")
    // }
  }
  isOpened() {
    return ("hover-cell " + (this.state && this.state.opened == true ? 'cell-opened' : 'cell'))
  }

  render () {
    return (
      <span className={this.isOpened()} onClick={this.clickCell}>&nbsp;</span>
    )
  }
}

$("#difficulty").on("change", function() {
  var difficulty = setDifficulty($(this).val());
  startGame(difficulty.boardWidth, difficulty.boardHeight, difficulty.mineCount);
  console.log($(this).val());
  ReactDOM.render(<GameBoard gameBoard={gameBoard}/>,  document.getElementById('app'));
});
$("#difficulty").change();
