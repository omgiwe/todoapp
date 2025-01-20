import PropTypes from 'prop-types'

import TasksFilter from './TasksFilter'

export default function Footer({ activTasks, clearCompletedTasks, changeFilter, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{activTasks} items left</span>
      <TasksFilter changeFilter={changeFilter} filter={filter} />
      <button className="clear-completed" onClick={clearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  activTasks: PropTypes.number,
  clearCompletedTasks: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
}

Footer.defaultProps = {
  activTasks: 0,
  filter: 'All',
}
