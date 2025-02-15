import { Component, createRef } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  labelRef = createRef()
  minRef = createRef()
  secRef = createRef()

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({
      min: e.target.value.replace(/\D/, ''),
    })
  }

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value.replace(/\D/, ''),
    })
  }

  handleDescriptionKeyDown = (event) => {
    if (event.key === 'Enter') {
      const description = this.state.label
      if (description.trim()) {
        this.minRef.current.focus()
      }
    }
  }

  handleMinKeyDown = (event) => {
    if (event.key === 'Enter') {
      const value = this.state.min
      if (value.trim()) {
        this.secRef.current.focus()
      }
    }
  }

  handleSecKeyDown = (event) => {
    const { label, min, sec } = this.state
    if (event.key === 'Enter' && label && min) {
      const minNum = parseInt(min, 10)
      const secNum = parseInt(sec, 10) || 0
      const timer = minNum * 60 + secNum

      this.props.taskAdd(label.trim(), timer)
      this.setState({ label: '', min: '', sec: '' })
      this.labelRef.current.focus()
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-form">
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.label}
            onKeyDown={this.handleDescriptionKeyDown}
            onChange={this.onLabelChange}
            ref={this.labelRef}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="text"
            value={this.state.min}
            onChange={this.onMinChange}
            onKeyDown={this.handleMinKeyDown}
            ref={this.minRef}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="text"
            value={this.state.sec}
            onChange={this.onSecChange}
            onKeyDown={this.handleSecKeyDown}
            ref={this.secRef}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  taskAdd: PropTypes.func.isRequired,
}
