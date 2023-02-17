import React, { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { createTodo, updateTodo } from "../services/todoService";

const Modal = ({ toggleModal, todoToEdit, setTodoToEdit, setTodos, todos }) => {
  const [error, setError] = useState(null);
  const { setNotification } = useStateContext();

  const titleRef = useRef();
  const contentRef = useRef();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);

    const payload = {
      title: titleRef.current.value,
      content: contentRef.current.value,
    };

    const originalTodos = todos;

    try {
      if (todoToEdit) {
        const newTodos = [...originalTodos];
        const index = newTodos.indexOf(todoToEdit);
        newTodos[index] = { ...todoToEdit };
        newTodos[index].title = payload.title;
        newTodos[index].content = payload.content;

        setTodos(newTodos);

        await updateTodo(todoToEdit, payload);
        setTodoToEdit(null);
        toggleModal();
        setNotification("Todo has been edited sucessfully !");
      } else {
        const { data: todo } = await createTodo(payload);

        setTodos([...originalTodos, todo]);

        toggleModal();
        setNotification("Todo has been added sucessfully !");
      }
    } catch (error) {
      const { response } = error;
      if (response) {
        setError(response.data);
      }

      setTodos(originalTodos);
    }
  };

  return (
    <div className="h-screen w-[100%] bg-black bg-opacity-80 position fixed top-0 left-0 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-md w-[80%] md:w-[50%]">
        <div className="flex justify-between items-center border-b px-3 py-4">
          <h1 className="text-2xl text-gray-900">Todo form</h1>
          <span onClick={toggleModal} className="cursor-pointer">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>

        <div className="mt-2 p-3">
          <form onSubmit={onSubmit}>
            {error && (
              <p className="py-2 px-3 text-center w-[100%] bg-red-500 mb-4 text-white">
                {error}
              </p>
            )}

            <div className="w-[100%] mb-2">
              <label>Title</label>
              <input
                className="w-full border my-2 py-2 px-3 rounded-md"
                name="title"
                type="text"
                ref={titleRef}
                placeholder="Go to Starbucks"
                defaultValue={todoToEdit && todoToEdit.title}
              />
            </div>

            <div className="w-[100%] mb-2">
              <label>Content</label>
              <textarea
                className="w-full border my-2 py-2 px-3 rounded-md focus:outline-none"
                name="content"
                type="text"
                ref={contentRef}
                placeholder="Go to Starbucks"
                defaultValue={todoToEdit && todoToEdit.content}
              />
            </div>

            <div className="w-[100%] my-3 flex gap-2  md:justify-end">
              <span
                onClick={toggleModal}
                className="bg-gray-200 text-gray-700 py-2 px-4 mt-2 font-semibold cursor-pointer"
              >
                Close
              </span>
              <button className="bg-primary text-white py-2 px-4 mt-2 font-semibold">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
