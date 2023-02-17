import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { getCurrentUser } from "../../services/authService";

const DefaultLayout = () => {
  const { token, setToken, setUser, user, notification } = useStateContext();
  const [openSidebar, setOpenSidebar] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const { data } = await getCurrentUser();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = (ev) => {
    ev.preventDefault();

    setToken(null);
    setUser({});
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <main className="flex-1">
        <Header
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
          onLogout={onLogout}
          user={user}
        />
        <div className="px-8 py-5">
          <Outlet />
        </div>
      </main>

      {notification && (
        <div className="fixed top-20 right-0 bg-green-700 text-white px-4 py-3">
          {notification}
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
