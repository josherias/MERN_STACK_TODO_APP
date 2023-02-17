import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import GuestLayout from "../components/Layouts/GuestLayout";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import Profile from "../views/Profile";
import Signup from "../views/Signup";
import TodosPage from "../views/TodosPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/todos",
        element: <TodosPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
