import React from "react";
import _ from "lodash";

const PaginationComponent = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav
      aria-label="Page navigation example"
      className="w-[100%] flex items-center justify-center my-4"
    >
      <ul className="inline-flex items-center -space-x-px">
        {pages.map((page) => (
          <li key={page} className={`cursor-pointer `}>
            <span
              onClick={() => onPageChange(page)}
              className={` ${
                currentPage === page ? "bg-gray-200" : ""
              } px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300  hover:text-gray-700 `}
            >
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
