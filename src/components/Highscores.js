import React from 'react'
const shortid = require('shortid')
const PouchDB = require('pouchdb')
let db = new PouchDB('highscores')

class Highscores extends React.Component {
  constructor() {
    super()
    this.getScores();
  }
  finishGame() {
    this.props.revealMines()
    setTimeout(() => {
      let name = prompt("Name:")
      let newScore = {
        playerName: name,
        playerTime: this.state.timer.state.time }
      db.put(newScore, shortid.generate())
        .then( doc => {
          this.getScores()
        })
        .catch( err => {
          console.log("Error", err);
        })
    }, 500)
  }

  getScores() {
    let x = this
    db.allDocs({include_docs: true})
      .then(doc => {
        x.setHighScores(doc.rows)
      })
      .catch(err => {
        console.log("Error", err)
      })
  }

  setHighScores(scores) {
    this.props.initializeHighscores(
      scores.map(score => {return score.doc})
        .sort((a, b) => {
          return this.timeToInteger(a.playerTime) - this.timeToInteger(b.playerTime)
      })
    );
  }

  timeToInteger(time) {
    return parseInt(time.split(":")[0] * 60) + parseInt(time.split(":")[1])
  }

  renderScore(score) {
    return(
      <li key={score._id}>{score.playerName}: {score.playerTime}</li>
    )
  }

  render () {
    var highscores = this.props.highscores;
    return (
      <div>
        <h1>Highscores</h1>
        <ul>
          {highscores.map(this.renderScore)}
        </ul>
      </div>
    )
  }

}

export default Highscores
