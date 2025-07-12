import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthLayout from "../Layout/AuthLayout";
import PrivateAuth from "../components/PrivateAuth";
import Overview from "../components/Dashboard/Overview";
import WorkSheet from "../pages/WorkSheet";
import PaymentHistory from "../pages/PaymentHistory";
import EmployeeList from "../pages/EmployeeList";
import Progress from "../pages/Progress";
import Payroll from "../pages/Payroll";
import Settings from "../pages/Settings";
import SlugDetails from "../components/Dashboard/SlugDetails";
import AdminEmployeeManagement from "../pages/AdminEmployeeManagement";
import PrivateRoute from "../components/PrivateRoute";
import DashboardPrivateRoute from "../components/Dashboard/PrivateRoute";
import Unauthorized from "../pages/Unauthorized";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard/overview" replace /> },
      { path: "/dashboard/overview", element: <Overview /> },
      {
        path: "/dashboard/work-sheet",
        element: (
          <DashboardPrivateRoute allowedRoles={["employee"]}>
            <WorkSheet />
          </DashboardPrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <DashboardPrivateRoute allowedRoles={["employee"]}>
            <PaymentHistory />
          </DashboardPrivateRoute>
        ),
      },
      {
        path: "/dashboard/employee-list",
        element: (
          <DashboardPrivateRoute allowedRoles={["hr"]}>
            <EmployeeList />
          </DashboardPrivateRoute>
        ),
      },
      {
        path: "/dashboard/employee-list/:id",
        element: (
          <DashboardPrivateRoute allowedRoles={["hr"]}>
            <SlugDetails />
          </DashboardPrivateRoute>
        ),
      },
      {
        path: "/dashboard/progress",
        element: (
          <DashboardPrivateRoute allowedRoles={["hr"]}>
            <Progress />
          </DashboardPrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-employee",
        element: (
          <DashboardPrivateRoute allowedRoles={["admin"]}>
            <AdminEmployeeManagement />
          </DashboardPrivateRoute>
        ),
      },
      {
        path: "/dashboard/payroll",
        element: (
          <DashboardPrivateRoute allowedRoles={["admin"]}>
            <Payroll />
          </DashboardPrivateRoute>
        ),
      },
      { path: "/dashboard/settings", element: <Settings /> },
    ],
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
  { path: "/unauthorized", element: <Unauthorized /> },
]);

export default router;
