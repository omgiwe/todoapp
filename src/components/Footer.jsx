import TasksFilter from "./TasksFilter";

export default function Footer({
  activTasks,
  clearCompletedTasks,
  changeFilter,
  filter,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{activTasks} items left</span>
      <TasksFilter changeFilter={changeFilter} filter={filter} />
      <button className="clear-completed" onClick={clearCompletedTasks}>
        Clear completed
      </button>
    </footer>
  );
}
