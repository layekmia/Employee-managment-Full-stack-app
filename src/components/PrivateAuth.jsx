import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Spinner from "./Spinner";

export default function PrivateAuth({ children }) {
  const { user, isAuthChecking } = useAuth();
  if (isAuthChecking) return <Spinner />;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
