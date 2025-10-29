import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../contexts/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { Navigate, Outlet } from "react-router-dom";

export const AdminGuard = () => {
  const { user } = useAuthStore();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("user_role")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
  if (isLoading) {
    return (
      <div className="flex item-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }
  if (!profile || profile.user_role !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};
