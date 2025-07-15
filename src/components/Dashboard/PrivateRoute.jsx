import { Navigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

export default function DashboardPrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}
