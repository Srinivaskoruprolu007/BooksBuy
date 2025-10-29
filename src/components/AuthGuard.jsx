import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../contexts/AuthContext";

export const AuthGuard = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};
