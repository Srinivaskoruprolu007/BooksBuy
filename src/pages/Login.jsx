import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../contexts/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";

const Login = () => {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) throw error;
      navigate("/books");
    } catch (err) {
      setError(err.message || "Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
