import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../contexts/AuthContext";

export const GuestGuard = () => {
  const { user, loading } = useAuthStore();

  if (loading) return <div>Loading....</div>;

  return user ? <Navigate to={"/books"} /> : <Outlet />;
};
