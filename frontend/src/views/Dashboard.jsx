import React, { useEffect, useState } from "react";
import DashboardComponent from "../components/DashboardComponent";
import { getTodos } from "../services/todoService";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const { data } = await getTodos();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const unCompletedTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      <h1 className="text-2xl">Welcome!</h1>
      <p className="my-3 text-gray-800">A quick summary of your activities</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <DashboardComponent
          color={"bg-red-400"}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          }
          title={"Completed Todos"}
          number={completedTodos.length}
        />

        <DashboardComponent
          color={"bg-blue-400"}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          }
          title={"Pending Todos"}
          number={unCompletedTodos.length}
        />
      </div>
    </div>
  );
};

export default Dashboard;
