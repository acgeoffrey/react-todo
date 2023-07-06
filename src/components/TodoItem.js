const TodoItem = (props) => {
  const checkMark = props.todo.completed
    ? "fa-solid fa-square-check checkbox"
    : "fa-regular fa-square checkbox";
  return (
    <li>
      <div className="check-label-div">
        <i
          className={checkMark}
          onClick={() => props.setCompletion(props.todo, props.todo.completed)}
        ></i>

        <label>{props.todo.title}</label>
      </div>
      <div className="icon-div">
        <i
          className="fa-solid fa-pen"
          onClick={() => props.updateFunction(props.todo, true)}
        ></i>
        <i
          className="fa-solid fa-trash"
          onClick={() => props.deleteFunction(props.todo.id)}
        ></i>
      </div>
    </li>
  );
};

export default TodoItem;
