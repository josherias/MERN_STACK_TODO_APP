import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const GuestLayout = () => {
  const { token } = useStateContext();

  if (token) return <Navigate to="/" />;

  return (
    <div className="flex items-center justify-center w-[100%] h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
