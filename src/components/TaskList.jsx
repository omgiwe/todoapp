import Task from "./Task";

export default function TaskList({ todos, taskCompleted, taskDelete }) {
  return (
    <ul className="todo-list">
      {todos.map(({ id, body, checked }) => (
        <Task
          key={id}
          id={id}
          body={body}
          checked={checked}
          taskCompleted={taskCompleted}
          taskDelete={taskDelete}
        />
      ))}
    </ul>
  );
}
