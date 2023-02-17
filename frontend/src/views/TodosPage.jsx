import React, { useEffect, useState } from "react";
import SearchComponent from "../components/SearchComponent";
import SelectComponent from "../components/SelectComponent";

import Modal from "../components/Modal";
import TodosTable from "../components/TodosTable";
import { useStateContext } from "../context/ContextProvider";
import PaginationComponent from "../components/PaginationComponent";
import { paginate } from "../utils/paginate";
import { completeTodo, deleteTodo, getTodos } from "../services/todoService";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [todoToEdit, setTodoToEdit] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedValue, setSelectedValue] = useState(15);

  const [pageSize] = useState(4);

  const [currentPage, setCurrentPage] = useState(1);

  const { setNotification } = useStateContext();

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

  const searchTodo = (query) => {
    setSearchQuery(query);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getTodoToEdit = (todo) => {
    setTodoToEdit(todo);
    toggleModal();
    // setTodoToEdit(null);
  };

  const handleDeleteTodo = async (todo) => {
    const originalTodos = todos;
    const newTodos = originalTodos.filter(
      (existingTodo) => existingTodo._id !== todo._id
    );
    setTodos(newTodos);

    try {
      await deleteTodo(todo);
      setNotification("Todo has been deleted sucessfully !");
    } catch (error) {
      console.log(error);
      setTodos(originalTodos);
    }
  };

  const handleCompleteTodo = async (todo) => {
    const originalTodos = todos;
    const newTodos = [...originalTodos];
    const index = newTodos.indexOf(todo);
    newTodos[index] = { ...todo };
    newTodos[index].completed = true;

    setTodos(newTodos);

    try {
      await completeTodo(todo);
      setNotification("Todo completed sucessfully!");
    } catch (error) {
      setTodos(originalTodos);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageData = () => {
    let filtered = todos;

    if (searchQuery)
      filtered = todos.filter((todo) =>
        todo.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    filtered = filtered.slice(0, selectedValue);

    const paginated = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginated };
  };

  const { totalCount, data } = getPageData();

  return (
    <div>
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          todoToEdit={todoToEdit}
          setTodoToEdit={setTodoToEdit}
          setTodos={setTodos}
          todos={todos}
        />
      )}
      <div className="flex justify-between items-center w-[100%]">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-900">
          Todos Management
        </h1>
        <button
          onClick={toggleModal}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Add New
        </button>
      </div>
      <div className="border mt-5">
        <div className="flex flex-col py-3 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            Show{" "}
            <SelectComponent
              selectedValue={selectedValue}
              onSelectedChange={handleSelectChange}
            />{" "}
            entries
          </div>

          <SearchComponent
            onSearchTodo={searchTodo}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        {/* table */}
        <TodosTable
          data={data}
          onGetTodoToEdit={getTodoToEdit}
          onDeleteTodo={handleDeleteTodo}
          onCompleteTodo={handleCompleteTodo}
        />
        <PaginationComponent
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TodosPage;
