import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUpSchema = z.object({
  username: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(6),
  // confirmPassword: z.string().min(6),
});

// Types for login and sign in schemas
export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
