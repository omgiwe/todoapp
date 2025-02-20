import { createRef, useState } from 'react'
import PropTypes from 'prop-types'

export default function NewTaskForm({ taskAdd }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const labelRef = createRef()
  const minRef = createRef()
  const secRef = createRef()

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    setMin(e.target.value.replace(/\D/, ''))
  }

  const onSecChange = (e) => {
    setSec(e.target.value.replace(/\D/, ''))
  }

  const handleDescriptionKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (label.trim()) {
        minRef.current.focus()
      }
    }
  }

  const handleMinKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (min.trim()) {
        secRef.current.focus()
      }
    }
  }

  const handleSecKeyDown = (event) => {
    if (event.key === 'Enter' && label && min) {
      const minNum = parseInt(min, 10)
      const secNum = parseInt(sec, 10) || 0
      const timer = minNum * 60 + secNum

      taskAdd(label.trim(), timer)
      setLabel('')
      setMin('')
      setSec('')
      labelRef.current.focus()
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={label}
          onKeyDown={handleDescriptionKeyDown}
          onChange={onLabelChange}
          ref={labelRef}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="text"
          value={min}
          onChange={onMinChange}
          onKeyDown={handleMinKeyDown}
          ref={minRef}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="text"
          value={sec}
          onChange={onSecChange}
          onKeyDown={handleSecKeyDown}
          ref={secRef}
        />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  taskAdd: PropTypes.func.isRequired,
}
