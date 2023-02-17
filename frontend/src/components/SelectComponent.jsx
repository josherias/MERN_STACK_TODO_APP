import React from "react";

const SelectComponent = ({ selectedValue, onSelectedChange }) => {
  return (
    <select
      value={selectedValue}
      onChange={(e) => onSelectedChange(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-sm font-medium text-gray-900 rounded-md focus:outline-none
            px-5 py-3"
    >
      <option value={5} className="hover:bg-gray-100">
        5
      </option>
      <option value={10} className="hover:bg-gray-100">
        10
      </option>
      <option value={15} className="hover:bg-gray-100">
        15
      </option>
    </select>
  );
};

export default SelectComponent;
