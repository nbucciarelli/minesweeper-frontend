
import React from "react";
import ReactDOM from "react-dom";
import autobind from "autobind-decorator";

require("./app.css");
import GameBoard from "./components/GameBoard"
import DifficultyForm from "./components/DifficultyForm"
import Timer from './components/Timer'
import Highscores from "./components/Highscores"

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
  }

  setDifficulty(difficulty, difficultyAttrs) {
    this.setState({
      boardWidth: difficultyAttrs['boardWidth'],
      boardHeight: difficultyAttrs['boardHeight'],
      mineCount: difficultyAttrs['mineCount'],
      difficulty: difficulty
    })
  }

  initializeGameboard(gameBoard) {
    this.setState({gameBoard: gameBoard});
  }

  initializeHighscores(highscores) {
    this.setState({highscores: highscores});
  }

  resetGame() {
    this.setDifficulty('beginner');
  }

  returnTime(timer) {
    this.setState({timer: timer})
  }

  render() {
    return(
      <div>
        <h1>Minesweeper</h1>
        <DifficultyForm
          difficulty={this.state.difficulty}
          setDifficulty={this.setDifficulty}
          initializeGameboard={this.initializeGameboard}
        />
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
          setDifficulty={this.setDifficulty} />
        <Highscores
          highscores={this.state.highscores}
          initializeHighscores={this.initializeHighscores}
          revealMines={this.revealMines} />
      </div>
    )
  }
}

App.propTypes = {
  setDifficulty: React.PropTypes.func
};

ReactDOM.render(<App />,  document.getElementById('app'));
