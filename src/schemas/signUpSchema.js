import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Inavlid email"),
  password: z.string().min(6, "Password contains at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});
