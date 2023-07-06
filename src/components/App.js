import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { deleteTodoAPI, fetchTodo, newTodo, updateTodoAPI } from "../api";
import toast from "react-hot-toast";

function App() {
  const [todo, setTodo] = useState([]);
  const [formTodo, setFormTodo] = useState("");
  const [editing, setEditing] = useState({
    task: {},
    edit: false,
  });

  //Change completion
  const setCompletion = (item, currentStatus) => {
    const index = todo.indexOf(item);
    if (currentStatus) {
      setTodo((todos) => {
        todos[index].completed = false;
        return [...todos];
      });
      toast.error("Marked as Not Complete");
    } else {
      setTodo((todos) => {
        todos[index].completed = true;
        return [...todos];
      });
      toast.success("Marked as Complete");
    }
  };

  //Create New Todo
  const createNewTodo = async () => {
    const response = await newTodo(formTodo);
    setTodo([response, ...todo]);
    toast.success("New Task created!");
    setFormTodo("");
  };

  //Update Todo
  const updateTodo = async (item, edit) => {
    if (edit) {
      setEditing({
        task: item,
        edit: true,
      });
      toast.success("Edit mode ON!");
      return;
    }
    const response = await updateTodoAPI(item);
    setEditing({
      task: {},
      edit: false,
    });
    toast.success("Task edited successfully!");
    setFormTodo("");
  };

  //Delete Todo
  const deleteTodo = async (id) => {
    const response = await deleteTodoAPI(id);
    if (response.status === 200) {
      setTodo(todo.filter((item) => item.id !== id));
      toast.success("Task deleted!");
    } else {
      toast.error(`ERROR STATUS: ${response.status}`);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetchTodo();
      setTodo(response);
    };
    fetchTodos();
  }, []);

  return (
    <main>
      <header></header>
      <div className="todo-app">
        <h1>TODO</h1>
        <div className="create-todo">
          <input
            type="text"
            className="add-task"
            id="add"
            placeholder={
              editing.edit ? `${editing.task.title}` : "Create new TODO..."
            }
            value={formTodo}
            onChange={(e) => setFormTodo(e.target.value)}
          />
          {editing.edit ? (
            <button
              className="create-btn"
              onClick={() => {
                const todoEdit = editing.task;
                todoEdit.title = formTodo;
                updateTodo(todoEdit, false);
              }}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          ) : (
            <button className="create-btn" onClick={createNewTodo}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          )}
        </div>
        <div className="todo-div">
          <ul id="list">
            {todo.map((item) => (
              <TodoItem
                todo={item}
                deleteFunction={deleteTodo}
                setCompletion={setCompletion}
                updateFunction={updateTodo}
                key={`todo-${item.id}`}
              />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
