
import React from "react";
import ReactDOM from "react-dom";
import autobind from "autobind-decorator";

require("./app.css");
import GameBoard from "./components/GameBoard"
import DifficultyForm from "./components/DifficultyForm"
// import Timer from "react-timer"
import Timer from './components/Timer'

let OPTIONS = { prefix: 'seconds elapsed!', delay: 100}

@autobind
class App extends React.Component {
  constructor() {
    super()
    this.state = {gameBoard: [], boardWidth: 0, boardHeight: 0, mineCount: 0, difficulty: '', timer: null}
  }

  componentWillMount() {
    this.setDifficulty('beginner');
  }

  initializeGameboard(gameBoard) {
    this.setState({gameBoard: gameBoard});
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
      rowIndex <= this.state.gameBoard.length &&
      cellIndex <= this.state.gameBoard[0].length &&
      this.checkMineCount(rowIndex, cellIndex) == 0
    ){
      this.state.gameBoard[rowIndex][cellIndex].visited = true

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
    if(this.state.gameBoard[rowIndex] &&
        this.state.gameBoard[rowIndex][cellIndex]) {
        return this.state.gameBoard[rowIndex][cellIndex].visited;
    } else {
      return true;
    }
  }

  reveal(rowIndex, cellIndex) {
    var gameBoard = this.state.gameBoard;
    if(this.state.gameBoard[rowIndex] &&
        this.state.gameBoard[rowIndex][cellIndex]) {
      var mineCount = this.checkMineCount(rowIndex, cellIndex);
      // console.log(mineCount);
      gameBoard[rowIndex][cellIndex].text = mineCount
      gameBoard[rowIndex][cellIndex].isOpened = true
    }
  }

  checkMine(rowIndex, cellIndex) {
    if(this.state.gameBoard[rowIndex] &&
        this.state.gameBoard[rowIndex][cellIndex] &&
        this.state.gameBoard[rowIndex][cellIndex].isMine == 1) {
      return 1;
    } else {
      return 0;
    }
  }

  clickCell(cell, visited, mineNum) {
    var rowIndex = cell.props.rowIndex
    var cellIndex = cell.props.cellIndex
    this.checkMine(cell.props.rowIndex, cell.props.cellIndex, true)
    var gameBoard = this.state.gameBoard;
    gameBoard[cell.props.rowIndex][cell.props.cellIndex].isOpened = true
    var mineCount = this.checkMineCount(cell.props.rowIndex, cell.props.cellIndex);
    gameBoard[cell.props.rowIndex][cell.props.cellIndex].text = mineCount
    this.checkSurrounding(cell.props.rowIndex, cell.props.cellIndex, false);
    this.initializeGameboard(gameBoard);
  }

  finishGame() {
    console.log(this.state.timer);
  }

  returnTime(timer) {
    // console.log(timer.state.time);
    this.setState({timer: timer})
  }

  setDifficulty(difficulty) {
    var diff = {
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
    }[difficulty];
    this.setState({
      boardWidth: diff['boardWidth'],
      boardHeight: diff['boardHeight'],
      mineCount: diff['mineCount'],
      difficulty: difficulty
    })
  }

  render() {
    return(
      <div>
        <h1>Minesweeper</h1>
        <DifficultyForm
          difficulty={this.state.difficulty}
          setDifficulty={this.setDifficulty}/>
        <Timer
          options={OPTIONS}
          returnTime={this.returnTime}/>
        <GameBoard
          gameBoard={this.state.gameBoard}
          difficulty={this.state.difficulty}
          boardWidth={this.state.boardWidth}
          boardHeight={this.state.boardHeight}
          mineCount={this.state.mineCount}
          initializeGameboard={this.initializeGameboard}
          clickCell={this.clickCell}/>
          <button onClick={this.finishGame}>Finish Game</button>
      </div>
    )
  }
}

App.propTypes = {
  setDifficulty: React.PropTypes.func
};

ReactDOM.render(<App />,  document.getElementById('app'));
