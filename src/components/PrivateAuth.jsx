import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

export default function PrivateAuth({ children }) {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" /> : children;
}
