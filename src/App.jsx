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

  taskCompleted = (id, value) => {
    this.setState(({ todos }) => ({
      todos: todos.map((task) => (task.id === id ? { ...task, checked: value } : task)),
    }))
  }

  taskDelete = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter((task) => task.id !== id),
    }))
  }

  taskEditing = (id, text) => {
    this.setState(({ todos }) => ({
      todos: todos.map((task) => (task.id === id ? { ...task, body: text } : task)),
    }))
  }

  taskAdd = (description) => {
    const newTask = {
      id: this.taskId++,
      body: description,
      checked: false,
      date: new Date(),
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

  render() {
    // const { todos } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm taskAdd={this.taskAdd} />
        {console.log('gfgfg')}
        <section className="main">
          <TaskList
            todos={this.taskFiltered()}
            taskCompleted={this.taskCompleted}
            taskDelete={this.taskDelete}
            taskEditing={this.taskEditing}
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
