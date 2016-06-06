import React from "react";
import autobind from "autobind-decorator";

@autobind
class GameCell extends React.Component {
  rightClickCell(e) {
    e.preventDefault()
    if(!this.props.isOpened) {
      var gameBoard = this.props.gameBoard;
      gameBoard[this.props.rowIndex][this.props.cellIndex].flag = true
      gameBoard[this.props.rowIndex][this.props.cellIndex].text = 'X'
      this.props.initializeGameboard(gameBoard);
    }
  }

  clickCell() {
    // this.showCell();
    if(!this.props.flag) this.props.clickCell(this);
  }

  classes() {
    return (
      "a" + this.props.text +
      " hover-cell " +
      (this.props && this.props.isOpened == true ? 'cell-opened' : 'cell') +
      " " +
      (this.props && this.props.isMine == true ? 'mine-cell' : '') +
      " " +
      (this.props && this.props.flag == true ? 'flag' : '')
    )
  }

  render () {
    return (
      <span className={this.classes()} onClick={this.clickCell} onContextMenu={this.rightClickCell}>{this.props.text}</span>
    )
  }
}

GameCell.defaultProps = {
  isOpened: false,
  isMine: false,
  text: "_"
}

export default GameCell
