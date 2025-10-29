import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../contexts/AuthContext";
import { useEffect } from "react";

const Layout = () => {
  const { user, signOut, initAuth, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const activeClass = "underline font-semibold";

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            📚 BooksBuy
          </Link>

          <nav>
            {user ? (
              <div className="flex items-center gap-6 text-sm">
                <NavLink
                  to="/books"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:underline"
                  }
                >
                  Books
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:underline"
                  }
                >
                  Profile
                </NavLink>

                {user.user_role === "admin" && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive ? activeClass : "hover:underline"
                    }
                  >
                    Admin
                  </NavLink>
                )}

                <button
                  onClick={handleSignOut}
                  className="hover:underline focus:ring-2 focus:ring-white rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-6 text-sm">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:underline"
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:underline"
                  }
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} BooksBuy. Every book tells a story. So do
        we.
      </footer>
    </div>
  );
};

export default Layout;
