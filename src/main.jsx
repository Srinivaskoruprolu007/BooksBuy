import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { queryClient } from "./utils/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Layout from "./components/Layout.jsx";
import { AuthGuard } from "./components/AuthGuard.jsx";
import { AdminGuard } from "./components/AdminGuard.jsx";
import { GuestGuard } from "./components/GuestGuard.jsx";

// Lazy-loaded pages for ✨speedy first load✨
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Books = lazy(() => import("./pages/Books.jsx"));
const BooksForm = lazy(() => import("./pages/BooksForm.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        element: <GuestGuard />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ],
      },
      {
        element: <AuthGuard />,
        children: [
          { path: "/books", element: <Books /> },
          { path: "/books/new", element: <BooksForm /> },
          { path: "/books/:id/edit", element: <BooksForm /> },
          { path: "/profile", element: <Profile /> },
        ],
      },

      {
        element: <AdminGuard />,
        children: [{ path: "/admin", element: <Admin /> }],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p style={{ padding: 20 }}>Loading… 🌈</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
