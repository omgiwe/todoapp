import PropTypes from 'prop-types'

export default function TasksFilter({ changeFilter, filter }) {
  return (
    <ul className="filters">
      <li>
        <button onClick={() => changeFilter('All')} className={filter === 'All' ? 'selected' : null}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => changeFilter('Active')} className={filter === 'Active' ? 'selected' : null}>
          Active
        </button>
      </li>
      <li>
        <button onClick={() => changeFilter('Completed')} className={filter === 'Completed' ? 'selected' : null}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
}

TasksFilter.defaultProps = {
  filter: 'All',
}
