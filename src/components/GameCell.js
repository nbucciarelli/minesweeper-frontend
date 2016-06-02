import React from "react";
import autobind from "autobind-decorator";

@autobind
class GameCell extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if(prevState != this.state) {
      console.log("Redraw");
      console.log(this.props.gameBoard);
      this.props.initializeGameboard(this.props.gameBoard);
    }
  }

  clickCell() {
    // this.showCell();
    this.props.checkMineCount(this);
  }

  classes() {
    return ("hover-cell " + (this.props && this.props.isOpened == true ? 'cell-opened' : 'cell'))
  }

  render () {
    return (
      <span className={this.classes()} onClick={this.clickCell}>&nbsp;</span>
    )
  }
}

GameCell.defaultProps = {
  isOpened: false,
  isMine: false
}

module.exports = GameCell
