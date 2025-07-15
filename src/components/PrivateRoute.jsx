import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth/login" replace />;
}
