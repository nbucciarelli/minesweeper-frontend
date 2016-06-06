import React from 'react'
import autobind from 'autobind-decorator'

@autobind
class DifficultyForm extends React.Component {
  static difficultyAttrs = {
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
  };

  setDifficulty(value) {
    // this.props.setDifficulty(e.target.value)
    console.log(value);
    console.log(DifficultyForm.difficultyAttrs);
    var diff = DifficultyForm.difficultyAttrs[value]
    this.props.setDifficulty(value, diff)
    var gameBoard = this.setMines(this.createBoard(diff.boardWidth, diff.boardHeight, 0), diff.mineCount)
    this.props.initializeGameboard(this.props.gameBoard);

  }

  componentWillMount() {
    this.setDifficulty('beginner');
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
      while(board[minePosY][minePosX].isMine == 1) {
        minePosY = parseInt(Math.random(height) * height);
        minePosX = parseInt(Math.random(width) * width);
        if(board[minePosY][minePosX].isMine === 0) {
          break;
        }
      }
      board[minePosY][minePosX].isMine = 1;
    });

    return board;
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

module.exports = DifficultyForm
