export default function Task({ id, body, checked, taskCompleted, taskDelete }) {
  let classNames = "";

  const handleDelete = (event) => {
    event.stopPropagation();
    taskDelete(id);
  };

  if (checked) {
    classNames = "completed";
  }

  return (
    <li className={classNames} onClick={() => taskCompleted(id)}>
      <div className="view">
        <input type="checkbox" className="toggle" checked={checked} readOnly />
        <label>
          <span className="description">{body}</span>
          <span className="created"></span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={handleDelete}></button>
      </div>
      {classNames === "editing" && (
        <input type="text" className="edit" value="Editing task" />
      )}
    </li>
  );
}
