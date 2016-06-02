import React from 'react'
import autobind from 'autobind-decorator'

@autobind
class DifficultyForm extends React.Component {
  setDifficulty(e) {
    this.props.setDifficulty(e.target.value)
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
