import PropTypes from 'prop-types'

import Task from './Task'

export default function TaskList({ todos, taskCompleted, taskDelete, taskEditing }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          key={todo.id}
          todo={todo}
          taskCompleted={taskCompleted}
          taskDelete={taskDelete}
          taskEditing={taskEditing}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  taskCompleted: PropTypes.func.isRequired,
  taskDelete: PropTypes.func.isRequired,
  taskEditing: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  todos: [],
}
