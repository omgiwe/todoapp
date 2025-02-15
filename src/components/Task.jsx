import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  state = {
    editing: false,
    value: '',
  }

  handleChange = (event) => {
    if (event.key === 'Enter') {
      const {
        taskEditing,
        todo: { id },
      } = this.props
      event.stopPropagation()
      taskEditing(id, this.state.value)
      this.setState({ editing: false })
      this.setState({ value: '' })
    }
  }

  handleEdit = () => {
    this.setState(({ editing }) => ({
      editing: !editing,
      value: this.props.todo.body,
    }))
  }

  onValueChange = (e) => {
    this.setState({ value: e.target.value })
  }

  formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  render() {
    const { taskCompleted, taskDelete, todo, handleStartTimer, handleStopTimer } = this.props
    const { body, id, checked, date, timerCount } = todo

    return (
      <li className={checked ? 'completed' : this.state.editing ? 'editing' : ''}>
        <div className="view">
          <input
            id={id}
            type="checkbox"
            className="toggle"
            onChange={(e) => taskCompleted(id, e.target.checked)}
            checked={checked}
          />
          <label htmlFor={id}>
            <span className="title">{body}</span>
            <span className="description">
              <button className="icon icon-play" onClick={() => handleStartTimer(id)}></button>
              <button className="icon icon-pause" onClick={() => handleStopTimer(id)}></button>
              {this.formatTime(timerCount)}
            </span>
            <span className="description">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEdit} />
          <button className="icon icon-destroy" onClick={() => taskDelete(id)} />
        </div>
        {this.state.editing === true && (
          <input
            type="text"
            className="edit"
            value={this.state.value}
            onChange={this.onValueChange}
            onKeyDown={this.handleChange}
          />
        )}
      </li>
    )
  }
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    checked: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    timerCount: PropTypes.number,
  }),
  taskCompleted: PropTypes.func.isRequired,
  taskDelete: PropTypes.func.isRequired,
  taskEditing: PropTypes.func.isRequired,
  handleStartTimer: PropTypes.func.isRequired,
  handleStopTimer: PropTypes.func.isRequired,
}

Task.defaultProps = {
  todo: {
    id: 0,
    body: 'Задача',
    checked: false,
    date: new Date(),
    timerCount: 0,
  },
}
