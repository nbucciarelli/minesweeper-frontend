
import React from "react";
import ReactDOM from "react-dom";
import autobind from "autobind-decorator";

require("./app.css");
import GameBoard from "./components/GameBoard"
import DifficultyForm from "./components/DifficultyForm"

@autobind
class App extends React.Component {
  constructor() {
    super()
    this.state = {gameBoard: [], boardWidth: 0, boardHeight: 0, mineCount: 0, difficulty: ''}
  }

  componentWillMount() {
    this.setDifficulty('beginner');
  }

  initializeGameboard(gameBoard) {
    this.setState({gameBoard: gameBoard});
  }

  checkMine(cell, row, cellIndex) {
    // console.log(cell)
    // console.log(row)
    // console.log(cellIndex)
    // console.log(this.props.gameBoard[row][cellIndex]);
    if(this.state.gameBoard[row] &&
        this.state.gameBoard[row][cellIndex] &&
        this.state.gameBoard[row][cellIndex].isMine == 0) {

      var gameBoard = this.state.gameBoard;
      gameBoard[row][cellIndex].isOpened = true
      this.initializeGameboard(gameBoard);
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
        <GameBoard
          gameBoard={this.state.gameBoard}
          difficulty={this.state.difficulty}
          boardWidth={this.state.boardWidth}
          boardHeight={this.state.boardHeight}
          mineCount={this.state.mineCount}
          initializeGameboard={this.initializeGameboard}
          checkMineCount={this.checkMineCount}/>
      </div>
    )
  }
}

App.propTypes = {
  setDifficulty: React.PropTypes.func
};

ReactDOM.render(<App />,  document.getElementById('app'));
