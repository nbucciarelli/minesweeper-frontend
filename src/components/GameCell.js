import React from "react";
import autobind from "autobind-decorator";

@autobind
class GameCell extends React.Component {
  clickCell() {
    // this.showCell();
    this.props.clickCell(this);
  }

  classes() {
    return (
      "hover-cell " +
      (this.props && this.props.isOpened == true ? 'cell-opened' : 'cell') +
      " " +
      (this.props && this.props.isMine == true ? 'mine-cell' : '')
    )
  }

  render () {
    return (
      <span className={this.classes()} onClick={this.clickCell}>{this.props.text}</span>
    )
  }
}

GameCell.defaultProps = {
  isOpened: false,
  isMine: false,
  text: "_"
}

export default GameCell
