import React, { useState } from "react";

const SearchComponent = ({ onSearchTodo, searchQuery }) => {
  return (
    <div className="flex items-center bg-white px-3 py-2 rounded-md my-4 gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        type="search"
        value={searchQuery}
        onChange={(e) => onSearchTodo(e.currentTarget.value)}
        placeholder="Search"
        className="outline-none bg-transparent w-[100%] text-gray-600"
      />
    </div>
  );
};

export default SearchComponent;
