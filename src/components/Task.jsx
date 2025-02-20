import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default function Task(props) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')

  const { taskCompleted, taskDelete, todo, handleStartTimer, handleStopTimer, taskEditing } = props
  const { body, id, checked, date, timerCount } = todo

  const handleChange = (event) => {
    if (event.key === 'Enter') {
      event.stopPropagation()
      taskEditing(id, value)
      setEditing(false)
      setValue('')
    }
  }

  const handleEdit = () => {
    setEditing(!editing)
    setValue(body)
  }

  const onValueChange = (e) => {
    setValue(e.target.value)
  }

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  return (
    <li className={checked ? 'completed' : editing ? 'editing' : ''}>
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
            {formatTime(timerCount)}
          </span>
          <span className="description">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button className="icon icon-edit" onClick={handleEdit} />
        <button className="icon icon-destroy" onClick={() => taskDelete(id)} />
      </div>
      {editing === true && (
        <input type="text" className="edit" value={value} onChange={onValueChange} onKeyDown={handleChange} />
      )}
    </li>
  )
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
