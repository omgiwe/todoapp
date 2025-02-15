import { Component } from 'react'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

export default class App extends Component {
  state = {
    todos: [],
    filter: 'All',
  }

  taskId = 10
  timerIntervals = {}

  taskCompleted = (id, value) => {
    this.setState(({ todos }) => {
      const task = todos.find((task) => task.id === id)
      if (task && value === true) {
        this.handleStopTimer(id)
      }
      return {
        todos: todos.map((task) => (task.id === id ? { ...task, checked: value } : task)),
      }
    })
  }

  taskDelete = (id) => {
    this.handleStopTimer(id)
    this.setState(({ todos }) => ({
      todos: todos.filter((task) => task.id !== id),
    }))
  }

  taskEditing = (id, text) => {
    this.setState(({ todos }) => ({
      todos: todos.map((task) => (task.id === id ? { ...task, body: text } : task)),
    }))
  }

  taskAdd = (description, count) => {
    const newTask = {
      id: this.taskId++,
      body: description,
      checked: false,
      date: new Date(),
      timerCount: count,
    }

    this.setState(({ todos }) => ({
      todos: [...todos, newTask],
    }))
  }

  activTasks = () => this.state.todos.filter(({ checked }) => checked === false).length

  clearCompletedTasks = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter((elem) => elem.checked === false),
    }))
  }

  taskFiltered = () => {
    const { todos, filter } = this.state
    return todos.filter(({ checked }) => {
      const all = filter === 'All'
      const completed = filter === 'Completed'
      return all ? true : completed ? checked === true : checked === false
    })
  }

  changeFilter = (value) => {
    this.setState({ filter: value })
  }

  updateTimer = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((task) =>
        task.id === id && task.timerCount > 0 ? { ...task, timerCount: task.timerCount - 1 } : task
      ),
    }))
  }

  handleStartTimer = (id) => {
    const task = this.state.todos.find((task) => task.id === id)
    if (task && task.timerCount > 0 && !this.timerIntervals[id] && !task.checked) {
      this.timerIntervals[id] = setInterval(() => this.updateTimer(id), 1000)
    }
  }

  handleStopTimer = (id) => {
    if (this.timerIntervals[id]) {
      clearInterval(this.timerIntervals[id])
      delete this.timerIntervals[id]
    }
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm taskAdd={this.taskAdd} />
        <section className="main">
          <TaskList
            todos={this.taskFiltered()}
            taskCompleted={this.taskCompleted}
            taskDelete={this.taskDelete}
            taskEditing={this.taskEditing}
            handleStartTimer={this.handleStartTimer}
            handleStopTimer={this.handleStopTimer}
          />
          <Footer
            activTasks={this.activTasks()}
            clearCompletedTasks={this.clearCompletedTasks}
            changeFilter={this.changeFilter}
            filter={this.state.filter}
          />
        </section>
      </section>
    )
  }
}
