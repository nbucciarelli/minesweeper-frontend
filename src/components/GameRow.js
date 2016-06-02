import React from "react";
import autobind from "autobind-decorator";

import GameCell from "./GameCell"

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

module.exports = GameRow
