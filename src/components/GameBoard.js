var _ = require('underscore');
import React from "react";
import autobind from "autobind-decorator";

import GameRow from "./GameRow"

@autobind
class GameBoard extends React.Component {

  componentDidMount() {
    var gameBoard = this.setMines(this.createBoard(this.props.boardWidth, this.props.boardHeight, 0), this.props.mineCount)
    this.props.initializeGameboard(gameBoard);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.difficulty != this.props.difficulty) {
      var gameBoard = this.setMines(this.createBoard(this.props.boardWidth, this.props.boardHeight, 0), this.props.mineCount)
      this.props.initializeGameboard(gameBoard);
    }
  }

  createBoard(width, height, val) {
    var arr = new Array();
    _.times(height, h => {
      var widthArr = new Array();
      _.times(width, w => {
        widthArr.push({isMine: val, isOpened: false});
      });
      arr.push(widthArr);
    })
    return arr;
  }

  setMines(board, mineCount) {
    // console.log(board);
    var height = board.length;
    console.log("Height:", height)
    var width = board[0].length;
    console.log("Width:", width)
    // console.log(board);

    _.times(mineCount, function(mine) {
      var minePosY = parseInt(Math.random(height) * height);
      var minePosX = parseInt(Math.random(width) * width);
      while(board[minePosY][minePosX]["isMine"] == 1) {
        minePosY = parseInt(Math.random(height) * height);
        minePosX = parseInt(Math.random(width) * width);
        if(board[minePosY][minePosX]["isMine"] === 0) {
          break;
        }
      }
      board[minePosY][minePosX]["isMine"] = 1;
    });

    return board;
  }

  checkMine(cell, row, cellIndex) {
    console.log(this.props.gameBoard[row][cellIndex]);
    if(this.props.gameBoard[row][cellIndex]["isMine"] == 0) {
      this.props.gameBoard[row][cellIndex].showCell();
    }
  }

  checkMineCount(cell) {
    // cellProps.cellIndex
    // cellProps.rowIndex;
    this.checkMine(cell, cell.props.rowIndex, cell.props.cellIndex);
    //above
    this.checkMine(cell, cell.props.rowIndex+1, cell.props.cellIndex);
    //below
    this.checkMine(cell, cell.props.rowIndex-1, cell.props.cellIndex);
    //left
    this.checkMine(cell, cell.props.rowIndex, cell.props.cellIndex-1);
    //right
    this.checkMine(cell, cell.props.rowIndex, cell.props.cellIndex+1);
    //diagonal up right
    this.checkMine(cell, cell.props.rowIndex-1, cell.props.cellIndex+1);
    //diagonal up left
    this.checkMine(cell, cell.props.rowIndex-1, cell.props.cellIndex-1);
    //diagonal down left
    this.checkMine(cell, cell.props.rowIndex+1, cell.props.cellIndex-1);
    //diagonal down right
    this.checkMine(cell, cell.props.rowIndex+1, cell.props.cellIndex+1);

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
GameBoard.defaultProps = {
  gameBoard: [],
  boardWidth: 0,
  boardHeight: 0,
  mineCount: 0
}
module.exports = GameBoard
