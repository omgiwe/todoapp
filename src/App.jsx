import { useRef, useState } from 'react'

import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

export default function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('All')
  const [taskId, setTaskId] = useState(10)

  const timerIntervals = useRef({})

  const taskCompleted = (id, value) => {
    const task = todos.find((task) => task.id === id)
    if (task && value === true) {
      handleStopTimer(id)
    }

    setTodos((prevTodos) => prevTodos.map((task) => (task.id === id ? { ...task, checked: value } : task)))
  }

  const taskDelete = (id) => {
    handleStopTimer(id)

    setTodos((prevTodos) => prevTodos.filter((task) => task.id !== id))
  }

  const taskEditing = (id, text) => {
    setTodos((prevTodos) => prevTodos.map((task) => (task.id === id ? { ...task, body: text } : task)))
  }

  const taskAdd = (description, count) => {
    const newTask = {
      id: taskId,
      body: description,
      checked: false,
      date: new Date(),
      timerCount: count,
    }

    setTodos((prevTodos) => [...prevTodos, newTask])
    setTaskId((prevId) => prevId + 1)
  }

  const activTasks = () => todos.filter(({ checked }) => checked === false).length

  const clearCompletedTasks = () => {
    setTodos((prevTodos) => prevTodos.filter((elem) => elem.checked === false))
  }

  const taskFiltered = () => {
    return todos.filter(({ checked }) => {
      const all = filter === 'All'
      const completed = filter === 'Completed'
      return all ? true : completed ? checked === true : checked === false
    })
  }

  const changeFilter = (value) => {
    setFilter(value)
  }

  const updateTimer = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((task) =>
        task.id === id && task.timerCount > 0 ? { ...task, timerCount: task.timerCount - 1 } : task
      )
    )
  }

  const handleStartTimer = (id) => {
    const task = todos.find((task) => task.id === id)
    if (task && task.timerCount > 0 && !timerIntervals.current[id] && !task.checked) {
      timerIntervals.current[id] = setInterval(() => updateTimer(id), 1000)
    }
  }

  const handleStopTimer = (id) => {
    if (timerIntervals.current[id]) {
      clearInterval(timerIntervals.current[id])
      delete timerIntervals.current[id]
    }
  }

  return (
    <section className="todoapp">
      <NewTaskForm taskAdd={taskAdd} />
      <section className="main">
        <TaskList
          todos={taskFiltered()}
          taskCompleted={taskCompleted}
          taskDelete={taskDelete}
          taskEditing={taskEditing}
          handleStartTimer={handleStartTimer}
          handleStopTimer={handleStopTimer}
        />
        <Footer
          activTasks={activTasks()}
          clearCompletedTasks={clearCompletedTasks}
          changeFilter={changeFilter}
          filter={filter}
        />
      </section>
    </section>
  )
}
