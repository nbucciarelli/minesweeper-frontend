import React from "react";
import autobind from "autobind-decorator";

import GameCell from "./GameCell"

@autobind
class GameRow extends React.Component {
  renderCell(cell, index) {
    return (
      <GameCell
        cell={cell}
        isOpened={cell.isOpened}
        isMine={cell.isMine}
        text={cell.text}
        key={index}
        cellIndex={index}
        rowIndex={this.props.rowIndex}
        clickCell={this.props.clickCell}
        initializeGameboard={this.props.initializeGameboard}
        gameBoard={this.props.gameBoard}/>
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
