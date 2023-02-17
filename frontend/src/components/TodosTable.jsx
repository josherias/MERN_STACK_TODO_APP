import { formatDate } from "../utils/formatDate";

const TodosTable = ({
  data,
  onGetTodoToEdit,
  onDeleteTodo,
  onCompleteTodo,
}) => {
  const handleTodoToEdit = (todo) => {
    onGetTodoToEdit(todo);
  };

  const handleDeleteTodo = (todo) => {
    onDeleteTodo(todo);
  };

  const handleCompleteTodo = (todo) => {
    onCompleteTodo(todo);
  };

  return (
    <table className="w-full text-sm text-left text-gray-500 overflow-x-scroll">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Title
          </th>
          <th scope="col" className="px-6 py-3">
            Content
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Created At
          </th>
          <th scope="col" className="px-6 py-3">
            Updated At
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((todo) => (
          <tr key={todo._id} className="bg-white border-b hover:bg-gray-50">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {todo.title}
            </th>
            <td className="px-6 py-4">{todo.content}</td>
            <td className="px-6 py-4">
              {todo.completed ? (
                <span className="text-white text-sm bg-green-700 rounded p-1">
                  completed
                </span>
              ) : (
                <span className="text-white text-sm bg-yellow-500 rounded p-1">
                  pending
                </span>
              )}
            </td>
            <td className="px-6 py-4">{formatDate(todo.createdAt)}</td>
            <td className="px-6 py-4">{formatDate(todo.updatedAt)}</td>
            <td className="flex gap-2 px-6 py-4 justify-center">
              <button
                onClick={() => handleCompleteTodo(todo)}
                className="cursor-pointer p-1 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                disabled={todo.completed}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <button
                onClick={() => handleTodoToEdit(todo)}
                className="cursor-pointer p-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>

              <button className="cursor-pointer p-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => handleDeleteTodo(todo)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodosTable;
