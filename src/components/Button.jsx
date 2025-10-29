// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary", // 'primary', 'secondary', 'danger',
  type = "button",
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`${baseClasses} ${variants[variant]} ${
        disabled || loading ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};
export default Button;
