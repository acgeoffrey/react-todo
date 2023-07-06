import TodoItem from "./TodoItem";

function App() {
  return (
    <main>
      <header></header>
      <div className="todo-app">
        <h1>TODO</h1>
        <div class="create-todo">
          <input
            type="text"
            class="add-task"
            id="add"
            placeholder="Create a new todo..."
          />
        </div>
        <div className="todo-div">
          <ul id="list">
            <TodoItem />
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
