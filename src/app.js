var _ = require('underscore');

import React from "react";
import ReactDOM from "react-dom";
import autobind from "autobind-decorator";

require("./app.css");

@autobind
class App extends React.Component {
  constructor() {
    super()
    // difficulty = this.setDifficulty($(this).val());
    this.state = {boardWidth: 9, boardHeight: 9, mineCount: 9, difficulty: 'beginner'}
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
          boardWidth={this.state.boardWidth}
          boardHeight={this.state.mineCount}
          mineCount={this.state.mineCount}/>
      </div>
    )
  }
}

App.propTypes = {
  setDifficulty: React.PropTypes.func
};

@autobind
class DifficultyForm extends React.Component {
  constructor() {
    super()
    this.state = {difficulty: 'beginner'}
  }

  setDifficulty(e) {
    this.setState({difficulty: e.target.value});
    this.props.setDifficulty(e.target.value)
  }

  render() {
    return(
      <form>
        <div class="form-group">
          <label for="difficulty">Difficulty</label>
          <select class="form-control" id="difficulty" onChange={this.setDifficulty}>
            <option value="beginner">Beginner - 9x9 - 10 Mines</option>
            <option value="intermediate">Intermediate - 16x16 - 40 Mines</option>
            <option value="advanced">Advanced - 16x30 - 99 Mines</option>
          </select>
        </div>
      </form>
    )
  }
}

@autobind
class GameBoard extends React.Component {
  constructor() {
    super()
    this.state = {gameBoard: [], boardWidth: 0, boardHeight: 0, mineCount: 0};
  }

  componentDidMount() {
    var gameBoard = this.setMines(this.createBoard(this.props.boardWidth, this.props.boardHeight, 0), this.props.mineCount)
    this.setState({gameBoard: gameBoard, boardWidth: this.props.boardWidth, boardHeight: this.props.boardHeight, mineCount: this.props.mineCount});
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
    console.log(this.state.gameBoard[row][cellIndex]);
    if(this.state.gameBoard[row][cellIndex]["isMine"] == 0) {
      this.state.gameBoard[row][cellIndex].showCell();
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
    var board = this.state.gameBoard
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

@autobind
class GameRow extends React.Component {
  renderCell(cell, index) {
    return (
      <GameCell
        isMine={cell}
        key={index}
        cellIndex={index}
        rowIndex={this.props.rowIndex}
        onClick={this.props.onClick}/>
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

GameRow.defaultProps = {
  row: []
}

@autobind
class GameCell extends React.Component {
  constructor() {
    super()
    this.state = { opened: false, isMine: false };
  }

  showCell() {
    this.setState({opened  : true})
  }

  clickCell(e) {
    this.showCell();
    this.props.onClick(this);
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

GameCell.defaultProps = {
  opened: false,
  isMine: false
}
// $("#difficulty").on("change", function() {
//   var difficulty = setDifficulty($(this).val());
//   // startGame();
//   console.log($(this).val());
//   ReactDOM.render(<GameBoard gameBoard={gameBoard} boardWidth={difficulty.boardWidth} boardHeight={difficulty.mineCount} mineCount={difficulty.mineCount}/>,  document.getElementById('app'));
// });
// $("#difficulty").change();
ReactDOM.render(<App />,  document.getElementById('app'));
