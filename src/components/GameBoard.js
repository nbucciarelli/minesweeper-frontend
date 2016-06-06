var _ = require('underscore');
import React from "react";
import autobind from "autobind-decorator";

import GameRow from "./GameRow"

@autobind
class GameBoard extends React.Component {

  // componentWillMount() {
  //   this.setDifficulty('beginner');
  // }

  componentDidMount() {
    // var gameBoard = this.setMines(this.createBoard(this.props.boardWidth, this.props.boardHeight, 0), this.props.mineCount)
    // this.props.initializeGameboard(this.props.gameBoard);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("*********")
    console.log(prevProps.difficulty)
    console.log(this.props.difficulty)
    if(prevProps.difficulty != this.props.difficulty) {
      var gameBoard = this.setMines(this.createBoard(this.props.boardWidth, this.props.boardHeight, 0), this.props.mineCount)
      console.log(this.props.gameBoard)
      this.props.initializeGameboard(this.props.gameBoard);
    }
  }

  checkMineCount(rowIndex, cellIndex) {
    var mineCount = 0;
    mineCount += this.checkMine(rowIndex, cellIndex);
    //above
    mineCount += this.checkMine(rowIndex+1, cellIndex);
    //below
    mineCount += this.checkMine(rowIndex-1, cellIndex);
    //left
    mineCount += this.checkMine(rowIndex, cellIndex-1);
    //right
    mineCount += this.checkMine(rowIndex, cellIndex+1);
    //diagonal up right
    mineCount += this.checkMine(rowIndex-1, cellIndex+1);
    //diagonal up left
    mineCount += this.checkMine(rowIndex-1, cellIndex-1);
    //diagonal down left
    mineCount += this.checkMine(rowIndex+1, cellIndex-1);
    //diagonal down right
    mineCount += this.checkMine(rowIndex+1, cellIndex+1);
    return mineCount;
  }

  checkSurrounding(rowIndex, cellIndex) {
    // console.log(this.state.gameBoard[rowIndex][cellIndex].visited);
    if(
      !this.checkMine(rowIndex, cellIndex) &&
      !this.hasVisited(rowIndex, cellIndex) &&
      rowIndex <= this.props.gameBoard.length &&
      cellIndex <= this.props.gameBoard[0].length &&
      this.checkMineCount(rowIndex, cellIndex) == 0
    ){
      this.props.gameBoard[rowIndex][cellIndex].visited = true

      this.reveal(rowIndex, cellIndex)
      this.reveal(rowIndex+1, cellIndex)
      this.reveal(rowIndex-1, cellIndex)
      this.reveal(rowIndex, cellIndex-1)
      this.reveal(rowIndex, cellIndex+1)
      this.reveal(rowIndex-1, cellIndex+1)
      this.reveal(rowIndex-1, cellIndex-1)
      this.reveal(rowIndex+1, cellIndex-1)
      this.reveal(rowIndex+1, cellIndex+1)

      this.checkSurrounding(rowIndex+1, cellIndex)
      this.checkSurrounding(rowIndex-1, cellIndex)
      this.checkSurrounding(rowIndex, cellIndex-1)
      this.checkSurrounding(rowIndex, cellIndex+1)
      this.checkSurrounding(rowIndex-1, cellIndex+1)
      this.checkSurrounding(rowIndex-1, cellIndex-1)
      this.checkSurrounding(rowIndex+1, cellIndex-1)
      this.checkSurrounding(rowIndex+1, cellIndex+1)
    } else {
      return;
    }
  }

  hasVisited(rowIndex, cellIndex) {
    if(this.props.gameBoard[rowIndex] &&
        this.props.gameBoard[rowIndex][cellIndex]) {
        return this.props.gameBoard[rowIndex][cellIndex].visited;
    } else {
      return true;
    }
  }

  reveal(rowIndex, cellIndex) {
    var gameBoard = this.state.gameBoard;
    if(this.props.gameBoard[rowIndex] &&
        this.props.gameBoard[rowIndex][cellIndex]) {
      var mineCount = this.checkMineCount(rowIndex, cellIndex);
      // console.log(mineCount);
      if(mineCount > 0) gameBoard[rowIndex][cellIndex].text = mineCount
      gameBoard[rowIndex][cellIndex].isOpened = true
    }
  }

  checkMine(rowIndex, cellIndex) {
    if(this.props.gameBoard[rowIndex] &&
        this.props.gameBoard[rowIndex][cellIndex] &&
        this.props.gameBoard[rowIndex][cellIndex].isMine == 1) {
      return 1;
    } else {
      return 0;
    }
  }

  clickCell(cell, visited, mineNum) {
    var rowIndex = cell.props.rowIndex
    var cellIndex = cell.props.cellIndex
    var isMine = this.checkMine(cell.props.rowIndex, cell.props.cellIndex, true)
    var gameBoard = this.props.gameBoard;
    gameBoard[cell.props.rowIndex][cell.props.cellIndex].isOpened = true
    var mineCount = this.checkMineCount(cell.props.rowIndex, cell.props.cellIndex);
    if(mineCount > 0) gameBoard[cell.props.rowIndex][cell.props.cellIndex].text = mineCount
    this.checkSurrounding(cell.props.rowIndex, cell.props.cellIndex, false);
    if(isMine) {
      this.finishGame()
      this.resetGame();
    }
    this.props.initializeGameboard(this.props.gameBoard);
  }

  revealMines() {
    var gameBoard = this.props.gameBoard;
    var mineCells = gameBoard.reduce((a, b) => a.concat(b)).filter((cell) => { return cell.isMine})
    mineCells.map((cell) => { cell.text = '*' })
    this.props.initializeGameboard(this.props.gameBoard);
  }

  renderRow(row, index) {
    return(
      <GameRow
        row={row}
        key={index}
        rowIndex={index}
        clickCell={this.clickCell}
        gameBoard={this.props.gameBoard}
        initializeGameboard={this.props.initializeGameboard}/>
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
export default GameBoard
