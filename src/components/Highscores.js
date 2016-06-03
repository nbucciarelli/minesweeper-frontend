import React from 'react'

class Highscores extends React.Component {
  renderScore(score) {
    // i think that's it. because you have a score, you're not really rendering it properly. you were just doing {highscore}, which in this one doesn't really do anything?
    // yeah i'm aware of that. i used to have this in there but i removed the function call becase it was breaking
    // LOOK AT THAT
    // so because an object isn't really mappable, you need to basically say, look at these keys and then map it like an array
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
