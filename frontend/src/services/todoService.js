import axiosClient from "../axiosClient";

export function getTodos() {
  return axiosClient.get("/todos");
}

export function deleteTodo(todo) {
  return axiosClient.delete("/todos/" + todo._id);
}

export function completeTodo(todo) {
  return axiosClient.patch("/todos/" + todo._id);
}

export function updateTodo(todo, data) {
  return axiosClient.put("/todos/" + todo._id, data);
}

export function createTodo(data) {
  return axiosClient.post("/todos", data);
}
