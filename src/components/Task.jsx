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

  render() {
    const { taskCompleted, taskDelete, todo } = this.props
    const { body, id, checked, date } = todo

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
            <span className="description">{body}</span>
            <span className="created">
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
  }),
  taskCompleted: PropTypes.func.isRequired,
  taskDelete: PropTypes.func.isRequired,
  taskEditing: PropTypes.func.isRequired,
}

Task.defaultProps = {
  todo: {
    id: 0,
    body: 'Задача',
    checked: false,
    date: new Date(),
  },
}
