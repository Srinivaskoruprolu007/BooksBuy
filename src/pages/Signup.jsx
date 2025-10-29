import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../contexts/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/signUpSchema";
import { supabase } from "../lib/supabaseClient";

const Signup = () => {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { data: user, error: authError } = await signUp(
        data.email,
        data.password
      );
      if (authError) throw authError; 

      // fetch new user details
      const profile = user?.user;

      const { error: profileError } = await supabase.from("profiles").insert({
        id: profile.id,
        username: data.username, // grab username from form
      });

      if (profileError) throw profileError;

      navigate("/books");
    } catch (err) {
      setError(err.message || "Signup Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            {...register("username")}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            placeholder="Choose a username"
          />
          {errors.username && (
            <p className="text-red-600 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Creating account…" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
