import React from "react";
import autobind from "autobind-decorator";

@autobind
class GameCell extends React.Component {
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

  onContextMenu(e) {
    e.preventDefault()
    if(!this.props.isOpened) this.props.onContextMenu(this)
  }

  render () {
    return (
      <span className={this.classes()} onClick={this.clickCell} onContextMenu={this.onContextMenu}>{this.props.text}</span>
    )
  }
}

GameCell.defaultProps = {
  isOpened: false,
  isMine: false,
  text: "_"
}

export default GameCell
