import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthLayout from "../Layout/AuthLayout";
import PrivateAuth from "../components/PrivateAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    // children: [],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/register",
        element: (
          <PrivateAuth>
            <Register />
          </PrivateAuth>
        ),
      },
      {
        path: "/auth/login",
        element: (
          <PrivateAuth>
            <Login />
          </PrivateAuth>
        ),
      },
    ],
  },
]);

export default router;
