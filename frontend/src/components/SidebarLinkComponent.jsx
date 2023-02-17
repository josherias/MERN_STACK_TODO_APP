import React from "react";
import { Link } from "react-router-dom";

const SidebarLinkComponent = ({ url, icon, title }) => {
  return (
    <Link
      to={url}
      className="flex gap-2 hover:bg-slate-200 cursor-pointer w-[100%] items-center px-2 py-3 mb-3 rounded-md"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {icon}
        </svg>
      </span>
      <span className="">{title}</span>
    </Link>
  );
};

export default SidebarLinkComponent;
