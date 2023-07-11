//storing api url into a variable
const url = "https://jsonplaceholder.typicode.com/todos";

//Fetch Todo
export const fetchTodo = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1/todos"
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

//Create New Todo
export const newTodo = async (title) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

//Updating Todo
export const updateTodoAPI = async (todo) => {
  try {
    const response = await fetch(url + `/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Deleting Todo
export const deleteTodoAPI = async (id) => {
  try {
    return await fetch(url + `/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};
