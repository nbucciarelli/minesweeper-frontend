
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
          initializeGameboard={this.initializeGameboard}/>
      </div>
    )
  }
}

App.propTypes = {
  setDifficulty: React.PropTypes.func
};

ReactDOM.render(<App />,  document.getElementById('app'));
