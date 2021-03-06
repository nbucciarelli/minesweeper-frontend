
import React from "react";
import ReactDOM from "react-dom";
import autobind from "autobind-decorator";

require("./app.css");
import GameBoard from "./components/GameBoard"
import DifficultyForm from "./components/DifficultyForm"
import Timer from './components/Timer'
import Highscores from "./components/Highscores"

const shortid = require('shortid')
const PouchDB = require('pouchdb')
let db = new PouchDB('highscores')

let OPTIONS = { prefix: 'seconds elapsed!', delay: 100}

@autobind
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      gameBoard: [],
      boardWidth: 0,
      boardHeight: 0,
      mineCount: 0,
      difficulty: '',
      timer: null,
      highscores: []
    }
    this.getScores()
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
      if(mineCount > 0) gameBoard[rowIndex][cellIndex].text = mineCount
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
    var isMine = this.checkMine(cell.props.rowIndex, cell.props.cellIndex, true)
    var gameBoard = this.state.gameBoard;
    gameBoard[cell.props.rowIndex][cell.props.cellIndex].isOpened = true
    var mineCount = this.checkMineCount(cell.props.rowIndex, cell.props.cellIndex);
    if(mineCount > 0) gameBoard[cell.props.rowIndex][cell.props.cellIndex].text = mineCount
    this.checkSurrounding(cell.props.rowIndex, cell.props.cellIndex, false);
    if(isMine) {
      this.finishGame()
      this.resetGame();
    }
    this.initializeGameboard(gameBoard);
  }

  resetGame() {
    this.setDifficulty('beginner');
  }

  rightClickCell(cell) {
    var gameBoard = this.state.gameBoard;
    gameBoard[cell.props.rowIndex][cell.props.cellIndex].flag = true
    gameBoard[cell.props.rowIndex][cell.props.cellIndex].text = 'X'
    this.initializeGameboard(gameBoard);
  }

  revealMines() {
    var gameBoard = this.state.gameBoard;
    var mineCells = gameBoard.reduce((a, b) => a.concat(b)).filter((cell) => { return cell.isMine})
    mineCells.map((cell) => { cell.text = '*' })
    this.initializeGameboard(gameBoard);
  }

  finishGame() {
    this.revealMines()
    setTimeout(() => {
      let name = prompt("Name:")
      let newScore = {
        playerName: name,
        playerTime: this.state.timer.state.time }
      db.put(newScore, shortid.generate())
        .then( doc => {
          this.getScores()
        })
        .catch( err => {
          console.log("Error", err);
        })
    }, 500)
  }

  getScores() {
    let x = this
    db.allDocs({include_docs: true})
      .then(doc => {
        x.setHighScores(doc.rows)
      })
      .catch(err => {
        console.log("Error", err)
      })
  }

  returnTime(timer) {
    this.setState({timer: timer})
  }

  setHighScores(scores) {
    this.setState({
      highscores: scores.map(score => {return score.doc})
                    .sort((a, b) => {
                      return this.timeToInteger(a.playerTime) - this.timeToInteger(b.playerTime)
                    })
    });
  }

  timeToInteger(time) {
    return parseInt(time.split(":")[0] * 60) + parseInt(time.split(":")[1])
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
          clickCell={this.clickCell}
          rightClickCell={this.rightClickCell}/>
        <Highscores
          highscores={this.state.highscores} />
      </div>
    )
  }
}

App.propTypes = {
  setDifficulty: React.PropTypes.func
};

ReactDOM.render(<App />,  document.getElementById('app'));
