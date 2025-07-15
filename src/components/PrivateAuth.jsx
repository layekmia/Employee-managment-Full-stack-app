import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

export default function PrivateAuth({ children }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
