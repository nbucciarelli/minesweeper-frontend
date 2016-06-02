import React from "react";
import autobind from "autobind-decorator";

@autobind
class GameCell extends React.Component {

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

module.exports = GameCell
